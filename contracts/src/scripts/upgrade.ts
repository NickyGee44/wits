import { ethers, upgrades } from 'hardhat';

async function main() {
  // const factory = 'QuillAndInk';
  // const address = '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707';
  // const ContractFactory = await ethers.getContractFactory(factory);
  // const contract = await upgrades.upgradeProxy(address, ContractFactory, {
  //   call: { fn: 'initializeV2' },
  // });

  const factory = 'Packets';
  const address = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6';
  const ContractFactory = await ethers.getContractFactory(factory);
  const contract = await upgrades.upgradeProxy(address, ContractFactory);

  console.log('Contract upgraded: ', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
