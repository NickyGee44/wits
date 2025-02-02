import { flatten } from 'lodash';
import { useEffect, useMemo } from 'react';
import { SubmitButton } from '../../core/components/buttons';
import { CardPackType, Packet } from '../../core/components/packet';
import { useModal } from '../../core/hooks/use-modal';
import { useState } from 'react';

interface OpenTabProps {
  idsByPackets: { id: number; cards: number[] }[];
  isSuccess: boolean;
  isTxnLoading: boolean;
  open: () => Promise<void>;
  cards: {
    name: CardPackType;
    count: number;
    cardCount: number;
    balance: number;
    handleIncrement: () => void;
    handleDecrement: () => void;
  }[];
}

export function OpenTab({
  idsByPackets,
  cards,
  open,
  isTxnLoading,
}: OpenTabProps) {
  const { openModalOpen } = useModal();
  const [isLoading, setIsLoading] = useState(false);

  const action = async () => {
    setIsLoading(true);
    await open();
    setIsLoading(false);
  };

  useMemo(() => {
    if (flatten(idsByPackets).length > 0) {
      openModalOpen();
    }
  }, [idsByPackets]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-9/12 md:w-full mx-auto">
        {cards.map((card) => (
          <Packet
            key={card.name}
            subtext={
              <div className="flex flex-row justify-center items-center">
                <div className="flex flex-row space-x-4">
                  <div className="font-beaufort uppercase">
                    {card.name} {card.cardCount === 40 ? '?' : card.cardCount}
                  </div>
                  <span className="font-sans">•</span>
                  <div className="font-beaufort uppercase">
                    COUNT {card.balance}
                  </div>
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
        <SubmitButton handleClick={action} disabled={isLoading || isTxnLoading}>
          {isTxnLoading ? 'Opening your packs' : 'OPEN PACKS'}
        </SubmitButton>
      </div>
    </>
  );
}
