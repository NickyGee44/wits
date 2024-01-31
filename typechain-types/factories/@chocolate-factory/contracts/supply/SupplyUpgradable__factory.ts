/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  SupplyUpgradable,
  SupplyUpgradableInterface,
} from "../../../../@chocolate-factory/contracts/supply/SupplyUpgradable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
    ],
    name: "isAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "maxSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account_",
        type: "address",
      },
      {
        internalType: "bool",
        name: "enable_",
        type: "bool",
      },
    ],
    name: "setAdminPermissions",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxSupply_",
        type: "uint256",
      },
    ],
    name: "setMaxSupply",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class SupplyUpgradable__factory {
  static readonly abi = _abi;
  static createInterface(): SupplyUpgradableInterface {
    return new utils.Interface(_abi) as SupplyUpgradableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SupplyUpgradable {
    return new Contract(address, _abi, signerOrProvider) as SupplyUpgradable;
  }
}
