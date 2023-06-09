import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { Logger } from '@/utilities/logger';

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import BannerNormal from '@/components/banner/banner-normal';
import SectionSupports from '@/components/section/section-supports';
import Modal from '@/components/modal/modal';

import { Data, Model } from '@/types/model';
import { TAB_MENU_IWOW } from '../../../constants/iwow.constants';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import IwowIzuiServices from '@/services/iwow/izui';
import CardGiftDivide from '@/components/card/card-gift-divide';
import { TabRouterIwow } from '../club';
import ModalIzuiNoti from '@/components/modal/modal-izui-noti';
import { useState } from 'react';

type PageProps = {
  izuiCheckinList: Data.IzuiCheckinList;
  izuiListGifts: Data.IzuiCheckinListGift;
};
const IWowIzuiPage: NextPage<PageProps> = ({ izuiCheckinList, izuiListGifts }) => {
  const router = useRouter();
  const [isShowNotiPopUp, setIShowNotiPopUp] = useState(false);

  const onCloseNotiHandler = () => {
    setIShowNotiPopUp(false);
  };

  return (
    <>
      <Head>
        <title>Itel - Izui</title>
      </Head>
      <TabRouterIwow isTop />
      <BannerNormal
        classWrapText="md:pt-[98px] !max-w-[700px] lg:!pt-[224px]"
        data={[
          {
            id: 1,
            img: '/iwow/izuiBanner.png',
            title: 'Giờ vàng tràn ưu đãi',
            desc: '12 giờ trưa rồi, săn deal ăn uống thôi!',
            actionTitle: 'Khám phá ngay',
            type: 'red'
          },
          {
            id: 2,
            img: '/iwow/izuiBanner.png',
            title: 'Giờ vàng tràn ưu đãi',
            desc: '12 giờ trưa rồi, săn deal ăn uống thôi!',
            actionTitle: 'Khám phá ngay',
            type: 'red'
          }
        ]}
      />
      <TabRouterIwow />

      <div className="bg-red-500 pt-6 md:pt-8">
        <div className="md:container">
          <div className="relative mt-10 flex justify-center ml-0 lg:ml-28 md:ml-10">
            <img className="hidden sm:block" src="/iwow/izuiCheckIn.png" alt="" />

            <img className="w-full sm:hidden" src="/iwow/dailyTitleMobile2x.png" alt="" />
            <img className="absolute bottom-[20%] w-full px-5 sm:hidden" src="/iwow/giftDailyMobi.png" alt="" />

            <div className="absolute md:bottom-[22%] bottom-[24%] md:pr-20 xl:bottom-[28%] xl:pr-20 w-full px-5">
              <div className="flex scale-[0.9] lg:scale-100 w-full justify-between lg:px-28">
                {izuiCheckinList.data.map((item) => (
                  <div key={item.id} className="px-1 sm:px-2">
                    <div
                      className={`${
                        Boolean(item.state) ? 'border border-red-500' : 'border border-dotted border-neutral-300'
                      } flex flex-col items-center rounded-md py-1.5 sm:px-5 sm:py-2 xl:px-7 xl:py-2.5 `}
                    >
                      <p className={`${Boolean(item.state) ? 'text-orange' : 'text-neutral-500'} pb-1 text-xs`}>+{item.value}</p>
                      <img className="w-4	sm:w-6 xl:w-8" src="/iwow/icon-xu.png" alt="xu" />
                    </div>
                    <p
                      className={`${
                        Boolean(item.state) ? 'text-orange' : 'text-neutral-400'
                      } text-xs pt-1.5 text-center w-10 sm:w-fit sm:text-sm`}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
              <div className="text-center pt-1 mx-2 sm:pt-2 lg:pt-5 xl:pt-6 px-0 sm:px-10">
                <button className="btn-primary btn btn-xs cursor-pointer font-medium w-full rounded-full sm:w-fit lg:btn-xs xl:btn-sm">
                  Nhận điểm ngay
                </button>
              </div>
            </div>
          </div>

          <div className="relative mt-[-60px] sm:mt-0 px-3 md:px0">
            <div className="lg:w-3/4 w-full flex items-center justify-center rounded-3xl py-2 border-4 border-yellow-500 mx-auto bg-gradient-to-r from-[#FDD20D] via-orange to-red-500 bg-orange">
              <div className="font-itel px-12 md:px-0 text-h5 lg:text-h2 md:text-h4 text-neutral-0 font-semibold text-center">Check in vòng quay - Zui zẻ cả ngày</div>
            </div>
            <img className="w-full" src="/iwow/vong_quay_img.png" alt="vqmm-image" />
            <img className="absolute right-0 top-[-40px] sm:hidden" src="/iwow/flash.png" alt="flash-image" />

            <div className="absolute bottom-0 md:bottom-[10%] w-full text-center">
              <button className="btn-secondary btn btn-sm cursor-pointer rounded-full border-none font-medium">Tham gia ngay</button>
            </div>
          </div>
        </div>

        <div className="h-fit bg-[url('/iwow/bg-money.png')] bg-cover bg-center bg-no-repeat">
          <div className="py-6 sm:py-20 md:py-8 md:container ">
            <div className="relative px-3 md:px-0">
              <div className="lg:w-3/4 w-full flex items-center justify-center rounded-3xl py-2 border-4 border-yellow-500 mx-auto bg-gradient-to-r from-[#FDD20D] via-orange to-red-500 bg-orange">
                <div className="font-itel px-12 md:px-0 lg:py-1 text-h5 lg:text-[2.8rem] md:text-h4 text-neutral-0 font-semibold text-center">Săn deal giờ vàng - Ngàn quà cực chất</div>
              </div>
              <div className="w-full px-1 md:px-3 pb-6 xl:flex-row xl:flex mt-6 md:mt-10 bg-[#CF021A] rounded-xl p-12">
                <div className="relative xl:w-1/2">
                  <img className="w-full" src="/iwow/hunting-sale.png" alt="" />
                  <div className="absolute bottom-16 left-0 w-full sm:bottom-12">
                    <div className="flex items-center justify-center rounded-2xl border-2 border-yellow-600 bg-gradient-sale text-base-100 py-3 mx-5 sm:py-8 sm:mx-24 xl:py-6">
                      <p className="pr-4 font-itel text-xl md:text-2xl">BẮT ĐẦU SAU</p>
                      <div>
                        <span className="rounded bg-neutral-0 p-2 text-base font-semibold text-primary">24</span> :{' '}
                        <span className="rounded bg-neutral-0 p-2 text-base font-semibold text-primary">24</span> :{' '}
                        <span className="rounded bg-neutral-0 p-2 text-base font-semibold text-primary">56</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-center font-itel text-xl text-base-100">Sử dụng mã Voucher để nhận ngay ưu đãi nhé</p>
                </div>
                <div className="relative xl:w-1/2">
                  <div className="w-full mt-4 xl:absolute xl:bottom-0 xl:right-0 xl:mt-0">
                    <div className="flex w-auto overflow-x-auto scroll-auto scrollbar-hide">
                      {izuiListGifts.data.map((item) => (
                        <div className="px-3 w-64 mr-5 sm:w-auto sm:mr-0" key={item.id}>
                          <CardGiftDivide
                            src={item.id}
                            img={item.img}
                            logo={item.logo}
                            className="drop-shadow-lg w-64 sm:w-auto"
                            redemptionDeadline={``}
                            title={item.title}
                            point={200}
                            onClickReceive={() => setIShowNotiPopUp(true)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionSupports />

      <Modal open={isShowNotiPopUp}>
        <Modal.ModalBody
          className="w-full max-w-[35rem] rounded-lg bg-neutral-0 p-10"
          onClose={() => {
            onCloseNotiHandler();
          }}
        >
          <ModalIzuiNoti isComeSlow={false} isNotMember={false} isSuccess={true} close={() => {}} />
        </Modal.ModalBody>
      </Modal>
    </>
  );
};

IWowIzuiPage.displayName = 'IWowIzuiPage';
const logger = new Logger(IWowIzuiPage.displayName!);

IWowIzuiPage.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const izuiCheckinList = await IwowIzuiServices.getListXu();
  const izuiListGifts = await IwowIzuiServices.getListGifts();
  return {
    props: {
      izuiCheckinList,
      izuiListGifts
    },
    revalidate: 8600
  };
});

export default IWowIzuiPage;
export { getStaticProps };
