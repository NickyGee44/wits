import classnames from 'classnames';

interface ContainerProps {
  className?: string;
  isSelected?: boolean;
  hasBorder?: boolean;
  handleClick?: () => void;
  isOpaque?: boolean;
  children?: React.ReactNode;
}

export function Container({
  children,
  isOpaque,
  handleClick,
  hasBorder,
  isSelected,
  className,
}: ContainerProps) {
  return (
    <div
      onClick={handleClick}
      className={classnames(
        'flex flex-col w-full',
        isOpaque ? `bg-[#181718]/[0.2]` : 'bg-[#181718]',
        handleClick && 'cursor-pointer',
        hasBorder && 'border border-gold-50',
        isSelected && 'bg-black',
        className
      )}
    >
      {children}
    </div>
  );
}
