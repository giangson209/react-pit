import Svg from '../icon/svg';
import Tooltip from '../tooltip/tooltip';

type ButtonFavoriteProps = {
  isFavorite?: boolean;
  onClick?: () => void;
};

const ButtonFavorite = ({ isFavorite, onClick }: ButtonFavoriteProps) => {
  return (
    <Tooltip withArrow content={<p className="text-neutral-0 font-medium text-sm">Thêm vào yêu thích</p>} theme="dark" onClick={onClick}>
      <button className="btn btn-tertiary btn-circle md:w-14 md:h-14 w-10 h-10 bg-transparent hover:bg-neutral-300/[0.2]">
        <Svg
          src={isFavorite ? '/icons/bold/heart-active.svg' : '/icons/line/heart.svg'}
          className="md:w-6 md:h-6 w-5 h-5 inline text-neutral-0"
        />
      </button>
    </Tooltip>
  );
};

export default ButtonFavorite;
