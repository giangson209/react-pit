import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import { NextPage } from 'next';
import Head from 'next/head';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutIgame from '@/components/layout/layout-igame';
import React, { useState } from 'react';
import Routers from '@/routes';
import routers from '@/routes';
import SectionIgame from '@/components/section/section-igame';
import CardGame from '@/components/card/card-game';
import SliderMultiItem from '@/components/carousel/slider-multi-item';
import FullCarousel, { FullCarouselItem } from '@/components/carousel/full-carousel';
import { variantsTranslate } from '@/components/carousel/carousel-variants';
import useSlider from '@/hooks/useSlider';
import clsx from 'clsx';
import PaginationBullets from '@/components/pagination/pagination-bullets';
import Svg from '@/components/icon/svg';
import PaginationList from '@/components/pagination/pagination-list';
import SelectSingle, { ISelect } from '@/components/select/select-single';
import Link from 'next/link';
import gameService from '@/services/game/game';
import { useRouter } from 'next/router';
import Tab from '@/components/tabs/tabs';
import PaginationSimple from '@/components/pagination/pagination-simple';

export interface IGame {
  id: string;
  name: string;
  image: string;
  isHot?: boolean;
  isOutstanding?: boolean;
  isHotWeek?: boolean;
  categories: string[];
  playingPlatforms: string[];
  numberOfPlayer: number;
}

export interface IRankUser {
  name: string;
  score: number;
  phone: string;
  avatarUrl: string;
}

const CATEGORY = {
  ACTION: 'Hành động',
  SPORTS: 'Thể thao',
  INTELLECTUAL: 'Trí tuệ'
};

const filters: ISelect[] = [
  { value: 1, label: 'Tất cả thể loại' },
  { value: 2, label: CATEGORY.ACTION },
  { value: 3, label: CATEGORY.SPORTS },
  { value: 4, label: CATEGORY.INTELLECTUAL }
];

type PageProps = {
  games: IGame[];
  gameHots: IGame[];
  playingGames: IGame[];
  threeGamesHot: IGame[];
  dataRank: {
    dataRankWeek: {
      image: string;
      data: IRankUser[];
    };
    dataRankMonth: {
      image: string;
      data: IRankUser[];
    };
  };
};
const IGamePage: NextPage<PageProps> = ({ games, gameHots, playingGames, threeGamesHot, dataRank }) => {
  const [filterSelected, setFilterSelected] = useState<ISelect>(filters[0]);

  const tabs = [
    { id: 1, label: 'Tất cả' },
    { id: 2, label: 'Hành động' },
    { id: 3, label: 'Thể thao' },
    { id: 4, label: 'Trí tuệ' }
  ];
  const [tabId, setTabId] = useState<number>(1);

  return (
    <>
      <Head>
        <title>Itel - Theo là thích</title>
      </Head>
      <div>
        <Banner threeGamesHot={threeGamesHot} />
      </div>
      <div className="pt-1 sm:pt-10 bg-neutral-0">
        <Category />
      </div>
      <SectionIgame
        title={'Game đang chơi'}
        className="game-hot container py-10 pr-0 xl:pr-10 xl:py-20 max-md:py-4 max-md:bg-neutral-0 max-md:mb-2"
        href={Routers.IGAME}
      >
        <SliderMultiItem>
          {playingGames.map((item, index) => (
            <Link key={item.id} href={{ pathname: routers.IGAME_DETAIL, query: { id: item.id } }}>
              <CardGame
                id={item.id}
                name={item.name}
                image={item.image}
                categories={item.categories}
                numberOfPlayer={item.numberOfPlayer}
                isHotWeek={item.isHotWeek}
                isOutstanding={item.isOutstanding}
                playingPlatforms={item.playingPlatforms}
                classNameWrapper="min-w-[144px] xl:min-w-[300px] md:min-w-[312px]"
                index={index}
              />
            </Link>
          ))}
        </SliderMultiItem>
      </SectionIgame>
      <div className="bg-neutral-0">
        <Ranking dataRank={dataRank} />
      </div>
      <SectionIgame
        title={
          <>
            game <span className="text-red-500">hot</span>
          </>
        }
        className="game-hot container py-10 pr-0 xl:pr-10 xl:py-20 max-md:py-4 max-md:bg-neutral-0 max-md:mb-2"
        href={Routers.IGAME}
      >
        <SliderMultiItem>
          {gameHots.map((item, index) => (
            <Link key={item.id} href={{ pathname: routers.IGAME_DETAIL, query: { id: item.id } }}>
              <CardGame
                id={item.id}
                name={item.name}
                image={item.image}
                categories={item.categories}
                numberOfPlayer={item.numberOfPlayer}
                isHotWeek={item.isHotWeek}
                isHot={item.isHot}
                isOutstanding={item.isOutstanding}
                playingPlatforms={item.playingPlatforms}
                classNameWrapper="min-w-[144px] xl:min-w-[300px] md:min-w-[312px]"
                index={index}
              />
            </Link>
          ))}
        </SliderMultiItem>
      </SectionIgame>
      <div className="bg-neutral-50">
        <SectionIgame
          title={'Danh sách game'}
          rightElement={
            <SelectSingle
              buttonClassName="border-neutral-300 min-w-[188px] h-[48px] m-0"
              containerClassName="z-20 w-auto hidden md:block"
              options={filters}
              displayValue={(data) => data.label}
              value={filterSelected}
              onChange={(option) => {
                setFilterSelected(option);
              }}
            />
          }
          className="game-hot container py-10 xl:py-20 max-md:py-4 max-md:bg-neutral-0 max-md:mb-2"
        >
          <div className="flex items-center justify-start md:hidden mt-4 border-b border-neutral-100">
            {tabs.map((tab) => (
              <Tab key={tab.id} label={tab.label} onClick={() => setTabId(tab.id)} isActive={tabId === tab.id} size="large" />
            ))}
          </div>
          <div className="max-md:-mx-1.5 -mx-3 mt-3 flex flex-wrap gap-y-6 md:mt-6 xl:mt-8 xl:gap-y-8">
            {games.map((item) => (
              <div key={item.id} className="w-1/2 px-1.5 md:px-3 xl:w-1/4">
                <Link href={{ pathname: Routers.IGAME_DETAIL, query: { id: item.id } }}>
                  <CardGame
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    categories={item.categories}
                    numberOfPlayer={item.numberOfPlayer}
                    isHotWeek={item.isHotWeek}
                    isHot={item.isHot}
                    isOutstanding={item.isOutstanding}
                    playingPlatforms={item.playingPlatforms}
                  />
                </Link>
              </div>
            ))}
          </div>
          <div className="md:hidden">
            <PaginationList pageList={['1', '2', '3', '...', '7']} subPageList={['4', '5', '6']} />
          </div>
          <div className="max-md:hidden">
            <PaginationList
              pageList={['1', '2', '3', '4', '...', '12', '13', '14', '15']}
              subPageList={['5', '6', '7', '8', '9', '10', '11']}
            />
          </div>
        </SectionIgame>
      </div>
    </>
  );
};

