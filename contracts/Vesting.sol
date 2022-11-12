// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./interfaces/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title A contract for Vesting
/// @dev A contract for vesting with unlocking by months

contract Vesting is Ownable {
    using SafeERC20 for IERC20;
    using Counters for Counters.Counter;

    // <================================ Variable ================================>
    IERC20 public metaToken;
    uint256 public initialSupply = 300000000000000000000000000;
    uint256 public startDate = 0;
    uint256 public endDateInMonth = 120968178;
    Counters.Counter private currentVestingId;

    // <================================ Event ================================>
    event TokensUnlocked(address indexed buyer, uint256 indexed unlockedAmount);
    event NewBuyer(address indexed buyer, uint256 indexed valueToBuy);

    // <================================ Mapping ================================>
    mapping(address => uint256[]) public addressArray;
    mapping(uint256 => Share) public idStruct;

    // <================================ Struct ================================>
    struct Share {
        address beneficiar;
        uint256 lastWithdraw;
        uint256 value;
        uint256 durationInMonth;
        uint256 valueInMonths;
    }

    // <================================ Constructor ================================>
    /// @notice the constructor assigns an address token
    /// @dev the address of the token that will be unblocked and sent by the token buyer
    /// @param _metaToken token address
    constructor(IERC20 _metaToken) {
        require(
            address(_metaToken) != address(0),
            "token address must not be zero"
        );
        metaToken = _metaToken;
    }

    // <================================ FUNCTIONS ================================>

    /// @notice the initialization function assigns the global variable startDate the beginning of the westing and sends a token to this contract.
    /// @dev function for initialization when the fitting starts and sends a token to the contract, only the owner can call
    /// @notice the start time starts at 10 a.m. on the selected date
    function initialize() external onlyOwner {
        require(startDate == 0, "Function was called");
        startDate = (block.timestamp - (block.timestamp % 1 days)) + 10 hours;
        _transferTokensToContract(initialSupply);
    }

    /// @notice function for adding new holders and their number of tokens
    /// @dev addNewFolder function adds new users in the format of an array, an array of addresses and an array of value(only the owner can add)
    /// @param _beneficiar address beneficiar
    /// @param _startDate time when start vesting for _beneficiar
    /// @param _value the number of tokens
    /// @param _durationInMonth the number of months of vesting
    function addNewHolder(
        address _beneficiar,
        uint256 _startDate,
        uint256 _value,
        uint256 _durationInMonth
    ) external onlyOwner {
        uint256 id = currentVestingId.current();
        currentVestingId.increment();
        idStruct[id] = Share(
            _beneficiar,
            _startDate,
            _value,
            _durationInMonth,
            _value / _durationInMonth
        );
        addressArray[_beneficiar].push(id);

        emit NewBuyer(_beneficiar, _value);
    }

    /// @notice function for withdrawing coins by id
    /// @dev the function for withdraw coins by id their tokens must be called by the token holder at least once a month
    /// @param _vestingId id for withdraw token
    function withdrawal(uint256 _vestingId) external {
        require(
            idStruct[_vestingId].beneficiar == msg.sender,
            "account not exist"
        );
        require(
            block.timestamp >= idStruct[_vestingId].lastWithdraw + 2592000,
            "Time is not down"
        );
        require(idStruct[_vestingId].value != 0, "You don't have any tokens");
        uint256 totalMonth = _monthsSinceDate(
            idStruct[_vestingId].lastWithdraw
        );

        uint256 totalUnlocked = idStruct[_vestingId].valueInMonths * totalMonth;
        uint256 vestingEndDate = startDate + endDateInMonth;
        if (vestingEndDate < block.timestamp) {
            uint256 value = idStruct[_vestingId].value;
            idStruct[_vestingId].value = 0;
            idStruct[_vestingId].lastWithdraw = block.timestamp;
            initialSupply -= value;
            metaToken.safeTransfer(msg.sender, value);
            emit TokensUnlocked(msg.sender, value);
        } else if (idStruct[_vestingId].value >= totalUnlocked) {
            idStruct[_vestingId].value -= totalUnlocked;
            idStruct[_vestingId].lastWithdraw = block.timestamp;
            initialSupply -= totalUnlocked;
            metaToken.safeTransfer(msg.sender, totalUnlocked);
            emit TokensUnlocked(msg.sender, totalUnlocked);
        } else if (idStruct[_vestingId].value < totalUnlocked) {
            uint256 value = idStruct[_vestingId].value;
            idStruct[_vestingId].value -= value;
            idStruct[_vestingId].lastWithdraw = block.timestamp;
            initialSupply -= value;
            metaToken.safeTransfer(msg.sender, value);
            emit TokensUnlocked(msg.sender, value);
        }
    }

    /// @notice function for transferring a token to this contract
    /// @dev the function for transferring the token to this contract is called in the initialization function once
    /// @param _amount number of tokens to transfer
    function _transferTokensToContract(uint256 _amount) private {
        metaToken.feeLessTransfer(msg.sender, address(this), _amount);
    }

    /// @notice function for counting the number of m since date
    /// @dev the function counts the number of past months according to the formula: (current time is the last output) / month in seconds, according to unix time
    /// @param _timestamp  Time in a unix system
    function _monthsSinceDate(uint256 _timestamp)
        private
        view
        returns (uint256)
    {
        return (block.timestamp - _timestamp) / 2592000;
    }
}
