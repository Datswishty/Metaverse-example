/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  InterractionFacet,
  InterractionFacetInterface,
} from "../InterractionFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "scaleId",
        type: "uint256",
      },
    ],
    name: "scaleBurned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "scaleType",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "scaleId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "childIds",
        type: "uint256[]",
      },
    ],
    name: "scaleCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "scaleType",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "landIds",
        type: "uint256[]",
      },
    ],
    name: "createScaleFromLands",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "scaleTokenId",
        type: "uint256",
      },
    ],
    name: "decomposeScale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "scaleType",
        type: "uint256",
      },
      {
        internalType: "uint256[]",
        name: "landIds",
        type: "uint256[]",
      },
    ],
    name: "mintScale",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506111fa806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c80633373f7bd146100465780635f8706c0146100625780636e58df101461007e575b600080fd5b610060600480360381019061005b9190610c95565b61009a565b005b61007c60048036038101906100779190610e1b565b6103bb565b005b61009860048036038101906100939190610e1b565b6107e5565b005b60008060030160008060028111156100b5576100b4610e77565b5b60028111156100c7576100c6610e77565b5b815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060030160006001600281111561011457610113610e77565b5b600281111561012657610125610e77565b5b815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508173ffffffffffffffffffffffffffffffffffffffff166342842e0e33732b9d9861bfcf61243ed9277f5bdddb7065acc3c7876040518463ffffffff1660e01b81526004016101d193929190610ef6565b600060405180830381600087803b1580156101eb57600080fd5b505af11580156101ff573d6000803e3d6000fd5b505050506000806005016000868152602001908152602001600020549050600080600701600083815260200190815260200160002080548060200260200160405190810160405280929190818152602001828054801561027e57602002820191906000526020600020905b81548152602001906001019080831161026a575b5050505050905060005b815181101561032f578373ffffffffffffffffffffffffffffffffffffffff16631d98f3c58433898686815181106102c3576102c2610f2d565b5b60200260200101516040518563ffffffff1660e01b81526004016102ea9493929190610f5c565b600060405180830381600087803b15801561030457600080fd5b505af1158015610318573d6000803e3d6000fd5b50505050808061032790610fd0565b915050610288565b50600060050160008781526020019081526020016000206000905560006006016000878152602001908152602001600020600090556000600701600087815260200190815260200160002060006103869190610c0d565b857fc09d8d26964f30c9bb17a3d9aba4d7fed44d82a25d7734253742eac08e4d16b360405160405180910390a2505050505050565b60008060030160008060028111156103d6576103d5610e77565b5b60028111156103e8576103e7610e77565b5b815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060030160006001600281111561043557610434610e77565b5b600281111561044757610446610e77565b5b815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008273ffffffffffffffffffffffffffffffffffffffff16636a627842836040518263ffffffff1660e01b81526004016105059190611019565b6020604051808303816000875af1158015610524573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105489190611049565b905060005b86518110156106d4578573ffffffffffffffffffffffffffffffffffffffff166342842e0e33858a858151811061058757610586610f2d565b5b60200260200101516040518463ffffffff1660e01b81526004016105ad93929190610ef6565b600060405180830381600087803b1580156105c757600080fd5b505af11580156105db573d6000803e3d6000fd5b505050508373ffffffffffffffffffffffffffffffffffffffff1663ba6b5f968484898b868151811061061157610610610f2d565b5b60200260200101516040518563ffffffff1660e01b81526004016106389493929190611076565b600060405180830381600087803b15801561065257600080fd5b505af1158015610666573d6000803e3d6000fd5b505050506000600701600083815260200190815260200160002087828151811061069357610692610f2d565b5b6020026020010151908060018154018082558091505060019003906000526020600020016000909190919091505580806106cc90610fd0565b91505061054d565b5060008473ffffffffffffffffffffffffffffffffffffffff16636a627842336040518263ffffffff1660e01b81526004016107109190611019565b6020604051808303816000875af115801561072f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107539190611049565b90508160006005016000838152602001908152602001600020819055508760006006016000838152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff1681897f551b13e4d4820086c452bad1770b0e59ad99a9e56022e4c72ed2cb9ad70e35998a6040516107d39190611179565b60405180910390a45050505050505050565b6000806003016000806002811115610800576107ff610e77565b5b600281111561081257610811610e77565b5b815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060030160006001600281111561085f5761085e610e77565b5b600281111561087157610870610e77565b5b815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060020160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905060008273ffffffffffffffffffffffffffffffffffffffff16636a627842836040518263ffffffff1660e01b815260040161092f9190611019565b6020604051808303816000875af115801561094e573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906109729190611049565b905060005b8651811015610afc578573ffffffffffffffffffffffffffffffffffffffff1663a1448194848984815181106109b0576109af610f2d565b5b60200260200101516040518363ffffffff1660e01b81526004016109d592919061119b565b600060405180830381600087803b1580156109ef57600080fd5b505af1158015610a03573d6000803e3d6000fd5b505050508373ffffffffffffffffffffffffffffffffffffffff1663ba6b5f968484898b8681518110610a3957610a38610f2d565b5b60200260200101516040518563ffffffff1660e01b8152600401610a609493929190611076565b600060405180830381600087803b158015610a7a57600080fd5b505af1158015610a8e573d6000803e3d6000fd5b5050505060006007016000838152602001908152602001600020878281518110610abb57610aba610f2d565b5b602002602001015190806001815401808255809150506001900390600052602060002001600090919091909150558080610af490610fd0565b915050610977565b5060008473ffffffffffffffffffffffffffffffffffffffff16636a627842336040518263ffffffff1660e01b8152600401610b389190611019565b6020604051808303816000875af1158015610b57573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610b7b9190611049565b90508160006005016000838152602001908152602001600020819055508760006006016000838152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff1681897f551b13e4d4820086c452bad1770b0e59ad99a9e56022e4c72ed2cb9ad70e35998a604051610bfb9190611179565b60405180910390a45050505050505050565b5080546000825590600052602060002090810190610c2b9190610c2e565b50565b5b80821115610c47576000816000905550600101610c2f565b5090565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b610c7281610c5f565b8114610c7d57600080fd5b50565b600081359050610c8f81610c69565b92915050565b600060208284031215610cab57610caa610c55565b5b6000610cb984828501610c80565b91505092915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610d1082610cc7565b810181811067ffffffffffffffff82111715610d2f57610d2e610cd8565b5b80604052505050565b6000610d42610c4b565b9050610d4e8282610d07565b919050565b600067ffffffffffffffff821115610d6e57610d6d610cd8565b5b602082029050602081019050919050565b600080fd5b6000610d97610d9284610d53565b610d38565b90508083825260208201905060208402830185811115610dba57610db9610d7f565b5b835b81811015610de35780610dcf8882610c80565b845260208401935050602081019050610dbc565b5050509392505050565b600082601f830112610e0257610e01610cc2565b5b8135610e12848260208601610d84565b91505092915050565b60008060408385031215610e3257610e31610c55565b5b6000610e4085828601610c80565b925050602083013567ffffffffffffffff811115610e6157610e60610c5a565b5b610e6d85828601610ded565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610ed182610ea6565b9050919050565b610ee181610ec6565b82525050565b610ef081610c5f565b82525050565b6000606082019050610f0b6000830186610ed8565b610f186020830185610ed8565b610f256040830184610ee7565b949350505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b6000608082019050610f716000830187610ee7565b610f7e6020830186610ed8565b610f8b6040830185610ed8565b610f986060830184610ee7565b95945050505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b6000610fdb82610c5f565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82141561100e5761100d610fa1565b5b600182019050919050565b600060208201905061102e6000830184610ed8565b92915050565b60008151905061104381610c69565b92915050565b60006020828403121561105f5761105e610c55565b5b600061106d84828501611034565b91505092915050565b600060808201905061108b6000830187610ed8565b6110986020830186610ee7565b6110a56040830185610ed8565b6110b26060830184610ee7565b95945050505050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6110f081610c5f565b82525050565b600061110283836110e7565b60208301905092915050565b6000602082019050919050565b6000611126826110bb565b61113081856110c6565b935061113b836110d7565b8060005b8381101561116c57815161115388826110f6565b975061115e8361110e565b92505060018101905061113f565b5085935050505092915050565b60006020820190508181036000830152611193818461111b565b905092915050565b60006040820190506111b06000830185610ed8565b6111bd6020830184610ee7565b939250505056fea26469706673582212206035dc760431260d503ba1c398a94b9065679cfb19626e4e94fc76ae8cf12ab264736f6c634300080b0033";

export class InterractionFacet__factory extends ContractFactory {
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
  ): Promise<InterractionFacet> {
    return super.deploy(overrides || {}) as Promise<InterractionFacet>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): InterractionFacet {
    return super.attach(address) as InterractionFacet;
  }
  connect(signer: Signer): InterractionFacet__factory {
    return super.connect(signer) as InterractionFacet__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): InterractionFacetInterface {
    return new utils.Interface(_abi) as InterractionFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): InterractionFacet {
    return new Contract(address, _abi, signerOrProvider) as InterractionFacet;
  }
}