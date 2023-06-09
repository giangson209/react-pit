import React from 'react';
import Svg from '../icon/svg';
import { useModal } from '@/context/modal-context';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';

type Props = {
  phone: string;
};

const ModalRegistraionRenewal = ({ phone }: Props) => {
  const { close, done } = useModal();
  return (
    <div className="px-4 pb-24 pt-6 md:p-0">
      <div className="flex items-center">
        <h2 className="text-xl md:text-s-md font-bold">Gia hạn đăng ký</h2>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <p className="mt-4 md:mt-8 text-subtle-content">
        Gói cước <b className="text-base-content">PARTY79</b> đang được thuê bao{' '}
        <b className="text-base-content">{formatPhoneNumber(phone)}</b> sử dụng (HSD: còn 18 ngày). Bằng việc bấm “Tiếp tục”, bạn đồng ý gia
        hạn gói cước này.
      </p>
      <div className="fixed bottom-0 md:relative w-full py-2 md:py-0 bg-neutral-0 mt-0 md:mt-8">
        <div className="flex -mx-1.5 w-full">
          <div className="px-1.5 w-1/2">
            <button className="btn btn-secondary w-full md:btn-lg rounded-full" onClick={close}>
              Thay đổi số
            </button>
          </div>
          <div className="px-1.5 w-1/2">
            <button className="btn btn-primary w-full md:btn-lg rounded-full" onClick={done}>
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalRegistraionRenewal;
