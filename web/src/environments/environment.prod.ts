export const environment = {
  ALCHEMY_KEY: 'm3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z',
  metadata: {
    url: 'https://d3q40xds4jmbwq.cloudfront.net',
    image: 'https://d24nwmc6w5dhne.cloudfront.net',
  },
  chain: 'mumbai',
  mumbai: {
    cards: '0x4DC6BC7ea2d9F148f715D5Cd0c3D3937b3072F13' as const,
    packets: '0xa20F575F3754efEE0494E9FA1177209BAa85174B' as const,
    quillAndInk: '0x260e3B084f19a0684Ed730AA1f9bbecdD13E43e2' as const,
    gBabies: '0x2f1c6194B564e871133787953c9A7996E41F62d1' as const,
  },
  api: {
    base: '/',
    addresses: '.netlify/functions/main',
  },
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
  goerli: {
    cards: '0x843DA53761346a528121cC494883A4E7d2014a4e' as const,
    packets: '0xDDC03b04691Cb05708F2BCD6fd8Af4CA4de2843C' as const,
    gBabies: '0xbB047e6DaB367faE2eEbbd96867D2efe3C7158B3' as const,
    quillAndInk: '0x02167acD64dA8201b845507E9a8ddec16fe1F7b3' as const,
  },
};
