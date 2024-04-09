import { flatten } from 'lodash';
import { useMemo } from 'react';
import { SubmitButton } from '../../core/components/buttons';
import { Packet } from '../../core/components/packet';
import { useModal } from '../../core/hooks/use-modal';

interface OpenTabProps {
  idsByPackets: { id: number; cards: number[] }[];
  isSuccess: boolean;
  open: () => void;
  cards: {
    name: string;
    count: number;
    cardCount: number;
    balance: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
  }[];
}

export function OpenTab({ idsByPackets, cards, open }: OpenTabProps) {
  const { openModalOpen } = useModal();

  const action = async () => {
    await open();
  };

  useMemo(() => {
    if (flatten(idsByPackets).length > 0) {
      openModalOpen();
    }
  }, [idsByPackets]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-9/12 md:w-full mx-auto mt-8">
        {cards.map((card) => (
          <Packet
            subtext={
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row space-x-4">
                  <div className="font-dragon capitalize">
                    {card.name} {card.cardCount}
                  </div>
                  <span className="font-sans">•</span>
                  <div className="font-dragon">COUNT {card.balance}</div>
                </div>
              </div>
            }
            count={card.count}
            cardPack={card.name}
            onIncrement={card.handleIncrement}
            onDecrement={card.handleDecrement}
          />
        ))}
      </div>
      <div className="flex flex-row justify-center items-center w-full">
        <SubmitButton handleClick={action}>OPEN PACKS</SubmitButton>
      </div>
    </>
  );
}
