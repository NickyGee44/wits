// import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
// import { publicClient, walletClient } from '../main';
// import {
//   bytesToHex,
//   encodePacked,
//   hexToBigInt,
//   hexToNumber,
//   isAddress,
//   isHex,
//   keccak256,
//   maxUint256,
//   numberToHex,
// } from 'viem';
// import { environment } from '../environments/environment';
// import toast from 'react-hot-toast';

// export const checkBalance = async (
//   address: `0x${string}`
// ): Promise<boolean> => {
//   const balance = await publicClient.getBalance({ address });
//   return balance > 10000000000000;
// };

// const userNonce = async (address: `0x${string}`) => {
//   const nonce = await publicClient.getTransactionCount({
//     address: address,
//   });
//   return nonce;
// };

// export const dripGas = async (address: `0x${string}`) => {
//   const gasLimit = 100000;
//   try {
//     if (!(await checkBalance(address))) {
//       const randomKey = generatePrivateKey();
//       const randomAccount = privateKeyToAccount(randomKey);
//       const nonce = await userNonce(randomAccount.address);
//       const { gasPrice } = await mineGasForTransaction(
//         nonce,
//         gasLimit,
//         randomAccount.address
//       );
//       await walletClient.sendTransaction({
//         account: randomAccount,
//         to: environment.fuelStation,
//         data: `${
//           environment.functionSignature
//         }000000000000000000000000${address.substring(2)}`,
//         gasPrice,
//       });
//     }
//   } catch (error) {
//     toast.error('Error claiming, please try again');
//   }
// };

// export default async function mineGasForTransaction(
//   nonce: string | number,
//   gas: string | number,
//   from: string
// ): Promise<{
//   duration: number;
//   gasPrice: bigint;
// }> {
//   const address = from;
//   nonce = isHex(nonce) ? hexToNumber(nonce) : nonce;
//   gas = isHex(gas) ? hexToNumber(gas) : gas;

//   if (!isAddress(address)) throw new Error('Invalid Address');

//   return await _mineFreeGas(gas as number, address, nonce as number);
// }

// async function _mineFreeGas(
//   gasAmount: number,
//   address: `0x${string}`,
//   nonce: number
// ): Promise<{
//   duration: number;
//   gasPrice: bigint;
// }> {
//   const nonceHash = hexToBigInt(keccak256(numberToHex(nonce, { size: 32 })));
//   const addressHash = hexToBigInt(
//     keccak256(encodePacked(['address'], [address]))
//   );
//   const nonceAddressXOR = nonceHash ^ addressHash;
//   const divConstant = maxUint256;
//   let candidate: `0x${string}`;
//   let iterations = 0;

//   const start = performance.now();

//   // eslint-disable-next-line no-constant-condition
//   while (true) {
//     candidate = bytesToHex(crypto.getRandomValues(new Uint8Array(32)));
//     const candidateHash = hexToBigInt(keccak256(candidate));
//     const resultHash = nonceAddressXOR ^ candidateHash;
//     const externalGas = divConstant / resultHash;

//     if (externalGas >= gasAmount) {
//       break;
//     }
//     // every 2k iterations, yield to the event loop
//     if (iterations++ % 1_000 === 0) {
//       await new Promise<void>((resolve) => setTimeout(resolve, 0));
//     }
//   }

//   const end = performance.now();

//   return {
//     duration: start - end,
//     gasPrice: BigInt(candidate),
//   };
// }
