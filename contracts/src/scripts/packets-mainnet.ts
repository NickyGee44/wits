import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const Packets = await ethers.getContractFactory('Packets');
  const packets = await upgrades.deployProxy(Packets, [
    'https://wits-metadata.s3.us-east-2.amazonaws.com/',
    '.json',
    '0x4EBCDAf033Cf9Dc27Ca45fA6bB0Cd132c2382565',
    250,
    'WITS',
    '1',
    '0xE499e4803953C3C070B4A8e05107b2CC35ac5316',
  ]);
  let tx = await packets.setContracts(
    '0x0ff1f3a53f521d74af73fe7433abf802f91ddd4e',
    '0xd38123a8f534a7bbcefefa59e74f254a46818538',
    ethers.constants.AddressZero
  );
  await tx.wait();
  console.log(packets.address, 'PACKETS');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
