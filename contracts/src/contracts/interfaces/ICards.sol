//SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

interface ICards {
    function mint(address, uint256) external;
    function totalSupply() external view returns (uint256);
}
