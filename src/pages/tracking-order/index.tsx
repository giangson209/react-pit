import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import TextInput from '@/components/form/TextInput';
import LayoutDefault from '@/components/layout/layout-default';
import { OrderSupport } from '@/components/modal/modal-support';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import { useState } from 'react';
import clsx from 'clsx';
import SectionLogin from '@/components/section/section-login';
import { modal } from '@/context/modal-context';
import ModalOrderNotFound from '@/components/modal/modal-order-not-found';
import LayoutSupport from '@/components/layout/layout-support';
import HeaderMobileWeb from '@/components/header/header-mobile-web';

const EXAMPLE_ORDER = {
  id: '#ITEL123456',
  name: 'Nguyễn Bảo Ngọc',
  phone: '096*****967',
  schedules: [
    {
      time: '12:15, 12 tháng 3',
      active: true,
      title: 'Đang vận chuyển',
      description: 'Đơn hàng đang trên đường giao tới bạn'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển',
      description: 'Đơn hàng đang trên đường giao tới bạn'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển'
    },
    {
      time: '12:15, 12 tháng 3',
      active: false,
      title: 'Đang vận chuyển',
      description: 'Đơn hàng đang trên đường giao tới bạn'
    }
  ]
};

interface PageProps {}
const TrackingOrderPage = (props: PageProps) => {
  const [orderCode, setOrderCode] = useState('');
  const [order, setOrder] = useState<any>(null);

  const openModalNotFound = () => {
    modal.open({
      render: <ModalOrderNotFound />,
      transition: false,
      className: 'modal-box shadow-itel max-w-[80vw] md:max-w-[35rem] px-4 py-6 md:px-10 md:py-10 ',
      classNameContainer: 'modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  };

  return (
    <>
      <Head>
        <title>Itel - Theo dõi đơn hàng</title>
      </Head>
      <HeaderMobileWeb title="Theo dõi đơn hàng" />
      <LayoutSupport>
        <h4 className="text-h-sm hidden md:block font-itel">
          <b>THEO DÕI ĐƠN HÀNG</b>
        </h4>

        {/* search box */}
        <div className="bg-neutral-0 rounded-lg mt-4 md:mt-6 md:pt-5 pb-4 md:pb-6 md:px-8">
          <p className="font-bold text-xl">Tra cứu đơn hàng dễ dàng với mã đơn</p>
          <p className="text-neutral-500 text-sm">Cảm ơn Quý khách đã sử dụng dịch vụ của iTel.</p>
          <div className="border-t border-neutral-200 my-4 md:mt-5 md:mb-6" />
          <TextInput
            inputLabel="Mã đơn hàng"
            placeholder="Nhập mã đơn hàng"
            value={orderCode}
            onChange={(e) => setOrderCode(e.currentTarget.value)}
            clear
          />

          <button
            disabled={!orderCode}
            type="button"
            className="block w-full md:w-[206px]  btn-primary btn rounded-full mx-auto mt-6 md:mt-10"
            onClick={() => {
              openModalNotFound();
              setOrder(EXAMPLE_ORDER);
            }}
          >
            Tra cứu
          </button>
        </div>
        {/* end search box */}

        {/* result box */}
        {!!order && (
          <>
            <div className="h-2">
              <div className="absolute md:hidden h-2 bg-neutral-100 w-[100vw] left-0" />
            </div>
            <div className="bg-neutral-0 mt-4 rounded-lg md:pt-10 xl:pt-11 pb-4 md:pb-6 md:px-8">
              <p className="text-xl font-bold">Trạng thái đơn hàng {order.id}</p>
              <p className="text-neutral-500 mt-1">
                <span className="font-bold">{order.name}</span> | <span>{order.phone}</span>
              </p>

              <div className="border-t border-neutral-200 my-4 md:mt-5 md:mb-6" />

              {order.schedules.map((item: any, index: number) => (
                <div key={index} className="flex min-h-[72px]">
                  <div className="min-w-[120px] w-[120px] text-right pt-0.5">
                    <p className={clsx({ 'font-medium text-sm text-neutral-500': true, 'opacity-50': !item.active })}>{item.time}</p>
                  </div>
                  <div className="mx-5 text-center flex flex-col items-center">
                    <div className={clsx({ 'h-2 w-[1px] bg-neutral-800': true, 'opacity-50': !item.active })} />
                    <div className={clsx({ 'w-[9px] h-[9px] rounded-full bg-neutral-800': true, 'opacity-50': !item.active })} />
                    {index < order.schedules.length - 1 && (
                      <div className={clsx({ 'flex-1 w-[1px] bg-neutral-800': true, 'opacity-50': !order.schedules[index + 1].active })} />
                    )}
                  </div>
                  <div className={clsx({ 'pb-6': true, 'opacity-50': !item.active })}>
                    <p className="font-bold">{item.title}</p>
                    <p className="text-neutral-500">{item.description}</p>
                  </div>
                </div>
              ))}

              <div className="border-t border-neutral-200 my-4 md:my-6" />

              <OrderSupport />
            </div>
          </>
        )}
        {/* end result box */}

        <div className="h-2">
          <div className="absolute md:hidden h-2 bg-neutral-100 w-[100vw] left-0" />
        </div>

        {/* login box */}
        <SectionLogin className="mt-4" />
        {/* end login box */}
      </LayoutSupport>
    </>
  );
};

TrackingOrderPage.getLayout = function layout(page: any) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};
const getStaticProps = getServerPropsWithTranslation(async () => {
  return {
    props: {}
  };
});
export { getStaticProps };

export default TrackingOrderPage;
