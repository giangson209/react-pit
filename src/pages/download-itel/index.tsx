import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import TextInput from '@/components/form/TextInput';
import LayoutDefault from '@/components/layout/layout-default';
import { OrderSupport } from '@/components/modal/modal-support';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Head from 'next/head';
import { useState } from 'react';
import clsx from 'clsx';
import { modal } from '@/context/modal-context';
import ModalOrderNotFound from '@/components/modal/modal-order-not-found';
import LayoutSupport from '@/components/layout/layout-support';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import SectionDownloadiTel from '@/components/section/section-download-itel';

interface PageProps { }
const DownloadITelPage = (props: PageProps) => {

  return (
    <>
      <Head>
        <title>Itel - Ứng dụng My iTel</title>
      </Head>
      <HeaderMobileWeb title="Ứng dụng My iTel" />
      <LayoutSupport>
        <h4 className="text-h-sm hidden md:block font-itel">
          <b>ỨNG DỤNG MY ITEL</b>
        </h4>

        {/* QR code */}
        <div className="bg-neutral-0 rounded-lg mt-4 md:mt-6 overflow-hidden">
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <div className="container p-6 md:p-10">
              <div>
                <p className="text-neutral-500 text-xs md:text-sm">App tiện ích</p>
                <p className="text-red-500 font-bold font-itel text-h5 md:text-h4">MY ITEL</p>
              </div>
              <div className="mt-6">
                <p className="font-bold text-h5 md:text-h4">Theo là thích</p>
                <p className="font-bold text-h5 md:text-h4">App đa tiện ích.
                  <a href='#' className="text-red-500">&nbsp;Tải ngay</a>
                </p>
              </div>
              <div className="mt-6">
                <p className="text-sm md:text-base">Bạn thích xem phim miễn phí.
                  <span className="font-bold">&nbsp;Tải App ngay.</span>
                </p>
                <p className="text-sm md:text-base">Bạn muốn chơi game thả ga.
                  <span className="font-bold">&nbsp;Tải App liền.</span>
                </p>
                <p className="text-sm md:text-base">Hàng ngàn tiện ích đang chờ bạn.
                  <span className="font-bold">&nbsp;Quét mã tải ngay.</span>
                </p>
              </div>
              <div className="mt-16 flex flex-col justify-center items-center">
                <img src="/images/iTel-QR-Code.png" alt="" draggable={false} />
                <p className="mt-4 text-xs md:text-sm">Quét mã QR để tải App</p>
              </div>
            </div>
            <img src="/images/iTel.png" alt="" draggable={false} />
          </div>
        </div>
        {/* end QR code */}

        {/* ad download */}
        <SectionDownloadiTel className="mt-4" />
        {/* end ad download */}
      </LayoutSupport>
    </>
  );
};

DownloadITelPage.getLayout = function layout(page: any) {
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

export default DownloadITelPage;
