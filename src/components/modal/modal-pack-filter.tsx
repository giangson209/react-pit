import { useModal } from '@/context/modal-context';
import useIsClient from '@/hooks/useIsClient';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Svg from '../icon/svg';
import Accordions from '../accordion/accordions';
import { Button } from './modal-sim-filter';
import ModalFilter from './modal-filter';

import { datas, sorts } from '@/constants/pack.constants';

type Props = {
  defaultValues?: any;
};
export type IPackFilter = {
  data: string;
  sortBy: string;
  priceRange: [number, number];
};

const ModalPackFilter = (props: Props) => {
  const [, forceRender] = useIsClient();
  const [isActive, setIsActive] = useState<true | undefined>(() =>
    typeof window !== 'undefined' ? (window.innerWidth < 768 ? true : undefined) : undefined
  );

  const { done } = useModal();
  const methods = useForm<IPackFilter>({
    defaultValues: {
      sortBy: 'all',
      data: 'all',
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

  return (
    <form onSubmit={methods.handleSubmit(done)} className="md:pt-12">
      <ModalFilter.Header title="Lọc gói cước" />

      <main className="mt-2 pb-20 md:pt-0">
        <div className="bg-neutral-0">
          <div className="container">
            <ul className="space-y-8 md:space-y-0 py-6">
              <Accordions as={'li'} isActive={isActive}>
                <Button>Data</Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4 space-y-2 md:space-y-0">
                    {datas.map((sort) => (
                      <li key={sort.id}>
                        <label className="w-ful block">
                          <input type="radio" className="peer" hidden value={sort.id} {...methods.register('data')} />
                          <span className="block w-full rounded peer-checked:bg-neutral-100 py-3 px-4 md:py-4">{sort.name}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </Accordions.Panel>
              </Accordions>
              <Accordions as={'li'} isActive={isActive}>
                <Button>Giá</Button>
                <Accordions.Panel>
                  <ul className="pt-4 md:pt-0 md:pb-4 space-y-2 md:space-y-0">
                    {sorts.map((sort) => (
                      <li key={sort.id}>
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

export default ModalPackFilter;
