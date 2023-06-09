import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import CardGame from '@/components/card/card-game';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutIgame from '@/components/layout/layout-igame';
import PaginationList from '@/components/pagination/pagination-list';
import SectionIgame from '@/components/section/section-igame';
import routers from '@/routes/routers';
import gameService from '@/services/game/game';
import { IGame } from '@/pages/igame';
import React from 'react';

type ActionPageProps = {
  games: IGame[];
  hotWeekGames: IGame[];
};

const ActionGamePage: NextPage<ActionPageProps> = ({ games, hotWeekGames }) => {
  const router = useRouter();

  const onClickGame = (id: string) => {
    const url = routers.IGAME_DETAIL.replace('[id]', id);
    router.push(url);
  };

  return (
    <>
      <div className="flex bg-neutral-0 container pt-10 gap-6 flex-col xl:flex-row">
        <section className="w-full xl:w-2/3 hover:cursor-pointer h-full" onClick={() => onClickGame(hotWeekGames[0]?.id)}>
          <div className="w-full h-full overflow-hidden rounded-xl">
            <img className="xl:h-full w-full hover:scale-110 transition-default" src={hotWeekGames[0]?.image} alt="" />
          </div>
          <div>
            <h3 className=" font-bold text-h-xs">{hotWeekGames[0]?.name}</h3>
            <p className="text-[#666666]">Hot Tuần • Hành Động • {hotWeekGames[0]?.numberOfPlayer} người tham gia</p>
          </div>
        </section>
        <section className=" xl:flex-col w-full xl:w-1/3 gap-4 hidden sm:flex">
          <div className="w-1/2 xl:w-full hover:cursor-pointer" onClick={() => onClickGame(hotWeekGames[1]?.id)}>
            <div className="w-full overflow-hidden rounded-xl">
              <img className="aspect-cinema w-full hover:scale-110 transition-default" src={hotWeekGames[1]?.image} alt="" />
            </div>
            <div>
              <h3 className=" font-bold text-xl">{hotWeekGames[1]?.name}</h3>
              <p className="text-[#666666]">Hot Tuần • Hành Động • {hotWeekGames[1]?.numberOfPlayer} người tham gia</p>
            </div>
          </div>
          <div className="w-1/2 xl:w-full hover:cursor-pointer" onClick={() => onClickGame(hotWeekGames[2]?.id)}>
            <div className="w-full overflow-hidden rounded-xl">
              <img className="aspect-cinema w-full hover:scale-110 transition-default" src={hotWeekGames[2]?.image} alt="" />
            </div>
            <div>
              <h3 className=" font-bold text-xl">{hotWeekGames[2]?.name}</h3>
              <p className="text-[#666666]">Hot Tuần • Hành Động • {hotWeekGames[2]?.numberOfPlayer} người tham gia</p>
            </div>
          </div>
        </section>
      </div>
      <div className="bg-neutral-0">
        <SectionIgame classNameTitle={'hidden sm:flex'} title={'GAME HÀNH ĐỘNG'} className="game-hot container py-10 xl:py-20">
          <div className="max-md:-mx-1.5 -mx-3 mt-3 flex flex-wrap gap-y-6 md:mt-6 xl:mt-8 xl:gap-y-8">
            {games.map((item) => (
              <div onClick={() => onClickGame(item.id)} key={item.id} className="w-1/2 px-1.5 md:px-3 xl:w-1/4">
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
ActionGamePage.getLayout = function (page) {
  return (
    <>
      <LayoutIgame pageMobileTitle={'Game hành động'}>{page}</LayoutIgame>
      <ChatBoxLazy />
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<ActionPageProps>(async () => {
  return {
    props: {
      games: await gameService.getGames({ limit: 12 }),
      hotWeekGames: await gameService.getHotWeekGames({ limit: 3 })
    },
    revalidate: 8600
  };
});
export default ActionGamePage;
export { getStaticProps };
