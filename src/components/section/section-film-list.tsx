import { useEffect, useState } from 'react';
import CardFilm, { CardFilmItem } from '../card/card-film';
import FilterFilm from '../filter/filter-film';
import clsx from 'clsx';
import Svg from '../icon/svg';
import Tab from '../tabs/tabs';
// import film from '@/mock/film.json'

type SectionFilmListProps = {
  label?: string;
  filmData: CardFilmItem[];
  className?: string;
  isHorizontal?: boolean;
  isDisplayButtonFilter?: boolean;
  isTabHeading?: boolean;
};

const SectionFilmList = ({
  label,
  filmData,
  className,
  isHorizontal = false,
  isDisplayButtonFilter = true,
  isTabHeading
}: SectionFilmListProps) => {
  const [filmList, setFilmList] = useState<CardFilmItem[]>(filmData);
  const [category, setCategory] = useState<string>('Tất cả thể loại');
  const [tabIndex, setTabIndex] = useState<number>(1);

  const handleClickOptionList = (choice: string) => {
    setCategory(choice);
  };

  useEffect(() => {
    const data = [...filmData];
    if (category !== 'Tất cả thể loại') {
      const newFilmList = data.filter((filmType) => filmType.category === category);
      setFilmList(newFilmList);
    } else {
      setFilmList(filmData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <>
      <div
        className={clsx('flex justify-between xl:items-center md:mb-10 mb-4 xl:flex-row', isTabHeading ? 'flex-col xl:gap-0 gap-6' : '')}
      >
        {isTabHeading ? (
          <div className="flex md:justify-start md:gap-10 border-b border-b-neutral-600 xl:border-none justify-center">
            {['Phim của tôi', 'phim YÊU THÍCH'].map((tab, index) => (
              <Tab
                key={`tab-${index}`}
                label={tab}
                isActive={index + 1 === tabIndex}
                onClick={() => setTabIndex(index + 1)}
                className={clsx(
                  'xl:text-h3 md:text-h4 text-sm font-bold font-itel uppercase xl:border-none',
                  index + 1 === tabIndex ? 'text-neutral-0' : ''
                )}
                tabStyle={clsx('w-1/2 md:w-fit', index + 1 === tabIndex ? 'md:border-none' : '')}
              />
            ))}
          </div>
        ) : (
          <div className={clsx('flex justify-start items-center')}>
            <p className="md:hidden block text-xl text-neutral-0 font-bold font-itel uppercase">DANH SÁCH PHIM</p>
            <p className="xl:text-h3 md:text-h4 text-xl text-neutral-0 font-bold font-itel uppercase md:block hidden">{label}</p>
          </div>
        )}
        {isDisplayButtonFilter && (
          <div
            className={clsx(
              isTabHeading
                ? 'w-full xl:w-fit md:border-b border-b-neutral-600 xl:border-none md:pb-6 xl:pb-0 pb-0 border-transparent flex justify-end md:block'
                : ''
            )}
          >
            <div className="md:w-[11.75rem]">
              <FilterFilm
                categoryList={['Tất cả thể loại', 'Tâm lý', 'Kinh dị', 'Hài hước', 'Tình cảm', 'Hành động']}
                handleChooseOption={handleClickOptionList}
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={clsx(
          'grid xl:gap-6 md:gap-4 gap-3',
          isHorizontal ? 'xl:grid-cols-5 md:grid-cols-3 grid-cols-2' : 'xl:grid-cols-4 grid-cols-2 ',
          className
        )}
      >
        {filmList.map((card) => (
          <CardFilm key={card.id} cardFilm={card} isHorizontal={isHorizontal} />
        ))}
      </div>
    </>
  );
};

export default SectionFilmList;
