import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';
import film from '@/mock/film.json';
import filmService from '@/services/film/film';
import { sleep } from '@/utilities/time';
import CardFilm, { CardFilmItem } from '../card/card-film';
import { IfilmContext, filmQuickSearchs } from '../layout/layout-ifilm';
import FilterFilm from '../filter/filter-film';

type Props = {};

const SharedFilmSectionSearch = (props: Props) => {
  const router = useRouter();
  const { quickSearch } = useContext(IfilmContext);
  const [products, setProducts] = useState<CardFilmItem[]>([]);
  const [peopleSearch, setPeopleSearch] = useState<CardFilmItem[]>([]);
  const [category, setCategory] = useState<string>('Tất cả thể loại');
  const { s } = router.query;

  const handleClickOptionList = (choice: string) => {
    setCategory(choice);
  };

  const searchFilms = useCallback((params: { q: string; limit: number; skip?: number; arr: CardFilmItem[] }) => {
    return filmService.getFilms(params);
  }, []);

  useEffect(() => {
    async function search() {
      setProducts([]);
      const films = await searchFilms({ q: String(s), limit: 8, arr: film });
      setPeopleSearch(films);
    }

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function search() {
      setProducts([]);
      await sleep(1000);
      const films = await searchFilms({ q: String(s), limit: 12, arr: film });
      setProducts(films);

      const data = [...films];
      if (category !== 'Tất cả thể loại') {
        const newFilmList = data.filter((filmType) => filmType.category === category);
        setProducts(newFilmList);
      } else {
        setProducts(films);
      }
    }

    s && search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s, category]);

  return (
    <div className="container relative z-10 pb-10 pt-2">
      {!s && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2">
            {filmQuickSearchs.map((search) => {
              return (
                <li key={search.id}>
                  <button
                    className="btn-outline btn h-11 rounded-full border-neutral-500 text-neutral-0 font-medium text-sm"
                    onClick={() => quickSearch(search.text)}
                  >
                    {search.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <h4 className="text-s-sm font-bold text-neutral-0">{s ? `Kết quả cho "${s}"` : 'Mọi người cũng tìm kiếm'}</h4>
          {s && (
            <div className="w-[11.75rem]">
              <FilterFilm
                categoryList={['Tất cả thể loại', 'Tâm lý', 'Kinh dị', 'Hài hước', 'Tình cảm', 'Hành động']}
                handleChooseOption={handleClickOptionList}
              />
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6 mt-10">
          {(s ? products : peopleSearch).map((card) => {
            return (
              <div key={card.id} className="">
                <CardFilm key={card.id} cardFilm={card} isHorizontal={false} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SharedFilmSectionSearch;
