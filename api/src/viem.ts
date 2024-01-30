import { BigNumber, Contract, Wallet, providers } from 'ethers';

const PROVIDER_URL = 'https://rpc.testnet.immutable.com';
const PRIVATE_KEY =
  '6abecb9c379f3557cc9f72ad7a9034774f970b9450fab24989d75985258ff78a';

export const CONTRACT_ADDRESS = '0xCF4d84AB78c06B4CDB278521E016ed62600D0A63';
export const CARDS_CONTRACT_ADDRESS =
  '0x1c3cF14fB52AE4feD9d6D73694F278F946FfC85d';

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
    {
      inputs: [
        {
          internalType: 'uint8',
          name: 'stage_',
          type: 'uint8',
        },
      ],
      name: 'price',
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
    {
      inputs: [
        {
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
      ],
      name: 'nonceOf',
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
    {
      inputs: [],
      name: 'designatedSigner',
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
  ],
  new providers.JsonRpcProvider(PROVIDER_URL)
);

const wallet = new Wallet(PRIVATE_KEY);

export const createBurnSignature = async (
  address: string,
  _amount: number,
  isGbaby: boolean
) => {
  const domain = await PACKETS_CONTRACT.eip712Domain();
  const designatedSigner = await PACKETS_CONTRACT.designatedSigner();
  const areSignersEqual =
    wallet.address.toLowerCase() === designatedSigner.toLowerCase();

  if (!areSignersEqual) {
    console.log('ERROR: Invalid signers');
  }
  const nonce = await PACKETS_CONTRACT.nonceOf(address);
  const amount = BigNumber.from(1).eq(nonce) ? 0 : _amount;

  const priceOfSingle = await PACKETS_CONTRACT.price(1);
  const price = isGbaby ? BigNumber.from(0) : priceOfSingle.mul(amount);

  const signature = await wallet._signTypedData(
    {
      name: domain.name,
      version: domain.version,
      chainId: domain.chainId,
      verifyingContract: domain.verifyingContract,
    },
    {
      BurnRequest: [
        { name: 'amount', type: 'uint256' },
        { name: 'recipient', type: 'address' },
        { name: 'price', type: 'uint256' },
        { name: 'nonce', type: 'uint256' },
      ],
    },
    {
      amount,
      recipient: address,
      price,
      nonce,
    }
  );

  return {
    signature,
    request: {
      amount,
      recipient: address,
      nonce,
      price,
    },
  };
};

export const createSignature = async (address: string, amount: number) => {
  const domain = await PACKETS_CONTRACT.eip712Domain();
  const designatedSigner = await PACKETS_CONTRACT.designatedSigner();
  const areSignersEqual =
    wallet.address.toLowerCase() === designatedSigner.toLowerCase();

  if (!areSignersEqual) {
    console.log('ERROR: Invalid signers');
  }

  const signature = await wallet._signTypedData(
    {
      name: domain.name,
      version: domain.version,
      chainId: domain.chainId,
      verifyingContract: domain.verifyingContract,
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
