import { useReadContract } from 'wagmi';
import { PACKETS_ABI } from '../constants/abi';

export function useStage(address: `0x${string}`) {
  const { data } = useReadContract({
    abi: PACKETS_ABI,
    address,
    functionName: 'activeIndex',
    args: [],
  });

  return data ? Number(data) : 0;
}
