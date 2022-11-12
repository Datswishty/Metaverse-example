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
  Overrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface TestFacetBInterface extends ethers.utils.Interface {
  functions: {
    "changeFlagB()": FunctionFragment;
    "getFlagB()": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "changeFlagB",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getFlagB", values?: undefined): string;

  decodeFunctionResult(
    functionFragment: "changeFlagB",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getFlagB", data: BytesLike): Result;

  events: {};
}

export class TestFacetB extends BaseContract {
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

  interface: TestFacetBInterface;

  functions: {
    changeFlagB(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getFlagB(overrides?: CallOverrides): Promise<[boolean]>;
  };

  changeFlagB(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getFlagB(overrides?: CallOverrides): Promise<boolean>;

  callStatic: {
    changeFlagB(overrides?: CallOverrides): Promise<void>;

    getFlagB(overrides?: CallOverrides): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    changeFlagB(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getFlagB(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    changeFlagB(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getFlagB(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}