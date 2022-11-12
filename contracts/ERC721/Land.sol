// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../interfaces/IERC721Consumable.sol";
import "hardhat/console.sol";

contract Land is
    Initializable,
    ERC721EnumerableUpgradeable,
    PausableUpgradeable,
    OwnableUpgradeable,
    UUPSUpgradeable,
    IERC721Consumable
{
    using Strings for uint256;
    uint256 public maxPlanetLands;
    mapping(uint256 => uint256) private mintedOnPlanet;
    mapping(uint256 => string) private _tokenURIs;
    mapping(uint256 => address) private _tokenConsumers;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    event LandMinted(uint256 tokenId, uint256 planetId, address owner);

    function initialize() public initializer {
        __ERC721_init("CoolMetaverseName Land", "LAND");
        __ERC721Enumerable_init();
        __Pausable_init();
        __Ownable_init();
        __UUPSUpgradeable_init();
        maxPlanetLands = 10296;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mintLand(
        address to,
        uint256 tokenId,
        uint256 planetId,
        string memory customTokenUri
    ) external {
        require(
            mintedOnPlanet[planetId] <= maxPlanetLands,
            "Planet limit reached"
        );
        _safeMint(to, tokenId);
        mintedOnPlanet[planetId]++;
        _setTokenURI(tokenId, customTokenUri);
        emit LandMinted(tokenId, planetId, to);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}

    // The following functions are overrides required by Solidity.

    function setURI(uint256 id, string memory ipfsURI) public onlyOwner {
        _setTokenURI(id, ipfsURI);
    }

    function _setTokenURI(uint256 tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        // If there is a baseURI but no tokenURI, concatenate the tokenID to the baseURI.
        return string(abi.encodePacked(base, tokenId.toString()));
    }

    function _isApprovedOwnerOrConsumer(uint256 tokenId)
        internal
        view
        returns (bool)
    {
        return
            _isApprovedOrOwner(msg.sender, tokenId) ||
            _tokenConsumers[tokenId] == msg.sender;
    }

    /**
     * @dev See {IERC721Consumable-consumerOf}
     */
    function consumerOf(uint256 _tokenId) external view returns (address) {
        require(
            _exists(_tokenId),
            "ERC721Consumable: consumer query for nonexistent token"
        );
        return _tokenConsumers[_tokenId];
    }

    /**
     * @dev See {IERC721Consumable-changeConsumer}
     */
    function changeConsumer(address _consumer, uint256 _tokenId) external {
        address owner = this.ownerOf(_tokenId);
        require(
            msg.sender == owner ||
                msg.sender == getApproved(_tokenId) ||
                isApprovedForAll(owner, msg.sender),
            "ERC721Consumable: changeConsumer caller is not owner nor approved"
        );
        _changeConsumer(owner, _consumer, _tokenId);
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC721EnumerableUpgradeable)
        returns (bool)
    {
        return
            interfaceId == type(IERC721Consumable).interfaceId ||
            super.supportsInterface(interfaceId);
    }

    function _beforeTokenTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) internal virtual override(ERC721EnumerableUpgradeable) {
        super._beforeTokenTransfer(_from, _to, _tokenId);
        _changeConsumer(_from, address(0), _tokenId);
    }

    /**
     * @dev Changes the consumer
     * Requirement: `tokenId` must exist
     */
    function _changeConsumer(
        address _owner,
        address _consumer,
        uint256 _tokenId
    ) internal {
        _tokenConsumers[_tokenId] = _consumer;
        emit ConsumerChanged(_owner, _consumer, _tokenId);
    }
}