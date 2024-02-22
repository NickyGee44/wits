// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "erc721a-upgradeable/contracts/extensions/IERC721ABurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";
import "operator-filter-registry/src/upgradeable/DefaultOperatorFiltererUpgradeable.sol";
import "./chocolate-factory/ReservedSupplyUpgradeable.sol";
import "./chocolate-factory/AdminManagerUpgradable.sol";
import "./chocolate-factory/UriManagerUpgradable.sol";
import "./chocolate-factory/PriceUpgradable.sol";
import "./chocolate-factory/RoyaltiesUpgradable.sol";
import "./chocolate-factory/BalanceLimitUpgradable.sol";
import "./chocolate-factory/SignerUpgradeable.sol";
import "./interfaces/ICards.sol";
import "./interfaces/IRandomizer.sol";

contract Packets is 
    Initializable, 
    ERC1155Upgradeable, 
    OwnableUpgradeable,     
    AdminManagerUpgradable,
    UriManagerUpgradable,
    PriceUpgradable,
    DefaultOperatorFiltererUpgradeable,
    RoyaltiesUpgradable,
    BalanceLimitUpgradable,
    SignerUpgradeable
{
    uint256 public activeIndex;
    mapping(uint256 => uint256) public idToCards;
    mapping(uint256 => uint256) private _totalSupply;
    
    event PacketOpened(address indexed account, uint256 cardId, uint256 startingId, uint256 total, uint256 timestamp);
    event QuillsBurned(address indexed account, uint256 amount, uint256 timestamp);
    event GbabiesBurned(address indexed account, uint256 amount, uint256 timestamp);

    function initialize(
        string memory prefix_,
        string memory suffix_,
        address recipient, 
        uint256 amount,
        string memory name, 
        string memory version, 
        address _signer
    ) public initializer {
        __AdminManager_init_unchained();
        __UriManager_init_unchained(prefix_,suffix_);
        __ERC1155_init_unchained("");
        __Price_init_unchained();
        __DefaultOperatorFilterer_init();
        __Royalties_init_unchained(recipient, amount);
        __Signer_init_unchained(name, version, _signer);
        
        _isOG[3] = true;
        _isOG[14] = true;
        _isOG[19] = true;
        _isOG[23] = true;
        _isOG[24] = true;
        _isOG[25] = true;
        _isOG[27] = true;
        _isOG[29] = true;
        _isOG[39] = true;
        _isOG[51] = true;
        _isOG[61] = true;
        _isOG[66] = true;
        _isOG[69] = true;
        _isOG[73] = true;
        _isOG[80] = true;
        _isOG[90] = true;
        _isOG[96] = true;
        _isOG[129] = true;
        _isOG[130] = true;
        _isOG[138] = true;
        _isOG[140] = true;
        _isOG[168] = true;
        _isOG[169] = true;
        _isOG[171] = true;
        _isOG[176] = true;
        _isOG[191] = true;
        _isOG[193] = true;
        _isOG[194] = true;
        _isOG[201] = true;
        _isOG[210] = true;
        _isOG[216] = true;
        _isOG[258] = true;
        _isOG[262] = true;
        _isOG[273] = true;
        _isOG[299] = true;
        _isOG[301] = true;
        _isOG[303] = true;
        _isOG[309] = true;
        _isOG[311] = true;
        _isOG[323] = true;
        _isOG[327] = true;
        _isOG[336] = true;
        _isOG[342] = true;
        _isOG[344] = true;
        _isOG[345] = true;
        _isOG[353] = true;
        _isOG[355] = true;
        _isOG[361] = true;
        _isOG[382] = true;
        _isOG[394] = true;

        idToCards[1] = 5;
        idToCards[2] = 25;
        idToCards[3] = 100;
        idToCards[4] = 40;

        _totalSupply[1] = 5225;
        _totalSupply[2] = 1355;
        _totalSupply[3] = 400;
        _totalSupply[4] = 300;

        setPrice(1, 0.002 ether);
        discountPrice = 0.0018 ether;
        setPrice(2, 0.008 ether);
        setPrice(3, 0.0225 ether);
        setPrice(4, 0.0125 ether);        
    }

    IERC721ABurnableUpgradeable public gbabiesContract;
    IERC721ABurnableUpgradeable public quillContract;
    ICards public cardsContract;

    struct MintRequest {
        uint256 id;
        uint256 amount;
    }

    struct PresaleRequest {
        uint256 amount;
        address recipient;
    }

    mapping(address => uint256) private _minted;
    mapping(uint256 => bool) private _isOG;

    bytes32 private constant PRESALE_REQUEST_TYPE_HASH =
        keccak256(
            "PresaleRequest(uint256 amount,address recipient)"
        );

    function hashTypedData(
        PresaleRequest calldata request
    ) internal view returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    PRESALE_REQUEST_TYPE_HASH,
                    request.amount,
                    msg.sender
                )
            );
    }


    modifier verifyRequest(
        PresaleRequest calldata request,
        bytes calldata signature
    ) {
        bytes32 structHash = hashTypedData(request);
        bytes32 digest = _hashTypedDataV4(structHash);
        require(_verify(digest, signature), "Invalid Signature");
        _;
    }

    modifier isLive(uint256 index) {
        require(activeIndex == index, "Not live");
        _;
    }
    
    function setContracts(
        IERC721ABurnableUpgradeable gbabies,
        IERC721ABurnableUpgradeable quills,
        ICards cards
    ) external onlyAdmin {
        gbabiesContract = gbabies;
        quillContract = quills;
        cardsContract = cards;
    }

    function setActiveIndex(uint256 index) external onlyAdmin {
        activeIndex = index;
    }

    function burnMint(
        uint256[] calldata gbabies,
        uint256[] calldata quills
    )   external 
        payable
        isLive(1)
    {
        (uint256 gbabyTotal,) = _calculateGBabies(gbabies);
        (uint256 quillTotal, uint256 quillPrice) = _calculateQuills(quills);
        uint256 totalMints = gbabyTotal + quillTotal;
        _handleMint(msg.sender, totalMints, 1, quillPrice);
    }
    
    function presaleMint(
        PresaleRequest calldata request,
        MintRequest[] calldata mintRequests,
        bytes calldata signature
    )   external 
        payable 
        verifyRequest(request, signature) 
        isLive(1)
    {
        (
            uint256 totalPrice, 
            uint256 totalMints,
            uint256[] memory ids, 
            uint256[] memory amounts
        ) = _tallyMintRequests(mintRequests);
        require( _minted[msg.sender] + totalMints <= request.amount, "Cannot mint more than assigned.");

        _minted[msg.sender] += totalMints;
        _handleMints(msg.sender, ids, amounts, totalPrice);
    }

    function publicMint(
        MintRequest[] calldata mintRequests
    )   external 
        payable 
        isLive(2)
    {
        (
            uint256 totalPrice, 
            ,
            uint256[] memory ids, 
            uint256[] memory amounts
        ) = _tallyMintRequests(mintRequests);

        _handleMints(msg.sender, ids, amounts, totalPrice);
    }

    function _tallyMintRequests(
        MintRequest[] calldata mintRequests
    ) internal returns (uint256, uint256, uint256[] memory, uint256[] memory) {
        uint256 totalPrice;
        uint256 totalMints;
        uint256 length = mintRequests.length;

        uint256[] memory ids = new uint256[](length);
        uint256[] memory amounts = new uint256[](length);

        for(uint256 i; i < length; i++) {
            MintRequest memory mintRequest = mintRequests[i];
            uint256 id = mintRequest.id;
            require(id < 5 && id > 0, "Invalid ID");            
            uint256 amount = mintRequest.amount;
            _checkSupply(id, amount);
            uint256 priceValue = price(uint8(id));
            totalPrice += priceValue * amount;
            totalMints += amount;
            ids[i] = id;
            amounts[i] = amount;
        }
        require(totalMints > 0, "Zero");

        return (totalPrice, totalMints, ids, amounts);
    }

    function _checkSupply(uint256 id, uint256 amount) internal {
        require(_totalSupply[id] - amount >= 0, "Exceeds Supply");
        _totalSupply[id] -= amount;
    }

    function _calculateGBabies(
        uint256[] calldata ids
    ) internal returns (uint256, uint256) {
        uint256 length = ids.length;
        if(length == 0) return (0, 0);
        uint256 total;
        for(uint256 i; i < length; i++) {
            uint256 id = ids[i];
            require(gbabiesContract.ownerOf(id) == msg.sender, "Not Owner");
            if(_isOG[id]) {
                total += 2;
            } else {
                total++;
            }
            gbabiesContract.burn(id);
        }
        emit GbabiesBurned(msg.sender, total, block.timestamp);
        return (total, 0);
    }

    uint256 public discountPrice;

    function setDiscountPrice(uint256 _discountPrice) external onlyAdmin {
        discountPrice = _discountPrice;
    }

    function _calculateQuills(
        uint256[] memory ids
    ) internal returns (uint256, uint256) {
        uint256 length = ids.length;
        if(length == 0) return (0, 0);
        require(length % 2 == 0, "Must be divisble by 2");
        for(uint256 i; i < length; i++) {
            uint256 id = ids[i];
            require(quillContract.ownerOf(id) == msg.sender, "Invalid Owner");
            quillContract.transferFrom(msg.sender, deadAddress, id);
        }
        emit QuillsBurned(msg.sender, length, block.timestamp);
        uint256 amount = length / 2;
        return (amount, amount * discountPrice);
    }

    function setDeadAddress(address _deadAddress) external onlyAdmin {
        deadAddress = _deadAddress;
    }

    function adminMint(
        address[] calldata accounts_,
        uint256[] calldata amounts_,
        uint256 tokenId
    ) external onlyAdmin {
        uint256 accountsLength = accounts_.length;
        require(accountsLength == amounts_.length, "Admin mint: bad request");
        for (uint256 i; i < accountsLength; i++) {
            _internalMint(accounts_[i], amounts_[i], tokenId);
        }
    }

    function setSigner(address _signer) public onlyAdmin {
        signer = _signer;
    }

    function _internalMint(
        address account,
        uint256 amount,
        uint256 tokenId
    ) internal{
        _checkSupply(tokenId, amount);
        _mint(account, tokenId, amount, "");
    }

    function _handleMint(
        address account,
        uint256 amount,
        uint256 tokenId,
        uint256 totalCost
    ) internal {
        _internalMint(account, amount, tokenId);
        _handlePayment(totalCost);
    }


    function _handleMints(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts,
        uint256 totalCost
    ) internal {
        _mintBatch(account, ids, amounts, "");
        _handlePayment(totalCost);
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        return _buildUri(tokenId);
    }

    function withdraw(uint256 amount) external onlyAdmin {
        AddressUpgradeable.sendValue(payable (msg.sender), amount);
    }

    function setApprovalForAll(address operator, bool approved) public override onlyAllowedOperatorApproval(operator) {
        super.setApprovalForAll(operator, approved);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, uint256 amount, bytes memory data)
        public
        override
        onlyAllowedOperator(from)
    {
        super.safeTransferFrom(from, to, tokenId, amount, data);
    }

    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public virtual override onlyAllowedOperator(from) {
        super.safeBatchTransferFrom(from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override (ERC1155Upgradeable, RoyaltiesUpgradable)
        returns (bool)
    {
        return ERC1155Upgradeable.supportsInterface(interfaceId) || RoyaltiesUpgradable.supportsInterface(interfaceId) || super.supportsInterface(interfaceId);
    }

    function open(
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) external {
        require(tx.origin == msg.sender, "No calls from contracts");        
        _burnBatch(
            msg.sender,
            ids,
            amounts
        );
        _handlePackets(ids, amounts);        
    }

    function getTotal(uint256[] calldata numbers) public pure returns (uint256) {
        uint256 total;

        for(uint256 t; t < numbers.length; t++) {
            total += numbers[t];
        }

        return total;
    }

    function minted(address to) public view returns (uint256) {
        return _minted[to];
    }

    function totalSupply(uint256 id) public view returns (uint256) {
        return _totalSupply[id];
    }

    function setTotalSupply(
        uint256[] memory ids,
        uint256[] memory values
    ) external onlyAdmin {
        for(uint256 i; i < ids.length; i++) {
            _totalSupply[ids[i]] = values[i];
        }
    }

    IRandomizer public randomizer;

    function setRandomizer(IRandomizer _randomizer) external onlyAdmin {
        randomizer = _randomizer;
    }

    function _handlePackets(
        uint256[] calldata ids,
        uint256[] calldata amounts
    ) internal {
        uint256 length = ids.length;
        uint256 original = cardsContract.totalSupply();
        uint256 total = original + 1;
        for(uint256 i; i < length; i++) {
            uint256 id = ids[i];
            uint256 amount = amounts[i];
            if(amount == 0) continue;
            if(id == 4) {
                for(uint256 j; j < amount; j++) {
                    uint256 cardId = randomizer.random(total, msg.sender);
                    require(cardId > 0, "Error: Out of stock");
                    uint256 cards =  idToCards[cardId];
                    emit PacketOpened(msg.sender, cardId, total, cards, block.timestamp);
                    total += cards;
                }
            } else {    
                uint256 cards =  idToCards[id];
                for(uint256 j; j < amount; j++) {                    
                    emit PacketOpened(msg.sender, id,  total, cards, block.timestamp);
                    total += cards;
                }                           
            }
        }
        uint256 mintQuantity = total - original - 1;
        require(mintQuantity > 0, "Minting Zero");
        cardsContract.mint(msg.sender, mintQuantity);
    }

    address public deadAddress;

    /// @notice merkle root to validate proofs and claim
    bytes32 public merkleRoot;

    /// @notice store the URI where list of addresses and their claim token can be found for provenance
    string public rawDataUri;

    /// @notice reverted when a proof is invalid
    error InvalidProof();

    /// @notice emitted when claim is done
    event PacketClaimed(address receiver, uint256 tokenId, uint256 amount);

    /// @notice set parameters for claiming of tokens
    /// @dev should be called after initialize
    ///      leaf = keccak256(abi.encode(address, tokenId, amount))
    /// @param _merkleRoot merkle root
    /// @param _rawDataUri URI where the raw data from which the merkle root is generated
    function setClaimingParameters(bytes32 _merkleRoot, string calldata _rawDataUri) external onlyAdmin {
        merkleRoot = _merkleRoot;
        rawDataUri = _rawDataUri;
    }

    /// @notice claim packets
    /// @dev claim based on merkle root generated from snapshot take on ETH mainnet packets
    ///      Address: eth:0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d
    /// @param receiver receiver address
    /// @param mintRequests array of mint requests
    /// @param proofs merkle tree proofs to validate request
    function claimPacket(address receiver, MintRequest[] calldata mintRequests, bytes32[][] calldata proofs) external isLive(3) {
            // tally mint request
            (
                , 
                ,
                uint256[] memory ids, 
                uint256[] memory amounts
            ) = _tallyMintRequests(mintRequests);
            
             for(uint256 i; i<mintRequests.length; i++) {
                // generate leaf
                bytes32 leaf = _generateLeaf(receiver, mintRequests[i]);

                // validate proofs
                if (!MerkleProof.verifyCalldata(proofs[i], merkleRoot,leaf)) {
                    revert InvalidProof();
                }
             }

             // mint packet
             _handleMints(receiver, ids, amounts, 0);

             // emit event
             for(uint256 i; i<ids.length; i++) {
                emit PacketClaimed(receiver, ids[i], amounts[i]);
             }
    }

    /// @notice generate leaf hash
    /// @param account receiver of the tokens
    /// @param mintRequest Mint Request
    /// @return leaf hashed leaf
    function _generateLeaf(address account, MintRequest memory mintRequest) internal pure returns(bytes32) {
        return keccak256(abi.encode(account, mintRequest.id, mintRequest.amount));
    }
}