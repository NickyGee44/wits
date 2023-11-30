import { Contract, Wallet, providers } from 'ethers';

const CHAIN_ID = 5;
const PROVIDER_URL =
  'https://eth-goerli.alchemyapi.io/v2/m3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z';
const PRIVATE_KEY =
  'ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

export const CONTRACT_ADDRESS = '0x260e3B084f19a0684Ed730AA1f9bbecdD13E43e2';
export const CARDS_CONTRACT_ADDRESS =
  '0x9FC5df68cFE7826D4E8a957E50DD0eef567518D8';
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
