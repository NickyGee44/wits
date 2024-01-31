/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import type { Provider } from "@ethersproject/providers";
import type {
  IRandomizer,
  IRandomizerInterface,
} from "../../../../../contracts/src/contracts/interfaces/IRandomizer";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "random",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class IRandomizer__factory {
  static readonly abi = _abi;
  static createInterface(): IRandomizerInterface {
    return new utils.Interface(_abi) as IRandomizerInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IRandomizer {
    return new Contract(address, _abi, signerOrProvider) as IRandomizer;
  }
}
