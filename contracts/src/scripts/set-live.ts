import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const contract = await ethers.getContractAt(
    'WitsPacketUpgradeable',
    '0xE19A80c2AbB178dc36329781431BD677372e4185'
  );

  const tx = await contract.setActiveIndex(1);
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
