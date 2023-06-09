import React from 'react';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { useModal } from '@/context/modal-context';
import Link from 'next/link';
import Routers from '@/routes/routers';

type Props = {
  phone: string;
};

const ModalChangePack = ({ phone }: Props) => {
  const { close, done } = useModal();
  return (
    <div>
      <HeaderMiddleAndFull
        title="Xác nhận thay đổi gói cước"
        desc={
          <>
            Thuê bao <b className="text-base-content md:text-xl">{formatPhoneNumber(phone)}</b> đang sử dụng gói cước{' '}
            <b className="md:text-xl">PARTY79</b>, hạn sử dụng đến ngày 18/04/2023. Nếu xác nhận đăng ký thay đổi thành gói{' '}
            <b className="md:text-xl">PARTY79</b>, các ưu đãi còn lại của gói <b className="md:text-xl">PARTY79</b> sẽ hết hiệu lực.
            <br />
            Vui lòng bấm <b className="text-red-500">Tiếp tục</b> để xác nhận thay đổi.
          </>
        }
      />
      <div className="mt-8">
        <div className="flex-1">
          <p>Gói cước hiện tại (cần hủy)</p>
          <div>asdasdasd</div>
        </div>
        <div></div>
        <div className="flex-1">
          <p>Gói cước mới</p>
          <div>asdasdasd</div>
        </div>
      </div>

      <div className="fixed left-0 bottom-0 md:relative w-full py-2 md:py-0 bg-neutral-0 mt-0 md:mt-8">
        <div className="flex -mx-1.5 px-4 md:px-0 justify-center">
          <div className="w-1/2 md:w-[14.5rem] px-1.5">
            <button type="button" onClick={close} className="transition-default h-11 btn-secondary btn md:btn-lg w-full rounded-full">
              Thay đổi số
            </button>
          </div>
          <div className="w-1/2 md:w-[14.5rem] px-1.5">
            <button type="button" onClick={done} className="transition-default h-11 btn-primary btn md:btn-lg w-full rounded-full">
              Tiếp tục
            </button>
          </div>
        </div>
        <p className="mt-4 md:mt-6 text-subtle-content text-center">
          <span className="md:block">Bạn chưa có Sim?</span>
          <Link href={Routers.SIM} className="text-base-content md:text-red-500">
            <b> Mua Sim với gói cước </b>
          </Link>
          <span className="max-md:hidden">ngay nhé.</span>
        </p>
      </div>
    </div>
  );
};

export default ModalChangePack;
