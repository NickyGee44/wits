import { SubmitButton } from '../../core/components/buttons';
import { Dollar } from '../../core/components/dollar';
import { Packet } from '../../core/components/packet';

interface MintTabProps {
  write: () => void;
  loading: boolean;
  presaleLive: boolean;
  publicLive: boolean;
  totalMintable: number;
  cards: {
    name: string;
    price: bigint;
    supply: number;
    count: number;
    cardCount: number;
    dollar: string;
    cent: string;
    handleIncrement: () => void;
    handleDecrement: () => void;
  }[];
}

export function MintTab({
  loading,
  publicLive,
  totalMintable,
  cards,
  write,
}: MintTabProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="font-beaufort uppercase text-gold text-xl w-full text-center">
        {!publicLive
          ? `You have ${totalMintable} allocated.`
          : 'Public mint is live'}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-9/12 md:w-full mx-auto mt-8">
        {cards.map((card) => (
          <Packet
            subtext={
              <div className="flex flex-col md:flex-row justify-center items-center lg:whitespace-nowrap">
                <div className="font-beaufort uppercase">
                  {card.name} Pack ({card.cardCount}){' '}
                </div>
                <span className="font-sans">•</span>
                <div className="font-beaufort uppercase">SUPPLY {card.supply}</div>
                <span className="font-sans">•</span>
                <Dollar dollar={card.dollar} cents={card.cent} />
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
        <div className="flex flex-col space-y-2 justify-center items-center">
          {!publicLive && totalMintable > 0 && <div>{totalMintable} Left</div>}
          <SubmitButton disabled={loading} handleClick={write}>
            MINT
          </SubmitButton>
        </div>
      </div>
    </div>
  );
}
