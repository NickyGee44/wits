import { ReactNode } from 'react';
import { Incrementor } from './inputs';

interface PacketProps {
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
  subtext: ReactNode;
  cardPack: string;
}
export const Packet = (props: PacketProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <img
        src={`/assets/images/${props.cardPack}.png`}
        alt=""
        className="w-full object-cover h-auto w-full lg:h-100"
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
