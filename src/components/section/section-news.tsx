import Link from 'next/link';
import React, { useState } from 'react';

import { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import Svg from '../icon/svg';
import SelectSingle, { ISelect } from '../select/select-single';

type SectionNewsProps = {
  title: React.ReactNode;
  isOdd?: boolean;
  href?: string | null;
  classTitle?: string;
  linkTitle?: React.ReactNode;
  haveFilter?: boolean;
};

const filters: ISelect[] = [
  { value: 1, label: 'Tin mới nhất' },
  { value: 2, label: 'Nhiều người đọc nhất' },
  { value: 3, label: 'Tin đáng chú ý' }
];

const SectionNews = ({
  title,
  children,
  isOdd,
  href,
  classTitle,
  linkTitle = 'Xem tất cả',
  haveFilter = false,
  ...rest
}: CustomProps<SectionNewsProps>) => {
  const [filterSelected, setFilterSelected] = useState<ISelect>(filters[0]);

  return (
    <section className={clsx(isOdd ? 'md:bg-neutral-50' : 'md:bg-neutral-0', 'bg-neutral-0')}>
      <div {...rest}>
        <div className="flex items-center">
          <h2 className={clsx(classTitle, 'md:font-itel flex-1 text-xl md:text-h4 font-bold xl:text-h3')}>{title}</h2>
          {href && (
            <Link href={href} className="text-sm md:text-base transition-default font-medium hover:text-red-500">
              <span className="max-md:hidden">Xem tất cả</span>
              <span className="md:hidden flex items-center">
                Tất cả <Svg src="/icons/line/chevron-right.svg" width={16} height={16} />
              </span>
            </Link>
          )}
          {haveFilter && (
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
          )}
        </div>
        {children}
      </div>
    </section>
  );
};

export default SectionNews;
