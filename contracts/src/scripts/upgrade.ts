import { ethers, upgrades } from 'hardhat';

async function main() {
  const factory = 'Packets';
  const address = '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d';
  const ContractFactory = await ethers.getContractFactory(factory);
  const contract = await upgrades.upgradeProxy(address, ContractFactory);
  contract.setDeadAddress('0x000000000000000000000000000000000000dead');

  console.log('Contract upgraded: ', contract.address);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
