import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { Logger } from '@/utilities/logger';

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import BannerNormal from '@/components/banner/banner-normal';
import SectionProduct from '@/components/section/section-products';
import SectionSupports from '@/components/section/section-supports';

import { Data, Model } from '@/types/model';
import { FILTER_VOUCHER_BY_PPOINT, TAB_CATEGORIES_CLUB, TAB_MENU_IWOW } from '../../../constants/iwow.constants';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Svg from '@/components/icon/svg';
import ComboboxesSimple from '@/components/comboboxes/comboboxes-simple';
import { useCallback, useState } from 'react';
import useDebounced from '@/hooks/useDebounce';
import CardCoupon from '@/components/card/card-coupon';
import vouchersServices from '@/services/vouchers/vouchers';
import PaginationList from '@/components/pagination/pagination-list';
import SectionInformation from '@/components/section/section-information-for-you';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import PopupFilterVoucher from '@/components/voucher/PopupFilterVoucher';
import HeaderMobileWeb from '@/components/header/header-mobile-web';
import PopupSearchVoucher from '@/components/voucher/PopupSearchVoucher';

type PageProps = {
  vouchers: Data.Vouchers;
  vouchersForYou: Data.Vouchers;
};
export const TabRouterIwow = ({ isTop }: { isTop?: boolean }) => {
  const router = useRouter();
  if (isTop)
    return (
      <>
        <HeaderMobileWeb className="bg-neutral-0" title="Iwow" />
        <div className="mb-2 border-b border-neutral-200 sm:hidden sticky top-16 bg-neutral-0 z-10">
          <div className="tabs -mb-px flex-nowrap md:gap-x-8 gap-x-4 overflow-auto whitespace-nowrap scrollbar-hide">
            {TAB_MENU_IWOW.map((tab) => (
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
    <div className="tab hidden p-0 px-14 md:flex bg-neutral-0">
      {TAB_MENU_IWOW.map((tab) => (
        <Link
          href={tab.path}
          className={clsx('p-4 px-8 text-xl', tab.path == router.pathname ? 'bg-red-500 text-base-100' : 'text-neutral-800')}
          key={tab.id}
        >
          <b> {tab.title}</b>
        </Link>
      ))}
    </div>
  );
};
const IWowClubPage: NextPage<PageProps> = ({ vouchers, vouchersForYou }) => {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [listVouchersForYou, setListVouchersForYou] = useState<Model.Voucher[]>(vouchersForYou.data);
  const [pageForYou, setPageForYou] = useState<number>(1);
  const [isMoreForYou, setIsMoreForYou] = useState(true);
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [filter, setFilter] = useState<{ id: number; name: string } | undefined>(FILTER_VOUCHER_BY_PPOINT[0]);
  const [isShowSearch, setIsShowSearch] = useState(false);

  const setValue = useCallback(
    (value: string) => {
      setQuery(value);
      const query = value ? { s: value } : {};
      router.push(
        { href: router.pathname, query: { ...router.query, ...query } },
        value ? `${router.pathname}?search=${value}` : router.pathname,
        {
          shallow: true
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.pathname]
  );

  const setTextDebounced = useDebounced(setValue, [], 300, true);

  const [activeCategory, setActiveCategory] = useState<number>(TAB_CATEGORIES_CLUB[0].id);
  const handleChangeCategory = (id: number) => {
    setActiveCategory(id);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      if (!isMoreForYou) return;
      const pageNext = pageForYou + 1;
      const vouchersMore = await vouchersServices.getListVoucher({ limit: 4, page: pageNext });
      if (!vouchersMore.data.length) {
        setIsMoreForYou(false);
        return;
      }
      setListVouchersForYou([...listVouchersForYou, ...vouchersMore.data]);
      setPageForYou(pageNext);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Itel - Club</title>
      </Head>

      <TabRouterIwow isTop />
      <BannerNormal
        classWrapText="md:pt-[98px] !max-w-[700px] lg:!pt-[224px]"
        classBtn="md:block"
        data={[
          {
            id: 1,
            img: '/iwow/clubBanner.png',
            title: 'Giờ vàng tràn ưu đãi',
            desc: '12 giờ trưa rồi, săn deal ăn uống thôi!',
            actionTitle: 'Giật Voucher ngay',
            type: 'red'
          },
          {
            id: 2,
            img: '/iwow/clubBanner.png',
            title: 'Giờ vàng tràn ưu đãi',
            desc: '12 giờ trưa rồi, săn deal ăn uống thôi!',
            actionTitle: 'Giật Voucher ngay',
            type: 'red'
          }
        ]}
      />
      <TabRouterIwow />

      <div className="bg-neutral-100 py-6 md:py-8">
        <div className="lg:max-w-[872px]  md:container">
          <div className="px-6 md:px-10">
            <h1 className="text-center text-xl md:text-[32px] leading-tight">
              <b>Xin chào Bảo Ngọc,</b>
            </h1>
            <p className="mt-1 text-center text-sm text-neutral-500 md:text-base">
              Tận hưởng loạt ưu đãi cực hot dành riêng cho thuê bao <b className="text-neutral-800">0867896716</b> của bạn!
            </p>
          </div>
          <div className="mt-4 grid w-full grid-flow-col gap-3 overflow-auto px-6 md:grid-cols-3 md:px-0 scrollbar-hide">
            <div>
              <div className="flex h-full w-[185px] flex-col items-center justify-center rounded-2xl bg-gradient-rank p-4 text-center text-neutral-0 md:w-full">
                <img alt="" src="/iwow/silver.svg" className="h-8 w-8 md:h-12 md:w-12" />
                <h1 className="pt-1 font-itel text-xl md:text-2xl">Hạng Bạc</h1>
                <p className="pt-1 text-xs">
                  Điểm cần để lên hạng Vàng: <b>234</b>
                </p>
                <button className="btn-secondary btn btn-sm mt-4 whitespace-nowrap rounded-[48px] text-sm md:btn-md md:p-[10px] p-[10px] w-full">
                  Quyền lợi hội viên
                </button>
              </div>
            </div>
            <div>
              <div className="flex h-full w-[185px] flex-col items-center justify-center rounded-2xl bg-neutral-0 p-4 text-center md:w-full">
                <div className="bg-neutral-50 w-full h-full flex flex-col justify-center rounded-2xl">
                  <b className="pt-1 text-2xl text-orange md:text-[32px]">48</b>
                  <p className="pt-1 text-sm text-neutral-500">điểm ItelClub</p>
                </div>
                <button className="btn-secondary btn btn-sm mt-4 whitespace-nowrap rounded-[48px] text-sm md:btn-md md:p-[10px] p-[10px] w-full">
                  Lịch sử tích điểm
                </button>
              </div>
            </div>
            <div>
              <div className="flex h-full w-[185px] flex-col items-center justify-center rounded-2xl bg-neutral-0 p-4 text-center md:w-full">
                <div className="bg-neutral-50 w-full h-full flex flex-col justify-center rounded-2xl">
                  <b className="pt-1 text-2xl text-orange md:text-[32px]">0</b>
                  <p className="pt-1 text-sm text-neutral-500">Ưu đãi đang có</p>
                </div>
                <button className="btn-secondary btn btn-sm mt-4 whitespace-nowrap rounded-[48px] text-sm md:btn-md md:p-[10px] p-[10px] w-full">
                  Ưu đãi của tôi
                </button>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-center text-sm text-neutral-800 md:mt-6">
          <b className='font-medium'>Dùng ngay! 36 điểm sẽ hết hạn vào 12/03/2023</b>
        </p>
      </div>
      <div className="lg:pt-16 md:pt-16 pt-4 bg-neutral-0">
        <div>
          <div className="lg:px-10 px-4 text-center">
            <h1 className="lg:text-5xl text-2xl text-neutral-800 font-itel md:text-5xl">
              <b>Ưu đãi</b> <b className="text-red-500">iTel Club</b>
            </h1>
            <p className="text-neutral-500 text-sm md:text-base md:pb-10 pb-4">
              Đổi điểm nhận quả, quẩy tiệc mỗi ngày với hàng <br className="md:hidden" />
              ngàn ưu đãi
            </p>
            <div className="flex md:hidden tabs -mb-px flex-nowrap gap-x-1 overflow-auto whitespace-nowrap scrollbar-hide">
              <div className="w-10 lg:hidden" />
              {TAB_CATEGORIES_CLUB.map((tab) => (
                <button
                  onClick={() => handleChangeCategory(tab.id)}
                  className={clsx(
                    'tab tab-bordered border-red-500 border-opacity-0 p-4 text-base',
                    tab.id == activeCategory && 'tab-active'
                  )}
                  key={tab.id}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="lg:mt-10 mt-3 flex w-full gap-4 lg:justify-center">
              <div className="relative flex w-full md:rounded-full rounded-lg bg-neutral-100 lg:w-[624px]">
                <div className="flex h-full items-center md:p-4 p-2">
                  <Svg src="/icons/bold/vector.svg" className="block md:h-6 md:w-6 w-5 h-5" />
                </div>
                <input
                  onChange={(e) => {
                    setTextDebounced(e.target.value);
                  }}
                  placeholder="Tìm kiếm"
                  className="peer w-full bg-transparent md:p-4 p-2 outline-none md:block hidden"
                  value={router.query?.search}
                />
                <div className="relative w-full">
                  <div className="absolute w-full h-full" onClick={() => setIsShowSearch(true)} />
                  <input
                    placeholder="Tìm kiếm"
                    className="peer w-full bg-transparent md:p-4 p-2 outline-none md:hidden block"
                    value={router.query?.search}
                  />
                </div>
                <PopupSearchVoucher
                  onChange={setTextDebounced}
                  open={isShowSearch}
                  setOpen={setIsShowSearch}
                  handleClose={() => setIsShowSearch(false)}
                  valueDefault={router.query?.search as string}
                />
              </div>
              <div className="lg:hidden hidden md:block">
                <ComboboxesSimple
                  className="rounded-full whitespace-nowrap pr-8"
                  classNameOptions="w-max right-0"
                  options={FILTER_VOUCHER_BY_PPOINT}
                  onChange={(e) => setFilter(e)}
                  displayValue={(item) => item?.name}
                  value={filter}
                  placeholder="Mức điểm"
                  disableInput
                />
              </div>
              <div className="md:hidden">
                <div className="relative">
                  <Svg
                    src="/icons/bold/filter.svg"
                    className={clsx(
                      filter?.id !== FILTER_VOUCHER_BY_PPOINT[0].id && 'text-red-500',
                      'w-10 h-10 p-2 bg-neutral-100 rounded-lg'
                    )}
                    onClick={() => setIsShowFilter(true)}
                  />
                  <div
                    className={clsx(
                      filter?.id !== FILTER_VOUCHER_BY_PPOINT[0].id && 'w-4 h-4 bg-red-500 rounded-full absolute -top-2 -right-2'
                    )}
                  />
                </div>
                <PopupFilterVoucher
                  options={FILTER_VOUCHER_BY_PPOINT}
                  setOpen={() => setIsShowFilter(true)}
                  handleClose={() => setIsShowFilter(false)}
                  open={isShowFilter}
                  onSelect={setFilter}
                  selected={filter}
                />
              </div>
            </div>
          </div>
          <div className="md:my-10 flex justify-between border-b border-transparent lg:container">
            <div className="md:flex hidden tabs -mb-px flex-nowrap gap-x-4 overflow-auto whitespace-nowrap scrollbar-hide">
              <div className="w-10 lg:hidden" />
              {TAB_CATEGORIES_CLUB.map((tab) => (
                <button
                  onClick={() => handleChangeCategory(tab.id)}
                  className={clsx(
                    'tab tab-bordered border-red-500 border-opacity-0 p-4 text-base',
                    tab.id == activeCategory && 'tab-active'
                  )}
                  key={tab.id}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="hidden lg:block">
              <ComboboxesSimple
                className="rounded-full pr-9"
                classNameOptions="w-max right-0"
                options={FILTER_VOUCHER_BY_PPOINT}
                onChange={(e) => setFilter(e)}
                displayValue={(item) => item?.name}
                value={filter}
                placeholder="Mức điểm"
                disableInput
              />
            </div>
          </div>
          <div className="container md:px-10 lg:overflow-auto overflow-x-hidden">
            <div className="mt-3 grid grid-cols-2 lg:gap-6 md:gap-6 gap-3 lg:grid-cols-4">
              {vouchers.data.map((voucher) => (
                <CardCoupon
                  src={voucher.id}
                  key={voucher.id}
                  img={voucher.img}
                  logo={voucher.logo}
                  title={voucher.title}
                  redemptionDeadline={voucher.long}
                  point={0}
                  className="bg-neutral-50"
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
          </div>
        </div>
        <SectionProduct
          title="Ưu đãi dành riêng cho VIP"
          className="container py-10 overflow-auto overflow-x-hidden md:py-20"
          classTitle="text-xl"
        >
          <div className="mt-4 md:mt-10 grid grid-cols-2 md:gap-6 gap-3 lg:grid-cols-4">
            {listVouchersForYou.map((voucher) => (
              <CardCoupon
                src={voucher.id}
                key={voucher.id}
                img={voucher.img}
                logo={voucher.logo}
                title={voucher.title}
                redemptionDeadline={voucher.long}
                point={voucher.point}
                className="bg-neutral-50"
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            {isMoreForYou ? (
              <button
                type="button"
                onClick={handleLoadMore}
                className={clsx(
                  'transition-default btn-secondary btn w-27 md:btn-sm md:w-52 rounded-full px-0',
                  isLoading && 'cursor-wait opacity-5'
                )}
              >
                Xem Thêm
              </button>
            ) : (
              <p className="text-base text-neutral-500">Bạn đã đến cuối của danh sách</p>
            )}
          </div>
        </SectionProduct>
      </div>
      <div className="md:mb-16">
        <SectionInformation classSection="!bg-neutral-0 pb-8"/>
      </div>
      <SectionSupports />
    </>
  );
};

IWowClubPage.displayName = 'IWowClubPage';
const logger = new Logger(IWowClubPage.displayName!);

IWowClubPage.getLayout = LayoutWithChatBox;

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

export default IWowClubPage;
export { getStaticProps };
