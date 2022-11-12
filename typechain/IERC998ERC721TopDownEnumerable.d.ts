/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface IERC998ERC721TopDownEnumerableInterface
  extends ethers.utils.Interface {
  functions: {
    "childContractByIndex(uint256,uint256)": FunctionFragment;
    "childTokenByIndex(uint256,address,uint256)": FunctionFragment;
    "totalChildContracts(uint256)": FunctionFragment;
    "totalChildTokens(uint256,address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "childContractByIndex",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "childTokenByIndex",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalChildContracts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalChildTokens",
    values: [BigNumberish, string]
  ): string;

  decodeFunctionResult(
    functionFragment: "childContractByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "childTokenByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalChildContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalChildTokens",
    data: BytesLike
  ): Result;

  events: {};
}

export class IERC998ERC721TopDownEnumerable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: IERC998ERC721TopDownEnumerableInterface;

  functions: {
    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { childContract: string }>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { childTokenId: BigNumber }>;

    totalChildContracts(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalChildTokens(
      _tokenId: BigNumberish,
      _childContract: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;
  };

  childContractByIndex(
    _tokenId: BigNumberish,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  childTokenByIndex(
    _tokenId: BigNumberish,
    _childContract: string,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalChildContracts(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalChildTokens(
    _tokenId: BigNumberish,
    _childContract: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  callStatic: {
    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalChildContracts(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalChildTokens(
      _tokenId: BigNumberish,
      _childContract: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalChildContracts(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalChildTokens(
      _tokenId: BigNumberish,
      _childContract: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalChildContracts(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalChildTokens(
      _tokenId: BigNumberish,
      _childContract: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
