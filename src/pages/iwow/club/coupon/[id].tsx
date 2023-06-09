import BannerNormal from '@/components/banner/banner-normal';
import Breadcrumbs from '@/components/breadcrumbs/breadcrumbs';
import CardCoupon from '@/components/card/card-coupon';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';
import DetailVoucher from '@/components/voucher/DetailVoucher';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import vouchersServices from '@/services/vouchers/vouchers';
import { Data } from '@/types/model';
import { NextPage } from 'next';
import Head from 'next/head';

type PageProps = {
  voucher: Data.VoucherDetail;
  vouchers: Data.Vouchers;
};

const pages = [
  { name: 'IWow', href: '#', current: false },
  { name: 'Ưu đãi iTel Club', href: Routers.IWOW_CLUB, current: false },
  { name: 'Chi tiết Voucher', href: '#', current: true }
];

const CouponDetailPage: NextPage<PageProps> = ({ voucher, vouchers }) => {
  return (
    <>
      <Head>
        <title>{`Chi tiết ưu đãi - ${voucher?.title}`}</title>
      </Head>
      <HeaderMobileWeb className="bg-neutral-100" title="Voucher" />
      <BannerNormal
        classWrapText="md:pt-[48px] lg:pt-[64px]"
        data={[
          {
            id: 1,
            img: '/iwow/bannerSmall.png',
            title: 'Banner quảng cáo',
            desc: 'Nhập số điện thoại để trải nghiệm số thuê bao phù hợp nhất',
            actionTitle: 'Trải nghiệm ngay',
            type: 'red'
          },
          {
            id: 2,
            img: '/iwow/bannerSmall.png',
            title: 'Banner quảng cáo',
            desc: 'Nhập số điện thoại để trải nghiệm số thuê bao phù hợp nhất',
            actionTitle: 'Trải nghiệm ngay',
            type: 'red'
          }
        ]}
        isAds
      />
      <div className="bg-neutral-0">
        <div className="container">
          <div className="md:p-[18px] py-3">
            <Breadcrumbs breadcrumbs={pages} />
            <div className="md:pb-20 md:pt-10 py-6">
              <DetailVoucher {...voucher} />
            </div>
          </div>
        </div>
        <SectionProduct
          title="Ưu đãi tương tự"
          className="container py-4 md:py-10 xl:py-20 overflow-x-hidden"
          classSection="!bg-neutral-50"
        >
          <div className="mt-4 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-4">
            {vouchers.data.map((voucher) => (
              <CardCoupon
                isPopup
                src={voucher.id}
                key={voucher.id}
                img={voucher.img}
                logo={voucher.logo}
                title={voucher.title}
                redemptionDeadline={voucher.long}
                point={voucher.point}
                className="bg-neutral-0 lg:pb-6"
              />
            ))}
          </div>
        </SectionProduct>
        <SectionSupports />
      </div>
    </>
  );
};

CouponDetailPage.getLayout = LayoutWithChatBox;

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const id = params?.id;
  if (!id) return { notFound: true };
  const voucher = await vouchersServices.getDetailVoucher({ id: Number(id) });
  const vouchers = await vouchersServices.getListVoucher({ limit: 4 });

  if (!voucher) return { notFound: true };

  return {
    props: {
      voucher,
      vouchers
    }
  };
});

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2' } }, { params: { id: '3' } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}
export { getStaticProps };
export default CouponDetailPage;
