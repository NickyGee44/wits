import { ethers, upgrades } from 'hardhat';

async function main() {
  const factory = 'Packets';
  const address = '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d';
  const ContractFactory = await ethers.getContractFactory(factory);
  const contract = await upgrades.upgradeProxy(address, ContractFactory);
  contract.setDeadAddress('0x000000000000000000000000000000000000dead');

  console.log('Contract upgraded: ', contract.address);

  await contract.setTotalSupply([1, 2, 3, 4], [5045, 1265, 370, 300]);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
