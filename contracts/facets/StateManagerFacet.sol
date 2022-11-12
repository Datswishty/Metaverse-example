// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../interfaces/IERC721.sol";
import "../interfaces/Composable/IERC998ERC721TopDown.sol";
import {AppStorage, Nfts, Modifiers} from "../libraries/LibAppStorage.sol";

contract StateManagerFacet is Modifiers {
    function setNftAddresses(
        IERC721 land,
        IERC721 scale,
        IERC721 planet,
        IERC721 building
    ) external onlyOwner {
        s.nftContract[Nfts.land] = land;
        s.nftContract[Nfts.scale] = scale;
        s.nftContract[Nfts.planet] = planet;
        s.nftContract[Nfts.building] = building;
    }

    function setNftStorage(address nftStorage) external onlyOwner {
        s.nftStorage = nftStorage;
    }

    function setLandAddress(IERC721 land) external onlyOwner {
        s.nftContract[Nfts.land] = land;
    }

    function setScaleAddress(IERC721 scale) external onlyOwner {
        s.nftContract[Nfts.scale] = scale;
    }

    function setPlanetAddress(IERC721 planet) external onlyOwner {
        s.nftContract[Nfts.planet] = planet;
    }

    function setBuildingAddress(IERC721 building) external onlyOwner {
        s.nftContract[Nfts.building] = building;
    }

    function setScaleComposableAddress(IERC998ERC721TopDown scaleComposable)
        external
        onlyOwner
    {
        s.scaleComposable = scaleComposable;
    }

    function setMarketplaceFee(uint256 marketplaceFeePercentage)
        external
        onlyOwner
    {
        s.marketplaceFeePercentage = marketplaceFeePercentage;
    }

    function changeTokenStatusOnMarketplace(
        address tokenAddress,
        bool newStatus
    ) external onlyOwner {
        s.allowedTokens[tokenAddress] = newStatus;
    }

    function setTreasuryAddress(address newTreasuryAddress) external onlyOwner {
        s.treasury = newTreasuryAddress;
    }

    function setAllowedScaleTypes(uint256[] memory _types) external onlyOwner {
        for (uint256 i = 0; i < _types.length; i++) {
            s.allowedScaleTypes[_types[i]] = true;
        }
    }
}
