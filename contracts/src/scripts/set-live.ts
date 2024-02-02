import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const packet = await ethers.getContractAt(
    'Packets',
    '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d'
  );
  let tx = await packet.setPrice(1, 0);
  await tx.wait();
  tx = await packet.setPrice(2, 0);
  await tx.wait();
  tx = await packet.setPrice(3, 0);
  await tx.wait();
  tx = await packet.setPrice(4, 0);
  await tx.wait();
  tx = await packet.setDiscountPrice(0);
  await tx.wait();
  tx = await packet.setRoyalties(
    '0x4EBCDAf033Cf9Dc27Ca45fA6bB0Cd132c2382565',
    500
  );
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
