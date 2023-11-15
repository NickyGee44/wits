import { SubmitButton } from '../../core/components/buttons';
import { Container } from '../../core/components/containers';
import { GBabyInput } from './gbaby-input';
import { QuillAndInkInput } from './quill-and-ink-input';

interface BurnTabProps {
  ids: number[];
  selected: number[];
  totalWits: number;
  handleSelected: (id: number) => void;
  onIncrement: () => void;
  onDecrement: () => void;
  balance: number;
  count: number;
  price: number | string;
  total: number;
  write?: () => void;
  buttonLabel: string;
}

export function BurnTab({
  buttonLabel,
  write,
  ids,
  selected,
  totalWits,
  handleSelected,
  onIncrement,
  onDecrement,
  balance,
  count,
  price,
  total,
}: BurnTabProps) {
  return (
    <>
      <div className="flex flex-col space-y-6 md:flex-row md:space-y-0 justify-between items-start">
        <GBabyInput
          ids={ids}
          totalWits={totalWits}
          selected={selected}
          handleSelected={handleSelected}
        />
        <QuillAndInkInput
          onDecrement={onDecrement}
          onIncrement={onIncrement}
          count={count}
          price={price}
          balance={balance}
        />
      </div>

      <Container className="bg-dark-grey">
        <div className="font-dragon text-center my-4">TOTAL {total}</div>
      </Container>

      <div className="flex flex-row justify-center items-center w-full">
        <SubmitButton handleClick={() => write?.()}>{buttonLabel}</SubmitButton>
      </div>
    </>
  );
}
