import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const test = '0xf02DD82D4F5062E00fCD55B4501055faA8f2fE2C';
  const packets = await ethers.getContractAt(
    'Packets',
    '0xC9a67E383c5b39bA48723C84Eb9095D9e0d13Ff9'
  );

  const gBabies = await ethers.getContractAt(
    'Gbaby',
    '0x79436b6E87b7360B72A2BcAFEA2367581697ba08'
  );

  const quillAndInk = await ethers.getContractAt(
    'QuillAndInk',
    '0x6606cd1c7b7Df63c6ca70B2d2e68e46d19DdDE9a'
  );

  await gBabies.mint(test, 3);
  await quillAndInk.adminMint([test], [3]);

  // await packets.setPrice(1, ethers.utils.parseEther('0.1'));
  // await packets.setActiveIndex(2);

  // await packets.setSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
