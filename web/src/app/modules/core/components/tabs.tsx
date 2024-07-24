import classnames from 'classnames';

interface TabProps {
  text: string;
  handleClick?: () => void;
  isActive?: boolean;
}

export const Tab = ({ text, isActive = false, handleClick }: TabProps) => (
  <div
    className="bg-[#0C0C0C] rounded relative cursor-pointer w-fit"
    onClick={handleClick}
  >
    <div
      className={classnames(
        'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
        !isActive &&
          'rounded border-[#161616] border-2 cursor-pointer opacity-40'
      )}
    >
      <div className="text-xl text-light-gold font-beaufort">{text}</div>
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
    <div className="flex flex-row justify-center items-center pt-8 pb-6">
      <div className="w-full flex flex-col gap-6">{children}</div>
    </div>
  ) : (
    <div />
  );
