import { useContractWrite, useWaitForTransaction } from 'wagmi';
import { PACKETS_ABI, CARDS_ABI } from '../../core/constants/abi';
import { decodeEventLog } from 'viem';
import { sortBy } from 'lodash';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { TransactionLink } from '../../core/components/transaction';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';

export function useOpen(
  packets: `0x${string}`,
  ids: number[],
  amounts: number[],
  reset: () => void
) {
  const addRecentTransaction = useAddRecentTransaction();

  const {
    writeAsync,
    data,
    isSuccess,
    reset: writeReset,
  } = useContractWrite({
    abi: PACKETS_ABI,
    address: packets,
    functionName: 'open',
    args: [ids, amounts],
    onSettled: reset,
    onSuccess: (data) => {
      toast.success(<TransactionLink tx={data.hash} />, { duration: 5000 });
      addRecentTransaction({
        hash: data.hash,
        description: 'Open Pack',
        confirmations: 10,
      });
    },
    onError: (error) => {
      toast.error('Error opening');
      console.error(error);
    },
  });

  const tx = data?.hash;

  const { data: txData } = useWaitForTransaction({
    hash: tx,
  });

  const logs = txData?.logs;

  const idsByPackets = useMemo(() => {
    return (
      sortBy(
        logs
          ?.filter((log) => log.address.toLowerCase() === packets.toLowerCase())
          .map((log) =>
            decodeEventLog({
              abi: [...CARDS_ABI, ...PACKETS_ABI],
              data: log.data,
              topics: log.topics,
              strict: false,
            })
          )
          .filter((log) => log?.eventName === 'PacketOpened'),
        'args.startingId'
      ) as {
        eventName: string;
        args: { cardId: bigint; startingId: bigint; total: bigint };
      }[]
    ).map((log) => {
      return {
        id: Number(log.args.cardId),
        cards: new Array(Number(log.args.total))
          .fill(0)
          .map((_, i) => Number(log.args.startingId) + i),
      };
    });
  }, [logs]);

  const open = async () => {
    try {
      await writeAsync();
    } catch (error) {
      console.error(error);
    }
  };

  return {
    open,
    idsByPackets,
    // idsByPackets: [{ id: 4, cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }],
    isSuccess,
    writeReset,
  };
}
