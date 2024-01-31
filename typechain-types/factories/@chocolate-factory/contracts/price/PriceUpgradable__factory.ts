/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  PriceUpgradable,
  PriceUpgradableInterface,
} from "../../../../@chocolate-factory/contracts/price/PriceUpgradable";

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
    inputs: [
      {
        internalType: "uint8",
        name: "stage_",
        type: "uint8",
      },
    ],
    name: "price",
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
        internalType: "uint8",
        name: "stage_",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "value_",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506102d3806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063240ff27f1461005157806324d7806c146100665780636a00670b146100a7578063b7fafcd7146100ba575b600080fd5b61006461005f3660046101e9565b6100eb565b005b610092610074366004610225565b6001600160a01b031660009081526001602052604090205460ff1690565b60405190151581526020015b60405180910390f35b6100646100b5366004610258565b610169565b6100dd6100c8366004610282565b60ff1660009081526033602052604090205490565b60405190815260200161009e565b3360009081526001602052604090205460ff1661013e5760405162461bcd60e51b815260206004820152600c60248201526b2737ba1030b71030b236b4b760a11b60448201526064015b60405180910390fd5b6001600160a01b03919091166000908152600160205260409020805460ff1916911515919091179055565b3360009081526001602052604090205460ff166101b75760405162461bcd60e51b815260206004820152600c60248201526b2737ba1030b71030b236b4b760a11b6044820152606401610135565b60ff909116600090815260336020526040902055565b80356001600160a01b03811681146101e457600080fd5b919050565b600080604083850312156101fc57600080fd5b610205836101cd565b91506020830135801515811461021a57600080fd5b809150509250929050565b60006020828403121561023757600080fd5b610240826101cd565b9392505050565b803560ff811681146101e457600080fd5b6000806040838503121561026b57600080fd5b61027483610247565b946020939093013593505050565b60006020828403121561029457600080fd5b6102408261024756fea26469706673582212205cc613691a0d0d805c6ed489700bdeaac384107a9a2d830f563b4426d483ec2664736f6c63430008110033";

type PriceUpgradableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PriceUpgradableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PriceUpgradable__factory extends ContractFactory {
  constructor(...args: PriceUpgradableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PriceUpgradable> {
    return super.deploy(overrides || {}) as Promise<PriceUpgradable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PriceUpgradable {
    return super.attach(address) as PriceUpgradable;
  }
  override connect(signer: Signer): PriceUpgradable__factory {
    return super.connect(signer) as PriceUpgradable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PriceUpgradableInterface {
    return new utils.Interface(_abi) as PriceUpgradableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PriceUpgradable {
    return new Contract(address, _abi, signerOrProvider) as PriceUpgradable;
  }
}
