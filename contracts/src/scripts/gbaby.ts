import { ethers, upgrades } from "hardhat";

async function main() {
  const factory = "Packets";
  const address = "0xCc083d5870f073d65ECF9a0D526314d714670D67";
  const ContractFactory = await ethers.getContractFactory(factory);
  const contract = await upgrades.upgradeProxy(address, ContractFactory);

  console.log("Contract upgraded: ", contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
