// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "./interfaces/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/SafeERC20.sol";

/// @notice This is the treasury with all compissions
contract Treasury is Ownable {
    using SafeERC20 for IERC20;
    
    function withdrawToken(
        IERC20 withdrawableToken,
        uint256 withdrawAmount,
        address receiver,
        bool isMera
    ) external onlyOwner {
        if (isMera) {
            withdrawableToken.feeLessTransfer(
                address(this),
                receiver,
                withdrawAmount
            );
        }
        withdrawableToken.safeTransferFrom(
            address(this),
            receiver,
            withdrawAmount
        );
    }
}
