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
    cards: '0xBE8c4D70E379AFe0068dAA546038097F58006459' as const,
    packets: '0xB97BE417cf491BA49A96566A8886DC58B1723a7c' as const,
    quillAndInk: '0x75c180302d758c0077137c045326Ce7aD3e8c73F' as const,
    gBabies: '0x69A5A0e9920aa3a85973136F90F961dD962f5e4b' as const,
  },
  goerli: {
    cards: '0x6aa8a980f78E22b55cbb326E1351cC2578623DA3' as const,
    packets: '0x5CB234f98050485c9BFE44521f846035F7779177' as const,
    gBabies: '0xcA49cBA91B55cA7216586BDdFE4FbcBfF57E15a5' as const,
    quillAndInk: '0x18489f8666b06788957Da42F97aAf9Cb0E82d60' as const,
  },
};
