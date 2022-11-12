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

interface PlantetComposableInterface extends ethers.utils.Interface {
  functions: {
    "approve(address,uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "childContractByIndex(uint256,uint256)": FunctionFragment;
    "childExists(address,uint256)": FunctionFragment;
    "childTokenByIndex(uint256,address,uint256)": FunctionFragment;
    "getApproved(uint256)": FunctionFragment;
    "getChild(address,uint256,address,uint256)": FunctionFragment;
    "isApprovedForAll(address,address)": FunctionFragment;
    "mint(address)": FunctionFragment;
    "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
    "ownerOf(uint256)": FunctionFragment;
    "ownerOfChild(address,uint256)": FunctionFragment;
    "rootOwnerOf(uint256)": FunctionFragment;
    "rootOwnerOfChild(address,uint256)": FunctionFragment;
    "safeTransferChild(uint256,address,address,uint256)": FunctionFragment;
    "safeTransferFrom(address,address,uint256)": FunctionFragment;
    "setApprovalForAll(address,bool)": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "totalChildContracts(uint256)": FunctionFragment;
    "totalChildTokens(uint256,address)": FunctionFragment;
    "transferChild(uint256,address,address,uint256)": FunctionFragment;
    "transferChildToParent(uint256,address,uint256,address,uint256,bytes)": FunctionFragment;
    "transferFrom(address,address,uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "approve",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balanceOf", values: [string]): string;
  encodeFunctionData(
    functionFragment: "childContractByIndex",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "childExists",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "childTokenByIndex",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getApproved",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getChild",
    values: [string, BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isApprovedForAll",
    values: [string, string]
  ): string;
  encodeFunctionData(functionFragment: "mint", values: [string]): string;
  encodeFunctionData(
    functionFragment: "onERC721Received",
    values: [string, string, BigNumberish, BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ownerOfChild",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rootOwnerOf",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "rootOwnerOfChild",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferChild",
    values: [BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "safeTransferFrom",
    values: [string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "setApprovalForAll",
    values: [string, boolean]
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "totalChildContracts",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "totalChildTokens",
    values: [BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "transferChild",
    values: [BigNumberish, string, string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "transferChildToParent",
    values: [
      BigNumberish,
      string,
      BigNumberish,
      string,
      BigNumberish,
      BytesLike
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "transferFrom",
    values: [string, string, BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "childContractByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "childExists",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "childTokenByIndex",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getApproved",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getChild", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "isApprovedForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "onERC721Received",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "ownerOfChild",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rootOwnerOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "rootOwnerOfChild",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferChild",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "safeTransferFrom",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setApprovalForAll",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
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
  decodeFunctionResult(
    functionFragment: "transferChild",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferChildToParent",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferFrom",
    data: BytesLike
  ): Result;

  events: {
    "Approval(address,address,uint256)": EventFragment;
    "ApprovalForAll(address,address,bool)": EventFragment;
    "ReceivedChild(address,uint256,address,uint256)": EventFragment;
    "Transfer(address,address,uint256)": EventFragment;
    "TransferChild(uint256,address,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ReceivedChild"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TransferChild"): EventFragment;
}

export type ApprovalEvent = TypedEvent<
  [string, string, BigNumber] & {
    owner: string;
    approved: string;
    tokenId: BigNumber;
  }
>;

export type ApprovalForAllEvent = TypedEvent<
  [string, string, boolean] & {
    owner: string;
    operator: string;
    approved: boolean;
  }
>;

export type ReceivedChildEvent = TypedEvent<
  [string, BigNumber, string, BigNumber] & {
    _from: string;
    _tokenId: BigNumber;
    _childContract: string;
    _childTokenId: BigNumber;
  }
>;

export type TransferEvent = TypedEvent<
  [string, string, BigNumber] & { from: string; to: string; tokenId: BigNumber }
>;

export type TransferChildEvent = TypedEvent<
  [BigNumber, string, string, BigNumber] & {
    tokenId: BigNumber;
    _to: string;
    _childContract: string;
    _childTokenId: BigNumber;
  }
>;

export class PlantetComposable extends BaseContract {
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

  interface: PlantetComposableInterface;

  functions: {
    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      _tokenOwner: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { childContract: string }>;

    childExists(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { childTokenId: BigNumber }>;

    getApproved(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getChild(
      _from: string,
      _tokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    mint(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      _operator: string,
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "onERC721Received(address,uint256,bytes)"(
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ownerOf(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { tokenOwner: string }>;

    ownerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & {
        parentTokenOwner: string;
        parentTokenId: BigNumber;
      }
    >;

    rootOwnerOf(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { rootOwner: string }>;

    rootOwnerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string] & { rootOwner: string }>;

    "safeTransferChild(uint256,address,address,uint256)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferChild(uint256,address,address,uint256,bytes)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    totalChildContracts(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    totalChildTokens(
      _tokenId: BigNumberish,
      _childContract: string,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    transferChild(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferChildToParent(
      _fromTokenId: BigNumberish,
      _toContract: string,
      _toTokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  approve(
    _approved: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  balanceOf(_tokenOwner: string, overrides?: CallOverrides): Promise<BigNumber>;

  childContractByIndex(
    _tokenId: BigNumberish,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  childExists(
    _childContract: string,
    _childTokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<boolean>;

  childTokenByIndex(
    _tokenId: BigNumberish,
    _childContract: string,
    _index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getApproved(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getChild(
    _from: string,
    _tokenId: BigNumberish,
    _childContract: string,
    _childTokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  isApprovedForAll(
    _owner: string,
    _operator: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  mint(
    _to: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "onERC721Received(address,address,uint256,bytes)"(
    _operator: string,
    _from: string,
    _childTokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "onERC721Received(address,uint256,bytes)"(
    _from: string,
    _childTokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ownerOf(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

  ownerOfChild(
    _childContract: string,
    _childTokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, BigNumber] & { parentTokenOwner: string; parentTokenId: BigNumber }
  >;

  rootOwnerOf(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  rootOwnerOfChild(
    _childContract: string,
    _childTokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  "safeTransferChild(uint256,address,address,uint256)"(
    _fromTokenId: BigNumberish,
    _to: string,
    _childContract: string,
    _childTokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferChild(uint256,address,address,uint256,bytes)"(
    _fromTokenId: BigNumberish,
    _to: string,
    _childContract: string,
    _childTokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256)"(
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  "safeTransferFrom(address,address,uint256,bytes)"(
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  setApprovalForAll(
    _operator: string,
    _approved: boolean,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  totalChildContracts(
    _tokenId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  totalChildTokens(
    _tokenId: BigNumberish,
    _childContract: string,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  transferChild(
    _fromTokenId: BigNumberish,
    _to: string,
    _childContract: string,
    _childTokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferChildToParent(
    _fromTokenId: BigNumberish,
    _toContract: string,
    _toTokenId: BigNumberish,
    _childContract: string,
    _childTokenId: BigNumberish,
    _data: BytesLike,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferFrom(
    _from: string,
    _to: string,
    _tokenId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(
      _tokenOwner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    childExists(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<boolean>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getApproved(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getChild(
      _from: string,
      _tokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    mint(_to: string, overrides?: CallOverrides): Promise<BigNumber>;

    "onERC721Received(address,address,uint256,bytes)"(
      _operator: string,
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    "onERC721Received(address,uint256,bytes)"(
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<string>;

    ownerOf(_tokenId: BigNumberish, overrides?: CallOverrides): Promise<string>;

    ownerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & {
        parentTokenOwner: string;
        parentTokenId: BigNumber;
      }
    >;

    rootOwnerOf(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    rootOwnerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    "safeTransferChild(uint256,address,address,uint256)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferChild(uint256,address,address,uint256,bytes)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: CallOverrides
    ): Promise<void>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    totalChildContracts(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalChildTokens(
      _tokenId: BigNumberish,
      _childContract: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    transferChild(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    transferChildToParent(
      _fromTokenId: BigNumberish,
      _toContract: string,
      _toTokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: CallOverrides
    ): Promise<void>;

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Approval(address,address,uint256)"(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    Approval(
      owner?: string | null,
      approved?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { owner: string; approved: string; tokenId: BigNumber }
    >;

    "ApprovalForAll(address,address,bool)"(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    ApprovalForAll(
      owner?: string | null,
      operator?: string | null,
      approved?: null
    ): TypedEventFilter<
      [string, string, boolean],
      { owner: string; operator: string; approved: boolean }
    >;

    "ReceivedChild(address,uint256,address,uint256)"(
      _from?: string | null,
      _tokenId?: BigNumberish | null,
      _childContract?: string | null,
      _childTokenId?: null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber],
      {
        _from: string;
        _tokenId: BigNumber;
        _childContract: string;
        _childTokenId: BigNumber;
      }
    >;

    ReceivedChild(
      _from?: string | null,
      _tokenId?: BigNumberish | null,
      _childContract?: string | null,
      _childTokenId?: null
    ): TypedEventFilter<
      [string, BigNumber, string, BigNumber],
      {
        _from: string;
        _tokenId: BigNumber;
        _childContract: string;
        _childTokenId: BigNumber;
      }
    >;

    "Transfer(address,address,uint256)"(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;

    Transfer(
      from?: string | null,
      to?: string | null,
      tokenId?: BigNumberish | null
    ): TypedEventFilter<
      [string, string, BigNumber],
      { from: string; to: string; tokenId: BigNumber }
    >;

    "TransferChild(uint256,address,address,uint256)"(
      tokenId?: BigNumberish | null,
      _to?: string | null,
      _childContract?: string | null,
      _childTokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber],
      {
        tokenId: BigNumber;
        _to: string;
        _childContract: string;
        _childTokenId: BigNumber;
      }
    >;

    TransferChild(
      tokenId?: BigNumberish | null,
      _to?: string | null,
      _childContract?: string | null,
      _childTokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, string, BigNumber],
      {
        tokenId: BigNumber;
        _to: string;
        _childContract: string;
        _childTokenId: BigNumber;
      }
    >;
  };

  estimateGas: {
    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    balanceOf(
      _tokenOwner: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    childExists(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getApproved(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getChild(
      _from: string,
      _tokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mint(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "onERC721Received(address,address,uint256,bytes)"(
      _operator: string,
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "onERC721Received(address,uint256,bytes)"(
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ownerOf(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ownerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootOwnerOf(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    rootOwnerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    "safeTransferChild(uint256,address,address,uint256)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferChild(uint256,address,address,uint256,bytes)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
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

    transferChild(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferChildToParent(
      _fromTokenId: BigNumberish,
      _toContract: string,
      _toTokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    approve(
      _approved: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      _tokenOwner: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    childContractByIndex(
      _tokenId: BigNumberish,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    childExists(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    childTokenByIndex(
      _tokenId: BigNumberish,
      _childContract: string,
      _index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getApproved(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getChild(
      _from: string,
      _tokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    isApprovedForAll(
      _owner: string,
      _operator: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mint(
      _to: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "onERC721Received(address,address,uint256,bytes)"(
      _operator: string,
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "onERC721Received(address,uint256,bytes)"(
      _from: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ownerOf(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rootOwnerOf(
      _tokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    rootOwnerOfChild(
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    "safeTransferChild(uint256,address,address,uint256)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferChild(uint256,address,address,uint256,bytes)"(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    setApprovalForAll(
      _operator: string,
      _approved: boolean,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
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

    transferChild(
      _fromTokenId: BigNumberish,
      _to: string,
      _childContract: string,
      _childTokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferChildToParent(
      _fromTokenId: BigNumberish,
      _toContract: string,
      _toTokenId: BigNumberish,
      _childContract: string,
      _childTokenId: BigNumberish,
      _data: BytesLike,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferFrom(
      _from: string,
      _to: string,
      _tokenId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
