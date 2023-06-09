import React from 'react';
import { CustomProps } from '../../types/element-type';
import clsx from 'clsx';

type Props = {
  img?: string;
  title: string;
  desc: string;
  date?: string;
};

const CardNews = ({ img, title, desc, date, className }: CustomProps<Props>) => {
  return (
    <div className={clsx('card', className)}>
      <figure className="aspect-video rounded-lg bg-base-300">
        <img src={img} alt={title} className="h-full w-full object-cover center-by-grid" />
      </figure>
      <div className="card-body px-0">
        <h5 className="text-xl">{title}</h5>
        <p className="mt-2 text-sm text-subtle-content line-clamp-2">{desc}</p>
        <div className="mt-2 text-sm text-subtle-content">{date}</div>
      </div>
    </div>
  );
};

export default CardNews;
