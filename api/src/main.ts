import { ADDRESSES } from 'addresses';
import { getAddress } from 'viem';
import { createSignature } from './viem';
import { Handler, HandlerEvent } from '@netlify/functions';

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
