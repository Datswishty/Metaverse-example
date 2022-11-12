// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// @notice This is a regular erc20 token with comission on the transfer
contract MetareaToken is ERC20, Ownable {
    address public treasury;
    uint256 public transferFeePercentage;
    mapping(address => bool) public feelessAddresses;

    constructor(address newTreasury, uint256 newTransferFeePercentage)
        ERC20("CoolMetaverseName Token", "CoolMetaverseNameToken")
    {
        treasury = newTreasury;
        transferFeePercentage = newTransferFeePercentage;
    }

    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }

    function getReceivedAmount(uint256 value)
        internal
        view
        returns (uint256 transferAmount, uint256 feeAmount)
    {
        feeAmount = (value * transferFeePercentage) / 100;
        transferAmount = value - feeAmount;
    }

    function _transfer(
        address from,
        address to,
        uint256 value
    ) internal override {
        (uint256 transferAmount, uint256 feeAmount) = getReceivedAmount(value);
        super._transfer(from, treasury, feeAmount);
        super._transfer(from, to, transferAmount);
    }

    function feeLessTransfer(
        address from,
        address to,
        uint256 value
    ) external {
        require(
            feelessAddresses[msg.sender] == true,
            "You can't call this function"
        );
        super._transfer(from, to, value);
    }

    function changeAddressStatus(address _address, bool _newStatus)
        external
        onlyOwner
    {
        feelessAddresses[_address] = _newStatus;
    }

    function changeFeePercentage(uint256 _newFeePercentage) external onlyOwner {
        transferFeePercentage = _newFeePercentage;
    }

    function changeTreasuryAddress(address _newTreasuryAddress)
        external
        onlyOwner
    {
        treasury = _newTreasuryAddress;
    }
}
