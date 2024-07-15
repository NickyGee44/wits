import { flatten } from 'lodash';
import { useEffect, useMemo } from 'react';
import { SubmitButton } from '../../core/components/buttons';
import { Packet } from '../../core/components/packet';
import { useModal } from '../../core/hooks/use-modal';
import { useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { skaleNebula } from 'viem/chains';
import { dripGas } from '../../../utils';

interface OpenTabProps {
  idsByPackets: { id: number; cards: number[] }[];
  isSuccess: boolean;
  isTxnLoading: boolean;
  open: () => Promise<void>;
  cards: {
    name: string;
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
  const { chain } = useNetwork();
  const { address } = useAccount();
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

  useEffect(() => {
    if (address) {
      dripGas(address);
    }
  }, [address]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-9/12 md:w-full mx-auto mt-8">
        {cards.map((card) => (
          <Packet
            key={card.name}
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
        <SubmitButton
          handleClick={action}
          disabled={isLoading || isTxnLoading || chain?.id !== skaleNebula.id}
        >
          {isTxnLoading ? 'Opening your packs' : 'OPEN PACKS'}
        </SubmitButton>
      </div>
    </>
  );
}
