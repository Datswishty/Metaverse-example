// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../interfaces/Composable/IERC998ERC721TopDown.sol";
import "../interfaces/Composable/IERC998ERC721TopDownEnumerable.sol";
import "../interfaces/Composable/IERC998ERC721BottomUp.sol";

/// @title A contract for Scale Composable

contract ScaleComposable is
    IERC721,
    ERC165,
    IERC998ERC721TopDown,
    IERC998ERC721TopDownEnumerable
{
    address storageAddr;

    ///@notice  return this.rootOwnerOf.selector ^ this.rootOwnerOfChild.selector ^
    ///@notice  this.tokenOwnerOf.selector ^ this.ownerOfChild.selector;

    bytes32 constant ERC998_MAGIC_VALUE =
        0x00000000000000000000000000000000000000000000000000000000cd740db5;

    uint256 tokenCount = 0;

    ///@notice this mapping stores by the id of the token owner
    mapping(uint256 => address) internal tokenIdToTokenOwner;

    ///@notice root token owner address => (tokenId => approved address)
    mapping(address => mapping(uint256 => address))
        internal rootOwnerAndTokenIdToApprovedAddress;

    ///@notice mapping stores by owner address, token count
    mapping(address => uint256) internal tokenOwnerToTokenCount;

    ///@notice mapping in mapping stores by owner address, operator address and its value in bool
    mapping(address => mapping(address => bool)) internal tokenOwnerToOperators;

    //constructor(string _name, string _symbol) public ERC721Token(_name, _symbol) {}

    /// @notice function for wrapper on minting new 721
    /// @dev the function for the mint of a new token with a new id that is recorded on the contract
    /// @param _to the address where the mint token goes
    /// @return return new tokenCount in uint256.
    function mint(address _to) public returns (uint256) {
        tokenCount++;
        uint256 tokenCount_ = tokenCount;
        tokenIdToTokenOwner[tokenCount_] = _to;
        tokenOwnerToTokenCount[_to]++;
        return tokenCount_;
    }

    ///@notice this constant is from the library zepellin ERC721Receiver.sol, old version.
    bytes4 constant ERC721_RECEIVED_OLD = 0xf0b9e5ba;

    ///@notice this constant is from the library zepellin ERC721Receiver.sol, new version.
    bytes4 constant ERC721_RECEIVED_NEW = 0x150b7a02;

    function setStorageAddress(address _storageAddr) public {
        storageAddr = _storageAddr;
    }

    ////////////////////////////////////////////////////////
    // ERC721 implementation
    ////////////////////////////////////////////////////////

    function isContract(address _addr) internal view returns (bool) {
        uint256 size;
        assembly {
            size := extcodesize(_addr)
        }
        return size > 0;
    }

    function rootOwnerOf(uint256 _tokenId)
        public
        view
        override
        returns (bytes32 rootOwner)
    {
        return rootOwnerOfChild(address(0), _tokenId);
    }

    /// @notice Use Cases handled:
    /// @notice Case 1: Token owner is this contract and token.
    /// @notice Case 2: Token owner is other top-down composable
    /// @notice Case 3: Token owner is other contract
    /// @notice Case 4: Token owner is user
    /// @dev the function for returns the owner at the top of the tree of composables
    /// @param _childContract the address where the mint token goes
    /// @param _childTokenId the address where the mint token goes
    /// @return rootOwner returns the owner at the top of the tree of composables in bytes32.
    function rootOwnerOfChild(address _childContract, uint256 _childTokenId)
        public
        view
        override
        returns (bytes32 rootOwner)
    {
        address rootOwnerAddress;
        if (_childContract != address(0)) {
            (rootOwnerAddress, _childTokenId) = _ownerOfChild(
                _childContract,
                _childTokenId
            );
        } else {
            rootOwnerAddress = tokenIdToTokenOwner[_childTokenId];
        }
        // Case 1: Token owner is this contract and token.
        while (rootOwnerAddress == address(this)) {
            (rootOwnerAddress, _childTokenId) = _ownerOfChild(
                rootOwnerAddress,
                _childTokenId
            );
        }

        (bool callSuccess, bytes memory data) = rootOwnerAddress.staticcall(
            abi.encodeWithSelector(0xed81cdda, address(this), _childTokenId)
        );
        if (data.length != 0) {
            rootOwner = abi.decode(data, (bytes32));
        }

        if (callSuccess == true && rootOwner >> 224 == ERC998_MAGIC_VALUE) {
            // Case 2: Token owner is other top-down composable
            return rootOwner;
        } else {
            // Case 3: Token owner is other contract
            // Or
            // Case 4: Token owner is user
            return
                (ERC998_MAGIC_VALUE << 224) |
                bytes32(uint256(uint160(rootOwnerAddress)));
        }
    }

    /// @dev the function for returns the owner at the top of the tree of composables
    /// @param _tokenId added to the token id parameter
    /// @return tokenOwner returns the owner address
    function ownerOf(uint256 _tokenId)
        public
        view
        override
        returns (address tokenOwner)
    {
        tokenOwner = tokenIdToTokenOwner[_tokenId];
        require(tokenOwner != address(0));
        return tokenOwner;
    }

    function balanceOf(address _tokenOwner)
        external
        view
        override
        returns (uint256)
    {
        require(_tokenOwner != address(0));
        return tokenOwnerToTokenCount[_tokenOwner];
    }

    function approve(address _approved, uint256 _tokenId) external override {
        address rootOwner = address(uint160(uint256(rootOwnerOf(_tokenId))));
        require(
            rootOwner == msg.sender ||
                tokenOwnerToOperators[rootOwner][msg.sender]
        );
        rootOwnerAndTokenIdToApprovedAddress[rootOwner][_tokenId] = _approved;
        emit Approval(rootOwner, _approved, _tokenId);
    }

    function getApproved(uint256 _tokenId)
        public
        view
        override
        returns (address)
    {
        address rootOwner = address(uint160(uint256(rootOwnerOf(_tokenId))));
        return rootOwnerAndTokenIdToApprovedAddress[rootOwner][_tokenId];
    }

    function setApprovalForAll(address _operator, bool _approved)
        external
        override
    {
        require(_operator != address(0));
        tokenOwnerToOperators[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }

    function isApprovedForAll(address _owner, address _operator)
        external
        view
        override
        returns (bool)
    {
        require(_owner != address(0));
        require(_operator != address(0));
        return tokenOwnerToOperators[_owner][_operator];
    }

    function _transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) private {
        require(_from != address(0));
        require(tokenIdToTokenOwner[_tokenId] == _from);
        require(_to != address(0));

        if (msg.sender != _from) {
            (bool callSuccess, bytes memory data) = _from.staticcall(
                abi.encodeWithSelector(0xed81cdda, address(this), _tokenId)
            );
            bytes32 rootOwner = abi.decode(data, (bytes32));

            if (callSuccess == true) {
                require(
                    rootOwner >> 224 != ERC998_MAGIC_VALUE,
                    "Token is child of other top down composable"
                );
            }
            require(
                tokenOwnerToOperators[_from][msg.sender] ||
                    rootOwnerAndTokenIdToApprovedAddress[_from][_tokenId] ==
                    msg.sender
            );
        }

        // clear approval
        if (
            rootOwnerAndTokenIdToApprovedAddress[_from][_tokenId] != address(0)
        ) {
            delete rootOwnerAndTokenIdToApprovedAddress[_from][_tokenId];
            emit Approval(_from, address(0), _tokenId);
        }

        // remove and transfer token
        if (_from != _to) {
            assert(tokenOwnerToTokenCount[_from] > 0);
            tokenOwnerToTokenCount[_from]--;
            tokenIdToTokenOwner[_tokenId] = _to;
            tokenOwnerToTokenCount[_to]++;
        }
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external override {
        _transferFrom(_from, _to, _tokenId);
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId
    ) external override {
        _transferFrom(_from, _to, _tokenId);
        if (isContract(_to)) {
            bytes4 retval = IERC721Receiver(_to).onERC721Received(
                msg.sender,
                _from,
                _tokenId,
                ""
            );
            require(retval == ERC721_RECEIVED_OLD);
        }
    }

    function safeTransferFrom(
        address _from,
        address _to,
        uint256 _tokenId,
        bytes calldata _data
    ) external override {
        _transferFrom(_from, _to, _tokenId);
        if (isContract(_to)) {
            bytes4 retval = IERC721Receiver(_to).onERC721Received(
                msg.sender,
                _from,
                _tokenId,
                _data
            );
            require(
                retval == ERC721_RECEIVED_OLD || retval == ERC721_RECEIVED_NEW
            );
        }
    }

    ////////////////////////////////////////////////////////
    // ERC998ERC721 and ERC998ERC721Enumerable implementation
    ////////////////////////////////////////////////////////

    /// @notice mapping by token id returns an array of addresses
    mapping(uint256 => address[]) private childContracts;

    /// @notice mapping by token id returns mapping by address returns contract id+1
    mapping(uint256 => mapping(address => uint256)) private childContractIndex;

    /// @notice mapping by token id returns mapping by address returns array of child tokens
    mapping(uint256 => mapping(address => uint256[])) private childTokens;

    /// @notice mapping by token id returns mapping by address mapping by child token  returns child index+1
    mapping(uint256 => mapping(address => mapping(uint256 => uint256)))
        private childTokenIndex;

    /// @notice mapping by childaddress returns mapping which by child Id returns token Id
    mapping(address => mapping(uint256 => uint256)) internal childTokenOwner;

    function removeChild(
        uint256 _tokenId,
        address _childContract,
        uint256 _childTokenId
    ) private {
        uint256 tokenIndex = childTokenIndex[_tokenId][_childContract][
            _childTokenId
        ];
        require(tokenIndex != 0, "Child token not owned by token.");

        // remove child token
        uint256 lastTokenIndex = childTokens[_tokenId][_childContract].length -
            1;
        uint256 lastToken = childTokens[_tokenId][_childContract][
            lastTokenIndex
        ];
        if (_childTokenId == lastToken) {
            childTokens[_tokenId][_childContract][tokenIndex - 1] = lastToken;
            childTokenIndex[_tokenId][_childContract][lastToken] = tokenIndex;
        }
        uint256 totalTokens = childTokens[_tokenId][_childContract].length;
        if (totalTokens - 1 == 0) {
            delete childTokens[_tokenId][_childContract];
        } else {
            delete childTokens[_tokenId][_childContract][totalTokens - 1];
        }
        delete childTokenIndex[_tokenId][_childContract][_childTokenId];
        delete childTokenOwner[_childContract][_childTokenId];

        // remove contract
        if (lastTokenIndex == 0) {
            uint256 lastContractIndex = childContracts[_tokenId].length - 1;
            address lastContract = childContracts[_tokenId][lastContractIndex];
            if (_childContract != lastContract) {
                uint256 contractIndex = childContractIndex[_tokenId][
                    _childContract
                ];
                childContracts[_tokenId][contractIndex] = lastContract;
                childContractIndex[_tokenId][lastContract] = contractIndex;
            }
            delete childContracts[_tokenId];
            delete childContractIndex[_tokenId][_childContract];
        }
    }

    function safeTransferChild(
        uint256 _fromTokenId,
        address _to,
        address _childContract,
        uint256 _childTokenId
    ) external override {
        uint256 tokenId = childTokenOwner[_childContract][_childTokenId];
        require(
            tokenId > 0 ||
                childTokenIndex[tokenId][_childContract][_childTokenId] > 0
        );
        require(tokenId == _fromTokenId);
        require(_to != address(0));
        address rootOwner = address(uint160(uint256(rootOwnerOf(tokenId))));
        require(
            rootOwner == msg.sender ||
                tokenOwnerToOperators[rootOwner][msg.sender] ||
                rootOwnerAndTokenIdToApprovedAddress[rootOwner][tokenId] ==
                msg.sender
        );
        removeChild(tokenId, _childContract, _childTokenId);
        IERC721(_childContract).safeTransferFrom(
            address(storageAddr),
            _to,
            _childTokenId
        );
        emit TransferChild(tokenId, _to, _childContract, _childTokenId);
    }

    function safeTransferChild(
        uint256 _fromTokenId,
        address _to,
        address _childContract,
        uint256 _childTokenId,
        bytes calldata _data
    ) external override {
        uint256 tokenId = childTokenOwner[_childContract][_childTokenId];
        require(
            tokenId > 0 ||
                childTokenIndex[tokenId][_childContract][_childTokenId] > 0
        );
        require(tokenId == _fromTokenId);
        require(_to != address(0));
        address rootOwner = address(uint160(uint256(rootOwnerOf(tokenId))));
        require(
            rootOwner == msg.sender ||
                tokenOwnerToOperators[rootOwner][msg.sender] ||
                rootOwnerAndTokenIdToApprovedAddress[rootOwner][tokenId] ==
                msg.sender
        );
        removeChild(tokenId, _childContract, _childTokenId);
        IERC721(_childContract).safeTransferFrom(
            address(storageAddr),
            _to,
            _childTokenId,
            _data
        );
        emit TransferChild(tokenId, _to, _childContract, _childTokenId);
    }

    function transferChild(
        uint256 _fromTokenId,
        address _to,
        address _childContract,
        uint256 _childTokenId
    ) external override {
        uint256 tokenId = childTokenOwner[_childContract][_childTokenId];
        require(
            tokenId > 0 ||
                childTokenIndex[tokenId][_childContract][_childTokenId] > 0
        );
        require(tokenId == _fromTokenId);
        require(_to != address(0));
        address rootOwner = address(uint160(uint256(rootOwnerOf(tokenId))));
        require(
            rootOwner == msg.sender ||
                tokenOwnerToOperators[rootOwner][msg.sender] ||
                rootOwnerAndTokenIdToApprovedAddress[rootOwner][tokenId] ==
                msg.sender
        );
        removeChild(tokenId, _childContract, _childTokenId);
        ///@notice this is here to be compatible with cryptokitties and other old contracts that require being owner and approved
        ///@notice before transferring.
        ///@notice does not work with current standard which does not allow approving self, so we must let it fail in that case.
        ///@notice 0x095ea7b3 == "approve(address,uint256)"

        (bool success, bytes memory data) = _childContract.call(
            abi.encodeWithSelector(0x095ea7b3, this, _childTokenId)
        );
        require(
            success && (data.length == 0 || abi.decode(data, (bool))),
            "failed to approve"
        );

        IERC721(_childContract).transferFrom(address(this), _to, _childTokenId);
        emit TransferChild(tokenId, _to, _childContract, _childTokenId);
    }

    function transferChildToParent(
        uint256 _fromTokenId,
        address _toContract,
        uint256 _toTokenId,
        address _childContract,
        uint256 _childTokenId,
        bytes calldata _data
    ) external override {
        uint256 tokenId = childTokenOwner[_childContract][_childTokenId];
        require(
            tokenId > 0 ||
                childTokenIndex[tokenId][_childContract][_childTokenId] > 0
        );
        require(tokenId == _fromTokenId);
        require(_toContract != address(0));
        address rootOwner = address(uint160(uint256(rootOwnerOf(tokenId))));
        require(
            rootOwner == msg.sender ||
                tokenOwnerToOperators[rootOwner][msg.sender] ||
                rootOwnerAndTokenIdToApprovedAddress[rootOwner][tokenId] ==
                msg.sender
        );
        removeChild(_fromTokenId, _childContract, _childTokenId);
        IERC998ERC721BottomUp(_childContract).transferToParent(
            address(this),
            _toContract,
            _toTokenId,
            _childTokenId,
            _data
        );
        emit TransferChild(
            _fromTokenId,
            _toContract,
            _childContract,
            _childTokenId
        );
    }

    ///@notice  this contract has to be approved first in _childContract
    function getChild(
        address _from,
        uint256 _tokenId,
        address _childContract,
        uint256 _childTokenId
    ) external override {
        receiveChild(_from, _tokenId, _childContract, _childTokenId);
        require(
            _from == msg.sender ||
                IERC721(_childContract).isApprovedForAll(_from, msg.sender) ||
                IERC721(_childContract).getApproved(_childTokenId) == msg.sender
        );
    }

    function onERC721Received(
        address _from,
        uint256 _childTokenId,
        bytes calldata _data
    ) external returns (bytes4) {
        require(
            _data.length > 0,
            "_data must contain the uint256 tokenId to transfer the child token to."
        );
        // convert up to 32 bytes of_data to uint256, owner nft tokenId passed as uint in bytes
        uint256 tokenId;
        assembly {
            tokenId := calldataload(132)
        }
        if (_data.length < 32) {
            tokenId = tokenId >> (256 - _data.length * 8);
        }
        receiveChild(_from, tokenId, msg.sender, _childTokenId);
        require(
            IERC721(msg.sender).ownerOf(_childTokenId) != address(0),
            "Child token not owned."
        );
        return ERC721_RECEIVED_OLD;
    }

    function onERC721Received(
        address _operator,
        address _from,
        uint256 _childTokenId,
        bytes calldata _data
    ) external override returns (bytes4) {
        require(
            _data.length > 0,
            "_data must contain the uint256 tokenId to transfer the child token to."
        );
        // convert up to 32 bytes of_data to uint256, owner nft tokenId passed as uint in bytes
        uint256 tokenId;
        assembly {
            tokenId := calldataload(164)
        }
        if (_data.length < 32) {
            tokenId = tokenId >> (256 - _data.length * 8);
        }
        receiveChild(_from, tokenId, msg.sender, _childTokenId);
        require(
            IERC721(msg.sender).ownerOf(_childTokenId) != address(0),
            "Child token not owned."
        );
        return ERC721_RECEIVED_NEW;
    }

    function receiveChild(
        address _from,
        uint256 _tokenId,
        address _childContract,
        uint256 _childTokenId
    ) private {
        require(
            tokenIdToTokenOwner[_tokenId] != address(0),
            "_tokenId does not exist."
        );
        require(
            childTokenIndex[_tokenId][_childContract][_childTokenId] == 0,
            "Cannot receive child token because it has already been received."
        );
        uint256 childTokensLength = childTokens[_tokenId][_childContract]
            .length;
        if (childTokensLength == 0) {
            childContractIndex[_tokenId][_childContract] = childContracts[
                _tokenId
            ].length;
            childContracts[_tokenId].push(_childContract);
        }
        childTokens[_tokenId][_childContract].push(_childTokenId);
        childTokenIndex[_tokenId][_childContract][_childTokenId] =
            childTokensLength +
            1;
        childTokenOwner[_childContract][_childTokenId] = _tokenId;
        emit ReceivedChild(_from, _tokenId, _childContract, _childTokenId);
    }

    function _ownerOfChild(address _childContract, uint256 _childTokenId)
        internal
        view
        returns (address parentTokenOwner, uint256 parentTokenId)
    {
        parentTokenId = childTokenOwner[_childContract][_childTokenId];
        require(
            parentTokenId > 0 ||
                childTokenIndex[parentTokenId][_childContract][_childTokenId] >
                0
        );
        return (tokenIdToTokenOwner[parentTokenId], parentTokenId);
    }

    function ownerOfChild(address _childContract, uint256 _childTokenId)
        external
        view
        override
        returns (bytes32 parentTokenOwner, uint256 parentTokenId)
    {
        parentTokenId = childTokenOwner[_childContract][_childTokenId];
        require(
            parentTokenId > 0 ||
                childTokenIndex[parentTokenId][_childContract][_childTokenId] >
                0
        );
        return (
            (ERC998_MAGIC_VALUE << 224) |
                bytes32(uint256(uint160(tokenIdToTokenOwner[parentTokenId]))),
            parentTokenId
        );
    }

    function childExists(address _childContract, uint256 _childTokenId)
        external
        view
        returns (bool)
    {
        uint256 tokenId = childTokenOwner[_childContract][_childTokenId];
        return childTokenIndex[tokenId][_childContract][_childTokenId] != 0;
    }

    function totalChildContracts(uint256 _tokenId)
        external
        view
        override
        returns (uint256)
    {
        return childContracts[_tokenId].length;
    }

    function childContractByIndex(uint256 _tokenId, uint256 _index)
        external
        view
        override
        returns (address childContract)
    {
        require(
            _index < childContracts[_tokenId].length,
            "Contract address does not exist for this token and index."
        );
        return childContracts[_tokenId][_index];
    }

    function totalChildTokens(uint256 _tokenId, address _childContract)
        external
        view
        override
        returns (uint256)
    {
        return childTokens[_tokenId][_childContract].length;
    }

    function childTokenByIndex(
        uint256 _tokenId,
        address _childContract,
        uint256 _index
    ) external view override returns (uint256 childTokenId) {
        require(
            _index < childTokens[_tokenId][_childContract].length,
            "Token does not own a child token at contract address and index."
        );
        return childTokens[_tokenId][_childContract][_index];
    }
}
