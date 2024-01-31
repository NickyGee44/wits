import { Contract, Wallet, providers } from 'ethers';

const CHAIN_ID = 80001;
const PROVIDER_URL =
  'https://polygon-mumbai.g.alchemy.com/v2/m3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z';
const PRIVATE_KEY =
  'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export const CONTRACT_ADDRESS = '0xB97BE417cf491BA49A96566A8886DC58B1723a7c';
export const CARDS_CONTRACT_ADDRESS =
  '0x136B07d5862fC98C3a98565F4F14f8fA9bBb4CBa';
export const NAME = 'Name';
export const VERSION = 'Version';

const PACKETS_CONTRACT = new Contract(
  CONTRACT_ADDRESS,
  [
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
