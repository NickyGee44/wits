import { useCallback, useEffect, useMemo, useState } from 'react';
import classnames from 'classnames';
import { PrimaryButton, SubmitButton } from '../../core/components/buttons';
import axios from 'axios';
import { environment } from '../../../../environments/environment';
import { lowerCase } from 'lodash';
import { IPacket } from '../../core/types/packets';

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

  const show = revealed || isRevealed;

  return (
    <button className="relative" onClick={flip}>
      <img
        className={classnames(
          show ? 'opacity-0' : 'absolute opacity-100 inset-0'
        )}
        src={`/assets/images/${card.faction}.png`}
        alt={`Back of ${card.faction}`}
      />
      <img
        src={card.image}
        alt={`Front of ${card.faction}`}
        className={classnames(
          show ? 'absolute opacity-100 inset-0' : 'opacity-0'
        )}
      />
    </button>
  );
}

export function Cards({ cards }: CardsProps) {
  const [isAllRevealed, setIsAllRevealed] = useState(false);

  const revealAll = () => setIsAllRevealed(true);

  return (
    <div className="flex flex-col space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {cards.map((card) => (
          <Card card={card} isRevealed={isAllRevealed} />
        ))}
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

  const fetchCards = useCallback(async () => {
    const cards = await Promise.all(
      cardIds.map(async (cardId) => {
        const images = new Image();
        images.src = environment.metadata.image + `/${cardId}.png`;
        const response = await axios.get(
          environment.metadata.url + `/${cardId}.json`
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
          image: environment.metadata.image + `/${cardId}.png`,
        };
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
    <video
      muted
      autoPlay
      onEnded={() => {
        setShowCards(true);
        setShowButtons(true);
      }}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      <source src={`/assets/videos/${packetType}.mp4`} type="video/mp4" />
    </video>
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
    <div>
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
