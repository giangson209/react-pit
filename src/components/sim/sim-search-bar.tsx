import { useMemo, useRef, useState } from 'react';
import DividerHorizontal from '../common/divider-horizontal';
import Drag from '../drag/drag';
import DropdownSearch from '../dropdown/dropdown-search';
import Svg from '../icon/svg';

import { MAX_PRICE, packs, priceRange, sorts } from '@/constants/sim.constants';
import { modal } from '@/context/modal-context';
import useIsSticky from '@/hooks/useIsSticky';
import { TagSimTranformed } from '@/hooks/useSimFilter';
import Routers from '@/routes/routers';
import { clamp } from '@/utilities/number';
import clsx from 'clsx';
import Link from 'next/link';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import SearchBar from '../common/search-bar';
import InputSliderRange from '../input/input-slider';
import ModalSearchSim from '../modal/modal-search-sim';
import { ISimFilter } from '../modal/modal-sim-filter';

export type FilterState = { id: string; type: string; name: string };

type SearchSimProps = {
  className?: string;
  selectedAttributes?: FilterState[];

  handleShowFilterModal?: () => void;
  isShowDataPack?: boolean;
  isShowTagList?: boolean;
  size?: 'small' | 'medium';

  changeBg?: boolean;
  tags?: { id: string | number; name: string }[];

  handleClickRemoveNumber?: (item: string) => void;
  onRemoveAttributes?(item: FilterState): void;
};

