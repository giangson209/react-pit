import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useCallback } from 'react';
import DropdownVoucher from './voucher-dropdown';
import Svg from '../icon/svg';
import { Model } from '@/types/model';
import { modal } from '@/context/modal-context';
import VoucherModal from './voucher-modal';

type Props = {
  totalPrice: number;
  selected?: number;

  onSelectedVouchers(data: Model.DiscountCode[]): void;
};

const VoucherSelector = ({ totalPrice, selected, onSelectedVouchers }: Props) => {
  const handleShowModal = useCallback(() => {
    modal.open({
      render(props) {
        return <VoucherModal totalPrice={totalPrice} {...props} />;
      },
      closeButton: true,

      className: 'modal-box max-w-[35rem]',
      onDone: onSelectedVouchers
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPrice]);

  const title = selected ? `Đã áp dụng ${selected} mã. ` : '';

  return (
    <div className="relative space-y-4 rounded-lg bg-base-100 px-4 py-5">
      <p>
        <b>Voucher iTel</b>
      </p>
      <hr className="border-neutral-200" />
      <Popover>
        <p className="text-left text-sm font-medium leading-6 text-red-500">
          <Svg className="mr-2 inline-block" src="/icons/bold/iclub.svg" width={24} height={24} />
          <span className="text-base-content">{title}</span>
          <Popover.Button as="span" role="button" className="hidden xl:inline-block">
            {selected ? 'Thêm ưu đãi khác' : 'Chọn hoặc nhập mã Voucher'}
          </Popover.Button>
          <span role="button" className="xl:hidden" onClick={handleShowModal}>
            {selected ? 'Thêm ưu đãi khác' : 'Chọn hoặc nhập mã Voucher'}
          </span>
        </p>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Popover.Panel
            className="absolute right-0 z-10 mt-2 w-[27.5rem] origin-top-right overflow-hidden rounded-2xl shadow-itel"
            data-theme="light"
          >
            {({ close }) => <DropdownVoucher total={totalPrice} done={(v) => (onSelectedVouchers(v), close())} />}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  );
};

export default VoucherSelector;
