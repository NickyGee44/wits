import classnames from 'classnames';

interface IncrementorProps {
  px?: string;
  onIncrement: () => void;
  onDecrement: () => void;
  count: number;
}

export function Incrementor({
  px = 'px-2',
  onIncrement,
  onDecrement,
  count,
}: IncrementorProps) {
  return (
    <div className="flex flex-row items-center space-x-2">
      <button
        className="font-sans px-4 py-2 rounded-md bg-[#181718] border border-gold-50 w-16"
        onClick={onDecrement}
      >
        -
      </button>
      <div
        className={classnames(
          'py-2 w-full rounded-md bg-[#181718] border border-gold-50 flex flex-row justify-center items-center',
          px
        )}
      >
        <div className="font-beaufort">{count}</div>
      </div>
      <button
        className="font-sans px-4 py-2 rounded-md bg-[#181718] border border-gold-50 w-16"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
}
