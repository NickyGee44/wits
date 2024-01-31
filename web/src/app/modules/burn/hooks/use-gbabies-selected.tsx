import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

const OG_IDs: number[] = [
  3, 14, 19, 23, 24, 25, 27, 29, 39, 51, 61, 66, 69, 73, 80, 90, 96, 129, 130,
  138, 140, 168, 169, 171, 176, 191, 193, 194, 201, 210, 216, 258, 262, 273,
  299, 301, 303, 309, 311, 323, 327, 336, 342, 344, 345, 353, 355, 361, 382,
  394,
];;

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
