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
    '0x51Ac32651d8a33c137B9B56BCdD1E037CACB7A8A'
  );

  // const gBabies = await ethers.getContractAt(
  //   'Gbaby',
  //   '0x5CB234f98050485c9BFE44521f846035F7779177'
  // );

  // const quillAndInk = await ethers.getContractAt(
  //   'QuillAndInk',
  //   '0x71e90Ef6ff6a322ED24838Faca5F80996eDf615B'
  // );

  // for (const address of test) {
  //   await gBabies.mint(address, 3);
  //   await quillAndInk.adminMint([address], [3]);
  // }

  packets.setSigner('0xE499e4803953C3C070B4A8e05107b2CC35ac5316');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
