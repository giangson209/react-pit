import { Fragment, useState } from 'react';
import RangeSlider from '../form/RangeSlider';
import Svg from '../icon/svg';
import { CustomProps } from '@/types/element-type';
import clsx from 'clsx';

type FilterServiceProps = {
  label: string;
  title: string;
  list: string[];
  classTitle?: string;
};

const FilterService = ({ label, title, list, className, classTitle }: CustomProps<FilterServiceProps>) => {
  const [valueTitle, setValueTitle] = useState<string>('');
  return (
    <ul className={clsx(className, 'padding space-x-10 text-sm font-bold xl:flex bg-neutral-0 rounded-xl px-4')}>
      <div className="flex w-full items-center gap-4">
        <li className="group relative py-3.5 w-full">
          <div className="text-sm text-neutral-500 font-normal">{label}</div>
          <div className="flex items-center justify-between w-full">
            {valueTitle ? (
              <p className="text-base text-neutral-800">{valueTitle}</p>
            ) : (
              <p className={clsx(classTitle, 'text-base text-neutral-500')}>{title}</p>
            )}
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
                        <div className="gap-3 rounded-md" onClick={() => setValueTitle(item)}>
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

export default FilterService;
