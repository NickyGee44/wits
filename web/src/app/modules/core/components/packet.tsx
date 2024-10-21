import { ReactNode } from 'react';
import { Incrementor } from './inputs';
import { environment } from '../../../../environments/environment';

export type CardPackType = keyof typeof environment.packImages;

interface PacketProps {
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
  subtext: ReactNode;
  cardPack: CardPackType;
}

export const Packet = (props: PacketProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <img
        src={environment.packImages[props.cardPack]}
        alt=""
        className="object-cover h-64 sm:h-80 md:h-96 lg:h-112 xl:h-128 2xl:h-144"
      />
      {props.subtext}
      <Incrementor
        onIncrement={props.onIncrement}
        onDecrement={props.onDecrement}
        count={props.count}
      />
    </div>
  );
};
