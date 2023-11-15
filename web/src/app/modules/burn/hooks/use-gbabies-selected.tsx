import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

const OG_IDs: number[] = [];

const selectedIdsAtom = atom<number[]>([]);

export function useGbabiesSelected(ids: number[]) {
  const [selectedIds, setSelectedIds] = useAtom(selectedIdsAtom);

  const handleSelected = (id: number) => {
    if (!ids.includes(id)) return;
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const clearSelected = () => {
    setSelectedIds([]);
  };

  const gbabiesReturnValue = useMemo(() => {
    return selectedIds.reduce((acc, id) => {
      if (OG_IDs.includes(id)) return acc + 2;
      return acc + 1;
    }, 0);
  }, [selectedIds]);

  return {
    gbabiesReturnValue,
    handleSelected,
    selectedIds,
    setSelectedIds,
    clearSelected,
  };
}
