import Svg from '../icon/svg';

type ButtonVipProps = {
  size?: 'small' | 'medium' | 'large';
};

const ButtonVip = ({ size = 'medium' }: ButtonVipProps) => {
  return (
    <div className="group relative ">
      <Svg
        src="/icons/bold/vip.svg"
        className={`inline ${size === 'medium' ? 'w-6 h-6' : ''} cursor-pointer ${size === 'large' ? 'h-10 w-10' : ''}`}
      />
      <div className="absolute -top-14 right-1/2 hidden translate-x-1/2 items-center justify-center rounded-xl bg-neutral-0 p-4 shadow-itel group-hover:flex">
        <p className="whitespace-nowrap text-sm font-bold text-neutral-800">Sim VIP</p>
      </div>
    </div>
  );
};

export default ButtonVip;
