// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./ERC1155BaseUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

contract WitsPacketUpgradeable is 
    ERC1155BaseUpgradeable, 
    OwnableUpgradeable 
{
    using ECDSAUpgradeable for bytes32;
    uint256 public activeIndex;

    struct MintRequest {
        uint256 id;
        uint256 amount;
    }

    struct PresaleRequest {
        uint256 amount;
        address recipient;
    }

    struct BurnRequest {
        uint256 amount;
        address recipient;
        uint256 price;
        uint256 nonce;
    }

    address public designatedSigner;

    bytes32 private constant PRESALE_REQUEST_TYPE_HASH = keccak256(
        "PresaleRequest(uint256 amount,address recipient)"
    );
    bytes32 private constant BURN_REQUEST_TYPE_HASH = keccak256(
        "BurnRequest(uint256 amount,address recipient,uint256 price,uint256 nonce)"
    );
    mapping(uint256 => uint256) private _capacity;
    mapping(address => uint256) private _minted;
    mapping(uint8 => uint256) private _price;
    
    event ActiveIndexChanged(uint256 index);

    function initialize(
        string memory name_,
        string memory baseURI_,
        string memory contractURI_,
        address _operatorAllowlist,
        address _receiver,
        uint96 _feeNumerator,
        address _signer
    ) public initializer {
        __Ownable_init();
        __ERC1155BaseUpgradeable_init(owner(), name_, baseURI_, contractURI_, _operatorAllowlist, _receiver, _feeNumerator);        
        designatedSigner = _signer;

        _capacity[1] = 1000;
        _capacity[2] = 600;
        _capacity[3] = 500;
        _capacity[4] = 400;

        _price[1] = 0.001 ether;
        _price[2] = 0.002 ether;
        _price[3] = 0.003 ether;
        _price[4] = 0.004 ether;

        activeIndex = 1;
    }

    mapping(address => uint256) private _nonces;

    function nonceOf(address account) public view returns (uint256) {
        return _nonces[account];
    }

    function burnMint(
        BurnRequest calldata request,
        bytes calldata signature
    ) 
        external 
        payable 
        isLive(1) 
        verifyBurnRequest(request, signature)
    {
        _handleMint(msg.sender, request.amount, 1, request.price);
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

    function presaleMint(
        PresaleRequest calldata request,
        MintRequest[] calldata mintRequests,
        bytes calldata signature
    )   external 
        payable 
        isLive(1)
        verifyRequest(request, signature)
    {
        address receiver = request.recipient;
        (
            uint256 totalPrice, 
            uint256 totalMints,
            uint256[] memory ids, 
            uint256[] memory amounts
        ) = _tallyMintRequests(mintRequests);
        require( _minted[receiver] + totalMints <= request.amount, "Cannot mint more than assigned.");
        _minted[receiver] += totalMints;
        _handleMints(receiver, ids, amounts, totalPrice);
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

    function _handleMints(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts,
        uint256 totalCost
    ) internal {
        _mintBatch(account, ids, amounts, "");
        _handlePayment(totalCost);
    }

    function _internalMint(
        address account,
        uint256 amount,
        uint256 tokenId
    ) internal{
        _checkSupply(tokenId, amount);
        _mint(account, tokenId, amount, "");
    }

    function adminMint(
        address[] memory accounts,
        uint256[] memory amounts,
        uint256[] memory ids
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 length = accounts.length;
        require(length == amounts.length && length == ids.length, "Invalid length");
        for(uint256 i; i < length; i++) {
            _internalMint(accounts[i], amounts[i], ids[i]);
        }
    }

    function minted(address account) public view returns (uint256) {
        return _minted[account];
    }

    function price(uint8 stage_) public view returns (uint256) {
        return _price[stage_];
    }

    function _tallyMintRequests(
        MintRequest[] calldata mintRequests
    ) internal view returns (uint256, uint256, uint256[] memory, uint256[] memory) {
        uint256 totalPrice;
        uint256 totalMints;
        uint256 length = mintRequests.length;
        uint256[] memory ids = new uint256[](4);
        ids[0] = 1;
        ids[1] = 2;
        ids[2] = 3;
        ids[3] = 4;
        uint256[] memory amounts = new uint256[](4);
        amounts[0] = 0;
        amounts[1] = 0;
        amounts[2] = 0;
        amounts[3] = 0;
        for(uint256 i; i < length; i++) {
            MintRequest memory mintRequest = mintRequests[i];
            require(mintRequest.id < 5 && mintRequest.id > 0, "Invalid ID");
            amounts[mintRequest.id - 1] += mintRequest.amount;
            _checkSupply(mintRequest.id, mintRequest.amount);
            totalPrice += price(uint8(mintRequest.id)) * mintRequest.amount;
            totalMints += mintRequest.amount;
        }
        require(totalMints > 0, "Zero");

        return (totalPrice, totalMints, ids, amounts);
    }

    function _checkSupply(uint256 id, uint256 amount) internal view {
        require(totalSupply(id) + amount <= _capacity[id], "Exceeds Supply");
    }

    function _verify(bytes32 digest, bytes calldata signature)
        internal
        view
        returns (bool)
    {
        address recoveredSigner = digest.recover(signature);
        return designatedSigner == recoveredSigner;
    }

    modifier verifyBurnRequest(
        BurnRequest calldata request,
        bytes calldata signature
    ) {
        bytes32 structHash = hashTypedData(request);
        bytes32 digest = _hashTypedDataV4(structHash);
        require(nonceOf(request.recipient) == request.nonce, "Invalid nonce");
        require(_verify(digest, signature), "Invalid Signature");
        _;

        _nonces[request.recipient]++;
    }

    function hashTypedData(
        PresaleRequest calldata request
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    PRESALE_REQUEST_TYPE_HASH,
                    request.amount,
                    request.recipient
                )
            );
    }

    function hashTypedData(
        BurnRequest calldata request
    ) internal pure returns (bytes32) {
        return
            keccak256(
                abi.encode(
                    BURN_REQUEST_TYPE_HASH,
                    request.amount,
                    request.recipient,
                    request.price,
                    request.nonce
                )
            );
    }

    function _handlePayment(uint256 cost) internal {
        require(msg.value >= cost, "Price: invalid");
        uint256 difference = msg.value - cost;
        if(difference > 0) {
            payable(msg.sender).transfer(difference);
        }
    }

    modifier isLive(uint256 index) {
        require(activeIndex == index, "Not live");
        _;
    }

    function setActiveIndex(uint256 index) external onlyRole(DEFAULT_ADMIN_ROLE) {
        activeIndex = index;
        emit ActiveIndexChanged(index);
    }

    function withdraw(uint256 amount) external onlyRole(DEFAULT_ADMIN_ROLE) {
        AddressUpgradeable.sendValue(payable (msg.sender), amount);
    }

    function setSigner(address _signer) external onlyRole(DEFAULT_ADMIN_ROLE) {
        designatedSigner = _signer;
    }

    function setPrice(uint8 stage_, uint256 value_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        _price[stage_] = value_;
    }    

    function capacity(uint256 id) public view returns (uint256) {
        return _capacity[id];
    }
}

