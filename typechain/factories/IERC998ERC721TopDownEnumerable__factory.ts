/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IERC998ERC721TopDownEnumerable,
  IERC998ERC721TopDownEnumerableInterface,
} from "../IERC998ERC721TopDownEnumerable";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "childContractByIndex",
    outputs: [
      {
        internalType: "address",
        name: "childContract",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_childContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_index",
        type: "uint256",
      },
    ],
    name: "childTokenByIndex",
    outputs: [
      {
        internalType: "uint256",
        name: "childTokenId",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "totalChildContracts",
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
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_childContract",
        type: "address",
      },
    ],
    name: "totalChildTokens",
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
];

export class IERC998ERC721TopDownEnumerable__factory {
  static readonly abi = _abi;
  static createInterface(): IERC998ERC721TopDownEnumerableInterface {
    return new utils.Interface(_abi) as IERC998ERC721TopDownEnumerableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IERC998ERC721TopDownEnumerable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as IERC998ERC721TopDownEnumerable;
  }
}
