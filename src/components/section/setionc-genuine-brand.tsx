import React from 'react';
import partners from '@/mock/partners.json';
import clsx from 'clsx';
import Link from 'next/link';
import { UrlObject } from 'url';

type Props = {
  className?: string;
  href?: UrlObject | string;
};

const SectionGenuineBrand = ({ className, href }: Props) => {
  return (
    <section className="bg-neutral-0 md:bg-transparent">
      <div className="container">
        <div className={className}>
          <div className="rounded-2xl md:p-6 xl:px-8 xl:py-10" data-theme="light">
            <div className="flex items-center justify-between">
              <h3 className="md:font-itel text-xl md:text-h4 font-bold xl:text-h3">Thương hiệu chính hãng</h3>
              {href && (
                <Link href={href} className="font-bold">
                  Xem tất cả
                </Link>
              )}
            </div>
            <div className="-mx-3 mt-3 md:mt-6 flex flex-wrap md:flex-nowrap xl:mt-2">
              <div className="w-full md:w-1/2 px-1 xl:px-3">
                <div className="-mx-1 flex flex-wrap xl:-mx-2">
                  {partners.map((partner, index) => (
                    <div
                      key={index}
                      className={clsx(index > 3 ? 'hidden xl:block' : '', 'mt-2 w-1/4 md:w-1/2 px-1 xl:mt-6 xl:w-1/3 xl:px-2')}
                    >
                      <div className="block-img block-square overflow-hidden rounded-lg bg-neutral-100">
                        <img
                          src={partner.media.src}
                          className="object-contain"
                          alt={partner.name}
                          loading="lazy"
                          style={{ backgroundColor: partner.media.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-2 flex w-full md:w-1/2 px-1 xl:mt-6 xl:px-3">
                <div className="h-full w-full overflow-hidden rounded-lg bg-neutral-100">
                  <img
                    className="h-full w-full object-cover object-left"
                    loading="lazy"
                    alt="QC"
                    // style={{ objectPosition: '-50px' }}
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1683980836/itel/images/06c3d5ce1d451c07b790b3ee1025d998_gdr1rj.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionGenuineBrand;
