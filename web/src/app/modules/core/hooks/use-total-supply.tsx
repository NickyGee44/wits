import { useContractRead } from 'wagmi';
import { PACKETS_ABI } from '../constants/abi';

export function useTotalSupply(address: `0x${string}`, id: number) {
  const { data } = useContractRead({
    abi: PACKETS_ABI,
    address,
    functionName: 'totalSupply',
    args: [id],
    watch: true,
  });

  return data ? Number(data) : 0;
}
