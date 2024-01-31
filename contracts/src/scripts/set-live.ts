import { ethers, upgrades, run } from 'hardhat';

async function main() {
  // const test = [
  //   '0x3B502B054715A8e0D8F657169615A88B2CCDD429',
  //   '0x1B90a714A6609f57a5f78A846fcFC617B1f17237',
  //   '0xF23464360622b83d02e1523F11F50bFEA2a355A6',
  //   '0x2b561a6C8e8F9ac79467B616a7685AF35EBF0bda',
  //   '0xa858bC58EEc4075f40C4b962C58b21856BF30C23',
  //   '0xF23464360622b83d02e1523F11F50bFEA2a355A6',
  //   '0xDfB943Fe445013690203298d6DDDE80F17662702',
  //   '0x801aCC2065E3eaF4fCb81866DD05888D41219000',
  //   '0xb8C75f107e6b0f68bbc480899ddc0645C8B93Ab6',
  // ];
  const packets = await ethers.getContractAt(
    'Packets',
    '0x195e38ffdbEEf9CE2FddbD9002B14C7a3d127B6f'
  );

  console.log(await packets.uri(2));

  // const gBabies = await ethers.getContractAt(
  //   'Gbaby',
  //   '0x69A5A0e9920aa3a85973136F90F961dD962f5e4b'
  // );

  // const quillAndInk = await ethers.getContractAt(
  //   'QuillAndInk',
  //   '0x75c180302d758c0077137c045326Ce7aD3e8c73F'
  // );

  // for (const address of test) {
  //   await gBabies.mint(address, 3);
  //   await quillAndInk.adminMint([address], [3]);
  // }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
