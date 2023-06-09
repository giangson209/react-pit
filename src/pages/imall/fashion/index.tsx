import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import { NextPage } from 'next';
import Link from 'next/link';

import { variantsTranslateWithoutOpacity } from '@/components/carousel/carousel-variants';
import FullCarousel, { FullCarouselItem } from '@/components/carousel/full-carousel';
import PaginationBullets from '@/components/pagination/pagination-bullets';
import SectionGenuineBrand from '@/components/section/setionc-genuine-brand';
import { Layout } from '../device';

import useSlider from '@/hooks/useSlider';

import { ImageService } from '@/services/image/image';
import HeaderMobileWeb from '@/components/header/header-mobile-web';

type FashionPageProps = {
  events: Array<{
    id: number;
    name: string;
    desc: string;
    thumbnail: string;
  }>;
};

const FashionPage: NextPage<FashionPageProps> = ({ events, router }) => {
  const TOTAL_SLIDE_BANNER = 3;
  const slider = useSlider({ totalSlide: TOTAL_SLIDE_BANNER, loop: 10000 });

  return (
    <>
      <HeaderMobileWeb title="Mẹ và bé" />
      <section className="max-md:hidden container">
        <div className="breadcrumbs text-sm text-neutral-500">
          <ul aria-label="Breadcrumb">
            <li>
              <Link href={Routers.HOME}> Trang chủ </Link>
            </li>
            <li>
              <Link href={Routers.IMALL}>iMall</Link>
            </li>
            <li className="text-neutral-800">
              <Link href={router.asPath}>Thời trang</Link>
            </li>
          </ul>
        </div>
      </section>
      <section>
        <div className="block-img block-tivi overflow-hidden xl:block-banner" data-theme="dark">
          <FullCarousel index={slider.index} numItems={TOTAL_SLIDE_BANNER} onSlide={slider.onSlide}>
            <FullCarouselItem
              direction={-slider.direction}
              index={slider.index}
              variants={variantsTranslateWithoutOpacity}
              className="cursor-pointer"
            >
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
      </section>
      <section className="">
        <div className="container">
          <div className="pb-28 pt-20">
            <h2 className="font-itel text-h4 font-bold  xl:text-center xl:text-h2">Chương trình hấp dẫn</h2>
            <div className="-mx-5 flex flex-wrap">
              {events.map((event) => {
                return (
                  <div key={event.id} className="mt-8 px-5 xl:mt-14 xl:w-1/2">
                    <div className="card card-side bg-base-100">
                      <figure className="w-80 shrink-0">
                        <div className="block-img block-photo">
                          <img src={event.thumbnail} alt={event.name} className="object-cover" />
                        </div>
                      </figure>
                      <div className="card-body justify-between">
                        <div>
                          <h5 className="card-title  text-xl font-bold">{event.name}</h5>
                          <p className="card-desc mt-2 line-clamp-2 text-sm">{event.desc}</p>
                        </div>
                        <div>
                          <Link href={router.asPath + '#'} className="btn-secondary btn rounded-full">
                            Mua ngay
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <SectionGenuineBrand className="py-16" href="/" />
    </>
  );
};
FashionPage.getLayout = Layout;

const getStaticProps = getServerPropsWithTranslation<FashionPageProps>(async () => {
  return {
    props: {
      events: Array.from({ length: 6 }, (_, id) => ({
        id,
        name: 'Lướt thẻ nhận Deal vàng – Rộn ràng khai xuân',
        desc: 'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.',
        thumbnail: ImageService.random('artworks')
      }))
    },
    revalidate: 8600
  };
});
export default FashionPage;
export { getStaticProps };