export const Banner = ({ threeGamesHot }: { threeGamesHot: IGame[] }) => {
  const slider = useSlider({ totalSlide: threeGamesHot?.length });
  const item = threeGamesHot[slider.index];
  return (
    <FullCarousel
      index={slider.index}
      onSlide={slider.onSlide}
      numItems={threeGamesHot.length}
      className="relative aspect-[1/1.25] sm:aspect-tivi w-full cursor-grab overflow-hidden lg:aspect-cinema"
      data-theme="dark"
    >
      <FullCarouselItem variants={variantsTranslate} index={slider.index} direction={-slider.direction}>
        <div className={clsx('relative h-full select-none ')}>
          <div className="h-full w-2/3 absolute inset-0 z-[1] bg-gradient-to-r from-[rgba(18,18,18,0.6)]" />
          <img draggable={false} src={item.image} className="absolute inset-0 h-full w-full object-cover" alt="banner" />
          <div className="container h-full flex items-end xl:items-start pb-6 sm:pb-16 xl:pb-0 text-xs sm:text-base absolute inset-0 z-[2]">
            <div className="relative max-w-xl pt-14 xl:pt-28">
              <h2 className="font-itel text-h4 sm:text-h1 xl:text-8xl">{item.name}</h2>
              <p className="mt-2 text-sm">Nổi bật • Trí tuệ • Hành động • 2022</p>
              <p className="mt-2 text-sm">
                Lorem ipsum dolor sit amet consectetur. Augue felis ultrices praesent suscipit. Maecenas tristique mauris sed sed proin id
                sed ut.{' '}
              </p>
              <div className="mt-7 flex gap-4">
                <Link className="w-1/2 sm:w-auto" href={{ pathname: Routers.IGAME_PLAY, query: { id: item.id } }} target="_blank">
                  <button className="btn-primary btn btn-lg rounded-full font-medium text-sm sm:text-base w-full">
                    <Svg src="/icons/bold/play.svg" className=" h-6 w-6" />
                    Chơi ngay
                  </button>
                </Link>
                <Link className="w-1/2 sm:w-auto" href={{ pathname: Routers.IGAME_DETAIL, query: { id: item.id } }}>
                  <button className="btn-primary btn-outline btn btn-lg rounded-full font-medium text-sm sm:text-base w-full">
                    Thông tin Game
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FullCarouselItem>
      <div className="absolute bottom-6 w-full bg-transparent xl:bottom-8">
        <PaginationBullets total={threeGamesHot.length} active={slider.index} onClick={slider.onChange} />
      </div>
    </FullCarousel>
  );
};

