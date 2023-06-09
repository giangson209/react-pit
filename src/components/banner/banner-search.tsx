import React from 'react';
import InputSearchBar from '../input/input-search-bar';

type Props = {
  img: string;
  title: string;
};

const BannerSearch = ({ img, title }: Props) => {
  return (
    <section className="container relative bg-base-100 py-16">
      <img src={img} alt="banner_background" className="absolute inset-0 h-full w-full object-cover" />
      <div className="relative max-xl:max-w-[480px]">
        <div className="font-itel text-neutral-0">
          <h2 className="text-h3">{title}</h2>
        </div>
        <div className="mt-10">
          <InputSearchBar />
        </div>
      </div>
    </section>
  );
};

export default BannerSearch;
