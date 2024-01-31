import { Contract, Wallet, providers } from 'ethers';

const CHAIN_ID = 1;
const PROVIDER_URL =
  'https://eth-mainnet.g.alchemy.com/v2/m3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z';
const PRIVATE_KEY =
  '4979158a5681f9b3e0d4f5cf29b5373858f56d663184c38e062e245c336c9a30';

export const CONTRACT_ADDRESS = '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d';
export const CARDS_CONTRACT_ADDRESS = '0x4DC6BC7ea2d9F148f715D5Cd0c3D3937b3072F13';
export const NAME = 'WITS';
export const VERSION = '1';

const PACKETS_CONTRACT = new Contract(
  CONTRACT_ADDRESS,
  [
    {
      inputs: [],
      name: 'eip712Domain',
      outputs: [
        {
          internalType: 'bytes1',
          name: 'fields',
          type: 'bytes1',
        },
        {
          internalType: 'string',
          name: 'name',
          type: 'string',
        },
        {
          internalType: 'string',
          name: 'version',
          type: 'string',
        },
        {
          internalType: 'uint256',
          name: 'chainId',
          type: 'uint256',
        },
        {
          internalType: 'address',
          name: 'verifyingContract',
          type: 'address',
        },
        {
          internalType: 'bytes32',
          name: 'salt',
          type: 'bytes32',
        },
        {
          internalType: 'uint256[]',
          name: 'extensions',
          type: 'uint256[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'signer',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'id',
          type: 'uint256',
        },
      ],
      name: 'totalSupply',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
  ],
  new providers.JsonRpcProvider(PROVIDER_URL)
);

export const createSignature = async (address: string, amount: number) => {
  const wallet = new Wallet(PRIVATE_KEY);

  console.log(await PACKETS_CONTRACT.eip712Domain());
  console.log(await PACKETS_CONTRACT.functions['signer()']());
  console.log(wallet, NAME, VERSION, CHAIN_ID, CONTRACT_ADDRESS);

  const signature = await wallet._signTypedData(
    {
      name: NAME,
      version: VERSION,
      chainId: CHAIN_ID,
      verifyingContract: CONTRACT_ADDRESS,
    },
    {
      PresaleRequest: [
        { name: 'amount', type: 'uint256' },
        { name: 'recipient', type: 'address' },
      ],
    },
    {
      amount,
      recipient: address,
    }
  );
  return signature;
};

export const getTotalSupply = async () => {
  const totalSupply = await PACKETS_CONTRACT.totalSupply();
  return Number(totalSupply);
};
