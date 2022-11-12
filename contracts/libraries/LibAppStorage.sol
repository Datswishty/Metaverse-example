// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../interfaces/IERC721.sol";
import "../interfaces/IERC20.sol";
import "../interfaces/Composable/IERC998ERC721TopDown.sol";
import {LibDiamond} from "./LibDiamond.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interfaces/SafeERC20.sol";

enum Nfts {
    land,
    scale,
    planet,
    building
}
enum ItemState {
    Sold,
    Locked,
    OnSale,
    Withdrawn
}
enum AuctionType {
    TimeBased,
    PriceBased
}
struct MarketplaceData {
    mapping(uint256 => MarketItem) listingIdToItem;
    Counters.Counter nextListingId;
    Counters.Counter totalItemsSold;
}

struct MarketItem {
    uint256 listingId;
    uint256 tokenId;
    Nfts nftContract;
    address seller;
    uint256 price;
    IERC20 sellingToken;
    ItemState listingState;
}
struct StakingInfo {
    mapping(Nfts => uint256[]) tokenIdsByContract;
    mapping(Nfts => mapping(uint256 => bool)) isOwned;
    mapping(Nfts => mapping(uint256 => uint256)) tokenIndex;
}
struct auctionDetails {
    address seller;
    uint256 startPrice;
    uint256 endPrice;
    IERC20 payingToken;
    AuctionType auctionType;
    Nfts auctionToken;
    uint256 tokenId;
    uint256 deadline;
}

struct rentDetails {
    bool isAllowedForRenting;
    address owner;
    IERC20 payingToken;
    uint256 rentDeadline;
    uint256 rentAmountInHours;
    address rentee;
    uint256 rentPrice;
}

struct AppStorage {
    /// @notice Common starts
    address nftStorage;
    address treasury;
    IERC998ERC721TopDown scaleComposable;
    mapping(Nfts => IERC721) nftContract;
    /// @notice Staking starts

    mapping(address => StakingInfo) stakers;
    /// @notice InteractionFacet starts

    /// @dev scaleId => composableId
    mapping(uint256 => uint256) scaleToComposable;
    mapping(uint256 => uint256) scaleToScaleType;
    /// @dev composableId => attached land id's
    mapping(uint256 => uint256[]) scaleComposableToChilds;
    mapping(uint256 => bool) allowedScaleTypes;
    mapping(Nfts => mapping(uint256 => rentDetails)) rentDetails;
    /// @notice MarketplaceFacet starts

    MarketplaceData marketplaceData;
    ItemState itemState;
    mapping(address => bool) allowedTokens;
    uint256 marketplaceFeePercentage;
    /// @notice AunctionFacet starts  here
    Counters.Counter nextAuctionId;
    mapping(uint256 => mapping(address => uint256)) bids;
    mapping(uint256 => auctionDetails) auctionIdToDetails;
}

contract Modifiers {
    using SafeERC20 for IERC20;
    AppStorage internal s;
    modifier onlyOwner() {
        LibDiamond.enforceIsContractOwner();
        _;
    }
    modifier onlyTokenOwner(IERC721 nftContract, uint256 tokenId) {
        require(
            msg.sender == nftContract.ownerOf(tokenId),
            "You are not the owner"
        );
        _;
    }
    modifier onlyAllowedToken(IERC20 sellingToken) {
        require(s.allowedTokens[address(sellingToken)], "Token is not allowed");
        _;
    }
    modifier onlySeller(address user, uint256 listingId) {
        require(
            s.marketplaceData.listingIdToItem[listingId].seller == user,
            "You are not the seller"
        );
        _;
    }
}
