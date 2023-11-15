import { IPacket } from '../types/packets';

export const Packets = [
  {
    id: 1,
    name: IPacket.SINGLE,
    count: 2,
  },
  {
    id: 2,
    name: IPacket.BOOSTER,
    count: 3,
  },
  {
    id: 3,
    name: IPacket.JUMBO,
    count: 4,
  },
  {
    id: 4,
    name: IPacket.MYSTERY,
    count: 5,
  },
];

export function getPacketType(id: number) {
  switch (id) {
    case 1:
      return IPacket.SINGLE;
    case 2:
      return IPacket.BOOSTER;
    case 3:
      return IPacket.JUMBO;
    case 4:
      return IPacket.MYSTERY;
    default:
      return IPacket.SINGLE;
  }
}
