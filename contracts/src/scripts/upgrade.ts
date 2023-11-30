import { ethers, upgrades } from 'hardhat';

async function main() {
  // const factory = 'QuillAndInk';
  // const address = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
  // const ContractFactory = await ethers.getContractFactory(factory);
  // const contract = await upgrades.upgradeProxy(address, ContractFactory, {
  //   call: { fn: 'initializeV2' },
  // });

  const factory = 'Packets';
  const address = '0x260e3B084f19a0684Ed730AA1f9bbecdD13E43e2';
  const ContractFactory = await ethers.getContractFactory(factory);
  const contract = await upgrades.upgradeProxy(address, ContractFactory);

  console.log('Contract upgraded: ', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
