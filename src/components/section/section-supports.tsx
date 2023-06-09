import React from 'react';
import Svg from '../icon/svg';
import Link from 'next/link';
import clsx from 'clsx';

const supports = [
  { id: 1, href: '/', label: 'Hướng dẫn trợ giúp', icon: '/icons/bold/guide.svg' },
  { id: 2, href: '/', label: 'Danh sách đại lý', icon: '/icons/bold/shop.svg' },
  { id: 4, href: '/', label: 'Phản hồi góp ý', icon: '/icons/bold/feedback.svg' },
  { id: 5, href: '/', label: 'Liên hệ', icon: '/icons/bold/contact.svg' }
];

type Props = { className?: string };

const SectionSupports = ({ className }: Props) => {
  return (
    <section className={clsx('bg-neutral-100', className)}>
      <div className="container">
        <div className="-mx-2 flex flex-wrap gap-y-4 py-6 md:pb-10 xl:py-20">
          {supports.map((support) => {
            return (
              <div key={support.id} className="w-1/2 px-2 xl:w-1/4">
                <Link href={support.href} className="transition-default support w-full">
                  <Svg className="h-10 w-10" src={support.icon} />
                  {support.label}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectionSupports;
