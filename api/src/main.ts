import { getAddress } from 'viem';
import { createSignature } from './viem';
import { Handler, HandlerEvent } from '@netlify/functions';

const RAW_ADDRESSES = {
  '0x2E823A7c1a62F3Db8399a8b50884cdCbB9b88866': 10,
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8': 5,
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266': 10,
  '0xf02DD82D4F5062E00fCD55B4501055faA8f2fE2C': 10,
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
