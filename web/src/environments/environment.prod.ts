export const environment = {
  ALCHEMY_KEY: 'm3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z',
  metadata: {
    url: 'https://wits-set-one.s3.us-east-2.amazonaws.com/data',
    image: 'https://wits-set-one.s3.us-east-2.amazonaws.com',
  },
  chain: 'mumbai',
  mumbai: {
    cards: '0xe6718CcA1f367549E4070518a4f4C9ca0B872892' as const,
    packets: '0x51Ac32651d8a33c137B9B56BCdD1E037CACB7A8A' as const,
    quillAndInk: '0x71e90Ef6ff6a322ED24838Faca5F80996eDf615B' as const,
    gBabies: '0x5CB234f98050485c9BFE44521f846035F7779177' as const,
  },
  api: {
    base: 'http://localhost:4300/',
    addresses: '.netlify/functions/main',
  },
  mainnet: {
    gBabies: '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e' as const,
    quillAndInk: '0xd38123a8f534a7bbcefefa59e74f254a46818538' as const,
    cards: '0x4E5D0d8897587a42a89d3d20cD8Be2dbd43B35fB' as const,
    packets: '0x66f5Cf876d4A756f83362225907413338BC8736a' as const,
  },
  hardhat: {
    gBabies: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as const,
    quillAndInk: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as const,
    cards: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788' as const,
    packets: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6' as const,
  },
  goerli: {
    cards: '0x843DA53761346a528121cC494883A4E7d2014a4e' as const,
    packets: '0xDDC03b04691Cb05708F2BCD6fd8Af4CA4de2843C' as const,
    gBabies: '0xbB047e6DaB367faE2eEbbd96867D2efe3C7158B3' as const,
    quillAndInk: '0x02167acD64dA8201b845507E9a8ddec16fe1F7b3' as const,
  },
  fuelStation: '0x5a6869ef5b81DCb58EBF51b8F893c31f5AFE3Fa8' as `0x${string}`,
  functionSignature: '0x0c11dedd' as `0x${string}`,
};
