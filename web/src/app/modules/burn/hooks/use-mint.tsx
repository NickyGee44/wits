import { BigNumber } from 'ethers';
import { PACKETS_ABI } from '../../core/constants/abi';
import { useStage } from '../../core/hooks/use-stage';
import { useWrite } from '../../core/hooks/use-write';

export function useBurnMint(
  address: `0x${string}`,
  gbabies: number[],
  quillAndInkIds: number[],
  value: BigNumber,
  reset: () => void
) {
  const { action } = useWrite(
    {
      address,
      abi: PACKETS_ABI,
      functionName: 'burnMint',
      args: [gbabies, quillAndInkIds],
      value,
    },
    reset
  );
  const { stage } = useStage();
  const isLive = stage === 1;

  return {
    isLive,
    write: action,
  };
}
