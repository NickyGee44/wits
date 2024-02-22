// // SPDX-License-Identifier: MIT
//  pragma solidity ^0.8.17;
// import "@chocolate-factory/contracts/token/ERC721/presets/Base.sol";

// contract Cards is Base {
//     address public packets;

//     function initialize(
//         Args memory args, 
//         address _packets
//     ) public initializer {
//         __Base_init(args);   
//         packets = _packets;
//     }

//     function mint(address account_, uint256 amount_) external {
//         require(msg.sender == packets, "Unauthorized");
//         _safeMint(account_, amount_);
//     }

//     function _startTokenId()  internal pure override(ERC721AUpgradeable) returns (uint256) {
//         return 1;
//     }

//     function setPackets(address _packets) external onlyAdmin {
//         packets = _packets;
//     }
// }
