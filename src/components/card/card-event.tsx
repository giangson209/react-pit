import React from 'react';
import { CustomProps } from '../../types/element-type';
import Link from 'next/link';

type Props = CustomProps<{
  img: string;
  title: string;
  desc: string;
}>;

const CardEvent = ({ title, img, desc }: Props) => {
  return (
    <div className="rounded-2xl transition-default overflow-hidden group">
      <figure className="w-full aspect-video overflow-hidden rounded-2xl">
        <img src={img} alt="" className="w-full h-full object-cover transition-default group-hover:scale-110" />
      </figure>

      <div className="flex flex-col gap-1 px-4 py-4">
        <h1 className="md:text-xl text-neutral-800 font-medium line-clamp-2">{title}</h1>
        <p className="md:text-sm text-neutral-500">{desc}</p>
        <p className="md:text-sm text-neutral-500">Tin iTel: 09/03/2023</p>
      </div>
    </div>
  );
};

export default CardEvent;
