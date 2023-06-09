import { Fragment, useRef, useState } from 'react';
import Svg from '../icon/svg';
import { Menu, Transition } from '@headlessui/react'
import { Option } from '../modal/modal-suggest-data';

type DropdownDataProps<D> = {
  options: D[];
  displayValue(item: D): string;
  onChange?(item: D): void;
  value?: D;
  placeholder?: string;
  containerCls?: string;
  buttonCls?: string;
  dropDownIconCls?: string;
};
export default function DropdownData<D extends { id: number, } | string>({
  displayValue,
  options,
  value,
  onChange,
  placeholder,
  containerCls,
  buttonCls,
  dropDownIconCls
}: DropdownDataProps<D>) {
  return (
    <Menu as="div" className={`relative inline-block text-left lg:w-[340px] w-full ${containerCls}`}>
      <div className={`w-full`}>
        <Menu.Button className={`flex flex-row bg-neutral-0 relative lg:w-[340px] w-full px-[16px] items-center ${buttonCls}`}>
          <div
            className={`text-[16px] font-bold text-neutral-800 ${!value ? "opacity-50" : "opacity-100"} text-left block truncate`}>
            {value && displayValue(value) || placeholder}
          </div>
          <div className={"flex items-center rounded-r-md focus:outline-none ml-auto mr-0 "+dropDownIconCls}>
            <Svg src="/icons/bold/down.svg" width={24} height={24} />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-100"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-100"
      >
        <Menu.Items className="absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-neutral-0 w-[100%] drop-shadow-2xl shadow-lg shadow-itel z-50">
          <div className="px-1 py-1 ">
            {/* @ts-ignore */}
            {options.map((option: Option) => <Menu.Item key={option.id}>
              {() => (
                <button
                  onClick={() => {
                    //@ts-ignore
                    onChange && onChange(option)
                  }}
                  //@ts-ignore
                  className={`text-left text-[16px] text-neutral-800 p-[16px] hover:bg-neutral-100 w-[100%] font-bold block truncate ${value?.id === option?.id ? "bg-neutral-100" : ""}`}
                >
                  {/* @ts-ignore */}
                  {displayValue(option)}
                </button>
              )}
            </Menu.Item>)}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
