import { NextPage } from 'next';
import Head from 'next/head';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import SectionSupports from '@/components/section/section-supports';
import { Data } from '@/types/model';
import vouchersServices from '@/services/vouchers/vouchers';
import FooterDefault from '@/components/footer/default';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import CardVoucherHot from '@/components/card/card-voucher-hot';
import clsx from 'clsx';
import CardService from '@/components/card/card-service';
import CategoriesFilter from '@/components/sim/CategoriesFilter';
import FilterService from '@/components/service/FilterService';
import Svg from '@/components/icon/svg';
import { useRouter } from 'next/router';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};

const ITravelVexerePagge: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>
      <nav className="sticky top-0 bg-neutral-800 py-4.5 z-10 text-neutral-200">
        <div className="container flex items-center">
          <div className="flex-1 flex items-center">
            <button type="button" onClick={router.back}>
              <Svg src="/icons/line/chevron-left.svg" width={24} height={24} />
            </button>
            Trở về
          </div>
          <div className="flex-1 text-center text-[1.125rem]">
            <Svg src="/logo/logoVexere.svg" className="h-8" />
          </div>
          <div className="flex-1 flex justify-end relative">
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2">
              6
            </div>
            <figure className="aspect-square w-12 rounded-full overflow-hidden">
              <img alt="" src="/images/apple.png" className="w-full h-full object-cover bg-neutral-0" />
            </figure>
          </div>
        </div>
      </nav>
      <div className="relative flex-col">
        <div className="aspect-tivi lg:hidden block">
          <img alt="" src="/service/bgVexereSmall.png" className="object-cover h-full w-full" />
        </div>
        <div className="xl:aspect-section-banner hidden lg:aspect-video lg:block">
          <img alt="" src="/service/bgVexere.png" className="object-cover h-full w-full" />
        </div>

        <div className="text-neutral-800 absolute top-0 left-0 pt-20 pb-8 px-10 w-full h-full">
          <div className="lg:container h-full w-full flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">
              <h1 className="xl:text-5xl text-[40px] uppercase font-itel">
                <b>Đặt vé xe online toàn quốc</b>
              </h1>
              <p className="text-base text-center mt-2">
                Sàn TMĐT về vé xe lớn nhất Việt Nam, hỗ trợ người dùng đặt vé xe khách một cách dễ dàng, tiện lợi và nhanh chóng.
              </p>
              <div className="grid xl:grid-cols-4 grid-cols-2 gap-4 w-full mt-10">
                <FilterService className="w-full" label={'Đi từ'} title={'Chọn thành phố, địa điểm'} list={['Hà Nội', 'HCM']} />
                <FilterService className="w-full" label={'Đi đến'} title={'Chọn thành phố, địa điểm'} list={['Hà Nội', 'HCM']} />
                <FilterService className="w-full" label={'Ngày đi'} title={'Thêm ngày'} list={['01/01/2023', '02/01/2023']} />
                <FilterService className="w-full" label={'Ngày đến'} title={'Thêm ngày'} list={['01/01/2023', '02/01/2023']} />
              </div>
              <button className="btn btn-primary rounded-full my-10 px-[70px]">Tìm kiếm</button>
            </div>
            <div className="text-neutral-200 flex text-sm">
              Dành cho tất cả các tuyến, Giảm 3% Mã ưu đãi
              <b className="text-neutral-0 pl-1">ITEL087</b>. Chi tiết ưu đãi xem <b className="text-neutral-0 pl-1"> tại đây</b>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-16 bg-neutral-100">
        <div className="px-4 md:px-10 text-center">
          <h1 className="md:text-5xl text-[32px] uppercase text-neutral-800">
            <b>Ưu đãi khi đặt </b>
            <b className="text-blue-500">vexere</b>
            <br className="lg:hidden" /> <b>trên</b> <b className="text-red-500">itel</b>
          </h1>
          <p className="text-neutral-500 text-sm md:text-base">
            Những du khách khác rất thích những điểm đến này. Hãy tìm kiếm các chuyến bay, khách sạn và xe thuê để cùng họ tham gia cuộc
            phiêu lưu.
          </p>
        </div>
        <div className="container mt-5 md:mt-14 md:px-10 pb-4 md:pt-0">
          <div className="md:mt-10 grid md:gap-6 gap-3 lg:grid-cols-3 lg:grid-rows-2">
            {vouchers.data.slice(0, 1).map((voucher, i) => (
              <CardService
                isLayoutTop
                desc="Tết đến, Vexere sale thả ga, giảm đến 50% khi đặt vé tại Vexere"
                title={voucher.title}
                classNameTitle="line-clamp-2"
                key={voucher.id}
                className={clsx(i === 0 && 'col-span-2 row-span-2', i > 0 && 'rounded-xl')}
                classNameFrame={clsx(i === 0 ? 'lg:aspect-photo md:aspect-video' : 'aspect-video', 'rounded-2xl', i > 0 && 'rounded-xl')}
                img={voucher.img}
                isHideDesc={i > 0}
              />
            ))}
            <div className="flex flex-col gap-6">
              {vouchers.data.slice(1, 3).map((voucher, i) => (
                <CardService
                  isLayoutTop
                  desc=""
                  title={voucher.title}
                  classNameTitle="line-clamp-2"
                  key={voucher.id}
                  className={clsx('rounded-xl')}
                  classNameFrame={clsx('aspect-video lg:aspect-cinema', 'rounded-xl')}
                  img={voucher.img}
                  isHideDesc={i > 0}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <SectionSupports />
      <FooterDefault className="bg-neutral-0" />
      <ChatBoxLazy />
    </>
  );
};

ITravelVexerePagge.displayName = 'ITravelVexerePagge';

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

export default ITravelVexerePagge;
export { getStaticProps };
