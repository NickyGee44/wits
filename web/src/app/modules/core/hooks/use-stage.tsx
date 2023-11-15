import { useContractRead } from 'wagmi';
import { PACKETS_ABI } from '../constants/abi';

export function useStage(address: `0x${string}`) {
  const { data } = useContractRead({
    abi: PACKETS_ABI,
    address,
    functionName: 'activeIndex',
    args: [],
    watch: true,
  });

  return data ? Number(data) : 0;
}
