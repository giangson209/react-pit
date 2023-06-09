import { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import BannerNormal from '@/components/banner/banner-normal';
import SectionSupports from '@/components/section/section-supports';
import { Data } from '@/types/model';
import vouchersServices from '@/services/vouchers/vouchers';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import { TAB_MENU_SERVICES } from '@/constants/services.constants';
import CardService from '@/components/card/card-service';
import CardEvent from '@/components/card/card-event';
import PopupService from '@/components/service/PopupService';
import ContentVietlott from '@/components/service/ContentVietlott';
import ContentVnTrip from '@/components/service/ContentVnTrip';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};
export const TabRouterIService = ({ isTop }: { isTop?: boolean }) => {
  const router = useRouter();
  if (isTop)
    return (
      <>
        <HeaderMobileWeb className="bg-neutral-100" title="Dịch vụ số" />
        <div className="mb-2 border-b border-neutral-200 sm:hidden">
          <div className="tabs -mb-px flex-nowrap md:gap-x-8 gap-x-4 overflow-auto whitespace-nowrap scrollbar-hide">
            {TAB_MENU_SERVICES.map((tab) => (
              <Link
                href={tab.path}
                className={clsx(
                  'tab-bordered border-red-500 border-opacity-0 p-4 text-base tab md:pt-4 pt-0',
                  tab.path == router.pathname && 'tab-active'
                )}
                key={tab.id}
              >
                {tab.title}
              </Link>
            ))}
          </div>
        </div>
      </>
    );
  return (
    <div className="lg:tab lg:py-0 justify-start hidden p-0 px-14 md:flex md:px-0 md:flex-nowrap whitespace-nowrap overflow-auto scrollbar-hide">
      {TAB_MENU_SERVICES.map((tab) => (
        <Link
          href={tab.path}
          className={clsx('p-4 px-8 text-xl', tab.path == router.pathname ? 'bg-red-500 text-base-100' : 'text-neutral-800')}
          key={tab.id}
        >
          {tab.title}
        </Link>
      ))}
    </div>
  );
};
const ITravelServicePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  const [isShowVietlott, setIsShowVietlott] = useState(false);
  const [isShowVnTrip, setIsShowVnTrip] = useState(true);

  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>

      <TabRouterIService isTop />
      <BannerNormal
        classDesc="lg:text-base"
        data={[
          {
            id: 1,
            img: '/iwow/clubBanner.png',
            title: 'Banner quảng cáo',
            desc: 'Thỏa sức chọn sim phong thủy, thần số học. Tuyệt chiêu hút lộc, giải ế đổi vận. Triệu hồi ngay thần Sim phong thủy ITel!',
            actionTitle: 'Trải nghiệm ngay',
            type: 'red'
          },
          {
            id: 2,
            img: '/iwow/clubBanner.png',
            title: 'Banner quảng cáo',
            desc: 'Thỏa sức chọn sim phong thủy, thần số học.Tuyệt chiêu hút lộc, giải ế đổi vận. Triệu hồi ngay thần Sim phong thủy ITel!',
            actionTitle: 'Trải nghiệm ngay',
            type: 'red'
          }
        ]}
      />
      <TabRouterIService />

      <div className="lg:pt-16 pt-4 bg-neutral-100">
        <div>
          <div className="lg:px-10 px-4 text-center">
            <h1 className="md:text-5xl lg:text-[56px] text-2xl uppercase text-neutral-800 md:mt-16 lg:mt-0">
              <b>iTel Du lịch & di chuyển</b>
            </h1>
          </div>

          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10 lg:mt-14">
            <div className="mt-3 grid md:grid-cols-1 gap-3 lg:gap-14">
              {vouchers.data.slice(0, 3).map((voucher) => (
                <CardService
                  onClick={() => setIsShowVietlott(true)}
                  className="md:grid lg:grid-cols-3 md:grid-cols-5"
                  classRight="lg:col-span-2 md:col-span-3"
                  classLeft="lg:col-span-1 md:col-span-2"
                  key={voucher.id}
                  img={voucher.img}
                  title={voucher.title}
                  desc={
                    'Chương trình ưu đãi dành cho các khách hàng đăng ký mở thẻ Visa Platinum, Visa Platinum Cashback và nhiều dòng thẻ phổ thông khác tại Sacombank.'
                  }
                />
              ))}
            </div>
          </div>
        </div>
        <div className="md:my-20">
          <div className="lg:px-10 px-4 text-center">
            <h1 className="md:text-[40px] text-2xl uppercase text-neutral-800">
              <b>Chương trình hấp dẫn</b>
            </h1>
          </div>
          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10">
            <div className="mt-3 lg:hidden grid md:grid-cols-2 lg:gap-6 gap-3 lg:grid-cols-4">
              {vouchers.data.slice(0, 4).map((voucher) => (
                <CardEvent
                  key={voucher.id}
                  img={voucher.img}
                  title="Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới Lấy việc giúp đỡ người khác làm mục tiêu sống"
                  desc={'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.'}
                />
              ))}
            </div>
            <div className="mt-3 hidden lg:grid md:grid-cols-2 lg:gap-6 gap-3 lg:grid-cols-3">
              {vouchers.data.slice(0, 3).map((voucher) => (
                <CardEvent
                  key={voucher.id}
                  img={voucher.img}
                  title="Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới Lấy việc giúp đỡ người khác làm mục tiêu sống"
                  desc={'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.'}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <SectionSupports />
      <PopupService open={isShowVietlott} setOpen={setIsShowVietlott} handleClose={() => setIsShowVietlott(false)}>
        <ContentVietlott />
      </PopupService>
      <PopupService open={isShowVnTrip} setOpen={setIsShowVnTrip} handleClose={() => setIsShowVnTrip(false)}>
        <ContentVnTrip />
      </PopupService>
    </>
  );
};

ITravelServicePagge.displayName = 'ITravelServicePagge';

ITravelServicePagge.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchers = await vouchersServices.getListVoucher({ limit: 10 });
  const vouchersForYou = await vouchersServices.getListVoucher({ limit: 4 });
  return {
    props: {
      vouchers,
      vouchersForYou
    },
    revalidate: 8600
  };
});

export default ITravelServicePagge;
export { getStaticProps };
