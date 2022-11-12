// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../interfaces/IERC721.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/SafeERC20.sol";
import "../libraries/LibAppStorage.sol";

contract AuctionFacet is Modifiers {
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;
    event auctionCreated(
        uint256 indexed auctionId,
        address indexed seller,
        Nfts selectedNft,
        uint256 indexed tokenId,
        uint256 deadline,
        uint256 startPrice,
        IERC20 payingToken,
        uint256 endPrice
    );
    event auctionCancelled(uint256 indexed auctionId);
    event bidCreated(
        uint256 indexed auctionId,
        uint256 bidPrice,
        address indexed bidder
    );
    event bidAccepted(
        uint256 indexed auctionId,
        uint256 bidPrice,
        address indexed buyer
    );
    event bidCancelled(uint256 indexed auctionId, address indexed bidder);

    /// @notice Allowes to create time based auction (after sertain deadline auction stops if no offers were accepted)
    /// @param _selectedNft - selected nft type for auction (land,scale,etc)
    /// @param _tokenId - token id of the item that is going to be placed on auction
    /// @param _deadline - auction deadline
    /// @param _payingToken - token that is going to be used as payment (CoolMetaverseNameToken,usdc,etc)
    /// @param _startPrice - base prict for auction
    function createTimeBasedAuction(
        Nfts _selectedNft,
        uint256 _tokenId,
        uint256 _deadline,
        IERC20 _payingToken,
        uint256 _startPrice
    ) external onlyAllowedToken(_payingToken) {
        s.nftContract[_selectedNft].safeTransferFrom(
            msg.sender,
            s.nftStorage,
            _tokenId
        );
        uint256 auctionId = s.nextAuctionId.current();
        s.auctionIdToDetails[auctionId] = auctionDetails(
            msg.sender,
            _startPrice,
            0,
            _payingToken,
            AuctionType.TimeBased,
            _selectedNft,
            _tokenId,
            _deadline
        );
        s.nextAuctionId.increment();
        emit auctionCreated(
            auctionId,
            msg.sender,
            _selectedNft,
            _tokenId,
            _deadline,
            _startPrice,
            _payingToken,
            0
        );
    }

    /// @notice Allowes to create price based auction (if price reaches one stated by the owner auction ends)
    /// @param _selectedNft - selected nft type for auction (land,scale,etc)
    /// @param _tokenId - token id of the item that is going to be placed on auction
    /// @param _deadline - auction deadline
    /// @param _payingToken - token that is going to be used as payment (CoolMetaverseNameToken,usdc,etc)
    /// @param _startPrice - base price for auction
    /// @param _endPrice - end pring for auction
    function createPriceBasedAuction(
        Nfts _selectedNft,
        uint256 _tokenId,
        uint256 _deadline,
        IERC20 _payingToken,
        uint256 _startPrice,
        uint256 _endPrice
    ) external onlyAllowedToken(_payingToken) {
        s.nftContract[_selectedNft].safeTransferFrom(
            msg.sender,
            s.nftStorage,
            _tokenId
        );
        uint256 auctionId = s.nextAuctionId.current();
        s.auctionIdToDetails[auctionId] = auctionDetails(
            msg.sender,
            _startPrice,
            _endPrice,
            _payingToken,
            AuctionType.PriceBased,
            _selectedNft,
            _tokenId,
            _deadline
        );
        s.nextAuctionId.increment();

        emit auctionCreated(
            auctionId,
            msg.sender,
            _selectedNft,
            _tokenId,
            _deadline,
            _startPrice,
            _payingToken,
            _endPrice
        );
    }

    function makeBid(uint256 _selectedAuctionId, uint256 _bidPrice) external {
        auctionDetails memory selectedAuction = s.auctionIdToDetails[
            _selectedAuctionId
        ];
        require(selectedAuction.seller != address(0), "Id does not exist");
        require(
            selectedAuction.payingToken.balanceOf(msg.sender) >= _bidPrice,
            "Your balance is insuficcent"
        );
        require(
            _bidPrice >= selectedAuction.startPrice,
            "Bid is lower than startPrice"
        );
        if (
            selectedAuction.auctionType == AuctionType.PriceBased &&
            _bidPrice == selectedAuction.endPrice
        ) {
            _acceptBid(msg.sender, _selectedAuctionId, _bidPrice);
        } else {
            s.bids[_selectedAuctionId][msg.sender] = _bidPrice;
        }
        emit bidCreated(_selectedAuctionId, _bidPrice, msg.sender);
    }

    /// @dev This function is called by owner of auction
    function acceptBid(
        uint256 _selectedAuctionId,
        address _buyer,
        uint256 _selectedBidPrice
    ) external {
        require(
            s.auctionIdToDetails[_selectedAuctionId].seller == msg.sender,
            "You are not the auction owner"
        );
        _acceptBid(_buyer, _selectedAuctionId, _selectedBidPrice);
    }

    function _acceptBid(
        address _buyer,
        uint256 _selectedAuctionId,
        uint256 _selectedBidPrice
    ) internal {
        auctionDetails memory selectedAuction = s.auctionIdToDetails[
            _selectedAuctionId
        ];
        IERC721 workingContract = s.nftContract[selectedAuction.auctionToken];
        IERC20 workingToken = selectedAuction.payingToken;
        require(
            block.timestamp <= selectedAuction.deadline,
            "Auction on this item is over"
        );
        workingContract.safeTransferFrom(
            s.nftStorage,
            _buyer,
            selectedAuction.tokenId,
            "0x00"
        );
        workingToken.safeTransferFrom(
            _buyer,
            selectedAuction.seller,
            _selectedBidPrice
        );
        delete s.auctionIdToDetails[_selectedAuctionId];
        emit bidAccepted(_selectedAuctionId, _selectedBidPrice, _buyer);
    }

    /// @dev _selectedAuctionId is being pulled via subgraph
    function cancelAuction(uint256 _selectedAuctionId) external {
        require(
            s.auctionIdToDetails[_selectedAuctionId].seller == msg.sender,
            "You are not the auction owner"
        );
        auctionDetails memory selectedAuction = s.auctionIdToDetails[
            _selectedAuctionId
        ];
        require(selectedAuction.seller != address(0), "Id does not exist");
        IERC721 workingContract = s.nftContract[selectedAuction.auctionToken];
        workingContract.safeTransferFrom(
            s.nftStorage,
            msg.sender,
            selectedAuction.tokenId,
            "0x00"
        );
        delete s.auctionIdToDetails[_selectedAuctionId];
        emit auctionCancelled(_selectedAuctionId);
    }

    /// @dev _selectedAuctionId is being pulled via subgraph
    function cancelBid(uint256 _selectedAuctionId) external {
        require(
            s.auctionIdToDetails[_selectedAuctionId].seller != address(0),
            "Id does not exist"
        );
        require(
            s.bids[_selectedAuctionId][msg.sender] != 0,
            "No bid on this auction"
        );
        delete s.bids[_selectedAuctionId][msg.sender];
        emit bidCancelled(_selectedAuctionId, msg.sender);
    }
}
