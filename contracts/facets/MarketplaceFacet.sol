// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "../libraries/LibAppStorage.sol";

contract MarketplaceFacet is Modifiers, ReentrancyGuard {
    using Counters for Counters.Counter;
    event itemListed(
        uint256 indexed listingId,
        address indexed nftContract,
        Nfts itemType,
        uint256 indexed tokenId,
        address seller,
        uint256 price,
        address sellingToken
    );
    event itemSold(
        uint256 indexed listingId,
        address indexed nftContract,
        Nfts itemType,
        uint256 indexed tokenId,
        address buyer,
        address seller,
        uint256 price,
        address sellingToken
    );
    event itemDelisted(
        uint256 indexed listingId,
        address indexed nftContract,
        Nfts itemType,
        uint256 indexed tokenId,
        address seller
    );
    event itemPriceUpdated(
        uint256 indexed itemId,
        address indexed nftContract,
        Nfts itemType,
        uint256 indexed tokenId,
        address seller,
        uint256 oldPrice,
        uint256 newPrice
    );

    /// @param selectedNftForListing - type of nft to list on marketplace (check LibAppStorage for details)
    /// @param tokenId - id of listed nft
    /// @param sellingToken - token that is used in listing f.e. wmatic,usdc ...
    /// @param price - item price in wei
    function listItemOnSale(
        Nfts selectedNftForListing,
        uint256 tokenId,
        IERC20 sellingToken,
        uint256 price
    )
        external
        onlyTokenOwner(s.nftContract[selectedNftForListing], tokenId)
        onlyAllowedToken(sellingToken)
        nonReentrant
    {
        require(price > 0, "Price must be not zero");
        IERC721 workingNft = s.nftContract[selectedNftForListing];
        uint256 listingId = s.marketplaceData.nextListingId.current();
        workingNft.safeTransferFrom(msg.sender, s.nftStorage, tokenId);
        s.marketplaceData.listingIdToItem[listingId] = MarketItem(
            listingId,
            tokenId,
            selectedNftForListing,
            msg.sender,
            price,
            sellingToken,
            ItemState.OnSale
        );
        s.marketplaceData.nextListingId.increment();

        emit itemListed(
            listingId,
            address(workingNft),
            selectedNftForListing,
            tokenId,
            msg.sender,
            price,
            address(sellingToken)
        );
    }

    /// @dev listingId is being pulled from subgraph
    function buyItem(uint256 listingId) external nonReentrant {
        require(
            s.marketplaceData.listingIdToItem[listingId].seller != address(0),
            "Listing does not exist"
        );
        MarketItem memory currentListing = s.marketplaceData.listingIdToItem[
            listingId
        ];
        (uint256 transferAmount, uint256 feeAmount) = calculateFee(
            currentListing.price
        );
        IERC20 workingToken = currentListing.sellingToken;
        IERC721 workingNft = s.nftContract[currentListing.nftContract];
        workingToken.feeLessTransfer(msg.sender, s.treasury, feeAmount);
        workingToken.feeLessTransfer(
            msg.sender,
            currentListing.seller,
            transferAmount
        );

        workingNft.safeTransferFrom(
            s.nftStorage,
            msg.sender,
            currentListing.tokenId,
            "0x00"
        );

        delete s.marketplaceData.listingIdToItem[listingId];
        emit itemSold(
            listingId,
            address(workingNft),
            currentListing.nftContract,
            currentListing.tokenId,
            msg.sender,
            currentListing.seller,
            currentListing.price,
            address(address(workingToken))
        );
    }

    /// @param listingId - id of listing from subgraph
    /// _price - new price of selected item
    function changeItemPrice(uint256 listingId, uint256 _price)
        external
        onlySeller(msg.sender, listingId)
    {
        require(_price > 0, "Price must be not zero");
        require(
            s.marketplaceData.listingIdToItem[listingId].seller != address(0),
            "Listing does not exist"
        );
        MarketItem memory currentListing = s.marketplaceData.listingIdToItem[
            listingId
        ];
        s.marketplaceData.listingIdToItem[listingId].price = _price;

        emit itemPriceUpdated(
            currentListing.listingId,
            address(s.nftContract[currentListing.nftContract]),
            currentListing.nftContract,
            currentListing.tokenId,
            currentListing.seller,
            currentListing.price,
            _price
        );
    }

    function delistItem(uint256 listingId)
        external
        onlySeller(msg.sender, listingId)
    {
        require(
            s.marketplaceData.listingIdToItem[listingId].seller != address(0),
            "Listing does not exist"
        );
        MarketItem memory currentListing = s.marketplaceData.listingIdToItem[
            listingId
        ];

        IERC721 workingNft = s.nftContract[currentListing.nftContract];
        workingNft.safeTransferFrom(
            s.nftStorage,
            msg.sender,
            currentListing.tokenId,
            "0x00"
        );

        delete s.marketplaceData.listingIdToItem[listingId];
        emit itemDelisted(
            currentListing.listingId,
            address(workingNft),
            currentListing.nftContract,
            currentListing.tokenId,
            currentListing.seller
        );
    }

    /// @dev function to calculate fees
    function calculateFee(uint256 value)
        internal
        view
        returns (uint256 transferAmount, uint256 feeAmount)
    {
        uint256 marketplaceFeePercentage = s.marketplaceFeePercentage;
        require(marketplaceFeePercentage > 0, "Marketplace fee is not set");
        feeAmount = (value * marketplaceFeePercentage) / 100;
        transferAmount = value - feeAmount;
    }
}
