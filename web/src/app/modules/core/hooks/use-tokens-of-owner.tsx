import { useContractReads, useContractRead } from 'wagmi';

export function useTokensOfOwnerUsingIndex(
  address: `0x${string}`,
  account: `0x${string}`,
  balance: number
) {
  const indexes = Array.from({ length: balance }, (_, i) => i);
  const contract = {
    abi: [
      {
        inputs: [
          { internalType: 'address', name: 'owner', type: 'address' },
          { internalType: 'uint256', name: 'index', type: 'uint256' },
        ],
        name: 'tokenOfOwnerByIndex',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
      },
    ] as const,
    address,
  };
  const contracts = indexes.map((index) => ({
    ...contract,
    functionName: 'tokenOfOwnerByIndex',
    args: [account, index],
  }));
  const { data } = useContractReads({
    contracts,
  });

  if (!data) return [];
  return data.map((id) => Number(id.result));
}

export function useTokensOfOwner(
  address: `0x${string}`,
  account: `0x${string}`
) {
  const { data } = useContractRead({
    abi: [
      {
        inputs: [{ internalType: 'address', name: 'owner', type: 'address' }],
        name: 'tokensOfOwner',
        outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    address,
    functionName: 'tokensOfOwner',
    args: [account],
    watch: true,
  });
  return formatTokens(data as bigint[]);
}

function formatTokens(tokens: bigint[]) {
  return tokens ? tokens.map(Number) : [];
}
