import { getAddress } from 'viem';
import { createSignature } from './viem';
import { Handler, HandlerEvent } from '@netlify/functions';

const RAW_ADDRESSES = {
  '0x2E823A7c1a62F3Db8399a8b50884cdCbB9b88866': 10,
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': 5,
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266': 10,
  '0xf02DD82D4F5062E00fCD55B4501055faA8f2fE2C': 10,
  '0x1B90a714A6609f57a5f78A846fcFC617B1f17237': 3,
  '0x3B502B054715A8e0D8F657169615A88B2CCDD429': 3,
  '0x2b561a6C8e8F9ac79467B616a7685AF35EBF0bda': 3,
  '0xa858bC58EEc4075f40C4b962C58b21856BF30C23': 3,
  '0xF23464360622b83d02e1523F11F50bFEA2a355A6': 2,
  '0xDfB943Fe445013690203298d6DDDE80F17662702': 2,
  '0x801aCC2065E3eaF4fCb81866DD05888D41219000': 3,
  '0xb8C75f107e6b0f68bbc480899ddc0645C8B93Ab6': 2,
};

const ADDRESSES = Object.keys(RAW_ADDRESSES).reduce((acc, address) => {
  try {
    return {
      ...acc,
      [getAddress(address)]: RAW_ADDRESSES[address],
    };
  } catch (e) {
    return acc;
  }
}, {});

const handler: Handler = async (event: HandlerEvent) => {
  const { address } = event.queryStringParameters;
  try {
    const formatted = getAddress(address);
    console.log(formatted, ADDRESSES);
    const value = ADDRESSES[formatted];
    if (!value) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          error: 'Address not found',
        }),
      };
    }

    const signature = await createSignature(formatted, value);

    return {
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow from anywhere
      },
      statusCode: 200,
      body: JSON.stringify({
        address: formatted,
        value,
        signature,
      }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Address is invalid',
      }),
    };
  }
};

export { handler };
