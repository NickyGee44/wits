interface DollarProps {
  dollar: string;
  cents: string;
}

export function Dollar({ dollar, cents }: DollarProps) {
  return (
    <div className="flex flex-row justify-center items-center">
      <div className="font-beaufort uppercase">{dollar}</div>
      <span className="font-sans">.</span>
      <div className="font-beaufort uppercase">{cents}</div>
    </div>
  );
}
