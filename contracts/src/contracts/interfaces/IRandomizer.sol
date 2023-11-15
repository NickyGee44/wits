//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface IRandomizer {
    function random(uint256, address) external returns (uint256);
}
