import { useModal } from '@/context/modal-context';
import useIsSticky from '@/hooks/useIsSticky';
import clsx from 'clsx';
import React, { useRef } from 'react';
import Svg from '../icon/svg';
import { Model } from '@/types/model';

import styles from '@/styles/sim.module.scss';
import TagSale from '../tag-chip/tag-sale';
import { formatPhone } from '@/utilities/formatSimNumber';
import TagSim from '../tag-chip/tag-sim';
import TagVip from '../tag-chip/tag-vip';
import { toCurrency } from '@/utilities/currency';

type Props = {
  title?: string;

  item: Model.Sim;
  tags?: string[];

  onAddToCart?(): void;
  onBuyNow?(): void;
};

const ModalSimInfo = ({ title, item, tags = [], onAddToCart, onBuyNow }: Props) => {
  const { close } = useModal();
  const ref = useRef<HTMLHRElement>(null);
  const isSticky = useIsSticky(ref, {});
  const content = undefined;

  const isMatch = true;
  const outOfStock = false;
  let discount = 0;

  const attributes = [
    { title: 'Mệnh', value: 'Hoả' },
    { title: 'Số nút', value: '7' },
    { title: 'Cát - hung', value: 'Đại Cát' }
  ];
  const message = isMatch
    ? outOfStock
      ? 'Sim phù hợp với bạn. Rất tiếc, sim không còn trong kho'
      : 'Sim phù hợp với bạn. Mua Sim ngay!'
    : 'Sim không phù hợp với bạn. Vui lòng chọn Sim khác';
  const isValidSale = item.sale_expiry ? new Date(item.sale_expiry).getTime() > Date.now() : false;

  return (
    <div>
      {/* Header */}
      <hr className="border-none absolute w-full h-px pointer-events-none" ref={ref}></hr>
      <nav
        className={clsx(
          isSticky ? '' : 'opacity-0 pointer-events-none',
          'bg-neutral-0 transition-default fixed w-full md:hidden top-0 z-50 border-b border-neutral-200'
        )}
      >
        <div className="container">
          <div className="relative flex items-center gap-2 h-16">
            <div className="absolute left-0">
              <button type="button" className="btn-ghost btn btn-sm btn-circle" onClick={close}>
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            </div>
            <div className="flex-1 flex justify-center text-[1.125rem] font-bold truncate p-16 overflow-hidden">
              <h1 className="truncate max-w-xs">{title}</h1>
            </div>
          </div>
        </div>
      </nav>
      <button
        type="button"
        className={clsx(
          'left-4 md:left-auto md:right-4 absolute top-4 btn-tertiary md:bg-neutral-0 z-10 transition-default btn btn-sm btn-circle'
        )}
        onClick={close}
      >
        <Svg src="/icons/line/close.svg" width={24} height={24} />
      </button>

      {/* Main content */}
      <div className="container md:py-12">
        <div className="flex flex-wrap gap-10 bg-neutral-0">
          <div className="flex-1">
            {/* Banner */}
            <div className="md:mx-0 -mx-4 md:rounded-2xl overflow-hidden">
              <div className="block-img block-cinema xl:block-photo">
                <img
                  src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685440663/itel/images/31fff1f852d79e1eadd8e64d5b1d83d5_wl7v4f.png"
                  alt="123"
                  className="object-cover"
                />
                {isValidSale && (
                  <div className="absolute bottom-0 left-0 flex">
                    <TagSale className="tag-sm md:tag-lg rounded-l">
                      <TagSale.Icon></TagSale.Icon>
                      <TagSale.Timer expiry={item.sale_expiry}></TagSale.Timer>
                    </TagSale>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 xl:mt-6">
              <div>
                <p className="flex items-center gap-2 text-h-xs leading-6 md:text-xl xl:text-h-md">
                  <b className="font-itel">{formatPhone(item.phone)}</b>
                  {item.is_vip ? <TagVip className="h-6 w-6 xl:h-10 xl:w-10" /> : <TagSim className="h-6 w-6 xl:h-10 xl:w-10" />}
                  <span>
                    <Svg src="/icons/bold/gift.svg" className="h-6 w-6 xl:h-10 xl:w-10" />
                  </span>
                </p>
                <ul className="md:hidden mt-2 space-x-1">
                  {tags.map((label) => (
                    <li key={`key-${label}`} className="tag tag-primary">
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <h2 className="xl:text-xl">
                  <strong>Điểm thần số học 9/10</strong>
                </h2>
                <p className="mt-2 xl:mt-4 text-neutral-500">
                  Thí chủ Nam mệnh Sơn đầu hỏa mang nghĩa “lửa trên núi”. Cùng là hành Hỏa nhưng sau khi đi kèm với yếu tố nạp âm, mệnh Sơn
                  Đầu Hỏa lại mang những đặc trưng khác biệt với những mệnh Hỏa khác. Thí chủ phù hợp với các số 3,7, 6 và kỵ với các số 1,
                  9, nên chọn các số thuộc mệnh Hỏa, mệnh Mộc và tránh lựa chọn các số thuê bao thuộc mệnh Thủy.
                </p>
              </div>
              <div className="flex -mx-4 items-stretch mt-4">
                {attributes
                  ?.map(({ title, value }, index) => (
                    <div key={index} className="w-1/3 px-4 md:px-4">
                      <dt className="text-xs md:text-sm text-neutral-500 whitespace-nowrap">{title}</dt>
                      <dd className="text-sm md:text-base font-bold">{value}</dd>
                    </div>
                  ))
                  .reduce(
                    (prev, curr, index) =>
                      [prev, <hr key={'separate_' + index} className="border-l my-auto py-4 border-neutral-400" />, curr] as any
                  )}
              </div>
              <div className="mt-4">
                <div className="max-xl:hidden">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-xs md:text-sm text-neutral-500">Quẻ kinh dịch</dd>
                </div>
                <p className="font-bold text-md md:text-base md:mt-1">
                  Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc thăng tiến. Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc
                  thăng tiến
                </p>
              </div>
            </div>
            {/* Content */}
            <div className={styles.content} dangerouslySetInnerHTML={content ? { __html: content } : undefined}>
              <div>
                {/*  */}
                <h3>
                  <strong>Chỉ số sứ mệnh: 2</strong>
                </h3>
                <p>
                  Điểm chung của những người mang số 2 trong thần số học là muốn mọi người tập trung vào bạn. Bạn luôn là người kết nối hòa
                  giải mâu thuẫn cho người khác.
                </p>
                <h3>
                  <strong>Năm cá nhân: 2</strong>
                </h3>
                <p>
                  Hợp tác và cân bằng: Trong năm thứ hai, khi các kế hoạch đã được ươm mầm thì cần có sự chăm sóc bởi các yếu tố bên ngoài
                  khác từ sự giúp đỡ, hợp tác với những người xung quanh. Trong thời gian này bạn cần hiểu rõ giới hạn của bản thân, xem khả
                  năng của mình đến đâu và bổ sung sự thiếu sót bằng những mối quan hệ xung quanh.
                </p>
                <h3>
                  <strong>Biểu đồ ngày sinh</strong>
                </h3>
                <p>Trục mũi tên Quyết tâm (1.5.9): Bạn có đức tính kiên trì bền bỉ, sẵn sàng theo đuổi mục tiêu đến khi đạt được</p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685431865/itel/images/11887cedd7affc37603d2e3af755065c_npnng5.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>

                <h3>
                  <strong>Kim Tự Tháp Thần số học</strong>
                </h3>
                <p>
                  · Đỉnh cao sự nghiệp 1: 31 tuổi (2023)
                  <br />
                  · Đỉnh cao sự nghiệp 2: 40 tuổi (2039)
                  <br />
                  · Đỉnh cao sự nghiệp 3: 49 tuổi (2048)
                  <br />· Đỉnh cao sự nghiệp 4: 58 tuổi (2057)
                </p>
                <p>
                  Biểu đồ ngày sinh thiếu năng lượng các số: 2, 3, 4, 6, 8 Biểu đồ ngày sinh thiếu các trục: 1.2.3; 4.5.6; 7.8.9; 1.4.7;
                  2.5.8; 3.6.9; 3.5.7 Số đơn lẻ: 0
                </p>
                <p>
                  <img
                    src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685432233/itel/images/e1c55d35769aa04df958a3e7886fb403_wj4mtf.png"
                    alt="Screenshot"
                    loading="lazy"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="w-full xl:w-[25.5rem] pb-16 xl:pb-0">
            <div className="p-6">
              <div className="hidden xl:block">
                <div>
                  <p className="flex items-center gap-2 text-h-xs leading-6 md:text-xl xl:text-h-xs">
                    <b className="font-itel">{formatPhone(item.phone)}</b>
                    {item.is_vip ? <TagVip className="h-6 w-6" /> : <TagSim className="h-6 w-6" />}
                    <span>
                      <Svg src="/icons/bold/gift.svg" className="h-6 w-6" />
                    </span>
                  </p>
                  <ul className="md:hidden mt-2 space-x-1">
                    {tags.map((label) => (
                      <li key={`key-${label}`} className="tag tag-primary">
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex -mx-4 items-stretch mt-4">
                  {attributes
                    ?.map(({ title, value }, index) => (
                      <div key={index} className="w-1/3 px-4 md:px-4">
                        <dt className="text-xs md:text-sm text-neutral-500 whitespace-nowrap">{title}</dt>
                        <dd className="text-sm md:text-base font-bold">{value}</dd>
                      </div>
                    ))
                    .reduce(
                      (prev, curr, index) =>
                        [prev, <hr key={'separate_' + index} className="border-l my-auto py-4 border-neutral-400" />, curr] as any
                    )}
                </div>
                <div className="mt-4">
                  <div className="max-xl:hidden">
                    <dt className="sr-only">Title</dt>
                    <dd className="text-xs md:text-sm text-neutral-500">Quẻ kinh dịch</dd>
                  </div>
                  <p className="font-bold text-md md:text-base md:mt-1">
                    Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc thăng tiến. Số vận thủ lĩnh, hương tận vinh hoa phú quý, quan lộc
                    thăng tiến
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p>
                  <strong>Quà tăng kèm</strong>
                </p>
                <ul>
                  <li></li>
                  <li></li>
                  <li></li>
                </ul>
              </div>
              <div className="fixed bottom-0 right-0 left-0 xl:relative bg-neutral-0 border-t border-neutral-200 xl:border-none pb-2">
                <div className="container xl:px-0">
                  <div className="flex xl:block items-center">
                    <p className="max-md:hidden text-sm mr-1">Kết luận</p>
                    <p className="text-sm md:text-base text-red-500 font-bold xl:mt-1">{message}</p>
                  </div>
                  <div className="flex justify-between mt-4">
                    <div className="flex flex-1">
                      <div>
                        <p className="block md:text-xl">
                          <b>{toCurrency(item.discount_price ?? item.price)}</b>
                        </p>
                        {typeof item.discount_price === 'number' && (
                          <p className="block text-sm text-neutral-500 font-normal">
                            <s>{toCurrency(item.price)}</s>
                          </p>
                        )}
                      </div>
                      {(discount = item.discount_price ? Math.floor(((item.price - item.discount_price) / item.price) * 100) : 0) && (
                        <span>
                          <span className="badge badge-sale ml-2">{-discount + '%'}</span>
                        </span>
                      )}
                    </div>
                    <div className="flex items-center md:mt-2">
                      <button type="button" className="btn-tertiary btn btn-sm btn-circle mr-3" onClick={onAddToCart}>
                        <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
                      </button>
                      <button className="btn-primary btn btn-sm flex-1 whitespace-nowrap rounded-full" onClick={onBuyNow}>
                        Mua ngay
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSimInfo;
