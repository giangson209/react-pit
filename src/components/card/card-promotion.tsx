import React from 'react';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<{
  img: string;
  title: string;
  desc?: string;
}>;

const CardPromotion = ({ img, title, desc, className, ...rest }: Props) => {
  return (
    <div {...rest} className={className}>
      <div className="card bg-base-100 shadow-xl">
        <figure className="aspect-photo overflow-hidden">
          <img src={'/image/url'} alt="promotion image" className="h-full w-full object-cover" />
        </figure>
        <div className="card-body">
          <h5 className="card-title text-xl">Phim mới ra mắt: Đóng cửa chặt vào, Suzume!</h5>
          <p className="card-desc mt-1">iTel Phim • 12/2/2023</p>
          <div className="card-actions mt-4">
            <button className="btn-secondary btn rounded-full">Khám phá ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPromotion;
