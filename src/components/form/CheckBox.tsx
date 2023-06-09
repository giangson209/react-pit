import clsx from 'clsx';
import Svg from '../icon/svg';

type InputProps = {
  value?: boolean;
  onChange?: (v: boolean) => void;
};

const CheckBox = ({ value, onChange }: InputProps) => {
  return (
    <div
      className={clsx(
        'w-5 h-5 rounded border flex justify-center items-center ',
        value ? 'border-red-500 bg-red-500' : 'border-neutral-300'
      )}
      onClick={() => onChange?.(!value)}
    >
      {value && <Svg width={15}  className="text-neutral-0" src="/icons/line/check.svg" />}
    </div>
  );
};

export default CheckBox;
