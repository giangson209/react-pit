import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

import { modal, useModal } from '@/context/modal-context';
import { addSimToCart } from '@/store/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { toCurrency } from '@/utilities/currency';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';

import CardSimBonusWithRadio from '@/components/card/card-sim-bonus-with-radio';
import ModalESim from '@/components/modal/modal-e-sim';
import HrDashed from '../common/dashed';
import Svg from '../icon/svg';
import TagSim from '../tag-chip/tag-sim';
import TagVip from '../tag-chip/tag-vip';

import useIsClient from '@/hooks/useIsClient';
import usePrevious from '@/hooks/usePrevious';
import { ImageService } from '@/services/image/image';
import { pickRandomGift } from '@/services/product/product';
import { useDataModal } from '@/store/cart/hooks/data';
import { Model } from '@/types/model';
import { getDiscountPercentage, randomBetween } from '@/utilities/number';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import HeaderAppDefault from '../header/header-app-default';
import TagSale from '../tag-chip/tag-sale';
import Tooltip from '../tooltip/tooltip';
import ModalMobileHeader from './modal-mobile-header';

export interface IFormSelectSim {
  sims: Array<{
    type: 'esim' | 'physic';
    pack: string;
  }>;

  paymentMethod: string;
}
const simOptions = [
  {
    id: 1,
    title: 'Sim vật lý',
    type: 'physic',
    price: 0,
    desc: 'Sim cứng lắp vào máy'
  },
  {
    id: 2,
    title: 'Sử dụng eSim',
    type: 'esim',
    price: 65_000,
    desc: 'eSIM là SIM điện tử, không cần dùng Sim vật lý. Chỉ dùng cho các dòng máy hỗ trợ eSIM.'
  }
];
type ModalAddToCartProps = {
  items: Array<Model.Sim>;
  mode?: 'cart' | 'buy';
  title?: string;
};
const BottomSheetAddToCart = ({ items, mode = 'cart', title = 'Chi tiết Sim' }: ModalAddToCartProps) => {
  useIsClient();
  const { close, done } = useModal<any>();
  const [selected, setSelected] = useState(0);
  const dispatch = useAppDispatch();
  const cartSimItem = useAppSelector((state) => state.cart.cartSimItem);

  const [packs] = useState<Model.PackOfData[]>(
    Array.from({ length: 4 }, (e, idx) => ({
      data: randomBetween(1, 5) * 1_000_000,
      data_type: 'day',
      id: idx + 1,
      name: 'ITEL149',
      price: randomBetween(10, 15) * 20_000,
      discount_price: randomBetween(5, 10) * 20_000,
      price_type: 'month'
    }))
  );
  const [gifts] = useState(
    Array.from({ length: randomBetween(1, 5) }, (e, idx) => ({
      ...pickRandomGift(),
      id: idx + 1,
      image: ImageService.random('artworks'),
      price: randomBetween(10, 20) * 50_000,
      count: 1
    }))
  );

  const defaultValues = useMemo(
    () => ({
      sims: items.map((item) => ({
        type: 'physic' as any,
        pack: String(packs[0].id)
      })),
      paymentMethod: 'card'
    }),
    [items, packs]
  );
  const methods = useForm<IFormSelectSim>({
    defaultValues,
    criteriaMode: 'all'
  });
  methods.watch('sims');

  const handleSubmit = (values: IFormSelectSim) => {
    try {
      const isExisted = cartSimItem.some((e) => {
        e.merchandise.some((sim) => items.some((item) => item.phone == sim.phone));
      });
      if (isExisted) return toast.error('Số điện thoại đã có trong giỏ hàng');
      toast.success('Thêm sản phẩm thành công');

      const simsSubmit = items.map((sim, index) => {
        const pack = packs.find((pack) => pack.id === Number(values.sims[index].pack));
        if (!pack) throw new Error('missing pack');
        return {
          ...sim,
          type: 'esim' as any,
          pack
        };
      });
      if (mode === 'cart') {
        dispatch(
          addSimToCart({
            sims: simsSubmit,
            gift: gifts ? { options: gifts, selected } : undefined
          })
        );
        close();
      } else {
        done({
          sims: simsSubmit,
          gift: gifts ? { options: gifts, selected } : undefined
        });
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  // const handlePaymentMethod = () => {
  //   modal.open({
  //     render: <ModalPaymentMethod defaultMethod={methods.getValues('paymentMethod')} />,
  //     closeButton: false,
  //     transition: false,
  //     className: 'modal-box shadow-itel !bg-neutral-0',
  //     classNameContainer: 'modal-bottom-sheet',
  //     onDone(data: string) {
  //       methods.setValue('paymentMethod', data);
  //     }
  //   });
  // };

  const totalPrice = items.reduce((total, item, index) => {
    total += item.discount_price ?? item.price;

    const type = methods.getValues(`sims.${index}.type`);

    if (type) {
      const simOption = simOptions.find((op) => op.type === type);
      if (simOption) total += simOption.price;
    }
    const packId = methods.getValues(`sims.${index}.pack`);
    if (packId) {
      const pack = packs.find((pack) => pack.id === Number(packId));
      if (pack) total += pack.discount_price ?? pack.price;
    }
    return total;
  }, 0);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <HeaderAppDefault type="sticky" mode="close" title={title} />
        <div className="max-md:hidden absolute top-4 xl:top-8 right-4 xl:right-8">
          <button
            className="btn-tertiary btn btn-circle fixed right-8 z-50 md:bg-neutral-100 xl:bg-neutral-0 xl:hover:bg-neutral-50"
            type="button"
            onClick={close}
          >
            <Svg src="/icons/line/close.svg" width={24} height={24} />
          </button>
        </div>
        <div className="container max-xl:max-w-none md:py-12">
          <div>
            {items
              .map((item, index) => (
                <SimPopupDetail key={item.phone} data={item} index={index} packs={packs} isMultipleSim={items.length > 1} />
              ))
              .reduce(
                (prev, cur, index) =>
                  [prev, <HrDashed key={'separeted_' + index} className="text-neutral-200 -mt-px max-md:hidden" />, cur] as any
              )}
          </div>
          {gifts && (
            <div className="mt-0 py-6 xl:mt-4 xl:rounded-2xl xl:bg-neutral-0 xl:px-8">
              <p className="text-xl">
                <b>Quà tặng kèm</b>
              </p>
              <div className="mt-4 flex flex-col items-center justify-between gap-2 xl:flex-row xl:gap-6">
                {gifts.map((item, index) => (
                  <CardSimBonusWithRadio
                    key={index}
                    cardGift={{
                      id: index,
                      image: item.image,
                      name: item.name
                    }}
                    price={item.price}
                    isChecked={index === selected}
                    onChange={() => setSelected(index)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="sticky bottom-0 z-10 border-t border-neutral-200 bg-neutral-0">
          <div className="container pb-6 pt-4">
            <div className="flex items-center flex-wrap md:flex-row">
              <div className="flex md:block justify-between items-center flex-1 text-left">
                <p className="text-sm font-normal text-subtle-content xl:text-base">Tổng tiền</p>
                <p className="text-s-sm xl:text-s-md">
                  <b>{toCurrency(totalPrice)}</b>
                </p>
              </div>
              <div className="w-full md:w-auto flex gap-3 xl:gap-4 py-2">
                <button type="submit" className="flex-1 btn-primary btn whitespace-nowrap rounded-full xl:btn-lg">
                  {mode === 'buy' ? (
                    'Mua ngay'
                  ) : (
                    <span>
                      Thêm vào giỏ <span className="max-md:hidden"> hàng</span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

const SimPopupDetail = ({
  data,
  index,
  packs,
  isMultipleSim
}: {
  data: Model.Sim;
  index: number;
  packs: Model.PackOfData[];
  isMultipleSim?: boolean;
}) => {
  const { handleViewDetail, handleModalPhoneCheck } = useDataModal();

  const methods = useFormContext<IFormSelectSim>();
  const packInfo = [{ content: '2GB/ngày' }, { content: '300 SMS' }, { content: 'Gọi nội mạng iTel và \nVinaPhone' }];
  const discountPercentage = getDiscountPercentage(true, data.price, data.discount_price);

  const type = useWatch<IFormSelectSim, `sims.${number}.type`>({ name: `sims.${index}.type` });
  const prevType = usePrevious(type);
  const handleSelectEsim = (close?: () => void) => {
    modal.open({
      render: <ModalESim />,
      className: 'modal-box md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
      onClose: close,
      closeButton: false
    });
  };
  const handleShowInfomation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    modal.open({
      render(props) {
        return (
          <div className="container py-6" style={{ minHeight: '17.125rem' }}>
            <div className="flex items-center">
              <h1 className="flex-1 text-xl">
                <strong>Cam kết 24 tháng</strong>
              </h1>
              <button onClick={props.close}>
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            </div>
            <div className="mt-4 text-neutral-500" onClick={props.close}>
              <p>Sim yêu cầu sử dụng gói cước iTEL49 trong thời gian tối thiểu 24 tháng sau khi kích hoạt Sim.</p>
            </div>
          </div>
        );
      },
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-bottom-sheet',
      classNameOverwrite: true,
      closeButton: false,
      transition: false
    });
  };

  useEffect(() => {
    if (prevType !== type && type === 'esim') handleSelectEsim(() => methods.setValue(`sims.${index}.type`, prevType!));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  return (
    <div className="xl:bg-neutral-0 py-4 md:py-6 xl:p-8 rounded-2.5xl">
      <div className="flex relative">
        <div className="w-24 md:w-20 mr-4">
          <figure className="block-img block-square">
            <img src="/images/pick-sim-image.png" alt="pick-sim" className="object-cover rounded-lg" />
          </figure>
        </div>
        <div className="md:flex items-center flex-1">
          <div className="flex-1">
            <p className="text-xs md:text-base font-normal text-neutral-500">
              {isMultipleSim ? `Sim đôi ưu đãi - Sim 0${index + 1}` : 'Số thuê bao bạn lựa chọn là'}
            </p>
            <div className="flex items-center mt-1">
              <p className="font-itel text-h-xs md:text-h4 xl:text-h3 mr-1">{formatPhoneNumber(data.phone)}</p>
              {true ? <TagVip className="w-6 h-6 md:h-8 md:w-8" /> : <TagSim className="w-6 h-6 md:h-8 md:w-8" />}
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <div className="price-info items-center md:justify-end">
              <span className="md:flex items-center xl:text-xl">
                <p className="mr-2">
                  <b>{toCurrency(data.discount_price ?? data.price)}</b>
                </p>
                {data.discount_price && (
                  <p className="block text-xs font-normal text-neutral-500">
                    <s>{toCurrency(data.price)}</s>
                  </p>
                )}
              </span>
              {discountPercentage && <span className="badge badge-sale">-{discountPercentage}%</span>}
            </div>
            <div className="absolute md:relative left-0 bottom-0 md:mt-2">
              {data.sale_expiry && (
                <TagSale className="tag-xs md:tag-sm">
                  <TagSale.Icon className="hidden xl:block" />
                  <TagSale.Timer expiry={data.sale_expiry} />
                </TagSale>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <div className="text-md :text-xl font-bold">Chọn loại Sim</div>
        <div>
          <ul className="md:flex gap-10">
            {simOptions.map((option) => {
              return (
                <li key={option.id} className="mt-4">
                  <label className="flex md:items-center min-w-[12rem]">
                    <input type="radio" className="mr-4" value={option.type} {...methods.register(`sims.${index}.type`)} />
                    <div>
                      <p className="text-sm md:text-base">
                        <b>
                          {option.title} (+{toCurrency(option.price)})
                        </b>
                      </p>
                      <p className="text-xs md:text-sm mt-1">{option.desc}</p>
                    </div>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="mt-6 md:mt-8">
        <p className="text-md :text-xl font-bold">Chọn gói cước</p>
        <div className="mt-4">
          <div className="flex -mx-4 px-2.5 md:px-12 md:-mx-14 xl:px-0 xl:-mx-2 overflow-x-scroll overflow-y-hidden scrollbar-hide">
            {packs.map(({ price, discount_price, id, name }) => (
              <div key={id} className="px-1.5 md:px-2 xl:w-1/4">
                <label className="w-[15rem] md:w-[13.75rem] xl:w-auto h-full flex flex-col relative rounded-2xl bg-neutral-0">
                  <div className="flex-1 p-3 pb-0 xl:p-4">
                    <div className="bg-neutral-50 rounded-2xl px-3 xl:px-4 pb-4 xl:pb-6 ">
                      <input
                        type="radio"
                        className="!absolute top-2.5 right-2.5 peer !bg-neutral-0"
                        value={id}
                        {...methods.register(`sims.${index}.pack`)}
                      />
                      <span className="absolute inset-0 rounded-2xl border-neutral-300 border peer-checked:border-red-500 pointer-events-none" />
                      <div className="border-b mb-4 border-neutral-200">
                        <p className="flex items-center py-2">
                          <span className="font-itel text-h-xxs md:flex-auto mr-1">{name}</span>
                          <span className="tag tag-primary tag-sm">Gói tháng</span>
                        </p>
                      </div>
                      {/* Content */}
                      <div className="text-sm">
                        <p>Miễn phí</p>
                        <ul className="font-medium whitespace-pre-line">
                          {packInfo.map(({ content }, idx) => (
                            <li
                              key={idx}
                              className={'flex items-center mt-2 ' + (!idx ? 'text-h-xxs xl:text-h-xs font-bold font-itel' : undefined)}
                            >
                              <Svg src="/icons/bold/tick-circle.svg" className="text-orange mr-2" width={20} height={20} />
                              <p>{content}</p>
                            </li>
                          ))}
                        </ul>
                        <p className="mt-2 flex items-center gap-1">
                          Cam kết 24 tháng
                          <button className="md:hidden" onClick={handleShowInfomation}>
                            <Svg src="/icons/line/information.svg" width={16} height={16} />
                          </button>
                          <Tooltip
                            withArrow
                            className="max-md:hidden"
                            content={<b>Yêu cầu sử dụng gói cước ITEL149 trong thời gian tối thiểu 36 tháng sau khi kích hoạt Sim.</b>}
                          >
                            <Svg src="/icons/line/information.svg" width={16} height={16} />
                          </Tooltip>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-5 pt-2 xl:pb-4 flex items-center">
                    <div className="text-xs flex-1">
                      <p>
                        <span>
                          <b className="text-sm md:text-base">{toCurrency(discount_price ?? price)}</b>
                          <span className="md:text-sm text-subtle-content">/tháng</span>
                        </span>
                      </p>
                      {typeof discount_price === 'number' && (
                        <p className="text-subtle-content">
                          <s>{toCurrency(price)}</s>
                        </p>
                      )}
                    </div>
                    <div className="text-sm">
                      <button type="button" onClick={handleViewDetail}>
                        <b>Chi tiết</b>
                      </button>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ModalPaymentMethod = ({ defaultMethod = 'card' }: { defaultMethod?: string }) => {
  const { close, done } = useModal();

  const [selectedMethod, setSelected] = useState(defaultMethod);
  const methods = [
    { method: 'card', name: 'Trả góp qua thẻ', desc: 'Visa, Mastercard, JCB, Amex' },
    { method: 'profile', name: 'Trả góp qua hồ sơ', desc: 'Thủ tục đơn giản & nhanh chóng' }
  ];

  return (
    <div className="container pb-20 pt-6">
      <ModalMobileHeader title="Chọn hình thức trả góp" onClose={close} />

      <div className="mt-4">
        <ul className="menu p-1">
          {methods.map((method) => {
            return (
              <li key={method.method} className={method.method === selectedMethod ? 'menu-active' : undefined}>
                <label className="flex items-center" onClick={() => setSelected(method.method)}>
                  <div className="flex-1">
                    <p className="text-sm font-bold">{method.name}</p>
                    <p className="text-xs">{method.desc}</p>
                  </div>
                  {method.method === selectedMethod && (
                    <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 mr-2" width={20} height={20} />
                  )}
                </label>
              </li>
            );
          }, [])}
        </ul>
      </div>
      <div className="fixed bottom-0 py-2 bg-neutral-0 left-0 container">
        <button className="btn btn-primary btn-lg rounded-full w-full" onClick={() => done(selectedMethod)}>
          Xác nhận
        </button>
      </div>
    </div>
  );
};

export default BottomSheetAddToCart;
