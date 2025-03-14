// This file can be replaced during build by using the `fileReplacements` array.
// When building for production, this file is replaced with `environment.prod.ts`.
// http://localhost:4300/.netlify/functions/addresses

export const environment = {
  production: false,
  ALCHEMY_KEY: 'm3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z',
  metadata: {
    url: 'https://api.wits.academy/packs/token',
    image: 'https://api.wits.academy/images/cards',
  },
  api: {
    base: 'https://api.wits.academy',
    openPackets: 'https://api.wits.academy/packs/open-packet',
    auth: 'https://api.wits.academy/auth',
    addresses: '.netlify/functions/main',
  },
  packImages: {
    single: 'https://wits-metadata.s3.us-east-2.amazonaws.com/SinglePack.png',
    booster: 'https://wits-metadata.s3.us-east-2.amazonaws.com/BoosterBox.png',
    jumbo: 'https://wits-metadata.s3.us-east-2.amazonaws.com/JumboBox.png',
    mystery: 'https://wits-metadata.s3.us-east-2.amazonaws.com/MysteryBox.png',
  },
  chain: 'mumbai',
  mainnet: {
    gBabies: '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e' as const,
    quillAndInk: '0xd38123a8f534a7bbcefefa59e74f254a46818538' as const,
    cards: '0x182Ae696A8A764CB47254ACB40B7032f62583a65' as const,
    packets: '0x5120F677C9a453AC960eCA1fb274D25D96aAAdC5' as const,
  },
  abstract: {
    gBabies: '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e' as const,
    quillAndInk: '0xd38123a8f534a7bbcefefa59e74f254a46818538' as const,
    cards: '0x1FF12D45b04136C6838d4AA4BB35E7449103F22b' as const,
    packets: '0xac6fA954a7F9879033B48ddB766024c1D16fF180' as const,
  },

  //testnet
  // abstract: {
  //   gBabies: '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e' as const,
  //   quillAndInk: '0xd38123a8f534a7bbcefefa59e74f254a46818538' as const,
  //   cards: '0xc9BA5AEb4c566bD309BF6eeD4b6fA880d57d65AB' as const,
  //   packets: '0x190CC4D249af8825B40dB622C45AEF43d8473212' as const,
  // },

  // mainnet: {
  //   gBabies: '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e' as const,
  //   quillAndInk: '0xd38123a8f534a7bbcefefa59e74f254a46818538' as const,
  //   cards: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788' as const,
  //   packets: '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d' as const,
  // },
  hardhat: {
    gBabies: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as const,
    quillAndInk: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as const,
    cards: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788' as const,
    packets: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6' as const,
  },
  mumbai: {
    cards: '0xe6718CcA1f367549E4070518a4f4C9ca0B872892' as const,
    packets: '0x51Ac32651d8a33c137B9B56BCdD1E037CACB7A8A' as const,
    quillAndInk: '0x71e90Ef6ff6a322ED24838Faca5F80996eDf615B' as const,
    gBabies: '0x5CB234f98050485c9BFE44521f846035F7779177' as const,
  },
  goerli: {
    cards: '0x6aa8a980f78E22b55cbb326E1351cC2578623DA3' as const,
    packets: '0x5CB234f98050485c9BFE44521f846035F7779177' as const,
    gBabies: '0xcA49cBA91B55cA7216586BDdFE4FbcBfF57E15a5' as const,
    quillAndInk: '0x18489f8666b06788957Da42F97aAf9Cb0E82d60' as const,
  },
};
