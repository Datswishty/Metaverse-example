/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type { TestFacetA, TestFacetAInterface } from "../TestFacetA";

const _abi = [
  {
    inputs: [],
    name: "changeFlagA",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getFlagA",
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
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506101f8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80632af01b381461003b578063911c6e2e14610045575b600080fd5b610043610063565b005b61004d610095565b60405161005a91906101a7565b60405180910390f35b600060060160149054906101000a900460ff1615600060060160146101000a81548160ff021916908315150217905550565b60006100b2600060060160149054906101000a900460ff166100ca565b600060060160149054906101000a900460ff16905090565b610160816040516024016100de91906101a7565b6040516020818303038152906040527f32458eed000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610163565b50565b60008151905060006a636f6e736f6c652e6c6f679050602083016000808483855afa5050505050565b60008115159050919050565b6101a18161018c565b82525050565b60006020820190506101bc6000830184610198565b9291505056fea2646970667358221220a35eb4925fcee02055c9b51c4bf76adac7357aafdd11f5031a9c799d5d0b53a164736f6c634300080d0033";

export class TestFacetA__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<TestFacetA> {
    return super.deploy(overrides || {}) as Promise<TestFacetA>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): TestFacetA {
    return super.attach(address) as TestFacetA;
  }
  connect(signer: Signer): TestFacetA__factory {
    return super.connect(signer) as TestFacetA__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TestFacetAInterface {
    return new utils.Interface(_abi) as TestFacetAInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TestFacetA {
    return new Contract(address, _abi, signerOrProvider) as TestFacetA;
  }
}