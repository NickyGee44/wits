import { atom, useAtom } from 'jotai';

const tabValueAtom = atom(1);

export function useTabs() {
  const [tabIndex, setTabIndex] = useAtom(tabValueAtom);

  return {
    tabIndex,
    setTabIndex,
  };
}
