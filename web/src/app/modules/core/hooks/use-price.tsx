import { useContractRead } from 'wagmi';
import { PACKETS_ABI } from '../constants/abi';

export function usePrice(address: `0x${string}`, stage: number): bigint {
  const { data } = useContractRead({
    abi: PACKETS_ABI,
    address,
    functionName: 'price',
    args: [stage],
  });

  return (data as bigint) ?? BigInt(0);
}

export function useDiscountedPrice(address: `0x${string}`) {
  const { data } = useContractRead({
    abi: PACKETS_ABI,
    address,
    functionName: 'discountPrice',
  });

  return (data as bigint) ?? BigInt(0);
}