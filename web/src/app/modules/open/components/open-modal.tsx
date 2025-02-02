import Modal from 'react-modal';
import { useModal } from '../../core/hooks/use-modal';
import { CardsWithAnimationsStacked } from './cards';
import { getPacketType } from '../../core/constants/packets';
import { IPacket } from '../../core/types/packets';

interface OpenModalProps {
  idsByPackets: { id: number; cards: number[] }[];
  // writeReset: () => void;
}

export function OpenModal({ idsByPackets }: OpenModalProps) {
  const { isOpenModalOpen, closeModalOpen } = useModal();
  return (
    <Modal
      isOpen={isOpenModalOpen}
      style={{
        overlay: {
          backgroundColor: '#353535CC',
          overflow: 'hidden',
        },
        content: {
          backgroundColor: 'transparent',
          border: 'none',
          overflow: 'hidden',
        },
      }}
      onRequestClose={() => {
        closeModalOpen();
        // writeReset();
      }}
    >
      <div className="flex flex-col space-y-4 h-full">
        <div className="flex flex-row w-full justify-end">
          <img
            className="w-24 hover:cursor-pointer"
            onClick={() => {
              closeModalOpen();
              // writeReset();
            }}
            src="/assets/images/close.png"
            alt=""
          />
        </div>
        <CardsWithAnimationsStacked
          cardsWithAnimations={idsByPackets.map((c) => ({
            packetType: getPacketType(c.id) as IPacket,
            cards: c.cards,
          }))}
        />
      </div>
    </Modal>
  );
}
