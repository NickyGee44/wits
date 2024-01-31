import { PACKETS_ABI } from '../../core/constants/abi';
import { useStage } from '../../core/hooks/use-stage';
import { useWrite } from '../../core/hooks/use-write';

export function useBurnMint(
  address: `0x${string}`,
  gbabies: number[],
  quillAndInkIds: number[],
  value: bigint,
  reset: () => void
) {
  const { action, loading } = useWrite(
    {
      address,
      abi: PACKETS_ABI,
      functionName: 'burnMint',
      args: [gbabies, quillAndInkIds],
      value,
    },
    reset,
    'Burn Mint'
  );
  const stage = useStage(address);
  const isLive = stage === 1;

  return {
    isLive,
    loading,
    write: action,
  };
}