export const Category = () => {
  const router = useRouter();
  return (
    <>
      <div className=" max-w-[100vw] ml-10 lg:mx-auto overflow-x-auto overflow-y-hidden gap-10 justify-start lg:justify-center hidden sm:flex">
        <img
          onClick={() => router.push(Routers.IGAME_ACTION)}
          className="w-96 hover:cursor-pointer hover:scale-110 transition-default"
          src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685296570/IGame_image/GameHanhDong_tvnj3v.png"
          alt=""
        />
        <img
          onClick={() => router.push(Routers.IGAME_SPORTS)}
          className=" w-96 hover:cursor-pointer hover:scale-110 transition-default"
          src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685296570/IGame_image/GameTheThao_rsrjvl.png"
          alt=""
        />
        <img
          onClick={() => router.push(Routers.IGAME_INTELLECTUAL)}
          className=" w-96 hover:cursor-pointer hover:scale-110 transition-default"
          src="https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685296570/IGame_image/GameTriTue_nj6o7f.png"
          alt=""
        />
      </div>
      <div className="font-itel flex sm:hidden justify-around p-3 gap-2">
        <div onClick={() => router.push(Routers.IGAME_ACTION)} className="bg-primary text-neutral-0 p-3 py-4 rounded-xl flex-1 text-center">
          HÀNH ĐỘNG
        </div>
        <div
          onClick={() => router.push(Routers.IGAME_SPORTS)}
          className="bg-blue-500 text-neutral-0 p-3 py-4 rounded-xl flex-1 text-center"
        >
          THỂ THAO
        </div>
        <div
          onClick={() => router.push(Routers.IGAME_INTELLECTUAL)}
          className="bg-orange text-neutral-0 p-3 py-4 rounded-xl flex-1 text-center"
        >
          TRÍ TUỆ
        </div>
      </div>
    </>
  );
};

export const Ranking = ({
  dataRank
}: {
  dataRank: {
    dataRankWeek: {
      image: string;
      data: IRankUser[];
    };
    dataRankMonth: {
      image: string;
      data: IRankUser[];
    };
  };
}) => {
  const tabs = [
    { id: 1, label: 'Theo tuần' },
    { id: 2, label: 'Theo tháng' }
  ];
  const [tabId, setTabId] = useState<number>(1);

  return (
    <div className="container">
      <h2 className="text-h4 xl:text-h3 font-itel font-bold py-4">Game thi đấu</h2>
      <div className="flex items-center justify-start">
        {tabs.map((tab) => (
          <Tab
            className="flex-1 sm:flex-none text-center sm:text-left"
            key={tab.id}
            label={tab.label}
            onClick={() => setTabId(tab.id)}
            isActive={tabId === tab.id}
            size="large"
          />
        ))}
      </div>
      <div className="mb-6 w-full border-b border-b-neutral-300" />
      <section className="flex w-full h-[960px] lg:h-[480px] gap-4 lg:gap-8 flex-col lg:flex-row">
        <div className="h-1/4 sm:h-1/3 lg:w-2/3 lg:h-full">
          <img className="w-full h-full" src={tabId === 1 ? dataRank?.dataRankWeek.image : dataRank?.dataRankMonth.image} alt="" />
        </div>
        <div className="h-3/4 sm:h-2/3 lg:w-1/3 lg:h-full bg-[#F9F9F9] rounded-2xl flex flex-col">
          <h4 className="uppercase text-lg sm:text-2xl font-bold font-itel px-6 py-4">bảng xếp hạng</h4>
          <div className="overflow-y-scroll p-6 h-full scrollbar-igame">
            {(tabId === 1 ? dataRank?.dataRankWeek?.data : dataRank?.dataRankMonth.data).map((item: IRankUser, index: number) => {
              return (
                <div key={index} className="flex items-center gap-4 mb-8 text-sm sm:text-base">
                  <div className=" w-4 flex-none font-bold">{index + 1}</div>
                  <img src={item.avatarUrl} alt="" className="flex-none w-16 h-16 rounded-full" />
                  <div className="flex-1">
                    <div className="flex justify-between font-bold">
                      <p> {item.name}</p>
                      <p> {item.score}</p>
                    </div>
                    <div className="flex justify-between">
                      <p> {item.phone}</p>
                      <p> điểm</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

IGamePage.displayName = 'IGamePage';

IGamePage.getLayout = function (page, props) {
  return (
    <>
      <LayoutIgame>{page}</LayoutIgame>
      <ChatBoxLazy />
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  return {
    props: {
      games: await gameService.getGames({ limit: 12 }),
      threeGamesHot: await gameService.getGamesDynamic({ limit: -3 }),
      gameHots: await gameService.getHotGames({ limit: 6 }),
      playingGames: await gameService.getPlayingGames({ limit: 6 }),
      dataRank: {
        dataRankWeek: {
          image: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685180735/IGame_image/Block_Image_hhc648.png',
          data: [
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 13.567,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 13.567,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 10047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 13.567,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 13.567,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 13.567,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 13.567,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Bảo Ngọc',
              score: 13.567,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            }
          ]
        },
        dataRankMonth: {
          image: 'https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685118778/IGame_image/Block_Image_twazhg.png',
          data: [
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            },
            {
              name: 'Nguyễn Thị Minh Trang',
              score: 10.047,
              phone: '087.5xxx95',
              avatarUrl: `https://res.cloudinary.com/dm1ttdfnb/image/upload/v1685301485/IGame_image/Block_Image_sjd1gi.png`
            }
          ]
        }
      }
    },
    revalidate: 8600
  };
});

export default IGamePage;
export { getStaticProps };
