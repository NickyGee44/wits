import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers, upgrades } from 'hardhat';

describe('Test', () => {
  let contract: any;
  let signers: SignerWithAddress[];

  beforeEach(async () => {
    signers = await ethers.getSigners();
    const signer = signers[0];
    const Template = await ethers.getContractFactory('WitsPacketUpgradeable');
    console.log('Deploying...', Template);
    contract = await upgrades.deployProxy(Template, [
      'Name',
      '',
      '',
      '0x6b969fd89de634d8de3271ebe97734feffcd58ee',
      signer.address,
      0,
      signer.address,
    ]);
    await contract.deployed();
  });

  it('should return the correct name', async () => {
    const domain = await contract.eip712Domain();
    let signer = signers[0];
    const signature = await signer._signTypedData(
      {
        name: domain.name,
        version: domain.version,
        chainId: domain.chainId,
        verifyingContract: domain.verifyingContract,
      },
      {
        PresaleRequest: [
          {
            name: 'amount',
            type: 'uint256',
          },
          {
            name: 'receipient',
            type: 'address',
          },
        ],
      },
      {
        amount: 10,
        receipient: signer.address,
      }
    );

    contract.presaleMint(
      [
        {
          id: 1,
          amount: 1,
        },
        {
          id: 2,
          amount: 0,
        },
        {
          id: 3,
          amount: 0,
        },
        {
          id: 4,
          amount: 0,
        },
      ],
      {
        receipient: signers[0].address,
        amount: 10,
      },
      signature,
      {
        value: ethers.utils.parseEther('0.1'),
      }
    );
  });
});
