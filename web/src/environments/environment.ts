// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
// http://localhost:4300/.netlify/functions/addresses

export const environment = {
  production: false,
  ALCHEMY_KEY: 'm3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z',
  metadata: {
    url: 'https://d3q40xds4jmbwq.cloudfront.net',
    image: 'https://d24nwmc6w5dhne.cloudfront.net',
  },
  api: {
    base: 'http://localhost:4300/',
    addresses: '.netlify/functions/main',
  },
  chain: 'mumbai',
  mainnet: {
    gBabies: '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e' as const,
    quillAndInk: '0xd38123a8f534a7bbcefefa59e74f254a46818538' as const,
    cards: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788' as const,
    packets: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6' as const,
  },
  hardhat: {
    gBabies: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as const,
    quillAndInk: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as const,
    cards: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788' as const,
    packets: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6' as const,
  },
  mumbai: {
    cards: '0x4DC6BC7ea2d9F148f715D5Cd0c3D3937b3072F13' as const,
    packets: '0xa20F575F3754efEE0494E9FA1177209BAa85174B' as const,
    quillAndInk: '0x260e3B084f19a0684Ed730AA1f9bbecdD13E43e2' as const,
    gBabies: '0x2f1c6194B564e871133787953c9A7996E41F62d1' as const,
  },
  goerli: {
    cards: '0x6aa8a980f78E22b55cbb326E1351cC2578623DA3' as const,
    packets: '0x5CB234f98050485c9BFE44521f846035F7779177' as const,
    gBabies: '0xcA49cBA91B55cA7216586BDdFE4FbcBfF57E15a5' as const,
    quillAndInk: '0x18489f8666b06788957Da42F97aAf9Cb0E82d60' as const,
  },
};
