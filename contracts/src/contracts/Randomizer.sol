// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";

contract Randomizer is Initializable, OwnableUpgradeable {
    uint256 private seed;
    address public caller;

    function initialize(
        address _caller
    ) public initializer {
        __Ownable_init();
        caller = _caller;
        seed = uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty)));
    }

    function random(
        uint256 nonce,
        address sender
    ) public returns (uint256) {
        require(msg.sender == caller, "Randomizer: Only caller can call this function");
        uint256 randomNumber = uint256(keccak256(abi.encodePacked(seed, nonce, block.timestamp, sender, block.difficulty)));
        seed = randomNumber;
        uint256 modulus = seed % 100;
        if (modulus <= 50) {
            return 1;
        } else if (modulus <= 85) {
            return 2;
        } else {
            return 3;
        }
    }
}
