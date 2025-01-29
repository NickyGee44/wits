import { useReadContract } from 'wagmi';
import { PACKETS_ABI } from '../constants/abi';

export function useTotalSupply(address: `0x${string}`, id: number) {
  const { data } = useReadContract({
    abi: PACKETS_ABI,
    address,
    functionName: 'totalSupply',
    args: [id],
  });

  return data ? Number(data) : 0;
}
