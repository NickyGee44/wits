import { ethers, upgrades } from 'hardhat';

async function main() {
  // const factory = 'Packets';
  // const address = '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d';
  // const ContractFactory = await ethers.getContractFactory(factory);
  // const contract = await upgrades.upgradeProxy(address, ContractFactory);

  // console.log('Contract upgraded: ', contract.address);

  // await contract.setTotalSupply([1, 2, 3, 4], [5045, 1265, 370, 300]);
  const contract = new ethers.Contract(
    '0xd38123a8f534a7bbcefefa59e74f254a46818538',
    [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'packetsAddress_',
            type: 'address',
          },
        ],
        name: 'setPacketsAddress',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    new ethers.providers.JsonRpcProvider(
      `https://eth-mainnet.g.alchemy.com/v2/m3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z`
    )
  );
  await contract
    .connect(
      new ethers.Wallet(
        'd58dd25b5c5561ff57ca51dfcf898ff108b92fdf105e3b6b5b97b7fe581e0ed1',
        new ethers.providers.JsonRpcProvider(
          `https://eth-mainnet.g.alchemy.com/v2/m3ADmeHfQSDpLG8JGiakIHdOwKdH9p_Z`
        )
      )
    )
    .setPacketsAddress('0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
