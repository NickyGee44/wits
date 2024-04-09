//SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./AdminManagerUpgradable.sol";

abstract contract ReservedSupplyUpgradable is Initializable, AdminManagerUpgradable {
    mapping(uint256 => uint256) internal _reserved;

    function __ReservedSupply_init(uint256 maxSupply_) internal onlyInitializing {
        __AdminManager_init_unchained();
        __ReservedSupply_init_unchained(maxSupply_);
    }

    function __ReservedSupply_init_unchained(uint256 maxSupply_)
        internal
        onlyInitializing
    {
    }

    function setReservedSupply(uint256 id_, uint256 reserved_) public onlyAdmin {
        _reserved[id_] = reserved_;
    }

    function reservedSupply(uint256 id_) external view returns (uint256) {
        return _reserved[id_];
    }

    modifier onlyInReserved(uint256 id_, uint256 amount_) {
        uint256 reserved = _reserved[id_];
        require(reserved - amount_ >= 0, "Exceeds supply");
        _reserved[id_] -= amount_;
        _;
    }

    uint256[49] private __gap;
}