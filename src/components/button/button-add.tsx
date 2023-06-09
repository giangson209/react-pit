import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type ButtonAddProps = {
  isAdd?: boolean;
  onClick?:() => void
};
const ButtonAdd = ({ isAdd = false, onClick }: ButtonAddProps) => {
  return (
    <Tooltip
      withArrow
      content={
        <p className="text-neutral-0 font-medium text-sm">
          {isAdd ? 'Xóa khỏi danh sách “phim của tôi”' : 'Thêm vào danh sách “phim của tôi”'}
        </p>
      }
      theme="dark"
      onClick={onClick}
    >
      <button className="btn btn-tertiary btn-circle md:w-14 md:h-14 w-10 h-10 bg-transparent hover:bg-neutral-300/[0.2]">
        <Svg src={isAdd ? '/icons/line/minus.svg' : '/icons/line/plus.svg'} className="md:w-6 md:h-6 w-5 h-5 inline text-neutral-0" />
      </button>
    </Tooltip>
  );
};

export default ButtonAdd;
