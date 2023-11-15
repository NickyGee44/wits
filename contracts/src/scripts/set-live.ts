import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const test = [
    '0x3B502B054715A8e0D8F657169615A88B2CCDD429',
    '0x1B90a714A6609f57a5f78A846fcFC617B1f17237',
  ];
  const packets = await ethers.getContractAt(
    'Packets',
    '0x11938E514FC800b1D8539dCB3FF2FF3FbD37C938'
  );

  const gBabies = await ethers.getContractAt(
    'Gbaby',
    '0x5236b48E1EB121Ca8B1d5DB64DdAcE764AD53D1A'
  );

  const quillAndInk = await ethers.getContractAt(
    'QuillAndInk',
    '0xdd9bacf25fAfA302269aF5341Ecb224762EB0D32'
  );

  for (const address of test) {
    await gBabies.mint(address, 3);
    await quillAndInk.adminMint([address], [3]);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
