import { ethers } from "hardhat";

async function main() {
  const gbabies = await ethers.getContractAt(
    "Gbaby",
    "0x33534f3C19b87E2A5De198E83a44dB2ACD0427a7"
  );

  //   let tx = await gbabies.mint("0x019122362AbdF035256fB34022d763E771484bB0", 3);
  //   await tx.wait();

  //   tx = await gbabies.mint("0x3B502B054715A8e0D8F657169615A88B2CCDD429", 3);
  //   await tx.wait();

  //   tx = await gbabies.mint("0xa858bC58EEc4075f40C4b962C58b21856BF30C23", 3);
  //   await tx.wait();

  const quill = await ethers.getContractAt(
    "QuillAndInk",
    "0x6e0Af700aC6AeEDe56b4C8ea80c4d902076B2D1D"
  );

  let tx = await quill.adminMint(
    [
      "0x019122362AbdF035256fB34022d763E771484bB0",
      "0x3B502B054715A8e0D8F657169615A88B2CCDD429",
      "0xa858bC58EEc4075f40C4b962C58b21856BF30C23",
    ],
    [3, 3, 3]
  );

  await tx.wait();
}

main();
