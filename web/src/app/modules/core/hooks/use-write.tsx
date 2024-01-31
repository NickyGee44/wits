import {
  useContractWrite,
  usePrepareContractWrite,
  useWatchPendingTransactions,
} from 'wagmi';
import toast from 'react-hot-toast';
import { formatError } from '../utils/error';
import { TransactionLink } from '../components/transaction';
import { useState } from 'react';
import {
  useAddRecentTransaction,
  useAccountModal,
} from '@rainbow-me/rainbowkit';

export function useWrite(
  config: any,
  stateReset?: () => void,
  context?: string,
  successMessage?: string,
  loadingMessage?: string
) {
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
      addRecentTransaction({
        hash: data.hash,
        description: context || 'Transaction',
        confirmations: 10,
      });
      openAccountModal && openAccountModal();
      setLoading(false);
      reset();
    },
    onError: (error) => {
      setLoading(false);
      toast.error(formatError(error));
    },
  });

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
