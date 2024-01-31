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

export interface RoyaltiesUpgradableInterface extends utils.Interface {
  functions: {
    "isAdmin(address)": FunctionFragment;
    "royaltyInfo(uint256,uint256)": FunctionFragment;
    "setAdminPermissions(address,bool)": FunctionFragment;
    "setRoyalties(address,uint256)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "isAdmin"
      | "royaltyInfo"
      | "setAdminPermissions"
      | "setRoyalties"
      | "supportsInterface"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "isAdmin",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "royaltyInfo",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setAdminPermissions",
    values: [PromiseOrValue<string>, PromiseOrValue<boolean>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRoyalties",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(functionFragment: "isAdmin", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "royaltyInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setAdminPermissions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRoyalties",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;

  events: {
    "Initialized(uint8)": EventFragment;
    "RoyaltiesSet(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Initialized"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoyaltiesSet"): EventFragment;
}

export interface InitializedEventObject {
  version: number;
}
export type InitializedEvent = TypedEvent<[number], InitializedEventObject>;

export type InitializedEventFilter = TypedEventFilter<InitializedEvent>;

export interface RoyaltiesSetEventObject {
  recipient: string;
  amount: BigNumber;
}
export type RoyaltiesSetEvent = TypedEvent<
  [string, BigNumber],
  RoyaltiesSetEventObject
>;

export type RoyaltiesSetEventFilter = TypedEventFilter<RoyaltiesSetEvent>;

export interface RoyaltiesUpgradable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: RoyaltiesUpgradableInterface;

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
    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    royaltyInfo(
      arg0: PromiseOrValue<BigNumberish>,
      value_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
    >;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setRoyalties(
      recipient_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  isAdmin(
    account_: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  royaltyInfo(
    arg0: PromiseOrValue<BigNumberish>,
    value_: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
  >;

  setAdminPermissions(
    account_: PromiseOrValue<string>,
    enable_: PromiseOrValue<boolean>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setRoyalties(
    recipient_: PromiseOrValue<string>,
    amount_: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId_: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    royaltyInfo(
      arg0: PromiseOrValue<BigNumberish>,
      value_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { receiver: string; royaltyAmount: BigNumber }
    >;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: CallOverrides
    ): Promise<void>;

    setRoyalties(
      recipient_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {
    "Initialized(uint8)"(version?: null): InitializedEventFilter;
    Initialized(version?: null): InitializedEventFilter;

    "RoyaltiesSet(address,uint256)"(
      recipient?: null,
      amount?: null
    ): RoyaltiesSetEventFilter;
    RoyaltiesSet(recipient?: null, amount?: null): RoyaltiesSetEventFilter;
  };

  estimateGas: {
    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    royaltyInfo(
      arg0: PromiseOrValue<BigNumberish>,
      value_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setRoyalties(
      recipient_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    isAdmin(
      account_: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    royaltyInfo(
      arg0: PromiseOrValue<BigNumberish>,
      value_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setAdminPermissions(
      account_: PromiseOrValue<string>,
      enable_: PromiseOrValue<boolean>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setRoyalties(
      recipient_: PromiseOrValue<string>,
      amount_: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId_: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
