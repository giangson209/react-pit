import { Fragment, forwardRef, memo, useEffect, useImperativeHandle, useRef, useState } from 'react';
import Barcode from 'react-barcode';

import { Dialog, Transition } from '@headlessui/react';
import { useGlobalContext } from '@/context/global';
import { Data } from '@/types/model';

import Svg from '../icon/svg';
import dayjs from 'dayjs';
import ContentFailVoucher, { TypeIdFailed } from './ContentFailVoucher';
import clsx from 'clsx';

type IPropsPopupConfirmVoucher = {
  data: Data.VoucherDetail;
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
};

export interface MethodPopupConfirmVoucher {
  onMakeIsUseNow(): void;
}

// eslint-disable-next-line react/display-name
const PopupConfirmVoucher = forwardRef<MethodPopupConfirmVoucher, IPropsPopupConfirmVoucher>(
  ({ open, setOpen, data, handleClose }, ref) => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [isUseNow, setIsUseNow] = useState<boolean>(false);
    const [isFailed, setIsFailed] = useState<boolean>(false);
    const [typeFail, setTypeFail] = useState<TypeIdFailed | undefined>(undefined);

    const { status, toggleModalAuth } = useGlobalContext();
    const cancelButtonRef = useRef(null);
    const isLogin = status === 'authenticated';
    const handleSubmit = () => {
      if (!isLogin) {
        toggleModalAuth();
        return;
      }
      const res = { success: Math.random() < 0.7, error: Math.floor(Math.random() * 5) as TypeIdFailed };
      setIsSuccess(res.success);
      setIsFailed(!res.success);
      if (!res.success) {
        setTypeFail(res.error);
      }
    };

    const handleCloseInside = () => {
      handleClose();
      setIsSuccess(false);
      setIsUseNow(false);
      setIsFailed(false);
    };

    const onUseNow = () => {
      if (!isLogin) {
        toggleModalAuth();
        return;
      }
      setIsUseNow(true);
      setIsSuccess(false);
    };

    useImperativeHandle(ref, () => ({
      onMakeIsUseNow: () => setOpen(true)
    }));

    const ContentConfirm = () => (
      <div className="text-center">
        <h1 className="md:text-[32px] text-[18px]">
          <b>Bạn muốn đổi ưu đãi này?</b>
        </h1>
        <p className="py-8 text-base">
          Bạn có muốn sử dụng <b>{data.point}</b> để đổi Ưu đãi <b>{data.title}</b>
        </p>
        <div className="flex w-full justify-center gap-4">
          <button className="btn-secondary btn w-full rounded-full" onClick={handleCloseInside}>
            Hủy bỏ
          </button>
          <button className="btn-primary btn w-full rounded-full" onClick={handleSubmit}>
            Xác nhận
          </button>
        </div>
      </div>
    );

    const ContentSuccess = () => (
      <div className="flex flex-col items-center">
        <Svg src="/iwow/successVoucher.svg" className="h-20 w-20" />
        <h1 className="md:text-[32px] text-[18px]">
          <b>Đổi ưu đãi thành công!</b>
        </h1>
        <p className="py-8 text-base">
          Bạn nhớ sử dụng Voucher <b>{data.title}</b> trước ngày <b>{dayjs(data.deadline).format('DD.MM.YYYY')}</b> bạn nhé!
        </p>
        <div className="flex w-full justify-center gap-4">
          <button className="btn-secondary btn w-full rounded-full" onClick={onUseNow}>
            Dùng ngay
          </button>
          <button className="btn-primary btn w-full rounded-full" onClick={handleCloseInside}>
            Xem Voucher
          </button>
        </div>
      </div>
    );

    const ContentUseNow = () => (
      <>
        <h1 className="text-[18px] md:text-[32px]">
          <b>Thông tin Voucher</b>
        </h1>
        <div className="relative md:mt-8 mt-4 flex gap-4 overflow-hidden rounded-lg bg-neutral-50">
          <div className="aspect-square md:aspect-video w-[108px] md:w-48 overflow-hidden">
            <img src={data.img} alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center gap-1 md:pr-16">
            <p className="text-base font-bold text-neutral-800 md:max-w-none max-w-[200px]">{data.title}</p>
            <p className="text-sm text-neutral-500">HSD: 28/01/2023</p>
          </div>
          <div className="hidden md:block absolute right-4 top-3 h-12 w-12 overflow-hidden rounded-full">
            <img src={data.logo} alt="" className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="mt-4 md:mt-10 flex flex-col items-center gap-2 text-sm md:text-base">
          <Barcode displayValue={false} width={3} height={80} value="4456466774" />4 4 5 6 4 6 6 7 7 4
        </div>
        <div className="flex flex-col gap-4 text-neutral-500">
          <p className="mt-4 text-sm md:text-base">
            Bạn vui lòng đưa trực tiếp ưu đãi này cho nhân viên thanh toán. Vui lòng không đưa ảnh chụp màn hình
          </p>
          <p className="text-sm">
            Hiệu lực:
            <br />
            <b className="text-sm md:text-base text-neutral-800">03.03.2023 - 10.03.2023</b>
          </p>
          <p className="text-sm">
            Hotline:
            <br />
            <b className="text-sm md:text-base text-neutral-800">1900299232</b>
          </p>
        </div>
        <div className="mt-8 flex w-full justify-center">
          <button className="btn-primary btn rounded-full px-16 py-4" onClick={handleCloseInside}>
            Xem Voucher
          </button>
        </div>
      </>
    );

    const ContentModal = () => {
      if (isFailed) return <ContentFailVoucher typeId={typeFail} />;
      if (isSuccess) return <ContentSuccess />;
      if (isUseNow) return <ContentUseNow />;
      return <ContentConfirm />;
    };

    return (
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-overlay-popup bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className={clsx(isUseNow ? 'items-end p-0' : 'p-4', 'flex min-h-full justify-center md:items-center')}>
              <div className={clsx('relative w-[560px] rounded-3xl bg-neutral-0 md:p-10 py-6 px-4', isUseNow && 'rounded-b-none md:rounded-3xl')}>
                <Svg
                  src="/icons/line/close.svg"
                  className="absolute right-4 top-4 h-14 w-14 cursor-pointer rounded-full md:bg-neutral-100 p-4 bg-neutral-0"
                  onClick={handleCloseInside}
                />
                <ContentModal />
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  }
);

export default memo(PopupConfirmVoucher);
