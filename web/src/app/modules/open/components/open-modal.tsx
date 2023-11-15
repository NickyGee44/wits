import Modal from 'react-modal';
import { useModal } from '../../core/hooks/use-modal';
import { CardsWithAnimationsStacked } from './cards';
import { getPacketType } from '../../core/constants/packets';
import { IPacket } from '../../core/types/packets';

interface OpenModalProps {
  idsByPackets: { id: number; cards: number[] }[];
  writeReset: () => void;
}

export function OpenModal({ idsByPackets, writeReset }: OpenModalProps) {
  const { isOpenModalOpen, closeModalOpen } = useModal();
  return (
    <Modal
      isOpen={isOpenModalOpen}
      style={{
        overlay: {
          backgroundColor: '#353535CC',
          margin: 'auto',
        },
        content: {
          backgroundColor: 'transparent',
          border: 'none',
        },
      }}
      onRequestClose={() => {
        closeModalOpen();
        writeReset();
      }}
    >
      <CardsWithAnimationsStacked
        cardsWithAnimations={idsByPackets.map((c) => ({
          packetType: getPacketType(c.id) as IPacket,
          cards: c.cards,
        }))}
      />
    </Modal>
  );
}
