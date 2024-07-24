import { Incrementor } from '../../core/components/inputs';
import { Layout } from './layout';

interface QuillAndInkInputProps {
  onIncrement: () => void;
  onDecrement: () => void;
  balance: number;
  count: number;
  price: number | string;
}

export function QuillAndInkInput({
  onIncrement,
  onDecrement,
  balance,
  count,
  price,
}: QuillAndInkInputProps) {
  return (
    <Layout
      header="MINT BY BURNING QUILL & INK"
      subheader="YOUR QUILL & INK BALANCE"
      footer={
        <div className="font-beaufort text-md">
          BURN ${balance} <span className="font-sans">&</span> MINT ${count} FOR{' '}
          <span className="font-sans">{price}</span>
        </div>
      }
    >
      <Incrementor
        px="px-8 lg:px-20"
        onIncrement={onIncrement}
        onDecrement={onDecrement}
        count={balance}
      />
    </Layout>
  );
}
