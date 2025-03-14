/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../common";

export interface WhitelistUpgradableInterface extends utils.Interface {
  functions: {
    "addToWhitelist(uint8,address[])": FunctionFragment;
    "isAdmin(address)": FunctionFragment;
    "isWhitelisted(uint8,address,bytes32[])": FunctionFragment;
    "merkleTreeRoot(uint8)": FunctionFragment;
    "removeFromWhitelist(uint8,address[])": FunctionFragment;
    "setAdminPermissions(address,bool)": FunctionFragment;
    "updateMerkleTreeRoot(uint8,bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addToWhitelist"
      | "isAdmin"
      | "isWhitelisted"
      | "merkleTreeRoot"
      | "removeFromWhitelist"
      | "setAdminPermissions"
      | "updateMerkleTreeRoot"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addToWhitelist",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "isAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "isWhitelisted",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<BytesLike>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "merkleTreeRoot",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "removeFromWhitelist",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setAdminPermissions",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateMerkleTreeRoot",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "addToWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isWhitelisted",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "merkleTreeRoot",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "removeFromWhitelist",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAdminPermissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateMerkleTreeRoot",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface WhitelistUpgradable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: WhitelistUpgradableInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addToWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    isWhitelisted(
      stageId_: PromiseOrValue<BigNumberish>,
      account_: PromiseOrValue<string>,
      proof_: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    merkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    removeFromWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateMerkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      merkleTreeRoot_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addToWhitelist(
    stageId_: PromiseOrValue<BigNumberish>,
    accounts_: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  isAdmin(
    account_: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  isWhitelisted(
    stageId_: PromiseOrValue<BigNumberish>,
    account_: PromiseOrValue<string>,
    proof_: PromiseOrValue<BytesLike>[],
    overrides?: CallOverrides
  ): Promise<boolean>;

  merkleTreeRoot(
    stageId_: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  removeFromWhitelist(
    stageId_: PromiseOrValue<BigNumberish>,
    accounts_: PromiseOrValue<string>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setAdminPermissions(
    account_: PromiseOrValue<string>,
    enable_: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateMerkleTreeRoot(
    stageId_: PromiseOrValue<BigNumberish>,
    merkleTreeRoot_: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addToWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    isWhitelisted(
      stageId_: PromiseOrValue<BigNumberish>,
      account_: PromiseOrValue<string>,
      proof_: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<boolean>;

    merkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    removeFromWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    updateMerkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      merkleTreeRoot_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;
  };

  estimateGas: {
    addToWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isWhitelisted(
      stageId_: PromiseOrValue<BigNumberish>,
      account_: PromiseOrValue<string>,
      proof_: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    merkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    removeFromWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateMerkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      merkleTreeRoot_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addToWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isWhitelisted(
      stageId_: PromiseOrValue<BigNumberish>,
      account_: PromiseOrValue<string>,
      proof_: PromiseOrValue<BytesLike>[],
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    merkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    removeFromWhitelist(
      stageId_: PromiseOrValue<BigNumberish>,
      accounts_: PromiseOrValue<string>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateMerkleTreeRoot(
      stageId_: PromiseOrValue<BigNumberish>,
      merkleTreeRoot_: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
