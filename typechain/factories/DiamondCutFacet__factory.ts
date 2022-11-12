/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  DiamondCutFacet,
  DiamondCutFacetInterface,
} from "../DiamondCutFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        indexed: false,
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "DiamondCut",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "facetAddress",
            type: "address",
          },
          {
            internalType: "enum IDiamondCut.FacetCutAction",
            name: "action",
            type: "uint8",
          },
          {
            internalType: "bytes4[]",
            name: "functionSelectors",
            type: "bytes4[]",
          },
        ],
        internalType: "struct IDiamondCut.FacetCut[]",
        name: "_diamondCut",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "_init",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "_calldata",
        type: "bytes",
      },
    ],
    name: "diamondCut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506119cb806100206000396000f3fe608060405234801561001057600080fd5b506004361061002b5760003560e01c80631f931c1c14610030575b600080fd5b61004361003e3660046113fc565b610045565b005b61004d61009e565b61009761005a8587611560565b8484848080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201919091525061014792505050565b5050505050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c600401546001600160a01b031633146101455760405162461bcd60e51b815260206004820152602260248201527f4c69624469616d6f6e643a204d75737420626520636f6e7472616374206f776e60448201527f657200000000000000000000000000000000000000000000000000000000000060648201526084015b60405180910390fd5b565b60005b8351811015610326576000848281518110610167576101676116bc565b602002602001015160200151905060006002811115610188576101886116d2565b81600281111561019a5761019a6116d2565b14156101e9576101e48583815181106101b5576101b56116bc565b6020026020010151600001518684815181106101d3576101d36116bc565b602002602001015160400151610371565b610313565b60018160028111156101fd576101fd6116d2565b1415610247576101e4858381518110610218576102186116bc565b602002602001015160000151868481518110610236576102366116bc565b602002602001015160400151610706565b600281600281111561025b5761025b6116d2565b14156102a5576101e4858381518110610276576102766116bc565b602002602001015160000151868481518110610294576102946116bc565b602002602001015160400151610ad7565b60405162461bcd60e51b815260206004820152602760248201527f4c69624469616d6f6e644375743a20496e636f7272656374204661636574437560448201527f74416374696f6e00000000000000000000000000000000000000000000000000606482015260840161013c565b508061031e816116fe565b91505061014a565b507f8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb67383838360405161035a9392919061178f565b60405180910390a161036c8282610c7b565b505050565b60008151116103e85760405162461bcd60e51b815260206004820152602b60248201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660448201527f6163657420746f20637574000000000000000000000000000000000000000000606482015260840161013c565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c6001600160a01b0383166104855760405162461bcd60e51b815260206004820152602c60248201527f4c69624469616d6f6e644375743a204164642066616365742063616e2774206260448201527f6520616464726573732830290000000000000000000000000000000000000000606482015260840161013c565b6001600160a01b038316600090815260018201602052604090205461ffff811661053f576104cb8460405180606001604052806024815260200161197260249139610e9f565b6002820180546001600160a01b038616600081815260018087016020908152604083208201805461ffff191661ffff90961695909517909455845490810185559381529190912090910180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690911790555b60005b835181101561009757600084828151811061055f5761055f6116bc565b6020908102919091018101517fffffffff0000000000000000000000000000000000000000000000000000000081166000908152918690526040909120549091506001600160a01b0316801561061d5760405162461bcd60e51b815260206004820152603560248201527f4c69624469616d6f6e644375743a2043616e2774206164642066756e6374696f60448201527f6e207468617420616c7265616479206578697374730000000000000000000000606482015260840161013c565b6001600160a01b03871660008181526001878101602090815260408084208054938401815584528184206008840401805463ffffffff60079095166004026101000a948502191660e089901c94909402939093179092557fffffffff0000000000000000000000000000000000000000000000000000000086168352889052902080547fffffffffffffffffffff00000000000000000000000000000000000000000000169091177401000000000000000000000000000000000000000061ffff871602179055836106ee816118c4565b945050505080806106fe906116fe565b915050610542565b600081511161077d5760405162461bcd60e51b815260206004820152602b60248201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660448201527f6163657420746f20637574000000000000000000000000000000000000000000606482015260840161013c565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c6001600160a01b03831661081a5760405162461bcd60e51b815260206004820152602c60248201527f4c69624469616d6f6e644375743a204164642066616365742063616e2774206260448201527f6520616464726573732830290000000000000000000000000000000000000000606482015260840161013c565b6001600160a01b038316600090815260018201602052604090205461ffff81166108d4576108608460405180606001604052806024815260200161197260249139610e9f565b6002820180546001600160a01b038616600081815260018087016020908152604083208201805461ffff191661ffff90961695909517909455845490810185559381529190912090910180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690911790555b60005b83518110156100975760008482815181106108f4576108f46116bc565b6020908102919091018101517fffffffff0000000000000000000000000000000000000000000000000000000081166000908152918690526040909120549091506001600160a01b039081169087168114156109b85760405162461bcd60e51b815260206004820152603860248201527f4c69624469616d6f6e644375743a2043616e2774207265706c6163652066756e60448201527f6374696f6e20776974682073616d652066756e6374696f6e0000000000000000606482015260840161013c565b6109c28183610ec0565b7fffffffff00000000000000000000000000000000000000000000000000000000821660008181526020878152604080832080547fffffffffffffffffffff0000ffffffffffffffffffffffffffffffffffffffff167401000000000000000000000000000000000000000061ffff8b16021781556001600160a01b038c168085526001808c0185529285208054938401815585528385206008840401805463ffffffff60079095166004026101000a948502191660e08a901c94909402939093179092559390925287905281547fffffffffffffffffffffffff00000000000000000000000000000000000000001617905583610abf816118c4565b94505050508080610acf906116fe565b9150506108d7565b6000815111610b4e5760405162461bcd60e51b815260206004820152602b60248201527f4c69624469616d6f6e644375743a204e6f2073656c6563746f727320696e206660448201527f6163657420746f20637574000000000000000000000000000000000000000000606482015260840161013c565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c6001600160a01b03831615610bec5760405162461bcd60e51b815260206004820152603660248201527f4c69624469616d6f6e644375743a2052656d6f7665206661636574206164647260448201527f657373206d757374206265206164647265737328302900000000000000000000606482015260840161013c565b60005b8251811015610c75576000838281518110610c0c57610c0c6116bc565b6020908102919091018101517fffffffff0000000000000000000000000000000000000000000000000000000081166000908152918590526040909120549091506001600160a01b0316610c608183610ec0565b50508080610c6d906116fe565b915050610bef565b50505050565b6001600160a01b038216610d0257805115610cfe5760405162461bcd60e51b815260206004820152603c60248201527f4c69624469616d6f6e644375743a205f696e697420697320616464726573732860448201527f3029206275745f63616c6c64617461206973206e6f7420656d70747900000000606482015260840161013c565b5050565b6000815111610d795760405162461bcd60e51b815260206004820152603d60248201527f4c69624469616d6f6e644375743a205f63616c6c6461746120697320656d707460448201527f7920627574205f696e6974206973206e6f742061646472657373283029000000606482015260840161013c565b6001600160a01b0382163014610dab57610dab8260405180606001604052806028815260200161194a60289139610e9f565b600080836001600160a01b031683604051610dc691906118e6565b600060405180830381855af49150503d8060008114610e01576040519150601f19603f3d011682016040523d82523d6000602084013e610e06565b606091505b509150915081610c7557805115610e31578060405162461bcd60e51b815260040161013c9190611902565b60405162461bcd60e51b815260206004820152602660248201527f4c69624469616d6f6e644375743a205f696e69742066756e6374696f6e20726560448201527f7665727465640000000000000000000000000000000000000000000000000000606482015260840161013c565b813b8181610c755760405162461bcd60e51b815260040161013c9190611902565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c6001600160a01b038316610f5d5760405162461bcd60e51b815260206004820152603760248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f76652066756e6360448201527f74696f6e207468617420646f65736e2774206578697374000000000000000000606482015260840161013c565b6001600160a01b038316301415610fdc5760405162461bcd60e51b815260206004820152602e60248201527f4c69624469616d6f6e644375743a2043616e27742072656d6f766520696d6d7560448201527f7461626c652066756e6374696f6e000000000000000000000000000000000000606482015260840161013c565b7fffffffff000000000000000000000000000000000000000000000000000000008216600090815260208281526040808320546001600160a01b03871684526001808601909352908320547401000000000000000000000000000000000000000090910461ffff16929161104f9161191c565b905080821461117e576001600160a01b03851660009081526001840160205260408120805483908110611084576110846116bc565b600091825260208083206008830401546001600160a01b038a168452600188019091526040909220805460079092166004026101000a90920460e01b9250829190859081106110d5576110d56116bc565b600091825260208083206008830401805463ffffffff60079094166004026101000a938402191660e09590951c929092029390931790557fffffffff000000000000000000000000000000000000000000000000000000009290921682528490526040902080547fffffffffffffffffffff0000ffffffffffffffffffffffffffffffffffffffff167401000000000000000000000000000000000000000061ffff8516021790555b6001600160a01b038516600090815260018401602052604090208054806111a7576111a7611933565b60008281526020808220600860001990940193840401805463ffffffff600460078716026101000a0219169055919092557fffffffff00000000000000000000000000000000000000000000000000000000861682528490526040902080547fffffffffffffffffffff00000000000000000000000000000000000000000000169055806100975760028301546000906112439060019061191c565b6001600160a01b038716600090815260018087016020526040909120015490915061ffff1680821461131a576000856002018381548110611286576112866116bc565b6000918252602090912001546002870180546001600160a01b0390921692508291849081106112b7576112b76116bc565b600091825260208083209190910180547fffffffffffffffffffffffff0000000000000000000000000000000000000000166001600160a01b0394851617905592909116815260018781019092526040902001805461ffff191661ffff83161790555b8460020180548061132d5761132d611933565b60008281526020808220830160001990810180547fffffffffffffffffffffffff00000000000000000000000000000000000000001690559092019092556001600160a01b03891682526001878101909152604090912001805461ffff1916905550505050505050565b80356001600160a01b03811681146113ae57600080fd5b919050565b60008083601f8401126113c557600080fd5b50813567ffffffffffffffff8111156113dd57600080fd5b6020830191508360208285010111156113f557600080fd5b9250929050565b60008060008060006060868803121561141457600080fd5b853567ffffffffffffffff8082111561142c57600080fd5b818801915088601f83011261144057600080fd5b81358181111561144f57600080fd5b8960208260051b850101111561146457600080fd5b6020830197508096505061147a60208901611397565b9450604088013591508082111561149057600080fd5b5061149d888289016113b3565b969995985093965092949392505050565b634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff811182821017156114e7576114e76114ae565b60405290565b604051601f82017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe016810167ffffffffffffffff81118282101715611534576115346114ae565b604052919050565b600067ffffffffffffffff821115611556576115566114ae565b5060051b60200190565b600061157361156e8461153c565b6114ed565b83815260208082019190600586811b86013681111561159157600080fd5b865b818110156116af57803567ffffffffffffffff808211156115b45760008081fd5b818a019150606082360312156115ca5760008081fd5b6115d26114c4565b6115db83611397565b815286830135600381106115ef5760008081fd5b81880152604083810135838111156116075760008081fd5b939093019236601f85011261161e57600092508283fd5b8335925061162e61156e8461153c565b83815292871b8401880192888101903685111561164b5760008081fd5b948901945b848610156116985785357fffffffff00000000000000000000000000000000000000000000000000000000811681146116895760008081fd5b82529489019490890190611650565b918301919091525088525050948301948301611593565b5092979650505050505050565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b6000600019821415611712576117126116e8565b5060010190565b60005b8381101561173457818101518382015260200161171c565b83811115610c755750506000910152565b6000815180845261175d816020860160208601611719565b601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0169290920160200192915050565b60006060808301818452808751808352608092508286019150828160051b8701016020808b0160005b84811015611894577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff808a850301865281518885016001600160a01b038251168652848201516003811061181b57634e487b7160e01b600052602160045260246000fd5b868601526040918201519186018a905281519081905290840190600090898701905b8083101561187f5783517fffffffff0000000000000000000000000000000000000000000000000000000016825292860192600192909201919086019061183d565b509785019795505050908201906001016117b8565b50506001600160a01b038a169088015286810360408801526118b68189611745565b9a9950505050505050505050565b600061ffff808316818114156118dc576118dc6116e8565b6001019392505050565b600082516118f8818460208701611719565b9190910192915050565b6020815260006119156020830184611745565b9392505050565b60008282101561192e5761192e6116e8565b500390565b634e487b7160e01b600052603160045260246000fdfe4c69624469616d6f6e644375743a205f696e6974206164647265737320686173206e6f20636f64654c69624469616d6f6e644375743a204e657720666163657420686173206e6f20636f6465a264697066735822122076ec949033cc335a6477d4d3e68039d4ba5382fb8a059118a8e7d3045b8f1ea264736f6c634300080b0033";

export class DiamondCutFacet__factory extends ContractFactory {
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
  ): Promise<DiamondCutFacet> {
    return super.deploy(overrides || {}) as Promise<DiamondCutFacet>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): DiamondCutFacet {
    return super.attach(address) as DiamondCutFacet;
  }
  connect(signer: Signer): DiamondCutFacet__factory {
    return super.connect(signer) as DiamondCutFacet__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DiamondCutFacetInterface {
    return new utils.Interface(_abi) as DiamondCutFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): DiamondCutFacet {
    return new Contract(address, _abi, signerOrProvider) as DiamondCutFacet;
  }
}
