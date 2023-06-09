import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { CustomProps } from '../../types/element-type';
import Svg from '../icon/svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import Link from 'next/link';
import Routers from '@/routes/routers';
import { Data } from '@/types/model';
import vouchersServices from '@/services/vouchers/vouchers';
import { modal } from '@/context/modal-context';
import DetailVoucher from '../voucher/DetailVoucher';

type Props = CustomProps<{
  title: string;
  redemptionDeadline: string;
  img: string;
  logo: string;
  point: number;
  src: string | number;
  isPopup?: boolean;
}>;
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale('en', {
  relativeTime: {
    future: 'trong %s',
    past: '%s',
    s: 'vài phút ',
    m: '1 phút',
    mm: '%d phút',
    h: '1 giờ',
    hh: '%d giờ',
    d: '1 ngày',
    dd: '%d ngày',
    M: '1 tháng',
    MM: '%d tháng',
    y: '1 năm',
    yy: '%d tháng'
  }
});

const CardCoupon = ({
  title,
  img = '/image/logo',
  logo = '/image/url',
  redemptionDeadline,
  className,
  point,
  src,
  isPopup,
  ...rest
}: Props) => {
  const [voucher, setVoucher] = useState<Data.VoucherDetail | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenConfirm = async () => {
    setIsLoading(true);
    try {
      const res = await vouchersServices.getDetailVoucher({ id: Number(src) });
      setVoucher(res);
      setOpen(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (open && voucher) {
      modal.open({
        render(props) {
          return (
            <div className="container p-0 md:pt-12 md:px-10 pb-28 lg:p-0 lg:pt-12 relative lg:pb-28" style={{ minHeight: '17.125rem' }}>
              <div className="flex items-center">
                <DetailVoucher {...voucher} isPopup />,
                <button onClick={props.close}>
                  <Svg
                    src="/icons/line/close.svg"
                    className="lg:right-8 md:right-4 md:top-16 md:h-14 md:w-14 cursor-pointer rounded-full bg-neutral-100 md:p-4 z-10 left-2 md:left-auto top-3 w-10 h-10 p-2 fixed"
                  />
                </button>
              </div>
            </div>
          );
        },
        transition: false,
        closeButton: false,
        className: 'modal-box shadow-itel !bg-neutral-50',
        classNameContainer: 'modal-full md:modal-bottom-sheet',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
        onClose: handleClose
      });
      return;
    }
  }, [voucher, open]);

  return (
    <>
      <div className={clsx('group transition-default card bg-neutral-0 tooltip-light', className, isLoading && 'opacity-70')} {...rest}>
        <figure className="aspect-video">
          {isPopup ? (
            <button onClick={handleOpenConfirm}>
              <img src={img} alt="promotion image" className="transition-default h-full w-full object-cover group-hover:scale-110" />
            </button>
          ) : (
            <Link href={{ pathname: Routers.IWOW_COUPON_DETAIL, query: { id: `${src}` } }}>
              <img src={img} alt="promotion image" className="transition-default h-full w-full object-cover group-hover:scale-110" />
            </Link>
          )}
        </figure>
        <div className="card-body md:gap-6 md:px-4 md:py-3 gap-2 p-2">
          {isPopup ? (
            <button onClick={handleOpenConfirm}>
              <h5 className="card-title justify-between gap-3 font-bold items-start md:items-center">
                <p className="text-left">{title}</p>
                <div className="relative aspect-square md:w-12 md:h-12 w-6 h-6 flex-shrink-0 overflow-hidden rounded-full">
                  <img src={logo} alt="logo image" className="h-full w-full object-cover" />
                </div>
              </h5>
            </button>
          ) : (
            <Link href={{ pathname: Routers.IWOW_COUPON_DETAIL, query: { id: `${src}` } }}>
              <h5 className="card-title justify-between gap-3 font-bold items-start md:items-center">
                <p className="text-left">{title}</p>
                <div className="relative aspect-square md:w-12 md:h-12 w-6 h-6 flex-shrink-0 overflow-hidden rounded-full">
                  <img src={logo} alt="logo image" className="h-full w-full object-cover" />
                </div>
              </h5>
            </Link>
          )}
          <div className="card-actions justify-between">
            <div>
              <div className="flex items-center gap-1">
                <Svg src="/iwow/point.svg" className="h-5 w-5" />
                {point} điểm
              </div>
              <div className="card-desc mt-1 flex items-center gap-1 text-xs">
                <Svg src="/icons/line/calendar.svg" className="h-4 w-4" fill="#666666" />
                {redemptionDeadline}
                <button type="button" className={clsx('transition-default tooltip')}>
                  <Svg src="/icons/line/information.svg" className="h-4 w-4" />
                  <span className="tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">
                    Hạn sử dụng {redemptionDeadline} kể từ ngày đổi ưu đãi.
                  </span>
                </button>
              </div>
            </div>
            <button className="transition-default btn-secondary btn md:btn-sm btn-xs rounded-full" onClick={handleOpenConfirm}>
              Đổi ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardCoupon;
