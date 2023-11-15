import { getAddress } from 'viem';

export const RAW_ADDRESSES = {
  '0x2E823A7c1a62F3Db8399a8b50884cdCbB9b88866': 10,
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': 5,
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266': 10,
  '0xf02DD82D4F5062E00fCD55B4501055faA8f2fE2C': 10,
};

export const ADDRESSES = Object.keys(RAW_ADDRESSES).reduce((acc, address) => {
  try {
    return {
      ...acc,
      [getAddress(address)]: RAW_ADDRESSES[address],
    };
  } catch (e) {
    return acc;
  }
}, {});
