import axios from 'axios';
import classnames from 'classnames';
import { lowerCase } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { environment } from '../../../../environments/environment';
import { PrimaryButton, SubmitButton } from '../../core/components/buttons';
import { IPacket } from '../../core/types/packets';
import { RARITY } from '../types/cards';

export enum Faction {
  AIR = 'air',
  CYBER = 'cyber',
  DARK = 'dark',
  FIRE = 'fire',
  ICE = 'ice',
  LIGHT = 'light',
  NORMIES = 'normies',
  WATER = 'water',
  WILD = 'wild',
}

interface ICard {
  id: number;
  faction: Faction;
  image: string;
  rarity: RARITY;
}

interface CardsProps {
  isRevealed?: boolean;
  cards: ICard[];
}

interface CardProps {
  card: ICard;
  isRevealed?: boolean;
}

export function Card({ card, isRevealed = false }: CardProps) {
  const [revealed, setRevealed] = useState(isRevealed);
  const flip = () => setRevealed(true);
  const regularFactions = ['trap', 'spell', 'relic'];

  const show = revealed || isRevealed;
  const isWiggle =
    card.rarity === RARITY.LEGENDARY ||
    card.rarity === RARITY.ULTRARARE ||
    card.rarity === RARITY['ONE OF ONE'];

  return (
    <button
      className={classnames(isWiggle ? 'animate-wiggle' : '')}
      onClick={flip}
    >
      <img
        className={classnames(show ? 'hidden' : 'flex')}
        src={
          regularFactions.includes(card.faction)
            ? `/assets/images/regular.png`
            : `/assets/images/${card.faction}.png`
        }
        alt={`Back of ${card.faction}`}
      />
      <img
        src={card.image}
        alt={`Front of ${card.faction}`}
        className={classnames(show ? 'flex' : 'hidden')}
      />
    </button>
  );
}

export function Cards({ cards }: CardsProps) {
  const [isAllRevealed, setIsAllRevealed] = useState(false);

  const revealAll = () => setIsAllRevealed(true);

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex flex-col space-y-12 overflow-scroll h-full">
        <div className="grid grid-cols-5 md:grid-cols-5 gap-2">
          {cards.map((card) => (
            <Card card={card} isRevealed={isAllRevealed} key={card.id} />
          ))}
        </div>
      </div>
      {!isAllRevealed && (
        <div className="w-full flex flex-row justify-center items-center">
          <PrimaryButton handleClick={revealAll}>Reveal All</PrimaryButton>
        </div>
      )}
    </div>
  );
}

interface CardsWithAnimationsProps {
  packetType: IPacket;
  cardIds: number[];
  openNextPacket?: () => void;
  hasNextPacket?: boolean;
  setShowButtons: (value: boolean) => void;
}

export function CardsWithAnimations({
  packetType,
  cardIds,
  setShowButtons,
}: CardsWithAnimationsProps) {
  const [showCards, setShowCards] = useState(false);
  const [cards, setCards] = useState<ICard[]>([]);
  const gifRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const gif = gifRef.current;
    if (gif) {
      const handleGifLoad = () => {
        setTimeout(() => {
          setShowCards(true);
          setShowButtons(true);
        }, 8000);
      };

      gif.addEventListener('load', handleGifLoad);

      return () => {
        gif.removeEventListener('load', handleGifLoad);
      };
    }
  }, [setShowButtons]);

  const fetchCards = useCallback(async () => {
    const cards = await Promise.all(
      cardIds.map(async (cardId) => {
        try {
          // const images = new Image();
          // images.src = environment.metadata.image + `/${cardId % 100}.png`;
          const newCardId = cardId % 100 === 0 ? 100 : cardId % 100;
          const response = await axios.get(
            environment.metadata.url + `/${newCardId}.json`
          );
          const card = response.data;
          const faction = lowerCase(
            card.attributes.find(
              (attribute: any) => attribute.trait_type === 'Faction'
            ).value
          ) as Faction;
          return {
            id: cardId,
            faction,
            image: environment.metadata.image + `/${newCardId}.png`,
            rarity: card.attributes.find(
              (attribute: any) => attribute.trait_type === 'Rarity'
            ).value,
          };
        } catch (error) {
          console.error(error);
          return {
            id: cardId,
            faction: Faction.NORMIES,
            image: '',
            rarity: RARITY.COMMON,
          };
        }
      })
    );
    setCards(cards);
  }, [cardIds]);

  useEffect(() => {
    fetchCards();
  }, [cardIds, fetchCards]);

  return showCards ? (
    <Cards cards={cards} />
  ) : (
    // <video
    //   muted
    //   autoPlay
    //   onEnded={() => {
    //     setShowCards(true);
    //     setShowButtons(true);
    //   }}
    //   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    // >
    //   <source src={`/assets/videos/${packetType}.mp4`} type="video/mp4" />
    // </video>
    <img
      src="/assets/videos/card-opening.gif"
      alt="Card opening animation"
      className="w-full h-full"
      ref={gifRef}
    />
  );
}

interface CardsWithAnimationsStackedProps {
  cardsWithAnimations: {
    packetType: IPacket;
    cards: number[];
  }[];
}

export function CardsWithAnimationsStacked({
  cardsWithAnimations,
}: CardsWithAnimationsStackedProps) {
  const [showButtons, setShowButtons] = useState(false);
  const [index, setIndex] = useState(0);

  const openNextPacket = () => {
    if (index < cardsWithAnimations.length - 1) {
      setIndex(index + 1);
      setShowButtons(false);
    }
  };

  const hasNextPacket = index < cardsWithAnimations.length - 1;
  const shouldShowButtons = showButtons && hasNextPacket;

  return (
    <div className="flex items-center justify-center flex-col h-full w-full overflow-hidden">
      <div className="flex flex-col h-[90%] overflow-hidden">
        {cardsWithAnimations.map(
          (cardsWithAnimation, i) =>
            i === index && (
              <CardsWithAnimations
                setShowButtons={setShowButtons}
                key={`${cardsWithAnimation.packetType}-${i}`}
                packetType={cardsWithAnimation.packetType}
                cardIds={cardsWithAnimation.cards}
                openNextPacket={openNextPacket}
                hasNextPacket={hasNextPacket}
              />
            )
        )}
      </div>
      {shouldShowButtons && (
        <div className="w-full flex flex-row justify-center items-center">
          <SubmitButton handleClick={openNextPacket}>
            Open Next Packet
          </SubmitButton>
        </div>
      )}
    </div>
  );
}
