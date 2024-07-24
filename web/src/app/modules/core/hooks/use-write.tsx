import {
  useAccountModal,
  useAddRecentTransaction,
} from '@rainbow-me/rainbowkit';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { TransactionLink } from '../components/transaction';
import { formatError } from '../utils/error';

export function useWrite(
  config: any,
  stateReset?: () => void,
  context?: string,
  dontShowAccountModal?: boolean,
  successMessage?: string,
  loadingMessage?: string
) {
  const [hash, setHash] = useState<`0x${string}` | undefined>();
  const [loading, setLoading] = useState(false);
  const addRecentTransaction = useAddRecentTransaction();
  const { openAccountModal } = useAccountModal();

  const { config: prepareConfig, error } = usePrepareContractWrite({
    ...config,
  });
  const { data, writeAsync, reset } = useContractWrite({
    ...prepareConfig,
    onSettled: () => {
      stateReset && stateReset();
      setLoading(false);
    },
    onSuccess: (data) => {
      toast.success(successMessage || <TransactionLink tx={data.hash} />, {
        duration: 3000,
      });
      setHash(data.hash);
      addRecentTransaction({
        hash: data.hash,
        description: context || 'Transaction',
        confirmations: 10,
      });
      if (!dontShowAccountModal) openAccountModal && openAccountModal();
      setLoading(false);
      reset();
    },
    onError: (error) => {
      setLoading(false);
      toast.error(formatError(error));
    },
  });

  const { status } = useWaitForTransaction({
    hash: hash ?? '0x',
    onSuccess(data) {
      setHash(undefined);
      toast.success(
        successMessage || (
          <TransactionLink
            message="Successful! Click here to see transaction"
            tx={data.transactionHash}
          />
        ),
        {
          duration: 3000,
        }
      );
      setLoading(false);
      reset();
    },
  });

  console.log(status, data);

  const action = async () => {
    if (error) {
      toast.error(formatError(error));
      return;
    }
    let loading;
    try {
      setLoading(true);
      loading = toast.loading(loadingMessage || 'Sending transaction...');
      writeAsync && (await writeAsync());
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      toast.dismiss(loading);
      setLoading(false);
    }
  };

  return {
    data,
    action,
    loading,
    useContractWrite,
  };
}
