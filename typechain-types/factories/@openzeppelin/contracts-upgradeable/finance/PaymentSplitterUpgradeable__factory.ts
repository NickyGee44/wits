/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  PaymentSplitterUpgradeable,
  PaymentSplitterUpgradeableInterface,
} from "../../../../@openzeppelin/contracts-upgradeable/finance/PaymentSplitterUpgradeable";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "contract IERC20Upgradeable",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ERC20PaymentReleased",
    type: "event",
  },
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
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "shares",
        type: "uint256",
      },
    ],
    name: "PayeeAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReceived",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "PaymentReleased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "payee",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "releasable",
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
        internalType: "contract IERC20Upgradeable",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "releasable",
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
        internalType: "address payable",
        name: "account",
        type: "address",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "release",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract IERC20Upgradeable",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "released",
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
        name: "account",
        type: "address",
      },
    ],
    name: "released",
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
        name: "account",
        type: "address",
      },
    ],
    name: "shares",
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
        internalType: "contract IERC20Upgradeable",
        name: "token",
        type: "address",
      },
    ],
    name: "totalReleased",
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
    inputs: [],
    name: "totalReleased",
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
    inputs: [],
    name: "totalShares",
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
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c1c806100206000396000f3fe6080604052600436106100a05760003560e01c80639852595c116100645780639852595c146101ac578063a3f8eace146101e2578063c45ac05014610202578063ce7c2ac214610222578063d79779b214610258578063e33b7de31461028e57600080fd5b806319165587146100ee5780633a98ef3914610110578063406072a91461013457806348b75044146101545780638b83209b1461017457600080fd5b366100e9577f6ef95f06320e7a25a04a175ca677b7052bdd97131872c2192525a629f51be77033604080516001600160a01b0390921682523460208301520160405180910390a1005b600080fd5b3480156100fa57600080fd5b5061010e6101093660046109ad565b6102a3565b005b34801561011c57600080fd5b506033545b6040519081526020015b60405180910390f35b34801561014057600080fd5b5061012161014f3660046109ca565b610393565b34801561016057600080fd5b5061010e61016f3660046109ca565b6103c0565b34801561018057600080fd5b5061019461018f366004610a03565b6104d1565b6040516001600160a01b03909116815260200161012b565b3480156101b857600080fd5b506101216101c73660046109ad565b6001600160a01b031660009081526036602052604090205490565b3480156101ee57600080fd5b506101216101fd3660046109ad565b610501565b34801561020e57600080fd5b5061012161021d3660046109ca565b610549565b34801561022e57600080fd5b5061012161023d3660046109ad565b6001600160a01b031660009081526035602052604090205490565b34801561026457600080fd5b506101216102733660046109ad565b6001600160a01b031660009081526038602052604090205490565b34801561029a57600080fd5b50603454610121565b6001600160a01b0381166000908152603560205260409020546102e15760405162461bcd60e51b81526004016102d890610a1c565b60405180910390fd5b60006102ec82610501565b90508060000361030e5760405162461bcd60e51b81526004016102d890610a62565b80603460008282546103209190610ac3565b90915550506001600160a01b038216600090815260366020526040902080548201905561034d82826105ef565b604080516001600160a01b0384168152602081018390527fdf20fd1e76bc69d672e4814fafb2c449bba3a5369d8359adf9e05e6fde87b056910160405180910390a15050565b6001600160a01b038083166000908152603960209081526040808320938516835292905220545b92915050565b6001600160a01b0381166000908152603560205260409020546103f55760405162461bcd60e51b81526004016102d890610a1c565b60006104018383610549565b9050806000036104235760405162461bcd60e51b81526004016102d890610a62565b6001600160a01b0383166000908152603860205260408120805483929061044b908490610ac3565b90915550506001600160a01b03808416600090815260396020908152604080832093861683529290522080548201905561048683838361070d565b604080516001600160a01b038481168252602082018490528516917f3be5b7a71e84ed12875d241991c70855ac5817d847039e17a9d895c1ceb0f18a910160405180910390a2505050565b6000603782815481106104e6576104e6610ad6565b6000918252602090912001546001600160a01b031692915050565b60008061050d60345490565b6105179047610ac3565b9050610542838261053d866001600160a01b031660009081526036602052604090205490565b61075f565b9392505050565b6001600160a01b03821660009081526038602052604081205481906040516370a0823160e01b81523060048201526001600160a01b038616906370a0823190602401602060405180830381865afa1580156105a8573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105cc9190610aec565b6105d69190610ac3565b90506105e7838261053d8787610393565b949350505050565b8047101561063f5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a20696e73756666696369656e742062616c616e636500000060448201526064016102d8565b6000826001600160a01b03168260405160006040518083038185875af1925050503d806000811461068c576040519150601f19603f3d011682016040523d82523d6000602084013e610691565b606091505b50509050806107085760405162461bcd60e51b815260206004820152603a60248201527f416464726573733a20756e61626c6520746f2073656e642076616c75652c207260448201527f6563697069656e74206d6179206861766520726576657274656400000000000060648201526084016102d8565b505050565b604080516001600160a01b038416602482015260448082018490528251808303909101815260649091019091526020810180516001600160e01b031663a9059cbb60e01b17905261070890849061079d565b6033546001600160a01b038416600090815260356020526040812054909183916107899086610b05565b6107939190610b1c565b6105e79190610b3e565b60006107f2826040518060400160405280602081526020017f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564815250856001600160a01b03166108729092919063ffffffff16565b90508051600014806108135750808060200190518101906108139190610b51565b6107085760405162461bcd60e51b815260206004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b60648201526084016102d8565b60606105e7848460008585600080866001600160a01b031685876040516108999190610b97565b60006040518083038185875af1925050503d80600081146108d6576040519150601f19603f3d011682016040523d82523d6000602084013e6108db565b606091505b50915091506108ec878383876108f7565b979650505050505050565b6060831561096657825160000361095f576001600160a01b0385163b61095f5760405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e747261637400000060448201526064016102d8565b50816105e7565b6105e7838381511561097b5781518083602001fd5b8060405162461bcd60e51b81526004016102d89190610bb3565b6001600160a01b03811681146109aa57600080fd5b50565b6000602082840312156109bf57600080fd5b813561054281610995565b600080604083850312156109dd57600080fd5b82356109e881610995565b915060208301356109f881610995565b809150509250929050565b600060208284031215610a1557600080fd5b5035919050565b60208082526026908201527f5061796d656e7453706c69747465723a206163636f756e7420686173206e6f2060408201526573686172657360d01b606082015260800190565b6020808252602b908201527f5061796d656e7453706c69747465723a206163636f756e74206973206e6f742060408201526a191d59481c185e5b595b9d60aa1b606082015260800190565b634e487b7160e01b600052601160045260246000fd5b808201808211156103ba576103ba610aad565b634e487b7160e01b600052603260045260246000fd5b600060208284031215610afe57600080fd5b5051919050565b80820281158282048414176103ba576103ba610aad565b600082610b3957634e487b7160e01b600052601260045260246000fd5b500490565b818103818111156103ba576103ba610aad565b600060208284031215610b6357600080fd5b8151801515811461054257600080fd5b60005b83811015610b8e578181015183820152602001610b76565b50506000910152565b60008251610ba9818460208701610b73565b9190910192915050565b6020815260008251806020840152610bd2816040850160208701610b73565b601f01601f1916919091016040019291505056fea2646970667358221220681d6844aa376db6e4e091289b9e58a7fe8024e1cf72ff00265497e727e39f3164736f6c63430008110033";

type PaymentSplitterUpgradeableConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: PaymentSplitterUpgradeableConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class PaymentSplitterUpgradeable__factory extends ContractFactory {
  constructor(...args: PaymentSplitterUpgradeableConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<PaymentSplitterUpgradeable> {
    return super.deploy(overrides || {}) as Promise<PaymentSplitterUpgradeable>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): PaymentSplitterUpgradeable {
    return super.attach(address) as PaymentSplitterUpgradeable;
  }
  override connect(signer: Signer): PaymentSplitterUpgradeable__factory {
    return super.connect(signer) as PaymentSplitterUpgradeable__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): PaymentSplitterUpgradeableInterface {
    return new utils.Interface(_abi) as PaymentSplitterUpgradeableInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): PaymentSplitterUpgradeable {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as PaymentSplitterUpgradeable;
  }
}
