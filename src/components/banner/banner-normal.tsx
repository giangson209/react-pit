import { CustomProps } from '@/types/element-type';
import clsx from 'clsx';

import useSlider from '@/hooks/useSlider';
import { variantsTranslate } from '../carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '../carousel/full-carousel';
import PaginationBullets from '../pagination/pagination-bullets';

type Props = {
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
  isAds?: boolean;
  classDesc?: string;
  classWrapText?: string;
  classTitle?: string;
  classBtn?: string;
};

const BannerNormal = ({ data, time = 6000, isAds, classDesc, classWrapText, classTitle, classBtn }: CustomProps<Props, 'section'>) => {
  const slider = useSlider({ totalSlide: data.length, loop: time });
  const item = data[slider.index];

  return (
    <FullCarousel
      index={slider.index}
      onSlide={slider.onSlide}
      numItems={data.length}
      data-theme="light"
      className={clsx(
        'relative aspect-cinema w-full cursor-grab overflow-hidden',
        isAds ? 'md:aspect-section-banner 2xl:aspect-[1920/340]' : 'lg:aspect-cinema 2xl:aspect-[3/1.25] 3xl:aspect-section-banner'
      )}
    >
      <FullCarouselItem variants={variantsTranslate} index={slider.index} direction={-slider.direction}>
        <div
          className={clsx(
            'relative h-full select-none',
            item?.type == 'blue' ? 'bg-gradient-to-r from-[#318CDD] to-[#21145F]' : 'bg-red-500'
          )}
        >
          <img draggable={false} src={item.img} className="absolute inset-0 h-full w-full object-cover" alt="banner" />

          <div className="container h-full">
            <div className={clsx('relative max-w-xl pt-14 md:pt-[90px]', isAds ? 'max-w-sm md:py-12' : 'pt-14 xl:pt-28', classWrapText)}>
              <h2
                className={clsx(
                  'w-40 font-itel text-h5 text-base-100 sm:w-full md:text-3xl lg:text-[56px] lg:leading-tight font-bold',
                  isAds && 'md:text-[32px] lg:text-[40px]',
                  classTitle
                )}
              >
                {item.title}
              </h2>
              <p
                className={clsx(
                  'mt-2 hidden text-base-100 sm:block md:text-xl lg:text-3xl lg:max-w-none md:max-w-[413px]',
                  isAds && 'lg:text-base',
                  classDesc
                )}
              >
                {item.desc?.split('\n').map((e) => (
                  <>
                    {e}
                    <br />
                  </>
                ))}
              </p>
              <div className={clsx(classBtn, 'mt-7 hidden lg:block')}>
                <button className="btn-secondary btn rounded-full font-medium md:btn-md lg:btn-lg">{item.actionTitle}</button>
              </div>

              <div className="mt-10 flex">
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
        <div className="absolute bottom-6 w-full bg-transparent xl:bottom-8">
          <PaginationBullets theme="light" total={data.length} active={slider.index} onClick={slider.onChange} />
        </div>
      </FullCarouselItem>
    </FullCarousel>
  );
};

export default BannerNormal;
