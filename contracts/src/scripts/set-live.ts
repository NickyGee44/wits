import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const packets = await ethers.getContractAt(
    'Packets',
    '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'
  );

  const gBabies = await ethers.getContractAt(
    'Gbaby',
    '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0'
  );

  const quillAndInk = await ethers.getContractAt(
    'QuillAndInk',
    '0x5FC8d32690cc91D4c39d9d3abcBD16989F875707'
  );

  await gBabies.mint('0x70997970C51812dc3A010C7d01b50e0d17dc79C8', 3);
  await quillAndInk.adminMint(
    ['0x70997970C51812dc3A010C7d01b50e0d17dc79C8'],
    [3]
  );

  // await packets.setPrice(1, ethers.utils.parseEther('0.1'));
  // await packets.setActiveIndex(2);

  // await packets.setSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
