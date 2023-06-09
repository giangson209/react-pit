import BannerIfilm from '@/components/banner/banner-ifilm';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutIFilm from '@/components/layout/layout-ifilm';
import PaginationList from '@/components/pagination/pagination-list';
import SectionFilmBanner from '@/components/section/section-film-banner';
import SectionFilmFeature from '@/components/section/section-film-feature';
import SectionFilmList from '@/components/section/section-film-list';
import film from '@/mock/film.json';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';

const banner = [
  {
    id: 1,
    label: 'Phim bộ',
    href: '/ifilm/film-series',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685505814/itel-web/fc8c5e564102ce37cbb0496bfe60b85b_idvtoj.png'
  },
  {
    id: 2,
    label: 'Phim lẻ',
    href: '/ifilm/film-featured',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685505807/itel-web/66b8aff0ed6219cacc8f08157f5ae5a6_rr5yfc.png'
  },
  {
    id: 3,
    label: 'Phổ biến',
    href: '/ifilm/film-popular',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685505806/itel-web/3236f85abb4338cbda6c222e7ea56540_vxkeip.png'
  },
  {
    id: 4,
    label: 'Phim của tôi',
    href: '/ifilm/film-favorite',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1685792664/itel-web/55a64227658f019a93f56b193a1159f7_jwfbgc.png'
  }
];

const IFilmPage: NextPage = () => {
  const filmIsWatching = useMemo(() => {
    const data = film.filter((item) => item.viewTime > 0);
    return data;
  }, []);

  return (
    <div>
      <Head>
        <title>iFilm</title>
      </Head>
      <section>
        <BannerIfilm
          category="Lãng mạn, hành động"
          chap="22/24"
          description="Lorem ipsum dolor sit amet consectetur. Augue felis ultrices praesent suscipit. Maecenas tristique mauris sed sed proin id sed ut. "
          name="https://res.cloudinary.com/dgkrchato/image/upload/v1685503610/itel-web/36a6a664cc00831ed00e6bbe50c344c4_kkoqo9.png"
          nation="Trung Quốc"
          year="2022"
        />
      </section>

      <section className="bg-neutral-900 xl:pl-28 xl:py-20 md:pl-10 md:py-10 pl-4 py-8">
        <div className="md:pr-10 pr-4 block xl:hidden md:mb-16 mb-8">
          <SectionFilmBanner bannerData={banner} />
        </div>
        <div>
          <SectionFilmFeature label="Phim Phổ biến TRÊN ITEL" filmData={getMultipleRandom(film, 8)} />
        </div>
        <div className="md:mt-20 mt-10">
          <SectionFilmFeature label="Phim đang xem của bạn" filmData={filmIsWatching} isWatchingList />
        </div>
        <div className="md:mt-20 mt-10">
          <SectionFilmFeature label="CÓ THỂ BẠN SẼ THÍCH" filmData={getMultipleRandom(film, 8)} />
        </div>
        <div className="xl:pr-28 md:pr-10 pr-4">
          <div className="md:mt-16 mt-8">
            <SectionFilmFeature label="PHIM THỊNH HÀNH" filmData={getMultipleRandom(film, 8)} isHorizontal isRanked />
          </div>
          <div>
            <SectionFilmList label="Danh sách phim" filmData={getMultipleRandom(film, 15)} isHorizontal />
            <div className="w-full flex justify-center">
              <div className="md:hidden">
                <PaginationList pageList={['1', '2', '3', '...', '7']} subPageList={['4', '5', '6']} theme="dark" />
              </div>
              <div className="max-md:hidden">
                <PaginationList
                  pageList={['1', '2', '3', '4', '...', '12', '13', '14', '15']}
                  subPageList={['5', '6', '7', '8', '9', '10', '11']}
                  theme="dark"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

IFilmPage.getLayout = function (page, props) {
  return (
    <>
      <LayoutIFilm isHomePage footerClassName="bg-neutral-700">{page}</LayoutIFilm>
      <ChatBoxLazy />
    </>
  );
};

export default IFilmPage;
