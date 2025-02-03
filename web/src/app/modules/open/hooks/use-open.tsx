import { useState, useCallback, useEffect } from 'react';
import { useAddRecentTransaction } from '@rainbow-me/rainbowkit';
import { sortBy } from 'lodash';
import toast from 'react-hot-toast';
import { decodeEventLog, Log, encodeFunctionData } from 'viem';
import { useAccount, useWaitForTransactionReceipt } from 'wagmi';
import { TransactionLink } from '../../core/components/transaction';
import { CARDS_ABI, PACKETS_ABI } from '../../core/constants/abi';
import { environment } from '../../../../environments/environment';
import { getGeneralPaymasterInput } from 'viem/zksync';
import { useAbstractClient } from '@abstract-foundation/agw-react';
import { PAYMASTER_ADDRESS } from '../../core/constants/utils';
const access_token = process.env.NEXT_PUBLIC_ACCESS_TOKEN;

if (!access_token) {
  throw new Error('Missing environment variables');
}

// Define the structure of the PacketOpened event
interface PacketOpenedEvent {
  eventName: 'PacketOpened';
  args: {
    cardId: bigint;
    startingId: bigint;
    total: bigint;
  };
}

export function useOpen(
  packets: `0x${string}`,
  ids: number[],
  amounts: number[],
  reset: () => void
) {
  const { address } = useAccount();
  const [hash, setHash] = useState<`0x${string}` | undefined>(undefined);
  const addRecentTransaction = useAddRecentTransaction();
  const [idsByPackets, setIdsByPackets] = useState<
    { id: number; cards: number[] }[]
  >([]);
  const [isApiLoading, setIsApiLoading] = useState(false);

  const calculateIdsByPackets = useCallback(
    (logs: Log[]) => {
      return sortBy(
        logs
          .filter((log) => log.address.toLowerCase() === packets.toLowerCase())
          .map((log) => {
            try {
              const decodedLog = decodeEventLog({
                abi: [...CARDS_ABI, ...PACKETS_ABI],
                data: log.data,
                topics: log.topics,
                strict: false,
              }) as unknown as PacketOpenedEvent;

              return decodedLog;
            } catch {
              return null;
            }
          })
          .filter(
            (log): log is PacketOpenedEvent => log?.eventName === 'PacketOpened'
          )
      ).map((log) => {
        return {
          id: Number(log.args.cardId),
          cards: new Array(Number(log.args.total))
            .fill(0)
            .map((_, i) => Number(log.args.startingId) + i),
        };
      });
    },
    [packets]
  );

  const { data: agwClient } = useAbstractClient();

  const handleWriteContract = async () => {
    try {
      if (!agwClient) return;

      const hash = await agwClient.sendTransactionBatch({
        calls: [
          {
            to: packets,
            args: [packets, true],
            data: encodeFunctionData({
              abi: PACKETS_ABI,
              functionName: 'setApprovalForAll',
              args: [packets, true],
            }),
          },
          {
            to: packets,
            args: [ids, amounts],
            data: encodeFunctionData({
              abi: PACKETS_ABI,
              functionName: 'open',
              args: [ids, amounts],
            }),
          },
        ],
        paymaster: PAYMASTER_ADDRESS,
        paymasterInput: getGeneralPaymasterInput({
          innerInput: '0x',
        }),
      });

      setHash(hash);

      if (hash) {
        toast.success(<TransactionLink tx={hash} />, { duration: 5000 });
        addRecentTransaction({
          hash: hash,
          description: 'Open Pack',
        });
      }
    } catch (error) {
      toast.error('Error opening');
      console.error(error);
    }
  };

  const {
    data: txData,
    isLoading: isTxLoading,
    isSuccess: isTxSuccess,
  } = useWaitForTransactionReceipt({
    hash: hash as `0x${string}` | undefined,
  });

  useEffect(() => {
    const processTransaction = async () => {
      if (isTxSuccess && txData) {
        const calculatedIdsByPackets = calculateIdsByPackets(txData.logs);

        setIsApiLoading(true);
        try {
          const ApiData = calculatedIdsByPackets.map((packet) => {
            return {
              packetType: packet.id,
              startTokenId: packet.cards[0],
              endTokenId: packet.cards[packet.cards.length - 1],
            };
          });

          await fetch(environment.api.openPackets, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: access_token || '',
            },
            body: JSON.stringify(ApiData),
          });
          setIdsByPackets(calculatedIdsByPackets);
        } catch (error) {
          console.error('API call failed:', error);
          toast.error('Server Error');
        } finally {
          setIsApiLoading(false);
        }
      }
    };

    processTransaction();
  }, [isTxSuccess, txData, calculateIdsByPackets]);

  const open = async () => {
    try {
      if (address) {
        await handleWriteContract();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    open,
    idsByPackets,
    isSuccess: isTxSuccess,
    isLoading: isTxLoading || isApiLoading,
  };
}
