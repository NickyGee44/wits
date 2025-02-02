import { useReadContract } from 'wagmi';

export function useBalanceOf(address: `0x${string}`, account: `0x${string}`) {
  const { data: balance } = useReadContract({
    abi: [
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address,
    functionName: 'balanceOf',
    args: [account],
  });

  return Number(balance);
}

export function useBalanceOfERC1155(
  address: `0x${string}`,
  account: `0x${string}`,
  id: number
) {
  const { data: balance } = useReadContract({
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'id',
            type: 'uint256',
          },
        ],
        name: 'balanceOf',
        outputs: [
          {
            internalType: 'uint256',
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address,
    functionName: 'balanceOf',
    args: [account, BigInt(id)],
  });

  return Number(balance || 0);
}
