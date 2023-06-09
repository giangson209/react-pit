import { useModal } from '@/context/modal-context';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import Svg from '../icon/svg';
import { Controller, DefaultValues, useForm } from 'react-hook-form';
import InputSliderRange from '../input/input-slider';
import { clamp } from '@/utilities/number';
import { DevTool } from '@hookform/devtools';
import useIsClient from '@/hooks/useIsClient';
import Accordions from '../accordion/accordions';
import clsx from 'clsx';
import ModalFilter from './modal-filter';
import { chunkArray } from '@/utilities/array';

import { packs, simTypes, sorts } from '@/constants/sim.constants';

export type ISimFilter = {
  query: string;
  excluded: string[];
  type: string[];
  packs: string[];
  packsDesktop: string;
  priceRange: [number, number];
  sortBy: string;

  // Highest search in month
  tags: string[];

  year: string;
  // options: Record<string, string[]>;
};

const MAX = 5_000_000;
const priceRanges: { id: number; value: [number, number]; name: string }[] = [
  { id: 1, value: [0, MAX], name: 'Mặc định' },
  { id: 2, value: [0, 100_000], name: 'Dưới 100k' },
  { id: 3, value: [100_000, 150_000], name: 'Từ 100k - 150k' },
  { id: 4, value: [151_000, 199_000], name: 'Từ 151k - 199k' },
  { id: 5, value: [200_000, 500_000], name: 'Từ 200k - 500k' },
  { id: 6, value: [501_000, 1_000_000], name: 'Từ 501k - 1 triệu' },
  { id: 7, value: [1_000_000, MAX], name: 'Trên 1 triệu' }
];

const SimFilterModal = (props: { defaultValues?: DefaultValues<ISimFilter> }) => {
  const [, forceRender] = useIsClient();
  const [isActive, setIsActive] = useState<true | undefined>(() =>
    typeof window !== 'undefined' ? (window.innerWidth < 768 ? true : undefined) : undefined
  );

  const { done } = useModal();
  const methods = useForm<ISimFilter>({
    defaultValues: {
      sortBy: '1',
      priceRange: priceRanges[0].value,
      excluded: [],
      ...props.defaultValues
    },
    mode: 'onChange'
  });
  useEffect(() => {
    const detect = () => (window.innerWidth < 768 ? setIsActive(true) : setIsActive(undefined));
    window.addEventListener('resize', detect);
    return () => {
      window.removeEventListener('resize', detect);
    };
  }, []);

  const resetForm = () => {
    methods.reset();
    forceRender();
  };

  const [arrayLeft, arrayRight] = useMemo(() => chunkArray(packs, 2), []);

  return (
    <form onSubmit={methods.handleSubmit(done)} className="md:pt-12">
      <ModalFilter.Header title="Lọc sim" />
      <main className="pt-2 pb-20">
        <div className="bg-neutral-0">
          <div className="container">
            <ul className="space-y-8 md:space-y-0 py-6">
              <li className="md:flex items-center md:pb-4">
                <b className="mr-4">Loại trừ số</b>
                <ul className="-mx-2 flex flex-wrap text-center font-medium">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => {
                    return (
                      <li key={number} className="mt-3 md:mt-0 w-1/5 md:w-auto px-2">
                        <label>
                          <input type="checkbox" className="peer sr-only" value={number} {...methods.register('excluded')} />
                          <span className="block w-full rounded-full md:h-10 md:w-10 peer-checked:bg-red-500 peer-checked:text-neutral-0 bg-neutral-100 py-2">
                            {number}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </li>
              <Accordions as={'li'} isActive={isActive}>
                <Button>Loại sim</Button>
                <Accordions.Panel>
                  <ul className="-mx-1 md:-mx-4 flex flex-wrap text-left font-medium pt-2 md:pb-4">
                    {simTypes.map(({ id, name: label }) => {
                      return (
                        <li key={id} className="w-1/2 md:w-auto px-1 md:px-4">
                          <label className="w-full block py-3">
                            <input type="checkbox" value={id} {...methods.register('type')} />
                            <span className="ml-2 first-letter:uppercase inline-block">{label}</span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive} className="md:hidden">
                <Button>Gói cước</Button>
                <Accordions.Panel>
                  <ul className="-mx-1.5 flex flex-wrap text-left text-xs font-medium mt-3 md:mt-0">
                    {arrayLeft.map(({ id, name }) => {
                      return (
                        <li key={id} className="px-1.5 mb-3">
                          <label className="w-ful block">
                            <input type="checkbox" className="peer sr-only" value={id} {...methods.register('packs')} />
                            <span className="block w-full rounded peer-checked:bg-red-500 peer-checked:text-neutral-0 bg-neutral-100 py-1.5 px-2">
                              {name}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="-mx-1.5 flex flex-wrap text-left text-xs font-medium">
                    {arrayRight.map(({ id, name }) => {
                      return (
                        <li key={id} className="px-1.5 mb-3">
                          <label className="w-ful block">
                            <input type="checkbox" className="peer sr-only" value={id} {...methods.register('packs')} />
                            <span className="block w-full rounded peer-checked:bg-red-500 peer-checked:text-neutral-0 bg-neutral-100 py-1.5 px-2">
                              {name}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive} className="max-md:hidden">
                <Button>Gói cước</Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4">
                    {packs.map((pack) => (
                      <li key={pack.id} className="mt-2 md:mt-0">
                        <label className="w-ful block">
                          <input type="radio" className="peer" hidden value={pack.id} {...methods.register('packsDesktop')} />
                          <span className="block w-full rounded peer-checked:bg-neutral-100 py-3 px-4 md:py-4">
                            {pack.id !== 'all' && 'Gói cước '}
                            {pack.name}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive}>
                <Button>Mức giá</Button>
                <Accordions.Panel className={'px-2 -mx-2'}>
                  <Controller
                    name="priceRange"
                    control={methods.control}
                    render={({ field: { name, onBlur, onChange, value } }) => {
                      return (
                        <div className="pb-6 mt-4">
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
                          <div className="form-control mt-4">
                            <InputSliderRange
                              min={0}
                              max={MAX}
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
                  <ul className="menu mt-2 md:pb-4">
                    {priceRanges.map(({ id, name, value }) => {
                      return (
                        <li key={id}>
                          <button type="button" className="rounded-lg" onClick={() => methods.setValue('priceRange', value)}>
                            {name}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive}>
                <Button>Sắp xếp</Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4">
                    {sorts.map((sort) => (
                      <li key={sort.id} className="mt-2 md:mt-0">
                        <label className="w-ful block">
                          <input type="radio" className="peer" hidden value={sort.id} {...methods.register('sortBy')} />
                          <span className="block w-full rounded peer-checked:bg-neutral-100 py-3 px-4 md:py-4">{sort.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
            </ul>
          </div>
        </div>
      </main>
      <ModalFilter.Actions onReset={resetForm} />
    </form>
  );
};
export const FilterListBox = () => {};
export const Button = ({ children }: { children?: React.ReactNode }) => {
  return (
    <>
      <b className="md:hidden">{children}</b>
      <Accordions.Button type="button" className="max-md:hidden flex items-center w-full text-left py-4 border-t border-neutral-200">
        {({ open }) => (
          <>
            <b className="flex-1">{children}</b>
            <Svg
              src="/icons/line/chevron-down.svg"
              className={clsx('transition-default duration-300 md:h-8 md:w-8', open ? '-rotate-180' : '')}
            />
          </>
        )}
      </Accordions.Button>
    </>
  );
};

export default SimFilterModal;
