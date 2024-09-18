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
    card.rarity.toLowerCase() === RARITY.RARE.toLowerCase() ||
    card.rarity.toLowerCase() === RARITY.LEGENDARY.toLowerCase() ||
    card.rarity.toLowerCase() === RARITY.ULTRARARE.toLowerCase() ||
    card.rarity.toLowerCase() === RARITY['ONE OF ONE'].toLowerCase();

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
        alt={`Front of ${card.id}`}
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
  const [gifEnded, setGifEnded] = useState(false);

  useEffect(() => {
    const gif = gifRef.current;
    if (gif) {
      const animationDuration = 13000; // 13 seconds in milliseconds

      const handleGifEnd = () => {
        setGifEnded(true);
        setShowCards(true);
        setShowButtons(true);
      };

      // Start the GIF animation
      gif.style.opacity = '1';

      // Set a timeout to handle the end of the GIF
      const timeoutId = setTimeout(handleGifEnd, animationDuration);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [setShowButtons]);

  const fetchCards = useCallback(async () => {
    const cards = await Promise.all(
      cardIds.map(async (cardId) => {
        try {
          // const images = new Image();
          // images.src = environment.metadata.image + `/${cardId % 100}.png`;
          const newCardId = cardId % 214 === 0 ? 214 : cardId % 214;
          const response = await axios.get(
            environment.metadata.url + `/${newCardId}`
          );
          const card = response.data;
          const id = card.tid;
          const faction = lowerCase(card.team) as Faction;
          return {
            id: cardId,
            faction,
            image: environment.metadata.image + `/${id}.png`,
            rarity: card.rarity,
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

  return (
    <>
      <style>
        {`
          @keyframes hideGif {
            0%, 99% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
      {showCards ? (
        <Cards cards={cards} />
      ) : (
        <div className="w-full h-full relative">
          <img
            ref={gifRef}
            src="/assets/videos/card-opening.gif"
            alt="Card opening animation"
            className="w-full h-full object-cover"
            style={{
              animation: 'hideGif 13s linear forwards',
              opacity: 0,
            }}
          />
          {gifEnded && (
            <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
          )}
        </div>
      )}
    </>
  );

  // return showCards ? (
  //   <Cards cards={cards} />
  // ) : (
  //   // <video
  //   //   muted
  //   //   autoPlay
  //   //   onEnded={() => {
  //   //     setShowCards(true);
  //   //     setShowButtons(true);
  //   //   }}
  //   //   className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  //   // >
  //   //   <source src={`/assets/videos/${packetType}.mp4`} type="video/mp4" />
  //   // </video>
  //   <img
  //     src="/assets/videos/card-opening.gif"
  //     alt="Card opening animation"
  //     className="w-full h-full"
  //     ref={gifRef}
  //   />
  // );
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
