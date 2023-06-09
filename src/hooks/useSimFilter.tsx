import SimFilterModal, { ISimFilter } from '@/components/modal/modal-sim-filter';
import { modal } from '@/context/modal-context';
import React, { useMemo } from 'react';
import { arrayToKeyValue } from '@/utilities/object';
import { useForm, useWatch } from 'react-hook-form';

import { sorts, packs, simTypes } from '@/constants/sim.constants';
import { FilterState } from '@/components/sim/sim-search-bar';

type Props = {};
export type TagSimTranformed = { id: number; name: string; selected: boolean };
const useSimFilter = (props?: Props) => {
  const methods = useForm<ISimFilter>({
    defaultValues: { query: '', excluded: [], packs: [], priceRange: [0, 5_000_000], sortBy: 'all', type: [], tags: [] }
  });
  const { byTagId, byPackId, sortById } = useMemo(() => {
    return {
      byTagId: arrayToKeyValue(simTypes, 'id'),
      byPackId: arrayToKeyValue(packs, 'id'),
      sortById: arrayToKeyValue(sorts, 'id')
    };
  }, []);

  const handleModalFilter = () => {
    modal.open({
      render: <SimFilterModal defaultValues={methods.getValues()} />,
      onDone(data: ISimFilter) {
        methods.reset(data);
      },
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel !bg-neutral-0',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const handleRemoveAttributes = (item: FilterState) => {
    const key = item.type as keyof ISimFilter;
    const value: string | string[] = methods.getValues(key) as any;
    if (typeof value === 'string') {
      methods.setValue(key, item.id);
    } else if (Array.isArray(value) && key !== 'priceRange') {
      const index = value.findIndex((v) => v == item.id);
      if (index !== -1) value.splice(index, 1);
      else value.push(item.id);
      methods.setValue(key, value);
    }
  };

  const options = useWatch({ control: methods.control });
  const selectedAttributes = useMemo(() => {
    const newFilters: FilterState[] = [];
    options.excluded?.forEach((number) => {
      newFilters.push({ type: 'excluded', id: number, name: `Loại trừ số ${number}` });
    });
    if (options.packs)
      options.packs.forEach((pack) => {
        newFilters.push({ type: 'packs', id: pack, name: byPackId[pack].name });
      });
    if (options.sortBy && options.sortBy !== 'all') {
      newFilters.push({ type: 'sortBy', id: options.sortBy, name: sortById[options.sortBy]?.name });
    }
    if (options.type)
      options.type.forEach((type) => {
        newFilters.push({ type: 'type', id: type, name: byTagId[type].name });
      });
    if (options.packsDesktop && options.packsDesktop !== 'all') {
      newFilters.push({ type: 'packsDesktop', id: options.packsDesktop, name: byPackId[options.packsDesktop].name });
    }
    return newFilters;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  return {
    selectedAttributes,
    handleModalFilter,
    handleRemoveAttributes,
    methods
  };
};

export default useSimFilter;
