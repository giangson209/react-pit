import DividerHorizontal from '@/components/common/divider-horizontal';
import DropdownSearch from '@/components/dropdown/dropdown-search';
import Svg from '@/components/icon/svg';
import ModalPackFilter, { IPackFilter } from '@/components/modal/modal-pack-filter';
import ModalSearchData, { tabs } from '@/components/modal/modal-search-data';
import { modal } from '@/context/modal-context';
import { Listbox } from '@headlessui/react';
import React, { useEffect, useRef, useState } from 'react';

import { datas, sorts } from '@/constants/pack.constants';
import SearchBar from '@/components/common/search-bar';
import clsx from 'clsx';

type Props = {
  onChangeFilter?: (filterData: any) => void;
};

const PackSearchBar = ({ onChangeFilter }: Props) => {
  const [value, setValue] = useState('');
  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [sort, setSort] = useState(sorts[0]);
  const [data, setData] = useState(datas[0]);

  useEffect(() => {
    if (onChangeFilter) {
      onChangeFilter([sort, data]);
    }
  }, [data, sort]);

  const handleModalSearch: React.MouseEventHandler<HTMLDivElement> = (e) => {
    modal.open({
      render: <ModalSearchData />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-100',
      classNameContainer: 'modal-full',
      onDone: setValue
    });
  };
  const handleModalFilter = () => {
    modal.open({
      render: <ModalPackFilter defaultValues={{ sortBy: sort.id, data: data.id }} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
      onDone(data: IPackFilter) {
        const d = datas.find((d) => data.data === d.id);
        const s = sorts.find((s) => s.id === data.sortBy);
        if (d) setData(d);
        if (s) setSort(s);
      }
    });
  };

  let total = 0;
  sort.id !== 'all' && (total += 1);
  data.id !== 'all' && (total += 1);

  return (
    <>
      <div className="flex md:hidden items-center bg-neutral-0">
        <div className="input-leading-icon relative flex-1 mr-2">
          <div onClick={handleModalSearch}>
            <div className="input text-sm py-2.5 border-none pl-11 outline-none bg-neutral-100">
              {!value && <span className="opacity-50">Tìm kiếm...</span>}
              <span>{value}</span>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <Svg src="/icons/bold/vector.svg" className="block" width={20} height={20} />
          </div>
        </div>
        <button
          onClick={handleModalFilter}
          className={clsx(
            'relative btn-tertiary btn btn-sm border-none font-medium btn-square w-10 h-10 flex-shrink-0 bg-neutral-100',
            total && 'btn-active'
          )}
        >
          <Svg src="/icons/bold/filter.svg" width={20} height={20} />
          {total ? (
            <span className="badge z-50 badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
              <span>{total}</span>
            </span>
          ) : null}
        </button>
      </div>
      <div className="max-md:hidden bg-neutral-0 rounded-2xl px-6 py-4">
        <div className="flex space-x-4">
          <SearchBar placeholder={currentTab.placeholder} value={value} onChange={setValue}>
            <DropdownSearch value={currentTab} options={tabs} onChange={(v) => setCurrentTab(v)} displayValue={(v) => v.label}>
              {({ open }) => (
                <Listbox.Button className="flex items-center h-full">
                  <b className="block truncate">{currentTab.label}</b>
                  <span className="pointer-events-none">
                    <Svg src="/icons/bold/down.svg" className={open ? '-rotate-180' : undefined} width={24} height={24} />
                  </span>
                </Listbox.Button>
              )}
            </DropdownSearch>
            <div className="my-auto">
              <DividerHorizontal />
            </div>
          </SearchBar>
          <button onClick={handleModalFilter} className="btn btn-tertiary btn-lg rounded-full xl:hidden">
            <Svg src="/icons/bold/filter.svg" width={24} height={24} />
          </button>
          <div className="my-auto max-xl:hidden">
            <DividerHorizontal />
          </div>
          <div className="max-xl:hidden">
            <DropdownSearch
              className="relative"
              title="Data"
              value={data}
              options={datas}
              onChange={(v) => setData(v)}
              displayValue={(v) => v.name}
            />
          </div>
          <div className="my-auto max-xl:hidden">
            <DividerHorizontal />
          </div>
          <div className="max-xl:hidden">
            <DropdownSearch
              className="relative"
              title="Giá"
              value={sort}
              options={sorts}
              onChange={(v) => setSort(v)}
              displayValue={(v) => v.name}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default PackSearchBar;
