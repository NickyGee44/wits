// SPDX-License-Identifier: MIT
 pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";

contract Gbaby is ERC721EnumerableUpgradeable {
    function initialize() public initializer {
        __ERC721_init("test", "test");
    }

    function mint(address to, uint256 amount) external {
        for(uint256 i; i < amount; i++) {
            _safeMint(to, totalSupply() + 1);
        }        
    }

    function mintSpecific(address to, uint256[] calldata amounts) external {
        for(uint256 i; i < amounts.length; i++) {
            _safeMint(to, amounts[i]);
        }        
    }

    function burn(uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _burn(tokenId);
    }
}
