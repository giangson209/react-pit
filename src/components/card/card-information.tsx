import React from 'react';
import { CustomProps } from '../../types/element-type';

type Props = CustomProps<{
  img: string;
  title: string;
  desc: string;
}>;

const CardInformation = ({ title, img, desc }: Props) => {
  return (
    <div className="card card-side bg-base-100">
      <figure className="aspect-tivi w-60">
        <img src={img} alt={title} className="h-full w-full object-cover" />
      </figure>
      <div className="card-body justify-center">
        <h5 className="card-title text-xl font-bold">{title}</h5>
        <p className="text-md card-desc mt-2">{desc}</p>
      </div>
    </div>
  );
};

export default CardInformation;
