import { useContractRead, useContractWrite } from 'wagmi';
import { useWrite } from './use-write';

export function useApproval(
  tokenAddress: `0x${string}`,
  account: `0x${string}`,
  operator: `0x${string}`,
  reset: () => void
) {
  const { data: isApprovedForAll } = useContractRead({
    abi: [
      {
        inputs: [
          {
            internalType: 'address',
            name: 'account',
            type: 'address',
          },
          {
            internalType: 'address',
            name: 'operator',
            type: 'address',
          },
        ],
        name: 'isApprovedForAll',
        outputs: [
          {
            internalType: 'bool',
            name: '',
            type: 'bool',
          },
        ],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address: tokenAddress,
    functionName: 'isApprovedForAll',
    args: [account, operator],
    watch: true,
  });

  const { loading, action, data } = useWrite(
    {
      abi: [
        {
          inputs: [
            {
              internalType: 'address',
              name: 'operator',
              type: 'address',
            },
            {
              internalType: 'bool',
              name: 'approved',
              type: 'bool',
            },
          ],
          name: 'setApprovalForAll',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
      ],
      address: tokenAddress,
      functionName: 'setApprovalForAll',
      args: [operator, true],
    },
    reset,
    'Approve',
    true
  );

  return {
    isApprovedForAll: isApprovedForAll as boolean,
    loading,
    tx: data,
    write: action,
  };
}
