import { Contract, Wallet, providers } from 'ethers';

const CHAIN_ID = 80001;
const PROVIDER_URL =
  'https://polygon-mumbai.g.alchemy.com/v2/m3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z';
const PRIVATE_KEY =
  '4979158a5681f9b3e0d4f5cf29b5373858f56d663184c38e062e245c336c9a30';

export const CONTRACT_ADDRESS = '0x51Ac32651d8a33c137B9B56BCdD1E037CACB7A8A';
export const CARDS_CONTRACT_ADDRESS = '0x4DC6BC7ea2d9F148f715D5Cd0c3D3937b3072F13';
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
