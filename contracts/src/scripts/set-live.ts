import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const test = [
    '0x2b561a6C8e8F9ac79467B616a7685AF35EBF0bda',
    '0xa858bC58EEc4075f40C4b962C58b21856BF30C23',
    '0xF23464360622b83d02e1523F11F50bFEA2a355A6',
    '0xDfB943Fe445013690203298d6DDDE80F17662702',
    '0x801aCC2065E3eaF4fCb81866DD05888D41219000',
    '0xb8C75f107e6b0f68bbc480899ddc0645C8B93Ab6',
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
