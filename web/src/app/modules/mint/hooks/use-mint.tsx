import { useApi } from '../../core/hooks/use-api';
import { useCallback, useEffect, useMemo } from 'react';
import { atom, useAtom } from 'jotai';
import { useContract } from '../../core/hooks/use-contract';
import { useAccount } from '../../shared/hooks/use-account';
import toast from 'react-hot-toast';
import { environment } from '../../../../environments/environment';
import { BigNumber } from 'ethers';

const loadingAtom = atom(false);

export function usePresaleMint(
  address: `0x${string}`,
  account: `0x${string}`,
  minted: number,
  stage: number,
  mintRequests: {
    id: number;
    amount: number;
  }[],
  value: BigNumber,
  reset: () => void
) {
  const [loading, setLoading] = useAtom(loadingAtom);

  const { signer, isMain } = useAccount();
  const { signature, fetchSignature, assignedValue } = useApi(account);
  const contract = useContract();

  useEffect(() => {
    fetchSignature();
  }, [fetchSignature]);

  const totalMintable = useMemo(() => {
    const delta = assignedValue - minted;
    return delta > 0 ? delta : 0;
  }, [assignedValue, minted]);

  const presaleRequest = useMemo(() => {
    return {
      amount: assignedValue,
      recipient: account,
    };
  }, [assignedValue, account]);

  const write = useCallback(async () => {
    try {
      setLoading(true);
      if (signer) {
        console.log(value);
        const _isMain = await isMain();
        if (!_isMain) {
          toast.error('Please switch to mainnet');
          return;
        }

        const balance = await signer.getBalance();
        if (balance.lt(value)) {
          toast.error('Insufficient balance');
          return;
        }
        const json = await fetchSignature();

        const tx = await contract
          .connect(signer)
          .presaleMint(presaleRequest, mintRequests, json.signature, {
            value,
          });

        await tx.wait();

        toast.success(
          <div>
            Minted{' '}
            <a
              href={environment.imx.explorer + '/tx/' + tx.hash}
              target="_blank"
            >
              Check here for transaction
            </a>
          </div>
        );
      }
    } catch (e: any) {
      console.log(e);
      if (e.reason) {
        toast.error(e.reason);
      } else {
        toast.error(e.message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  }, [
    contract,
    presaleRequest,
    fetchSignature,
    signer,
    reset,
    value,
    mintRequests,
    setLoading,
  ]);

  return { write, totalMintable, isLive: stage === 1, loading };
}

export function usePublicMint(
  address: `0x${string}`,
  stage: number,
  mintRequests: {
    id: number;
    amount: number;
  }[],
  value: BigNumber,
  reset: () => void
) {
  const [loading, setLoading] = useAtom(loadingAtom);
  const { signer, isMain } = useAccount();
  const contract = useContract();

  const write = useCallback(async () => {
    try {
      setLoading(true);
      if (signer) {
        const _isMain = await isMain();
        if (!_isMain) {
          toast.error('Please switch to mainnet');
          return;
        }

        const balance = await signer.getBalance();
        if (balance.lt(value)) {
          toast.error('Insufficient balance');
          return;
        }
        const tx = await contract.connect(signer).publicMint(mintRequests, {
          value: BigNumber.from(value),
        });

        await tx.wait();
        toast.success(
          <div>
            Minted{' '}
            <a
              href={environment.imx.explorer + '/tx/' + tx.hash}
              target="_blank"
            >
              Check here for transaction
            </a>
          </div>
        );
      }
    } catch (e: any) {
      if (e.reason) {
        toast.error(e.reason);
      } else {
        toast.error(e.message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  }, [contract, mintRequests, value, reset, signer, setLoading]);

  return { write, isLive: stage === 2, loading };
}

const mintedAtom = atom(0);

export function useMinted(account: `0x${string}`) {
  const [minted, setMinted] = useAtom(mintedAtom);

  const contract = useContract();

  const fetchMinted = useCallback(async () => {
    const data = await contract.minted(account);
    setMinted(Number(data));
  }, [contract, account, setMinted]);

  return { minted: Number(minted), fetchMinted };
}
