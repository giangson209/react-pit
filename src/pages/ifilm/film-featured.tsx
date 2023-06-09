import BannerIfilm from '@/components/banner/banner-ifilm';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import LayoutIFilm from '@/components/layout/layout-ifilm';
import PaginationList from '@/components/pagination/pagination-list';
import SectionFilmFeature from '@/components/section/section-film-feature';
import SectionFilmList from '@/components/section/section-film-list';
import film from '@/mock/film.json';
import { getMultipleRandom } from '@/utilities/randomNumberItem';
import { NextPage } from 'next';
import Head from 'next/head';
import { useMemo } from 'react';

const FilmFeaturePage: NextPage = () => {
  const filmData = useMemo(() => {
    const data = film.filter((movie) => (movie.isSeriesMovie === false));
    return data;
  }, []);

  return (
    <div>
      <Head>
        <title>iFilm</title>
      </Head>
      <HeaderMobileWeb title="Phim lẻ hấp dẫn" className="text-neutral-0 bg-neutral-800" />
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
      <section className="bg-neutral-900 xl:py-20 md:py-10 py-8">
        <div className="xl:container md:pl-10 pl-4">
          <div className="xl:block hidden">
            <SectionFilmList label="Phim LẺ HẤP DẪN" filmData={getMultipleRandom(filmData, 4)} isDisplayButtonFilter={false} />
          </div>
          <div className="xl:hidden block">
            <SectionFilmFeature label="Phim LẺ HẤP DẪN" filmData={getMultipleRandom(filmData, 4)} />
          </div>
          <div className="mt-10 md:mt-20 pr-4 md:pr-10 xl:pr-0">
            <SectionFilmList label="DANH SÁCH PHIM LẺ" filmData={getMultipleRandom(filmData, 15)} className="gap-[1.125rem]" isHorizontal />
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

FilmFeaturePage.getLayout = function (page) {
  return (
    <>
      <LayoutIFilm footerClassName="bg-neutral-700">{page}</LayoutIFilm>
      <ChatBoxLazy />
    </>
  );
};

export default FilmFeaturePage;
