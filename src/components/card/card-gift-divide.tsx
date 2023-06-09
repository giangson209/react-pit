import clsx from 'clsx';
import React from 'react';
import { CustomProps } from '../../types/element-type';
import Link from 'next/link';
import Routers from '@/routes/routers';

type Props = CustomProps<{
  title: string;
  redemptionDeadline: string;
  img: string;
  logo: string;
  point: number;
  src: number;
  onClickReceive?: () => void;
}>;

const CardGiftDivide = ({ title, img = '/image/logo', logo = '/image/url', redemptionDeadline, className, point, src, onClickReceive, ...rest }: Props) => {
  return (
    <div className={clsx('card group', className)} {...rest}>
      <figure className="aspect-video">
        <Link href={{ pathname: Routers.IWOW_COUPON_DETAIL, query: { id: `${src}` } }} className="relative">
          <img
            src={img}
            alt="promotion image"
            className="h-full w-full transition-default bg-neutral-0 object-cover group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 bg-no-repeat bg-center bg-[url('/iwow/tagColor.png')] bg-cover">
            <p className="text-sm text-base-100 font-bold p-2">9h - 11h 25/6/2023 </p>
          </div>
        </Link>
      </figure>
      <div className="card-body gap-1 bg-neutral-0 px-4 py-3">
        <Link
          href={{ pathname: Routers.IWOW_COUPON_DETAIL, query: { id: `${src}` } }}
          className="card-title justify-between gap-3 font-bold"
        >
          {title}
          <div className="relative aspect-square w-12 flex-shrink-0 overflow-hidden rounded-full">
            <img src={logo} alt="logo image" className="absolute inset-0 object-cover" />
          </div>
        </Link>
        <p className="card-desc text-sm">Khung giờ 9h - 11h 25/6/2023</p>
      </div>
      <div className="card-divider bg-neutral-0"></div>
      <div className="card-actions-ticket bg-neutral-0 ">
        <Link
          href={{ pathname: Routers.IWOW_COUPON_DETAIL, query: { id: `${src}` } }}
          className="btn-secondary btn btn-sm w-1/2 rounded-full"
        >
          Chi tiết
        </Link>
        <button className="btn-primary btn btn-sm w-1/2 rounded-full" onClick={onClickReceive}>Nhận ngay</button>
      </div>
    </div>
  );
};

export default CardGiftDivide;
