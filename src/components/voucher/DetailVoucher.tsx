import { useRef, useState } from 'react';
import dayjs from 'dayjs';

import { Data } from '@/types/model';

import PopupConfirmVoucher, { MethodPopupConfirmVoucher } from './PopupConfirmVoucher';
import clsx from 'clsx';

type PropsDetailVoucher = Data.VoucherDetail & {
  isPopup?: boolean;
};

export default function DetailVoucher({ isPopup, ...data }: PropsDetailVoucher) {
  const [openConfirmVoucher, setOpenConfirmVoucher] = useState<boolean>(false);
  const popupRef = useRef<MethodPopupConfirmVoucher>(null);
  const handleOpenConfirm = () => {
    if (isPopup) {
      popupRef.current?.onMakeIsUseNow();
    }
    setOpenConfirmVoucher(true);
  };
  const handleClose = () => setOpenConfirmVoucher(false);

  return (
    <>
      <div className={`w-full lg:flex lg:gap-10`}>
        <div className="lg:w-[60%]">
          <div className="w-full md:px-0">
            <div className="relative aspect-video overflow-hidden md:rounded-2xl lg:w-full">
              <img className="w-full object-cover" src={data.img} alt={data.title} />
              <div className="absolute bottom-6 left-6 aspect-square w-18 overflow-hidden rounded-full">
                <img className="w-full object-cover md:block hidden" src={data.logo} alt={data.title} />
              </div>
              <div className="md:hidden absolute left-0 bottom-0 mt-6 w-fit rounded-r-2xl bg-gradient-price px-4 py-2 text-sm text-neutral-0 lg:hidden">
                Giảm 50.000đ
              </div>
            </div>
          </div>
          <div className="hidden md:block w-fit rounded-r-2xl bg-gradient-price px-4 py-2 text-xl text-neutral-0 lg:hidden md:mt-6">
            Giảm 50.000đ
          </div>
          <h1 className={clsx('py-3 md:text-[40px] leading-tight text-xl text-neutral-800  md:px-0', isPopup && 'px-4')}>
            <b>
              [{data.typeName}] {data.title}
            </b>
          </h1>
          <div className={clsx('mt-3 lg:hidden md:px-0', isPopup && 'px-4')}>
            <div className="flex md:gap-40 text-sm gap-12">
              <div>
                <p>Điểm đổi</p>
                <b className="md:text-xl text-base">{data.point} điểm</b>
              </div>
              <div>
                <p>Hiệu lực</p>
                <b className="md:text-xl text-base">
                  {dayjs(data.from).format('DD.MM.YYYY')} - {dayjs(data.deadline).format('DD.MM.YYYY')}
                </b>
              </div>
            </div>
            <div className="mt-6 flex flex-col gap-2 text-base">
              <b className="text-xl">Điều kiện</b>
              <div dangerouslySetInnerHTML={{ __html: data.require.descHTML }} />
            </div>
          </div>
          <div className={clsx('md:px-0', isPopup && 'px-4')}>
            <div className="my-6 h-[1px] w-full bg-neutral-300 lg:hidden" />
          </div>
          <b className={clsx('text-xl md:px-0', isPopup && 'px-4')}>Thông tin chương trình</b>
          <div dangerouslySetInnerHTML={{ __html: data.infomationHTML }} className={clsx(isPopup && 'px-4', 'md:px-0')} />
        </div>
        <div className="hidden h-fit w-[40%] rounded-2xl border border-neutral-200 bg-neutral-0 p-8 lg:block">
          <div className=" w-fit rounded-r-2xl bg-gradient-price px-4 py-2 text-xl text-neutral-0 ">Giảm 50.000đ</div>
          <p className="py-3 text-2xl text-neutral-800">
            <b>{data.title}</b>
          </p>
          <div className="flex flex-col gap-3 text-sm">
            <div>
              <p>Điểm đổi</p>
              <b className="text-xl">{data.point} điểm</b>
            </div>
            <div>
              <p>Hiệu lực</p>
              <b className="text-xl">
                {dayjs(data.from).format('DD.MM.YYYY')} - {dayjs(data.deadline).format('DD.MM.YYYY')}
              </b>
            </div>
          </div>
          <div className="my-6 h-[1px] w-full bg-neutral-300" />
          <div className="mt-6 flex flex-col gap-2 text-base">
            <b className="text-xl">Điều kiện</b>
            <div dangerouslySetInnerHTML={{ __html: data.require.descHTML }} />
            <br />
            <b> Chi tiết vui lòng xem thông tin bên trái.</b>
            <button className="btn-primary btn mt-6 rounded-full px-24 py-4 text-base" onClick={handleOpenConfirm}>
              Đổi ngay {data.point} điểm
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 z-30 w-full lg:hidden">
        <div className="flex justify-between border-t border-neutral-200 bg-neutral-0 px-10 py-4">
          <div>
            <p className="text-sm text-neutral-500">Đổi điểm</p>
            <p className="text-2xl text-neutral-800">
              <b>{data.point} điểm</b>
            </p>
          </div>
          <button className="btn-primary btn rounded-full md:px-9 md:py-4 py-3 px-4 text-base" onClick={handleOpenConfirm}>
            Đổi ngay
          </button>
        </div>
      </div>

      <PopupConfirmVoucher data={data} open={openConfirmVoucher} setOpen={setOpenConfirmVoucher} handleClose={handleClose} ref={popupRef} />
    </>
  );
}
