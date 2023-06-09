import clsx from 'clsx';
import CardFilm, { CardFilmItem } from '../card/card-film';

type SectionFilmFeatureProps = {
  label: string;
  filmData: CardFilmItem[];
  isHorizontal?: boolean;
  isRanked?: boolean;
  isWatchingList?: boolean;
};

const SectionFilmFeature = ({ label, filmData, isHorizontal = false, isRanked = false, isWatchingList = false }: SectionFilmFeatureProps) => {
  return (
    <div className="flex flex-col md:gap-10 gap-3">
      <p className="xl:text-h3 md:text-h4 text-lg text-neutral-0 font-bold font-itel uppercase">{label}</p>
      <div className="overflow-auto scrollbar-hide">
        <div className="flex justify-start items-start xl:gap-6 md:gap-4 gap-3 h-max">
          {filmData.map((card, index) => (
            <div key={card.id} className={clsx(isHorizontal ? 'xl:w-[19%] md:w-[33%] w-[42%]' : 'xl:w-[27%] md:w-[43%] w-[60%]')}>
              <CardFilm
                key={card.id}
                cardFilm={card}
                isHorizontal={isHorizontal}
                rank={(index + 1).toString()}
                isRanked={isRanked}
                isWatchingList={isWatchingList}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionFilmFeature;
