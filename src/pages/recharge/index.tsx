import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Svg from '@/components/icon/svg';
import LayoutDefault from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import Stepper from '@/components/stepper/stepper';
import { modal, useModal } from '@/context/modal-context';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import { addCodeToCheckout } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { toCurrency } from '@/utilities/currency';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import HeaderWebDefault from '@/components/header/header-web-default';
import { CARD_NETWORK, LIST_CARDS } from '@/constants/recharge.constants';

const tabs = [
  {
    id: 'recharge',
    icon: '/icons/bold/recharge-card.svg',
    name: 'Nạp tiền điện thoại'
  },
  {
    id: 'code',
    icon: '/icons/bold/buy-card.svg',
    name: 'Mua mã thẻ'
  }
];

const ModalSelectNetwork = ({ defaultValues }: { defaultValues?: string }) => {
  const { close, done } = useModal();
  const [selected, setSelected] = useState<string>(defaultValues || CARD_NETWORK[0].name);

  const handleSubmit = () => {
    done(selected);
  };
  return (
    <div>
      <nav className="bg-neutral-0 transition-default sticky w-full md:hidden top-0 z-50 border-b border-neutral-200">
        <div className="container">
          <div className="relative flex items-center gap-2 h-16">
            <div className="absolute left-0">
              <button type="button" className="btn-ghost btn btn-sm btn-circle" onClick={close}>
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            </div>
            <div className="flex-1 flex justify-center text-[1.125rem] font-bold truncate px-16 overflow-hidden">
              <h1 className="truncate max-w-xs">Chọn nhà mạng</h1>
            </div>
          </div>
        </div>
      </nav>
      <main className="py-2">
        <section className="bg-neutral-0">
          <div className="container">
            <ul className="divide-y divide-neutral-200">
              {CARD_NETWORK.map((network, personIdx) => (
                <li key={network.name}>
                  <label className="flex items-center gap-4 p-4 pl-0">
                    <input
                      type="radio"
                      name="network"
                      value={network.name}
                      checked={selected === network.name}
                      onChange={(e) => setSelected(e.target.value)}
                    />
                    <div className="flex-1 capitalize font-medium">{network.name}</div>
                    <div>
                      <img src={network.path} alt={network.name} className="h-10 w-full" />
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <div className="bg-neutral-0 fixed bottom-0 py-2 w-full">
        <div className="container">
          <button onClick={handleSubmit} className="btn w-full btn-primary rounded-full">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

const validTab = ['recharge', 'code'];

const CardRechargePage: NextPage = () => {
  const router = useRouter();
  const currentTab = validTab.includes(String(router.query.tab)) ? String(router.query.tab) : 'recharge';

  const [selected, setSelected] = useState(CARD_NETWORK[0]);
  const [network, setNetworkProvider] = useState<string>('itel');
  const refInputPhone = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const methods = useForm<{ phone: string; network: string; quantity: number; price: string }>({
    defaultValues: { quantity: 1, network: selected.name, price: String(LIST_CARDS[0].price) },
    mode: 'onTouched'
  });

  useEffect(() => {
    currentTab !== 'recharge' && methods.unregister('phone', { keepError: false });
    refInputPhone.current?.focus();
  }, [currentTab, methods]);

  const handleSubmit = (values: { phone: string; network: string; quantity: number; price: string }) => {
    dispatch(
      addCodeToCheckout({
        type: currentTab === 'code' ? 'code' : 'recharge', // recharge | code
        network: values.network,
        receiver: values.phone,
        price: Number(values.price),
        quantity: Number(values.quantity)
      })
    );
    router.push({
      pathname: Routers.CHECKOUT
    });
  };
  const handleModalSelectNetwork = () => {
    modal.open({
      render: <ModalSelectNetwork defaultValues={selected.name} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-100',
      classNameContainer: 'modal-full',
      classNameOverlay: '',
      onDone(data: string) {
        const selected = CARD_NETWORK.find((card) => card.name == data);
        methods.setValue('network', data);
        selected && setSelected(selected);
      }
    });
  };

  const isValid = currentTab === 'recharge' ? methods.formState.isDirty && methods.formState.isValid : true;

  const { ref, ...rest } =
    currentTab === 'recharge'
      ? methods.register('phone', {
          pattern: {
            value: /^(?:\+?84|0)(?:\d){9,10}$/,
            message: 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!'
          },
          required: 'Số điện thoại không đúng định dạng. Vui lòng kiểm tra lại!',
          shouldUnregister: true
        })
      : ({} as any);

  return (
    <form onSubmit={methods.handleSubmit(handleSubmit)}>
      <Head>
        <title>Itel - Nạp thẻ</title>
      </Head>
      <HeaderWebDefault title="Nạp thẻ di động" withMenu withSearch />
      <section className="bg-neutral-0 md:bg-transparent">
        <div className="container md:pt-8 xl:pt-14">
          <h2 className="hidden font-itel text-h-md font-bold md:block">Nạp thẻ di động</h2>
          <div className="md:mt-6">
            <div className="tabs flex-nowrap gap-x-4 whitespace-nowrap text-base scrollbar-hide">
              {tabs.map((tab) => {
                const isActive = tab.id === currentTab;
                return (
                  <Link
                    key={tab.id}
                    href={{ pathname: Routers.RECHARGE, query: { tab: tab.id } }}
                    shallow
                    className={clsx('tab-bordered flex-nowrap gap-x-2 pt-1 md:p-4 tab tab-primary', isActive && 'tab-active')}
                  >
                    <Svg
                      src={tab.icon}
                      className={clsx('max-md:hidden', isActive ? 'text-red-500' : 'text-base-content')}
                      width={32}
                      height={32}
                    />
                    {tab.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="-mt-[2px] flex-1 border-b-2 border-neutral-200"></div>
        </div>
      </section>
      {/* <hr /> */}
      <section className="bg-neutral-0 md:bg-transparent">
        <div className="container mt-2 md:mt-0">
          {currentTab === 'recharge' && (
            <div className="md:mt-6 flex w-full flex-col gap-x-6 md:flex-row">
              <label className="form-control w-full md:w-2/3">
                <div className="max-md:hidden label py-4">
                  <span className="label-text text-base font-medium" aria-required={true}>
                    Số điện thoại
                  </span>
                </div>
                <div className="font-bold">
                  <input
                    className="input-bordered input md:input-lg md:h-18 border-b border-0 md:border rounded-none md:rounded-xl outline-none md:text-s-sm xl:h-20 w-full max-md:px-0"
                    id="phone-number"
                    type="tel"
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                    placeholder="Nhập số điện thoại"
                    autoFocus
                    {...rest}
                    ref={(e) => {
                      ref(e);
                      (refInputPhone as any).current = e;
                    }}
                  />
                </div>
                {methods.formState.errors.phone && (
                  <div className="mt-2 md:mt-4">
                    <p className="text-sm md:text-base bg-neutral-50 md:bg-transparent label justify-start py-1 px-2 md:p-0 text-red-500 rounded-lg">
                      <Svg className="mr-2 h-4 md:h-6 w-4 md:w-6 text-primary" src="/icons/line/danger-circle.svg" />
                      <span>{methods.formState.errors.phone.message}</span>
                    </p>
                  </div>
                )}
              </label>

              <div className="max-md:hidden form-control relative flex w-full md:w-1/3">
                <div className="label py-4">
                  <span className="label-text text-base font-medium" aria-required={true}>
                    Nhà mạng
                  </span>
                </div>
                <Listbox
                  as="div"
                  value={selected}
                  onChange={(v) => {
                    setSelected(v);
                    methods.setValue('network', v.name);
                  }}
                  className=" relative"
                >
                  <Listbox.Button
                    type="button"
                    className="input-bordered input input-lg h-18 w-full rounded-2xl py-3 pl-6 font-bold xl:h-20"
                  >
                    <div className="h-full flex-1">
                      <img src={selected.path} alt={selected.name} className="h-full object-contain" />
                    </div>
                    <div className="absolute inset-y-0 right-0 mr-3 flex items-center">
                      <div className="btn-tertiary btn btn-lg hidden xl:flex">Thay đổi</div>
                      <div className="xl:hidden">
                        <Svg src="/icons/bold/down.svg" width={24} height={24} />
                      </div>
                    </div>
                  </Listbox.Button>
                  <Transition as={Fragment} leave="transition-default" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="absolute left-auto right-0 top-full z-10 mt-2 w-full max-w-md rounded-2xl bg-neutral-0 px-6 py-4 shadow-itel xl:left-0">
                      <div className="text-xl">
                        <b>Chọn nhà mạng</b>
                      </div>
                      <Listbox.Options className="-mx-1.5 flex flex-wrap outline-none">
                        {CARD_NETWORK.map((network, personIdx) => (
                          <Listbox.Option key={network.name} className="w-1/3 px-1.5 pt-4" value={network}>
                            {({ selected }) => (
                              <div className={clsx('h-16  rounded-lg border py-3', selected ? 'border-red-500' : 'border-neutral-300')}>
                                <img src={network.path} alt={network.name} className="h-full w-full" />
                              </div>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </div>
                  </Transition>
                </Listbox>
                <p className="mt-4 text-sm font-medium text-neutral-500 ">Vui lòng lựa chọn đúng nhà mạng của bạn</p>
              </div>
            </div>
          )}
          {currentTab === 'code' && (
            <div className="max-md:hidden md:mt-14">
              <p>
                Nhà mạng <span className="text-primary">*</span>
              </p>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {CARD_NETWORK.map((item) => (
                  <div
                    key={item.path}
                    onClick={() => {
                      setNetworkProvider(item.name);
                      methods.setValue('network', item.name);
                    }}
                    className={`flex cursor-pointer justify-center rounded-2xl border border-neutral-200 p-4  hover:border-primary ${
                      network === item.name && 'border-primary'
                    }`}
                  >
                    <img loading="lazy" alt={`logo-${item.name}`} src={item.path} className="inline-block w-[18.75rem] h-14" />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="md:hidden">
            <button type="button" onClick={handleModalSelectNetwork} className="flex w-full py-2 items-center">
              <div className="flex-1 text-left font-medium">Nhà mạng</div>
              <div className="flex items-center">
                <img src={selected.path} alt={selected.name} className="h-10" />
                <Svg src="/icons/line/chevron-right.svg" width={24} height={24} />
              </div>
            </button>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 md:bg-transparent md:pb-20">
        <div className="container py-4 md:py-0 mt-2 md:mt-6 xl:mt-14">
          <div className="flex flex-col justify-center">
            <p className="label-text text-base font-medium" aria-required={true}>
              Mệnh giá nạp
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center xl:grid-cols-4">
              {LIST_CARDS.map((card) => (
                <label
                  key={card.price}
                  className="font-medium block text-center relative overflow-hidden rounded-lg md:rounded-2xl p-4 md:px-6 md:py-4.5"
                >
                  <input
                    type="radio"
                    className="sr-only peer"
                    hidden
                    value={card.price}
                    {...methods.register('price', { required: true })}
                  />
                  <span className="absolute inset-0 rounded-lg md:rounded-2xl border border-neutral-200 peer-checked:border-red-500" />
                  <p className="text-xl sm:text-2xl">{toCurrency(card.price)}</p>
                  <p className="text-sm font-medium leading-5 text-modern-red">
                    Giá bán: {toCurrency(card.price * (1 - card.percent / 100))}
                  </p>
                  <span className="absolute right-0 top-0 rounded-bl-xl bg-orange px-2 text-sm font-medium text-neutral-content">
                    {-card.percent + '%'}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="fixed md:relative bottom-0 bg-neutral-0 left-0 w-full md:mt-10 md:py-0 md:text-center">
            {currentTab === 'code' && (
              <div className="container md:p-0 py-4 border-b border-neutral-200 md:border-none">
                <div className="flex md:block text-left justify-between md:mt-14 items-center">
                  <p className="label-text text-base font-medium" aria-required>
                    Số lượng
                  </p>
                  <div className="md:mt-4">
                    <Stepper
                      className="md:stepper-lg"
                      min={1}
                      max={10}
                      {...methods.register('quantity', { valueAsNumber: true, min: 1, max: 10 })}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className="container py-2 md:p-0">
              <button type="submit" className="btn-primary btn btn-lg w-[12.5rem] rounded-full" disabled={!isValid}>
                {currentTab === 'recharge' ? 'Nạp ngay' : 'Mua ngay'}
              </button>
            </div>
          </div>
        </div>
      </section>
      <SectionSupports className="max-md:hidden" />
    </form>
  );
};

CardRechargePage.getLayout = function (page) {
  return (
    <>
      <LayoutDefault className="md:bg-neutral-0" footerClassName="md:bg-neutral-0">
        {page}
      </LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default CardRechargePage;
