import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const signers = await ethers.getSigners();
  const testingAddress = '0xf02DD82D4F5062E00fCD55B4501055faA8f2fE2C';
  const testingAddress2 = '0xa4d39c33Cfe7630b413C2eFc9bD8861909B70E34';

  const Gbabies = await ethers.getContractFactory('Gbaby');
  const gbabies = await upgrades.deployProxy(Gbabies, []);

  await gbabies.mint(testingAddress, 2);
  await gbabies.mint(testingAddress2, 2);

  console.log('=================== GBABIES =====================');

  const Quill = await ethers.getContractFactory('QuillAndInk');
  const quill = await upgrades.deployProxy(Quill, [
    ethers.constants.HashZero,
    signers[0].address,
    1000,
    [signers[0].address],
    [100],
  ]);

  await quill.adminMint([testingAddress, testingAddress2], [2, 2]);

  console.log('=================== QUILL =====================');

  const Packets = await ethers.getContractFactory('Packets');
  const packets = await upgrades.deployProxy(Packets, [
    'https://wits-metadata.s3.us-east-2.amazonaws.com/',
    '.json',
    '0x4EBCDAf033Cf9Dc27Ca45fA6bB0Cd132c2382565',
    250,
    'WITS',
    '1',
    '0xE499e4803953C3C070B4A8e05107b2CC35ac5316',
  ]);

  console.log('=================== PACKETS =====================');

  const Cards = await ethers.getContractFactory('Cards');
  const cards = await upgrades.deployProxy(Cards, [
    {
      payees: [signers[0].address],
      shares: [100],
      royaltiesRecipient: signers[0].address,
      royaltyValue: 1000,
      stages: [],
      tokenConfig: {
        name: '',
        symbol: '',
        supply: 50000,
        prefix: '',
        suffix: '',
      },
    },
    packets.address,
  ]);

  console.log('=================== CARDS =====================');

  await packets.setContracts(gbabies.address, quill.address, cards.address);
  let tx = await packets.setDiscountPrice(ethers.utils.parseEther('0.0008'));
  await tx.wait();

  console.log('=================== RANDOMIZER =====================');

  const Randomizer = await ethers.getContractFactory('Randomizer');
  const randomizer = await upgrades.deployProxy(Randomizer, [packets.address]);

  await packets.setRandomizer(randomizer.address);
  await packets.setSigner('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
  await packets.setActiveIndex(1);

  console.log({
    cards: cards.address,
    packets: packets.address,
    gbabies: gbabies.address,
    quill: quill.address,
    randomizer: randomizer.address,
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
