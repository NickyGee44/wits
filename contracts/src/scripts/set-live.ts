import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const packet = await ethers.getContractAt(
    'Packets',
    '0x2B0243F5a0f8c690BCdAE0e00C669e45E44d6A0d'
  );
  let tx = await packet.setPrice(1, ethers.utils.parseEther('0.02'));
  await tx.wait();
  tx = await packet.setPrice(2, ethers.utils.parseEther('0.08'));
  await tx.wait();
  tx = await packet.setPrice(3, ethers.utils.parseEther('0.225'));
  await tx.wait();
  tx = await packet.setPrice(4, ethers.utils.parseEther('0.125'));
  await tx.wait();
  tx = await packet.setDiscountPrice(ethers.utils.parseEther('0.018'));
  await tx.wait();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
