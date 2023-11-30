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
  chain: 'goerli',
  mainnet: {
    gBabies: '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e' as const,
    quillAndInk: '0xd38123a8f534a7bbcefefa59e74f254a46818538' as const,
  },
  hardhat: {
    gBabies: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0' as const,
    quillAndInk: '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707' as const,
    cards: '0x610178dA211FEF7D417bC0e6FeD39F05609AD788' as const,
    packets: '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6' as const,
  },
  mumbai: {
    cards: '0xab37CB54be3b983Dcd9D530B59b70040C2280E83' as const,
    packets: '0x1c3cF14fB52AE4feD9d6D73694F278F946FfC85d' as const,
    quillAndInk: '0x1e89A706Ee63dc488435c4f6175AfA7168B58d61' as const,
    gBabies: '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d' as const,
  },
  goerli: {
    cards: '0x9FC5df68cFE7826D4E8a957E50DD0eef567518D8' as const,
    packets: '0x260e3B084f19a0684Ed730AA1f9bbecdD13E43e2' as const,
    gBabies: '0xc7780b2BF9c6B5f04B3e929695EF5C97974F8883' as const,
    quillAndInk: '0x2E976FDB0dAFBD88e3A69D48C332e72db894688a' as const,
  },
};
