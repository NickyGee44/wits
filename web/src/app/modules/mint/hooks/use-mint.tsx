import { useContractRead } from 'wagmi';
import { PACKETS_ABI } from '../../core/constants/abi';
import { useStage } from '../../core/hooks/use-stage';
import { useApi } from '../../core/hooks/use-api';
import { useEffect, useMemo } from 'react';
import { useWrite } from '../../core/hooks/use-write';

export function usePresaleMint(
  address: `0x${string}`,
  account: `0x${string}`,
  mintRequests: {
    id: number;
    amount: number;
  }[],
  value: bigint,
  reset: () => void
) {
  const { signature, fetchSignature, assignedValue } = useApi(account);
  const { data } = useMinted(account, address);

  useEffect(() => {
    fetchSignature();
  }, [fetchSignature]);

  const totalMintable = useMemo(() => {
    const delta = assignedValue - data;
    return delta > 0 ? delta : 0;
  }, [assignedValue, data]);

  const presaleRequest = useMemo(() => {
    return {
      amount: assignedValue,
      recipient: account,
    };
  }, [assignedValue, account]);

  const { action, loading } = useWrite(
    {
      abi: PACKETS_ABI,
      address,
      functionName: 'presaleMint',
      args: [presaleRequest, mintRequests, signature],
      value,
    },
    reset,
    'Presale Mint'
  );
  const stage = useStage(address);

  return {
    write: action,
    totalMintable,
    loading,
    isLive: stage === 1,
  };
}

export function usePublicMint(
  address: `0x${string}`,
  mintRequests: {
    id: number;
    amount: number;
  }[],
  value: bigint,
  reset: () => void
) {
  const { action, loading } = useWrite(
    {
      abi: PACKETS_ABI,
      address,
      functionName: 'publicMint',
      args: [mintRequests],
      value,
    },
    reset,
    'Public Mint'
  );
  const stage = useStage(address);
  const isLive = stage === 2;

  return { write: action, isLive, loading };
}

export function useMinted(account: `0x${string}`, tokenAddress: `0x${string}`) {
  const { data } = useContractRead({
    abi: PACKETS_ABI,
    address: tokenAddress,
    functionName: 'minted',
    args: [account],
    watch: true,
  });

  return { data: Number(data as bigint) };
}
