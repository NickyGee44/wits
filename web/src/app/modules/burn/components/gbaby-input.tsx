import { Container } from '../../core/components/containers';
import { Layout } from './layout';

interface GBabyInputProps {
  ids: number[];
  selected: number[];
  totalWits: number;
  handleSelected: (id: number) => void;
}

export function GBabyInput({
  ids,
  selected,
  handleSelected,
  totalWits,
}: GBabyInputProps) {
  return (
    <Layout
      header="MINT BY BURNING G BABY NFT"
      subheader="YOUR G BABY INVENTORY"
      footer={`BURN ${selected.length} G BABY FOR ${totalWits}X5 PACK${
        selected.length > 1 ? 's' : ''
      }`}
    >
      <div className="grid grid-cols-2 gap-4">
        {ids.map((id) => (
          <Container
            hasBorder
            key={id}
            handleClick={() => handleSelected(id)}
            isSelected={selected.includes(id)}
          >
            <div className="text-center px-16 font-dragon">{id}</div>
          </Container>
        ))}
      </div>
    </Layout>
  );
}
