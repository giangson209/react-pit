import Svg from '../icon/svg';

type ButtonInformationProps = {
  isShowTooltip?: boolean;
  isStrokeWhite?: boolean;
  size?: 'small' | 'medium';
};

const ButtonInformation = ({ isShowTooltip = false, isStrokeWhite = false, size = 'medium' }: ButtonInformationProps) => {
  return (
    <div className="group relative">
      <button className="flex items-center justify-center">
        <Svg
          src="/icons/line/information.svg"
          className={`inline hover:text-red-500 ${isStrokeWhite ? 'text-neutral-0' : ''} ${size === 'medium' ? 'h-5 w-5' : ''} ${
            size === 'small' ? 'h-4 w-4' : ''
          }`}
        />
      </button>
      {isShowTooltip && (
        <div className="absolute right-1/2 z-30 mt-2 hidden w-[20rem] translate-x-1/2 rounded-xl bg-neutral-0 p-4 shadow-itel group-hover:block">
          <span className="text-sm font-bold">
            Yêu cầu sử dụng gói cước ITEL149 trong thời gian tối thiểu 36 tháng sau khi kích hoạt Sim.
          </span>
        </div>
      )}
    </div>
  );
};

export default ButtonInformation;
