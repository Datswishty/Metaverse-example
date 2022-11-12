// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "../libraries/LibAppStorage.sol";
import "../interfaces/Composable/IERC998ERC721TopDown.sol";
import "hardhat/console.sol";

/// @title Staking nft
contract StakingFacet {
    AppStorage internal s;

    event Staked(
        address indexed user,
        Nfts selectedNft,
        uint256 tokenId,
        uint256 stakeTime
    );
    event Unstaked(
        address indexed user,
        Nfts selectedNft,
        uint256 tokenId,
        uint256 unstakeTime
    );

    /// @param _selectedNft - type of nft to stake
    /// @param _tokenId - if of selected nft to stake
    function stake(Nfts _selectedNft, uint256 _tokenId) external {
        s.nftContract[_selectedNft].safeTransferFrom(
            msg.sender,
            s.nftStorage,
            _tokenId
        );
        s.stakers[msg.sender].tokenIdsByContract[_selectedNft].push(_tokenId);
        s.stakers[msg.sender].isOwned[_selectedNft][_tokenId] = true;

        emit Staked(msg.sender, _selectedNft, _tokenId, block.timestamp);
    }

    function unstake(Nfts _selectedNft, uint256 _tokenId) external {
        StakingInfo storage stakingInfo = s.stakers[msg.sender];
        require(
            stakingInfo.isOwned[_selectedNft][_tokenId] == true,
            "You are not the owner"
        );
        s.nftContract[_selectedNft].safeTransferFrom(
            s.nftStorage,
            msg.sender,
            _tokenId
        );
        s.stakers[msg.sender].isOwned[_selectedNft][_tokenId] = false;

        uint256 lastTokenIndex = stakingInfo
            .tokenIdsByContract[_selectedNft]
            .length - 1;
        uint256 lastTokenKey = stakingInfo.tokenIdsByContract[_selectedNft][
            lastTokenIndex
        ];
        uint256 tokenIdIndex = stakingInfo.tokenIndex[_selectedNft][_tokenId];

        s.stakers[msg.sender].tokenIdsByContract[_selectedNft][
            tokenIdIndex
        ] = lastTokenKey;
        s.stakers[msg.sender].tokenIndex[_selectedNft][
            lastTokenKey
        ] = tokenIdIndex;

        if (s.stakers[msg.sender].tokenIdsByContract[_selectedNft].length > 0) {
            s.stakers[msg.sender].tokenIdsByContract[_selectedNft].pop();

            delete s.stakers[msg.sender].tokenIndex[_selectedNft][_tokenId];
        }

        emit Unstaked(msg.sender, _selectedNft, _tokenId, block.timestamp);
    }

    function getStaked(address _address, Nfts _selectedNft)
        external
        view
        returns (uint256[] memory)
    {
        return s.stakers[_address].tokenIdsByContract[_selectedNft];
    }
}
