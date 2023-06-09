import React from 'react';
import Svg from '../icon/svg';
import { CustomProps } from '@/types/element-type';
import clsx from 'clsx';
import { forwardRefWithAs } from '@/utilities/render';

type Props = { withAction?: boolean };

const InputSearchBar = forwardRefWithAs(function InputSearchBar(
  { className, ...rest }: CustomProps<Props, 'input'>,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <div className={clsx('relative flex flex-1 rounded-full bg-neutral-100', className)}>
      <div className="flex h-full items-center p-4">
        <Svg src="/icons/bold/vector.svg" className="block h-6 w-6" />
      </div>
      <div className="flex w-16 flex-shrink-0 items-center justify-center bg-neutral-50">
        <span className="text-[18px] font-bold">087</span>
      </div>
      <input
        placeholder="Tìm Sim theo nhu cầu của bạn (*222, 789*, 56,...)"
        className="peer w-full bg-transparent p-4 font-medium outline-none"
        {...rest}
        ref={ref}
      />
      <div className="flex items-center">
        <div className="transition-default duration-300 peer-placeholder-shown:opacity-0">
          <Svg src="/icons/line/close.svg" className="block h-6 w-6" />
        </div>
        <div className="transition-default h-full duration-300 peer-placeholder-shown:opacity-0">
          <button className="btn-secondary btn h-full w-max rounded-full">Tìm kiếm</button>
        </div>
      </div>
    </div>
  );
});

export default InputSearchBar;
