import { atom, useAtom } from 'jotai';
import { useCallback } from 'react';
import axios from 'axios';
import { environment } from '../../../../environments/environment';

const assignedValueAtom = atom<number>(0);
const signatureAtom = atom<string>('');

export function useApi(account: `0x${string}`) {
  const [assignedValue, setAssignedValue] = useAtom(assignedValueAtom);
  const [signature, setSignature] = useAtom(signatureAtom);

  const fetchSignature = useCallback(async () => {
    try {
      const response = await axios.get(
        environment.api.base + environment.api.addresses + `?address=${account}`
      );
      const json = response.data;
      setSignature(json.signature);
      setAssignedValue(json.value);
    } catch (e) {
      console.error(e);
      setSignature('');
      setAssignedValue(0);
    }
  }, [account, setSignature, setAssignedValue]);

  const isWhitelisted = signature !== '';

  return {
    signature,
    setSignature,
    fetchSignature,
    isWhitelisted,
    assignedValue,
  };
}