const SimSearchBar = ({
  className,
  tags,

  changeBg,

  isShowDataPack,
  isShowTagList,
  selectedAttributes: selectedFilters = [],
  onRemoveAttributes,
  handleShowFilterModal
}: SearchSimProps) => {
  const [sort, setSort] = useState(sorts[0]);
  const [pack, setPack] = useState(packs[0]);
  const [price, setPrice] = useState(priceRange[0]);

  const ref = useRef<HTMLDivElement>(null);
  const isSticky = useIsSticky(ref, { rootMargin: '-65px 200px 0px 200px' });

  const methods = useFormContext<ISimFilter>();

  const handleSelectTag = (tag: TagSimTranformed) => {
    const index = methods.getValues('tags').indexOf(String(tag.id));
    if (index !== -1) {
      const newValues = methods.getValues('tags');
      newValues.splice(index, 1);
      methods.setValue('tags', newValues);
    } else {
      methods.setValue('tags', methods.getValues('tags').concat(String(tag.id)));
    }
  };

  const onChangeInput = (v: string) => methods.setValue('query', v);

  const selectedTag = useWatch({ control: methods.control, name: 'tags' });
  const sorted = useMemo(() => {
    if (!tags) return [];
    if (!selectedTag) return [];
    else {
      const sorted: any[] = [];
      selectedTag.forEach((tag) => {
        const t = tags.find((item) => String(item.id) === tag);
        if (t) sorted.push({ ...t, selected: true });
      });

      sorted.push(...tags.filter((tag) => !sorted.some((s) => tag.id === s.id)));

      return sorted;
    }
  }, [selectedTag, tags]);

  const handleModalSearch = () => {
    modal.open({
      render: <ModalSearchSim defaultValues={query} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-100',
      classNameContainer: 'modal-full',
      onDone: (v: string) => {
        window.scrollTo({ top: 0, behavior: 'auto' });
        onChangeInput(v);
      }
    });
  };

  const query = useWatch({ control: methods.control, name: 'query' });

  return (
    <>
      <div
        ref={ref}
        className={clsx(
          'sticky md:hidden top-14 z-10 border-b -mx-4 px-4 pb-2',
          isSticky ? 'border-neutral-100 ' + (changeBg ? 'bg-neutral-0' : 'bg-neutral-0') : 'border-transparent'
        )}
      >
        <div className="flex overflow-auto whitespace-nowrap gap-2 scrollbar-hide pt-3">
          <button
            onClick={handleShowFilterModal}
            className={clsx(
              'relative btn-tertiary btn btn-sm border-none font-medium btn-square w-9 h-9 flex-shrink-0',
              isSticky ? 'bg-neutral-100' : 'bg-neutral-0',
              selectedFilters.length ? 'text-red-500' : !changeBg && 'bg-neutral-100'
            )}
          >
            <Svg src="/icons/bold/filter.svg" width={20} height={20} />
            {selectedFilters.length ? (
              <span className="badge z-50 badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                <span>{selectedFilters.length}</span>
              </span>
            ) : null}
          </button>
          {sorted && !selectedFilters.length
            ? sorted.map((item) => (
                <button
                  key={item.id}
                  className={clsx(
                    'px-4 h-9 rounded-lg border-none text-sm font-medium',
                    item.selected
                      ? 'bg-red-600 text-neutral-0'
                      : changeBg
                      ? isSticky
                        ? 'bg-neutral-100'
                        : 'bg-neutral-0'
                      : 'bg-neutral-100'
                  )}
                  onClick={() => handleSelectTag(item)}
                >
                  {item.name}
                </button>
              ))
            : selectedFilters.map((item, index) => {
                return (
                  <span key={item.type + index} className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3">
                    {item.name}
                    <button type="button" onClick={onRemoveAttributes ? () => onRemoveAttributes(item) : undefined}>
                      <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                    </button>
                  </span>
                );
              })}
        </div>
        <div className="mt-3">
          <div className="input-leading-icon input-trailing-icon relative">
            <div onClick={handleModalSearch}>
              <div
                className={clsx(
                  'input text-sm py-2.5 border-none pl-11 outline-none',
                  changeBg ? (isSticky ? 'bg-neutral-100' : 'bg-neutral-0') : 'bg-neutral-100'
                )}
              >
                {!query && <span className="opacity-50">*666, *22, 686,....</span>}
                <span>{query}</span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Svg src="/icons/bold/vector.svg" className="block" width={20} height={20} />
            </div>
            {query && (
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-4"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onChangeInput('');
                }}
              >
                <Svg src="/icons/line/close.svg" className="block" width={20} height={20} />
              </div>
            )}
          </div>
        </div>
      </div>
      {query && <div className="md:hidden font-bold text-lg mt-4">Kết quả cho “{query}”</div>}
      <div className={className}>
        <div className="rounded-2xl bg-neutral-0 max-md:hidden">
          <div className="py-4 px-6">
            <div className="flex w-full items-center justify-start gap-4">
              <SearchBar placeholder="Tìm Sim theo nhu cầu của bạn (*222, 789*, 56,...)" onSearch={onChangeInput}>
                {({ focus }) => (
                  <>
                    <div className="text-md font-bold p-3.5 bg-neutral-0">087</div>
                    {focus && (
                      <div className="z-10 absolute w-full top-full mt-2 bg-neutral-0 rounded-2xl shadow-itel">
                        <div className="p-6">
                          <div className="text-md">
                            <b>Hướng dẫn tìm số</b>
                          </div>
                          <div className="mt-4">
                            <p className="font-medium">Tìm theo ngày sinh, chữ số yêu thích: </p>
                            <ul className="text-sm mt-2 space-y-2">
                              <li>
                                <p>
                                  Để tìm sim có chữ số 22 ở vị trí bất kỳ, nhập{' '}
                                  <span className="tag text-dark-blue bg-neutral-100 rounded border-transparent">
                                    <b>*686</b>
                                  </span>
                                </p>
                              </li>
                              <li>
                                <p>
                                  Để tìm sim kết thúc bằng 686, nhập{' '}
                                  <span className="tag text-dark-blue bg-neutral-100 rounded border-transparent">
                                    <b>22</b>
                                  </span>
                                </p>
                              </li>
                            </ul>
                            <p className="font-bold mt-4">Bạn có thể kết hợp cùng các bộ lọc để tìm kiếm chính xác hơn</p>
                            <p className="font-bold mt-4">
                              Bạn có thể tìm số theo <span className="text-dark-blue"> thần số học, phong thủy </span>
                              <Link href={Routers.SIM_FENG_SHUI} className="text-red-500">
                                tại đây
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </SearchBar>
              <button onClick={handleShowFilterModal} className="btn btn-tertiary btn-lg rounded-full xl:hidden">
                <Svg src="/icons/bold/filter.svg" width={24} height={24} />
              </button>
              {isShowDataPack && (
                <>
                  <div className="my-auto max-xl:hidden">
                    <DividerHorizontal />
                  </div>
                  <div className="max-xl:hidden">
                    <DropdownSearch
                      title="Gói cước"
                      className="relative w-[11.5rem]"
                      value={pack}
                      options={packs}
                      onChange={(v) => setPack(v)}
                      displayValue={(v) => (v.id !== 'all' ? 'Gói cước ' + v.name : v.name)}
                    />
                  </div>
                </>
              )}
              <div className="my-auto max-xl:hidden">
                <DividerHorizontal />
              </div>
              <div className="max-xl:hidden">
                <DropdownSearch
                  title="Mức giá"
                  className="relative w-[11.5rem]"
                  value={price}
                  options={priceRange}
                  onChange={setPrice}
                  displayValue={(v) => v.name}
                  prev={
                    <li className="menu-title">
                      <Controller
                        name="priceRange"
                        control={methods.control}
                        render={({ field: { name, onBlur, onChange, value } }) => {
                          return (
                            <div className="pb-4">
                              <div className="form-control">
                                <div className="input-bordered input-group input rounded-lg p-0">
                                  <input
                                    className="input w-1/2 border-none outline-none"
                                    placeholder="50.000đ"
                                    type="number"
                                    size={1}
                                    value={value[0]}
                                    onChange={(e) => {
                                      const v = Number(e.target.value);
                                      if (isNaN(v)) return;
                                      onChange([clamp(v, 0, value[1]), value[1]]);
                                    }}
                                  />
                                  <hr className="my-auto border-r border-neutral-400 py-4" />
                                  <input
                                    className="input w-1/2 border-none outline-none"
                                    placeholder="1.000.000đ"
                                    type="number"
                                    size={1}
                                    value={value[1]}
                                    onChange={(e) => {
                                      const v = Number(e.target.value);
                                      if (isNaN(v)) return;
                                      onChange([value[0], clamp(v, value[0], 5_000_000)]);
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="form-control mt-4 px-2">
                                <InputSliderRange
                                  min={0}
                                  max={MAX_PRICE}
                                  step={50_000}
                                  value={value}
                                  defaultValue={value}
                                  onChange={(e, value) => onChange(value)}
                                />
                              </div>
                            </div>
                          );
                        }}
                      />
                    </li>
                  }
                />
              </div>
              <div className="my-auto max-xl:hidden">
                <DividerHorizontal />
              </div>
              <div className="max-xl:hidden">
                <DropdownSearch
                  title="Sắp xếp"
                  className="relative w-[11.5rem]"
                  value={sort}
                  options={sorts}
                  onChange={setSort}
                  displayValue={(v) => v.name}
                />
              </div>
            </div>
          </div>
          {isShowTagList && tags && tags.length ? (
            <div className="flex items-center justify-start px-6 py-4 border-t border-neutral-200 mt-2">
              <div className="mr-4 whitespace-nowrap text-sm font-medium text-neutral-800 md:hidden xl:block">
                Tìm kiếm nhiều nhất trong tháng
              </div>
              <Drag className="flex select-none overflow-auto scrollbar-hide">
                <ul className="item-center flex items-center justify-between gap-3">
                  {tags.map((item) => (
                    <li key={item.id}>
                      <label>
                        <input className="sr-only peer" hidden type="checkbox" value={item.id} {...methods.register('tags')} />
                        <span className="btn-secondary btn btn-sm h-10 w-max font-medium peer-checked:btn-active">{item.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Drag>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SimSearchBar;
