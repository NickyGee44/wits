import { BigNumber, Wallet, getDefaultProvider } from 'ethers';
import { ethers, upgrades } from 'hardhat';

// maxPriorityFeePerGas: 10e9, // 10 gwei
// maxFeePerGas: 15e9,
// gasLimit: 200000,

const FEE_DATA = {
  maxFeePerGas: ethers.utils.parseUnits('100', 'gwei'),
  maxPriorityFeePerGas: BigNumber.from('10000000000'),
  lastBaseFeePerGas: ethers.utils.parseUnits('100', 'gwei'),
  gasPrice: ethers.utils.parseUnits('10', 'gwei'),
};

async function main() {
  const provider = new ethers.providers.FallbackProvider([ethers.provider], 1);
  provider.getFeeData = async () => FEE_DATA;

  const signer = new Wallet(process.env.PRIVATE_KEY!, provider);

  const Packets = await ethers.getContractFactory(
    'WitsPacketUpgradeable',
    signer
  );

  const packets = await upgrades.deployProxy(Packets, [
    'Name',
    '',
    '',
    '0x6b969fd89de634d8de3271ebe97734feffcd58ee',
    signer.address,
    0,
    signer.address,
  ]);

  console.log('=================== PACKETS =====================');
  console.log(packets.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
