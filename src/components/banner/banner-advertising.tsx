import { CustomProps } from '@/types/element-type';
import clsx from 'clsx';

import useSlider from '@/hooks/useSlider';
import { variantsTranslate, variantsTranslateWithoutOpacity } from '../carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '../carousel/full-carousel';
import PaginationBullets from '../pagination/pagination-bullets';

type Props = {
  autoplay?: boolean;
  time?: number;
  data: Array<{
    id: number;
    img: string;
    title: string;
    desc?: string;
    actionTitle?: string;

    extra?: string[];

    type?: 'blue' | 'red';
  }>;
};

const BannerAdvertising = ({ data, time = 6000 }: CustomProps<Props, 'section'>) => {
  const slider = useSlider({ totalSlide: data.length, loop: time });

  const item = data[slider.index];

  return (
    <FullCarousel
      index={slider.index}
      onSlide={slider.onSlide}
      numItems={data.length}
      className="relative w-full cursor-grab overflow-hidden block-img h-[15.625rem] md:h-[36rem] pb-0 xl:h-[42.5rem]"
      data-theme="dark"
    >
      <FullCarouselItem variants={variantsTranslateWithoutOpacity} index={slider.index} direction={-slider.direction}>
        <div
          className={clsx(
            'relative h-full select-none',
            item.type == 'blue' ? 'bg-gradient-to-r from-[#464647] to-[#21145F]' : 'bg-red-500'
          )}
        >
          <div className="">
            <img
              draggable={false}
              src={item.img}
              className="absolute inset-0 h-full w-full object-cover md:object-contain object-bottom xl:object-cover"
              alt="banner"
            />
            <div className="absolute bottom-0 left-0 h-96 w-full bg-opacity-30 bg-gradient-to-b from-neutral-900/0 to-neutral-900/60 xl:h-40"></div>
          </div>
          <div className="container h-full">
            <div className="relative max-w-xl pt-20 md:pt-14 xl:pt-28">
              <h2 className="whitespace-pre font-itel text-h-xs md:text-h-xl xl:text-h1">{item.title}</h2>
              <p className="mt-2">{item.desc}</p>
              <div className="max-md:hidden mt-7">
                <button className="btn-primary btn btn-lg rounded-full font-medium">{item.actionTitle}</button>
              </div>

              <div className="max-md:hidden mt-10 flex">
                {item.extra?.map((item) => {
                  return (
                    <div key={item} className="mr-8 w-52">
                      <img src={item} alt="" draggable={false} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </FullCarouselItem>
      <div className="absolute bottom-4 md:bottom-6 w-full bg-transparent xl:bottom-8">
        <PaginationBullets total={data.length} active={slider.index} onClick={slider.onChange} />
      </div>
    </FullCarousel>
  );
};

export default BannerAdvertising;
