import { ethers, upgrades, run } from 'hardhat';

async function main() {
  const signers = await ethers.getSigners();
  const testingAddress = '0xf02DD82D4F5062E00fCD55B4501055faA8f2fE2C';

  const Gbabies = await ethers.getContractFactory('Gbaby');
  const gbabies = await upgrades.deployProxy(Gbabies, []);
  await gbabies.mint(testingAddress, 2);

  console.log('=================== GBABIES =====================');

  const Quill = await ethers.getContractFactory('QuillAndInk');
  const quill = await upgrades.deployProxy(Quill, [
    ethers.constants.HashZero,
    signers[0].address,
    1000,
    [signers[0].address],
    [100],
  ]);
  await quill.adminMint([testingAddress], [2]);

  console.log('=================== QUILL =====================');

  const Packets = await ethers.getContractFactory('Packets');
  const packets = await upgrades.deployProxy(Packets, [
    '',
    '',
    signers[0].address,
    1000,
    'Name',
    'Version',
    signers[0].address,
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
