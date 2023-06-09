import { formatFilmTimeLength } from '@/utilities/formatTime';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import SectionFilmSeriesDetail from '../section/section-film-series-detail';
import { modal } from '@/context/modal-context';
import SectionFilmFeatureDetail from '../section/section-film-feature-detail';
import FilmProgerssBar from '../progress/film-progress-bar';

export type FilmChapter = {
  id: number;
  image: string;
  chap: string;
  length: number;
  description: string;     
};

export type CardFilmItem = {
  id?: number;
  name: string;
  img: string;
  time: number;
  chap?: string;
  nation: string;
  year: string;
  category: string;
  viewTime: number;
  isSeriesMovie?: boolean;
  newChapter?: boolean;
  child?: FilmChapter[];
};

export type CardFilmProps = {
  cardFilm: CardFilmItem;
  isHorizontal?: boolean;
  isRanked?: boolean;
  rank?: string;
  isWatchingList?: boolean;
};

const CardFilm = ({ cardFilm, isHorizontal = false, isRanked = false, rank, isWatchingList = false }: CardFilmProps) => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  const handleModalFilmSeries = () => {
    modal.open({
      render: <SectionFilmSeriesDetail filmDetail={cardFilm} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 md:bg-neutral-100 scrollbar-hide',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleModalFilmFeature = () => {
    modal.open({
      render: <SectionFilmFeatureDetail filmDetail={cardFilm} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel scrollbar-hide',
      classNameContainer: 'modal-full md:modal-bottom-sheet ',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  return (
    <div className="w-full ">
      {hydrated && (
        <div
          className="flex flex-col gap-2 w-full cursor-pointer relative"
          onClick={cardFilm.isSeriesMovie ? handleModalFilmSeries : handleModalFilmFeature}
        >
          <img
            src={cardFilm.img}
            alt="card-film"
            className={clsx('max-w-none rounded', isHorizontal ? 'aspect-photo-vertical max-h-[30rem]' : 'aspect-video')}
          />
          {!isHorizontal && (
            <>
              {cardFilm.newChapter && isWatchingList && (
                <div
                  className="absolute md:bottom-16 bottom-[4.75rem] w-[5.3rem] h-[2.25rem] flex justify-center items-center rounded-bl"
                  style={{ backgroundImage: 'url(https://res.cloudinary.com/dgkrchato/image/upload/v1685904396/itel-web/BG_i7v0t7.png)' }}
                >
                  <p className="text-sm font-bold text-neutral-0 whitespace-nowrap">Tập mới</p>
                </div>
              )}
              {cardFilm.viewTime > 0 && isWatchingList && (
                <div className="absolute left-0 md:bottom-16 w-full bottom-[4.75rem]">
                  <FilmProgerssBar timeWatched={cardFilm.viewTime} totalTime={cardFilm.time} inFilmSection />
                </div>
              )}
              <div className="flex flex-col md:gap-2 gap-1">
                <p className="md:text-lg text-base font-medium text-neutral-0 line-clamp-1">{cardFilm.name}</p>
                <div className="flex items-center justify-start md:text-sm text-xs font-normal text-neutral-0 gap-2 md:flex-nowrap flex-wrap">
                  {cardFilm.isSeriesMovie ? <p>{cardFilm.chap} tập</p> : <p>{formatFilmTimeLength(cardFilm.time)}</p>}
                  <div className="w-1 h-1 bg-neutral-0 rounded-full" />
                  <p>{cardFilm.nation}</p>
                  <div className="w-1 h-1 bg-neutral-0 rounded-full" />
                  <p>{cardFilm.category}</p>
                  <div className="w-1 h-1 bg-neutral-0 rounded-full" />
                  <p>{cardFilm.year}</p>
                </div>
              </div>
            </>
          )}
          {isRanked && (
            <div className="relative w-full xl:h-40 md:h-20 h-14 bg-transparent">
              <div className="xl:text-[13.5rem] md:text-[11rem] text-[7.5rem] font-bold font-itel text-neutral-0 opacity-80 absolute left-8 xl:bottom-0 bottom-[5%]">
                {rank}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CardFilm;
