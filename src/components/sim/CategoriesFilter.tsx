import { Fragment, useState } from 'react';
import RangeSlider from '../form/RangeSlider';
import Svg from '../icon/svg';

type CategoriesFilterProps = {
  label: string;
  title: string;
  list: string[];
};

const CategoriesFilter = ({ label, title, list }: CategoriesFilterProps) => {
  const [titleFilter, setTitleFilter] = useState<string>(title);
  return (
    <ul className="padding z-30 space-x-10 text-sm font-bold xl:flex">
      <div className="flex w-full items-center gap-4">
        <div className="h-4 w-0.5 rounded-lg bg-neutral-300" />
        <li className="group relative py-3.5">
          <div className="text-sm font-medium text-neutral-500">{label}</div>
          <div className="flex items-center justify-center ">
            <p className="text-base font-bold text-neutral-800">{titleFilter}</p>
            <div className="flex rotate-90 items-center justify-center transition-all duration-300 ease-out group-hover:-rotate-90">
              <Svg src="/icons/bold/right.svg" className="inline h-6 w-6" />
            </div>
          </div>
          {list.length ? (
            <div className="transition-default pointer-events-none absolute z-30 w-max max-w-md opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
              <ul className="shadow-xl menu mt-2 w-full rounded-xl bg-neutral-0 p-2">
                {label === 'Mức giá' && <RangeSlider initialMin={2500} initialMax={7500} min={0} max={10000} step={100} priceCap={100} />}
                {list.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <li>
                        <div className="gap-3 rounded-md" onClick={() => setTitleFilter(item)}>
                          <div className="flex-1">{item}</div>
                        </div>
                      </li>
                    </Fragment>
                  );
                })}
              </ul>
            </div>
          ) : null}
        </li>
      </div>
    </ul>
  );
};

export default CategoriesFilter;
