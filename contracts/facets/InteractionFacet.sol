// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../interfaces/IERC721.sol";
import "../interfaces/Composable/IERC998ERC721TopDown.sol";
import "../interfaces/Composable/IERC998ERC721TopDownEnumerable.sol";
import "../libraries/LibAppStorage.sol";
import "hardhat/console.sol";

/// @title Facet that allowes to *Interact* with erc721
contract InteractionFacet is Modifiers {
    using SafeERC20 for IERC20;
    event scaleCreated(
        uint256 indexed scaleType,
        uint256 indexed scaleId,
        address indexed owner,
        uint256[] childIds
    );
    event scaleMinted(
        uint256 indexed scaleType,
        uint256 indexed scaleId,
        address indexed owner,
        uint256[] childIds
    );
    event scaleBurned(uint256 indexed scaleId);
    event nftDepositedToRent(
        Nfts indexed selectedNftForRent,
        uint256 indexed tokenId,
        IERC20 payingToken,
        address indexed owner,
        uint256 rentPrice,
        uint256 rentAmountInHours
    );
    event nftRented(
        Nfts indexed selectedNftForRent,
        uint256 indexed tokenId,
        address indexed rentee,
        uint256 rentDeadline
    );
    event nftTakenBackFromRenterToOwner(
        Nfts indexed selectedNftForRent,
        uint256 indexed tokenId,
        address indexed owner
    );

    /// @notice Under development
    function mintPlanet() external {}

    /// @notice Under development
    function mintLand() external {}

    /// @notice pre release function
    function mintBunchLands(
        address _to,
        uint256[] memory ids,
        uint256 planetId,
        string memory customTokenUri
    ) external onlyOwner {
        IERC721 land = s.nftContract[Nfts.land];
        for (uint256 i = 0; i < ids.length; i++) {
            land.mintLand(_to, ids[i], planetId, customTokenUri);
        }
    }

    /// @param scaleType - future type of scale (it's dementions)
    /// @param landIds -  array of ids' which would be transfered to nftStorageInteractionFacet and user will get Scale nft with composed Tokens attached
    /// @dev we need to restric this function when done testing since it could cause many errors
    function mintScale(
        uint256 scaleType,
        uint256[] memory landIds,
        uint256 planetId,
        string memory customTokenUri
    ) external {
        require(scaleType**2 == landIds.length, "Wrong number of lands");
        require(s.allowedScaleTypes[scaleType], "Not valid scale type");
        IERC721 land = s.nftContract[Nfts.land];
        IERC721 scale = s.nftContract[Nfts.scale];
        IERC998ERC721TopDown scaleComposable = s.scaleComposable;

        uint256 composableTokenId = scaleComposable.mint(s.nftStorage);
        for (uint256 i = 0; i < landIds.length; i++) {
            land.mintLand(s.nftStorage, landIds[i], planetId, customTokenUri);
            scaleComposable.getChild(
                s.nftStorage,
                composableTokenId,
                address(land),
                landIds[i]
            );
            s.scaleComposableToChilds[composableTokenId].push(landIds[i]);
        }

        uint256 scaleTokenId = scale.mint(msg.sender);
        s.scaleToComposable[scaleTokenId] = composableTokenId;
        s.scaleToScaleType[scaleTokenId] = scaleType;
        emit scaleMinted(scaleType, scaleTokenId, msg.sender, landIds);
    }

    function mintBigScale(uint256 scaleType, uint256[] memory landIds)
        external
    {
        require(scaleType == 12, "Wrong scale type");
        require(landIds.length == scaleType**2, "Wrong number of lands");
        IERC721 land = s.nftContract[Nfts.land];
        IERC721 scale = s.nftContract[Nfts.scale];
        IERC998ERC721TopDown scaleComposable = s.scaleComposable;
        address nftStorage = s.nftStorage;
        uint256 composableTokenId = scaleComposable.mint(nftStorage);
        for (uint256 i = 0; i < landIds.length; i++) {
            scaleComposable.getChild(
                nftStorage,
                composableTokenId,
                address(land),
                landIds[i]
            );
            s.scaleComposableToChilds[composableTokenId].push(landIds[i]);
        }

        uint256 scaleTokenId = scale.mint(msg.sender);
        s.scaleToComposable[scaleTokenId] = composableTokenId;
        s.scaleToScaleType[scaleTokenId] = scaleType;
        emit scaleMinted(scaleType, scaleTokenId, msg.sender, landIds);
    }

    function createScaleFromLands(uint256 scaleType, uint256[] memory landIds)
        external
    {
        require(scaleType**2 == landIds.length, "Wrong number of lands");
        require(s.allowedScaleTypes[scaleType], "Not valid scale type");
        IERC721 land = s.nftContract[Nfts.land];
        IERC721 scale = s.nftContract[Nfts.scale];
        IERC998ERC721TopDown scaleComposable = s.scaleComposable;
        address nftStorage = s.nftStorage;

        uint256 composableTokenId = scaleComposable.mint(nftStorage);
        for (uint256 i = 0; i < landIds.length; i++) {
            land.safeTransferFrom(msg.sender, nftStorage, landIds[i]);
            scaleComposable.getChild(
                nftStorage,
                composableTokenId,
                address(land),
                landIds[i]
            );
            s.scaleComposableToChilds[composableTokenId].push(landIds[i]);
        }

        uint256 scaleTokenId = scale.mint(msg.sender);
        s.scaleToComposable[scaleTokenId] = composableTokenId;
        s.scaleToScaleType[scaleTokenId] = scaleType;
        emit scaleCreated(scaleType, scaleTokenId, msg.sender, landIds);
    }

    /// @param scaleTokenId - id of erc721 scale to decomose
    function decomposeScale(uint256 scaleTokenId) external {
        IERC721 land = s.nftContract[Nfts.land];
        IERC721 scale = s.nftContract[Nfts.scale];
        IERC998ERC721TopDown scaleComposable = s.scaleComposable;

        scale.burn(scaleTokenId);
        uint256 composableTokenId = s.scaleToComposable[scaleTokenId];
        uint256[] memory childrenTokens = s.scaleComposableToChilds[
            composableTokenId
        ];
        for (uint256 i = 0; i < childrenTokens.length; i++) {
            scaleComposable.safeTransferChild(
                composableTokenId,
                msg.sender,
                address(land),
                childrenTokens[i]
            );
        }
        delete s.scaleToComposable[scaleTokenId];
        delete s.scaleToScaleType[scaleTokenId];
        delete s.scaleComposableToChilds[scaleTokenId];
        emit scaleBurned(scaleTokenId);
    }

    /// @notice Adds nft in the rening pool for other to rent it
    /// @param selectedNftForRentDeposit - selected Nfts type (land,scale,etc)
    /// @param tokenId - token id of the lended nft
    /// @param payingToken - token in which to pay for rent
    /// @param rentPrice - amount to pay for rent in wei
    /// @param rentAmountInHours - for how long to lend nft
    function depositNftForRent(
        Nfts selectedNftForRentDeposit,
        uint256 tokenId,
        IERC20 payingToken,
        uint256 rentPrice,
        uint256 rentAmountInHours
    ) external onlyAllowedToken(payingToken) {
        IERC721 selectedNftContract = s.nftContract[selectedNftForRentDeposit];
        selectedNftContract.safeTransferFrom(msg.sender, s.nftStorage, tokenId);
        s.rentDetails[selectedNftForRentDeposit][tokenId] = rentDetails(
            true,
            msg.sender,
            payingToken,
            0,
            rentAmountInHours * 3600,
            address(0),
            rentPrice
        );
        emit nftDepositedToRent(
            selectedNftForRentDeposit,
            tokenId,
            payingToken,
            msg.sender,
            rentPrice,
            rentAmountInHours
        );
    }

    function rentNft(Nfts selectedNftForRent, uint256 tokenId) external {
        require(
            s.rentDetails[selectedNftForRent][tokenId].isAllowedForRenting,
            "Not awaiable for rent"
        );
        s.rentDetails[selectedNftForRent][tokenId].isAllowedForRenting = false;
        rentDetails memory curRentDetails = s.rentDetails[selectedNftForRent][
            tokenId
        ];
        curRentDetails.payingToken.safeTransferFrom(
            msg.sender,
            curRentDetails.owner,
            curRentDetails.rentPrice
        );
        s.rentDetails[selectedNftForRent][tokenId].rentDeadline =
            block.timestamp +
            curRentDetails.rentAmountInHours;

        s.nftContract[selectedNftForRent].changeConsumer(msg.sender, tokenId);
        s.rentDetails[selectedNftForRent][tokenId].rentee = msg.sender;
        emit nftRented(
            selectedNftForRent,
            tokenId,
            msg.sender,
            block.timestamp + curRentDetails.rentAmountInHours
        );
    }

    /// @notice This function is for getting nft from rent AFTER time expired
    function getNftBackFromRent(
        Nfts selectedNftForRentWithdraw,
        uint256 tokenId
    ) external {
        require(
            s.rentDetails[selectedNftForRentWithdraw][tokenId].owner ==
                msg.sender,
            "You are not owner"
        );
        // add require for timestamp
        IERC721 selectedNftContract = s.nftContract[selectedNftForRentWithdraw];
        selectedNftContract.safeTransferFrom(s.nftStorage, msg.sender, tokenId);
        emit nftTakenBackFromRenterToOwner(
            selectedNftForRentWithdraw,
            tokenId,
            msg.sender
        );
    }
}
