import classnames from 'classnames';

interface TabProps {
  text: string;
  disabled?: boolean;
  handleClick?: () => void;
  isActive?: boolean;
}

export const Tab = ({
  text,
  disabled,
  isActive = false,
  handleClick,
}: TabProps) => (
  <div
    className={classnames(
      'relative w-full h-full flex flex-col justify-center items-center',
      disabled && 'opacity-40'
    )}
    onClick={handleClick}
  >
    <div
      className={classnames(
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        !isActive &&
          'rounded border-[#161616] border-2 cursor-pointer opacity-40'
      )}
    >
      <div className="text-xl text-light-gold font-dragon">{text}</div>
    </div>
    <img
      src="/assets/images/tab.png"
      className={classnames('w-full', !isActive && 'opacity-0')}
      alt="Button border"
    />
  </div>
);

interface TabBodyProps {
  children: React.ReactNode;
  activeIndex: number;
  tabIndex: number;
}

export const TabBody = ({ children, activeIndex, tabIndex }: TabBodyProps) =>
  activeIndex === tabIndex ? (
    <div className="flex flex-row justify-center items-center min-h-[30rem] lg:min-h-[50rem]">
      <div className="w-full flex flex-col space-y-8">{children}</div>
    </div>
  ) : (
    <div />
  );
