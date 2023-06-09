import Svg from '../icon/svg';

type ButtonCommitProps = {
  size?: 'small' | 'medium' | 'large' | '2xl';
};

const ButtonCommit = ({ size = 'medium' }: ButtonCommitProps) => {
  return (
    <div className="group relative">
      <Svg
        src="/icons/bold/commit.svg"
        className={`inline ${size === 'medium' ? 'w-6 h-6' : ''} cursor-pointer ${size === 'large' ? 'h-8 w-8' : ''} ${size === '2xl' ? 'w-6 h-6 md:h-10 md:w-10' : ''}`}
      />
      <div className="absolute -top-14 right-1/2 hidden translate-x-1/2 items-center justify-center rounded-xl bg-neutral-0 p-4 shadow-itel group-hover:flex">
        <p className="whitespace-nowrap text-sm font-bold text-neutral-800">Sim cam kết</p>
      </div>
    </div>
  );
};

export default ButtonCommit;
