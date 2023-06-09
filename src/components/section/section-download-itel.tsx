import clsx from 'clsx';
import Svg from '../icon/svg';
import { FC } from 'react';

const EXAMPLE_AD = [
  {
    id: 'shopping',
    icon: '/icons/bold/shopping.svg',
    title: 'Ưu đãi đặc biệt',
    description: 'Xem phim miễn phí',
  },
  {
    id: 'food',
    icon: '/icons/bold/food.svg',
    title: 'Ưu đãi đặc biệt',
    description: 'Chơi game nhận quà',
  },
  {
    id: 'movie',
    icon: '/icons/bold/itel-movie.svg',
    title: 'Ưu đãi đặc biệt',
    description: 'Xem phim miễn phí',
  },
  {
    id: 'game',
    icon: '/icons/bold/itel-game.svg',
    title: 'Ưu đãi đặc biệt',
    description: 'Giải trí đa dạng',
  },
];

interface Props {
  className?: string;
}

const SectionDownloadiTel: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('bg-neutral-0 rounded-lg text-center', className)}>
      <div className="container p-9">
        <h5 className="text-center md:text-center text-md md:text-2xl font-bold">Theo là thích. App đa tiện ích. Tải ngay</h5>
        <h6 className="text-center md:text-center text-xs md:text-sm text-neutral-500 mt-2">Hàng ngàn tiện ích thú vị. Giải trí cực đỉnh</h6>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 mt-4 md:mt-10">
          {EXAMPLE_AD.map((item, index) => (
            <div key={index} className="flex flex-col justify-center items-center">
              <Svg className="w-18 h-18 text-orange" src={item.icon} />
              <div className="flex flex-col py-4 h-full justify-center">
                <p className="text-sm md:text-base font-bold">{item.title}</p>
                <p className="mt-1 text-neutral-500 text-xs md:text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SectionDownloadiTel;
