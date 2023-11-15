import { atom, useAtom } from 'jotai';

const openModalAtom = atom(false);
export function useModal() {
  const [isOpenModalOpen, setIsOpenModalOpen] = useAtom(openModalAtom);
  return {
    isOpenModalOpen,
    openModalOpen: () => setIsOpenModalOpen(true),
    closeModalOpen: () => setIsOpenModalOpen(false),
  };
}
