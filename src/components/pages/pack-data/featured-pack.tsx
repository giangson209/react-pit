import Svg from '@/components/icon/svg';
import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { toCurrency } from '@/utilities/currency';
import { clamp } from '@/utilities/number';
import { motion } from 'framer-motion';
import { Direction } from '@/components/carousel/full-carousel';
import PaginationBullets from '@/components/pagination/pagination-bullets';

type QualitySimCardProps = {
  data: any[];
  onRegister(data: any): void;
  onClickDetail?: () => void;
};
const FeaturedPackData = ({ data, onRegister, onClickDetail }: QualitySimCardProps) => {
  const total = data.length;
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: scrollRef
  });
  const progress = useTransform(scrollXProgress, [0, 1], [1, total - 2]);
  const [maxBullet, setMaxBullet] = useState(0)
  const [currentBullet, setCurrentBullet] = useState(0)

  useEffect(() => {
    const item_per_screen = 3

    const max_bullet = total - item_per_screen + 1
    setMaxBullet(max_bullet);
  }, [])
 
  const reCalculateIndex = (e:any) => {
    if (!scrollRef.current) return;
    const current_bullet = Math.round(e.target.scrollLeft/scrollRef.current.children[0].clientWidth);
    setCurrentBullet(current_bullet);
  }

  function handleNavigate(direction: Direction) {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      left: scrollRef.current.scrollLeft + scrollRef.current.children[0].clientWidth * direction,
      behavior: 'smooth'
    });
  }

  return (
    <div className="relative -mx-1.5 md:-mx-1.5">
      <div className="flex overflow-x-auto scrollbar-hide py-3 md:py-14 xl:py-16 snap-mandatory snap-x touch-pan-x" ref={scrollRef} onScroll={(e) => reCalculateIndex(e)}>
        {data.map((option, index) => (
          <Item key={index} progress={progress} index={index} onRegister={onRegister} onClickDetail={onClickDetail} />
        ))}
      </div>
      <div className="max-xl:hidden">
        <div className="absolute top-1/2 right-full -translate-x-4 -translate-y-1/2">
          <button
            className="border text-neutral-800 btn-circle h-18 w-18 border-neutral-300 bg-neutral-0"
            onClick={() => handleNavigate(Direction.PREV)}
          >
            <Svg src="/icons/line/chevron-left.svg" className="inline h-10 w-10" />
          </button>
        </div>
        <div className="absolute top-1/2 left-full translate-x-4 -translate-y-1/2">
          <button
            className="border text-neutral-800 btn-circle h-18 w-18 border-neutral-300 bg-neutral-0"
            onClick={() => handleNavigate(Direction.NEXT)}
          >
            <Svg src="/icons/line/chevron-right.svg" className="inline h-10 w-10" />
          </button>
        </div>
      </div>
      <PaginationBullets total={maxBullet} active={currentBullet} />
    </div>
  );
};

const Item = ({
  progress,
  index,
  onClickDetail,
  onRegister
}: {
  progress: MotionValue<number>;
  index: number;
  onRegister(data: any): void;
  onClickDetail?: () => void;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, (v) => 1 - Math.abs(clamp(index - v, -1, 1)));

  return (
    <div className="w-60 md:w-1/3 flex-shrink-0 px-1.5 md:px-5 snap-center box-content md:box-border" ref={itemRef}>
      <div className="w-full relative">
        <motion.div
          className="w-full image-scale rounded-2xl xl:rounded-3xl border border-neutral-200 group hover:border-red-500"
          style={{ '--scale': scale } as any}
        >
          <div className="!pb-0 p-3 xl:p-6">
            <div className="bg-neutral-50 rounded-xl xl:rounded-2.5xl !pt-0 p-3 xl:px-4 xl:pb-6">
              <div className="py-2 flex items-center justify-between text-sm font-bold">
                <div className="flex items-center xl:py-3 xl:text-base">
                  <Svg src="/icons/bold/fire.svg" className="inline h-6 w-6" />
                  <span>PARTY129</span>
                </div>
                <button
                  className="flex md:hidden font-medium xl:font-bold xl:flex items-center gap-x-1 md:gap-x-2 hover:text-red-500"
                  onClick={onClickDetail}
                >
                  Chi tiết
                  <Svg src="/icons/line/chevron-right.svg" className="xl:hidden inline h-4 w-4" />
                  <Svg src="/icons/line/arrow-right.svg" className="max-md:hidden inline h-4 w-4" />
                </button>
              </div>
              <hr className="border-neutral-200" />
              <div className="font-itel text-h-xxs xl:text-h-sm xl:text-center mt-2 xl:mt-4">
                <b>3GB/ngày</b>
              </div>
              <div className="mt-2 xl:mt-4 xl:text-center text-sm xl:text-base">
                <div>
                  <p className="text-xs md:text-xs text-neutral-600">Miễn phí</p>
                  <p className="mt-1 font-medium xl:font-bold">300SMS</p>
                </div>
                <div className="mt-4 xl:mt-4">
                  <p className="hidden xl:block text-sm font-light">Miễn phí</p>
                  <p className="font-medium xl:font-bold">Gọi nội mạng iTel và VinaPhone</p>
                  <p className="hidden xl:block text-xs text-neutral-500">(Áp dụng cuộc gọi dưới 10 phút, tối đa 1.000 phút)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="transition-default badge badge-lg badge-center absolute -right-3 -top-3 w-12 rotate-[30deg] rounded-full font-normal group-hover:rotate-0">
            <div>-{99}%</div>
          </div>
          <div className="p-4 xl:p-6 xl:pt-4 flex md:block xl:flex">
            <div className="flex-1">
              <p className="md:text-xl font-bold text-neutral-800">
                {toCurrency(99_999)}
                <span className="text-xs xl:text-sm font-normal text-neutral-500">/ tháng</span>
              </p>
              <p className="text-xs font-normal text-neutral-500 line-through">{toCurrency(199_000)}</p>
            </div>
            <div className="md:mt-4 xl:mt-0 md:w-full xl:w-auto">
              <button className="btn-primary btn btn-sm rounded-full md:btn-secondary w-full" onClick={() => onRegister({})}>
                <span className="max-md:hidden">Đăng ký ngay</span>
                <span className="md:hidden">Đăng ký</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedPackData;
