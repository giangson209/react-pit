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
import { TabRouterIService } from '../i-travel';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};

const IHealthServicePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
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
              <b>Y tế & sức khỏe</b>
            </h1>
          </div>

          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden md:mt-10 lg:mt-14">
            <div className="mt-3 grid md:grid-cols-1 gap-3 lg:gap-14">
              {vouchers.data.slice(0, 2).map((voucher) => (
                <CardService
                  className="md:grid lg:grid-cols-3 md:grid-cols-5"
                  classRight="lg:col-span-2 md:col-span-3"
                  classLeft="lg:col-span-1 md:col-span-2"
                  isLineClamp
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
            <div className="mt-3 grid md:grid-cols-2 lg:gap-6 gap-3 lg:grid-cols-3 md:hidden lg:grid">
              {vouchers.data.slice(0, 3).map((voucher) => (
                <CardEvent
                  key={voucher.id}
                  img={voucher.img}
                  title="Thông báo gia hạn chương trình mua sim mới tài lộc phơi phới Lấy việc giúp đỡ người khác làm mục tiêu sống"
                  desc={'Tưng bừng đón năm mới, cùng OCB tận hưởng Deal hoàn tiền cực HOT lên đến 1.000.000 VNĐ.'}
                />
              ))}
            </div>
            <div className="mt-3 lg:hidden md:grid-cols-2 lg:gap-6 gap-3 lg:grid-cols-3 md:grid">
              {vouchers.data.slice(0, 4).map((voucher) => (
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
    </>
  );
};

IHealthServicePagge.displayName = 'IHealthServicePagge';

IHealthServicePagge.getLayout = LayoutWithChatBox;

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

export default IHealthServicePagge;
export { getStaticProps };
