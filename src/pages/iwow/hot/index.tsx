import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import clsx from 'clsx';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { Logger } from '@/utilities/logger';
import { Data } from '@/types/model';
import BannerNormal from '@/components/banner/banner-normal';
import SectionSupports from '@/components/section/section-supports';

import vouchersServices from '@/services/vouchers/vouchers';
import PaginationList from '@/components/pagination/pagination-list';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import CardVoucherHot from '@/components/card/card-voucher-hot';
import { TAB_MENU_IWOW } from '../../../constants/iwow.constants';
import SectionProduct from '@/components/section/section-products';
import CardShort from '@/components/card/card-short';
import { TabRouterIwow } from '../club';
import Routers from '@/routes/routers';

type PageProps = {
  vouchers: Data.VouchersHOT;
  vouchersHOT: Data.VouchersHOT;
  shorts: Data.Shorts;
};
const IWowHotPage: NextPage<PageProps> = ({ vouchers, vouchersHOT, shorts }) => {
  return (
    <>
      <Head>
        <title>Itel - HOT</title>
      </Head>
      <TabRouterIwow isTop />
      <BannerNormal
        classWrapText="xl:pt-[200px] lg:pt-[224px]"
        data={[
          {
            id: 1,
            img: '/iwow/clubBanner.png',
            title: 'Bội thực deal ngon Tại iTel club',
            actionTitle: 'Khám phá ngay',
            type: 'red'
          },
          {
            id: 2,
            img: '/iwow/clubBanner.png',
            title: 'Giờ vàng tràn ưu đãi',
            actionTitle: 'Khám phá ngay',
            type: 'red'
          }
        ]}
      />
      <TabRouterIwow />

      <div className="md:bg-neutral-100 bg-neutral-0 pt-4 md:pt-16">
        <div>
          <div className="px-4 md:px-10 text-center">
            <h1 className="md:text-5xl text-[32px] uppercase text-neutral-800 font-itel">
              <b>Chương trình</b> <b className="text-red-500">HOT</b>
            </h1>
            <p className="text-neutral-500 text-sm md:text-base mt-2">Hàng ngàn voucher, ưu đãi, đổi điểm nhận quà</p>
          </div>
          <div className="container mt-5 md:mt-14 md:px-10 pb-4 md:pt-0">
            <div className="md:mt-10 grid md:gap-6 gap-3 lg:grid-cols-3">
              {vouchersHOT.data.slice(0, 1).map((voucher, i) => (
                <CardVoucherHot
                  classNameTitle="line-clamp-1"
                  key={voucher.id}
                  {...voucher}
                  className={clsx(i === 0 && 'col-span-2 row-span-2 rounded-none lg:rounded-2xl', i > 0 && 'lg:rounded-xl')}
                  iShowButton={false}
                  classNameFrame={clsx(i === 0 ? 'aspect-photo' : ' aspect-video', 'lg:rounded-2xl rounded-xl', i > 0 && 'rounded-xl')}
                />
              ))}
              <div className="col-span-1 grid-cols-2 grid gap-3 lg:grid-cols-1">
                {vouchersHOT.data.slice(1, 3).map((voucher, i) => (
                  <CardVoucherHot
                    classNameTitle="line-clamp-1"
                    key={voucher.id}
                    {...voucher}
                    className={clsx('lg:rounded-xl !rounded-none')}
                    iShowButton={false}
                    classNameFrame={clsx('aspect-video lg:aspect-cinema', 'rounded-xl')}
                  />
                ))}
              </div>
            </div>
          </div>

          <SectionProduct
            classSection="md:!bg-neutral-100"
            classTitle="md:text-h4 text-xl"
            title="Khuyến mại hot"
            className="container py-4 md:py-10 xl:py-20"
          >
            <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
              {vouchers.data.map((voucher) => (
                <CardVoucherHot
                  classNameTitle="text-sm md:text-xl"
                  classBrand="md:text-sm"
                  key={voucher.id}
                  {...voucher}
                  className="md:bg-neutral-0 md:rounded-xl rounded-b-none rounded-t-xl"
                  classNameFrame="rounded-xl aspect-video rounded-b-none"
                />
              ))}
            </div>
            <div className="md:block hidden">
              <PaginationList
                pageList={['1', '2', '3', '4', '...', '12', '13', '14', '15']}
                subPageList={['5', '6', '7', '8', '9', '10', '11']}
              />
            </div>
            <div className="md:hidden">
              <PaginationList pageList={['1', '2', '3', '...', '7']} subPageList={['5', '6']} />
            </div>
          </SectionProduct>
        </div>
      </div>
      <div className="md:bg-neutral-0">
        <SectionProduct
          classSection="md:bg-neutral-0"
          title="Shorts nổi bật"
          classTitle="md:text-h4 text-xl"
          className="container py-4 md:py-10 xl:py-20"
          href="#"
        >
          <div className="mt-3 md:mt-10 gap-3 grid md:hidden lg:grid lg:grid-cols-4 grid-flow-col overflow-auto md:gap-6 scrollbar-hide">
            {shorts.data.slice(0, 4).map((short) => (
              <CardShort short={short} key={short.id} shorts={shorts} />
            ))}
          </div>
          <div className="mt-3 md:mt-10 gap-6 md:grid-cols-3 lg:hidden hidden md:grid">
            {shorts.data.slice(0, 3).map((short) => (
              <CardShort short={short} key={short.id} shorts={shorts} />
            ))}
          </div>
        </SectionProduct>
      </div>
      <SectionProduct
        classSection="md:!bg-neutral-100"
        title="Phim hot"
        classTitle="md:text-h4 text-xl"
        className="container py-4 md:py-10 xl:py-20"
        href={Routers.IFILM}
      >
        <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3 lg:hidden">
          {vouchers.data.slice(0, 4).map((voucher) => (
            <CardVoucherHot
              classNameTitle="text-sm md:text-xl"
              classBrand="md:text-sm"
              key={voucher.id}
              {...voucher}
              className="md:bg-neutral-50 md:rounded-xl rounded-xl rounded-b-none"
              classNameFrame="aspect-video"
            />
          ))}
        </div>
        <div className="mt-3 md:mt-10 lg:grid hidden grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
          {vouchers.data.slice(0, 3).map((voucher) => (
            <CardVoucherHot
              classNameTitle="text-sm md:text-xl"
              classBrand="md:text-sm"
              key={voucher.id}
              {...voucher}
              className="md:bg-neutral-50 md:rounded-xl rounded-xl rounded-b-none"
              classNameFrame="rounded-xl aspect-video"
            />
          ))}
        </div>
      </SectionProduct>
      <div className="md:bg-neutral-50">
        <SectionProduct title="Game hot" classTitle="md:text-h4 text-xl" className="container py-4 md:py-10 xl:py-20" href={Routers.IGAME}>
          <div className="mt-3 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3 lg:hidden">
            {vouchers.data.slice(0, 4).map((voucher) => (
              <CardVoucherHot
                classNameTitle="text-sm md:text-xl"
                classBrand="md:text-sm"
                key={voucher.id}
                {...voucher}
                className="md:bg-neutral-50 md:rounded-xl rounded-xl rounded-b-none"
                classNameFrame="aspect-video"
              />
            ))}
          </div>
          <div className="mt-3 md:mt-10 lg:grid hidden grid-cols-2 md:gap-6 gap-3 lg:grid-cols-3">
            {vouchers.data.slice(0, 3).map((voucher) => (
              <CardVoucherHot
                classNameTitle="text-sm md:text-xl"
                classBrand="md:text-sm"
                key={voucher.id}
                {...voucher}
                className="md:bg-neutral-50 md:rounded-xl rounded-xl rounded-b-none"
                classNameFrame="rounded-xl aspect-video"
              />
            ))}
          </div>
        </SectionProduct>
      </div>
      <BannerNormal
        classWrapText="md:!pt-[48px] md:max-w-[300px] lg:max-w-full lg:!pt-[44px]"
        classDesc="md:!text-base text-neutral-200 font-normal"
        isAds
        data={[
          {
            id: 1,
            img: '/iwow/bannerSmall.png',
            desc: '4GB/ ngày 77K/ tháng\nMiễn phí gọi nội mạng iTel & Vinaphone',
            title: 'Gói may đột phá bá chủ \n data',
            actionTitle: 'Trải nghiệm ngay',
            type: 'red'
          },
          // {
          //   id: 2,
          //   img: '/iwow/bannerSmall.png',
          //   title: 'Banner quảng cáo',
          //   desc: 'Nhập số điện thoại để trải nghiệm số thuê bao phù \n hợp nhất',
          //   actionTitle: 'Trải nghiệm ngay',
          //   type: 'red'
          // }
        ]}
      />
      <SectionSupports />
    </>
  );
};

IWowHotPage.displayName = 'IWowHotPage';
const logger = new Logger(IWowHotPage.displayName!);

IWowHotPage.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async () => {
  const vouchersHOT = await vouchersServices.getListVoucherHOT({ limit: 3 });
  const vouchers = await vouchersServices.getListVoucherHOT({ limit: 6 });
  const shorts = await vouchersServices.getListShort({ limit: 10 });
  return {
    props: {
      vouchersHOT,
      vouchers,
      shorts
    },
    revalidate: 8600
  };
});

export default IWowHotPage;
export { getStaticProps };
