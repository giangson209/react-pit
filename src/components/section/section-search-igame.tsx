import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import { sleep } from '@/utilities/time';
import { IGame } from '@/pages/igame';
import gameService from '@/services/game/game';
import CardGame from '@/components/card/card-game';
import { IGameContext } from '@/components/layout/layout-igame';
import Link from 'next/link';
import Routers from '@/routes/routers';
import Svg from '@/components/icon/svg';

type Props = { recentSearch: Array<{ id: number; text: string }> };

const SectionSearchIGame = ({ recentSearch }: Props) => {
  const router = useRouter();
  const { quickSearch } = useContext(IGameContext);
  const [games, setGames] = useState<IGame[]>([]);
  const [peopleSearch, setPeopleSearch] = useState<IGame[]>([]);

  const { s } = router.query;

  const searchGames = useCallback((params: { q: string; limit: number; skip?: number }) => {
    return gameService.getGames(params);
  }, []);

  useEffect(() => {
    async function search() {
      setGames([]);
      const games = await searchGames({ q: String(s), limit: 8 });
      setPeopleSearch(games);
    }

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function search() {
      setGames([]);
      await sleep(1000);
      const games = await searchGames({ q: String(s), limit: 30 });
      setGames(games);
    }

    s && search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s]);

  return (
    <div className="container relative z-10 max-md:p-0 pb-10 pt-2">
      {!s && (
        <div className="mt-4 max-md:p-4 max-md:bg-neutral-0">
          <p className="text-2xl font-bold mb-4 max-md:mb-2 max-md:uppercase max-md:text-sm max-md:text-neutral-500">Tìm kiếm gần đây</p>
          {recentSearch.map((searchHistory) => (
            <div
              key={searchHistory.id}
              className="flex py-3 cursor-pointer hover:text-primary max-md:text-sm max-md:py-2"
              onClick={() => quickSearch(searchHistory.text)}
            >
              <Svg className="transition-default inline h-6 w-6 group-hover:translate-x-3" src={'/icons/bold/clock.svg'} />
              <span className="pl-3">{searchHistory.text}</span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2 md:mt-10 max-md:p-4 max-md:bg-neutral-0">
        <h4 className="text-s-sm max-md:text-xl font-bold text-neutral-800">{s ? `Kết quả cho "${s}"` : 'Mọi người cũng tìm kiếm'}</h4>
        <div className="-mx-1.5 md:-mx-3 mt-3 flex flex-wrap gap-y-6 md:mt-6 xl:mt-8 xl:gap-y-8">
          {(s ? games : peopleSearch).map((game) => {
            return (
              <div key={game.id} className="w-1/2 px-1.5 md:px-3 md:w-1/2 xl:w-1/4">
                <Link href={{ pathname: Routers.IGAME_DETAIL, query: { id: game.id } }}>
                  <CardGame
                    id={game.id}
                    name={game.name}
                    image={game.image}
                    categories={game.categories}
                    numberOfPlayer={game.numberOfPlayer}
                    isHotWeek={game.isHotWeek}
                    isHot={game.isHot}
                    isOutstanding={game.isOutstanding}
                    playingPlatforms={game.playingPlatforms}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionSearchIGame;
