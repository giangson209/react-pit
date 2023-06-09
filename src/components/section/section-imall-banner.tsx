import useSlider from '@/hooks/useSlider';
import { variantsTranslateWithoutOpacity } from '../carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '../carousel/full-carousel';
import PaginationBullets from '../pagination/pagination-bullets';

type Props = {};

const SectionImallBanner = ({}: Props) => {
  const TOTAL_SLIDE_BANNER = 3;
  const slider = useSlider({ totalSlide: TOTAL_SLIDE_BANNER });

  return (
    <div className="block-img block-cinema md:block-banner overflow-hidden rounded-2xl" data-theme="dark">
      <FullCarousel index={slider.index} numItems={TOTAL_SLIDE_BANNER} onSlide={slider.onSlide}>
        <FullCarouselItem direction={-slider.direction} index={slider.index} variants={variantsTranslateWithoutOpacity}>
          <img
            src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1683174103/itel/banner/96311db03bc494afc9c36597f4dd6d0a_r3miyp.png"
            loading="lazy"
            draggable={false}
            className="h-full w-full select-none object-cover"
            alt="banner"
          />
        </FullCarouselItem>
      </FullCarousel>
      <div className="absolute bottom-3 z-10 w-full">
        <PaginationBullets active={slider.index} total={TOTAL_SLIDE_BANNER} onClick={slider.onChange} />
      </div>
    </div>
  );
};

export default SectionImallBanner;
