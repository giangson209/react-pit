import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { useCallback, useState } from 'react';

import LayoutDefault from '@/components/layout/layout-default';

import CardDataPack from '@/components/card/card-data-pack';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import DropdownData from '@/components/dropdown/dropdown-data';
import HeaderAppDefault from '@/components/header/header-app-default';
import Svg from '@/components/icon/svg';
import ModalCheckPhone from '@/components/modal/modal-check-phone';
import ModalDataPackageDetail from '@/components/modal/modal-data-package-detail';
import { Option, dataUsedOption, minutesAmountOption, priceUsedOption } from '@/components/modal/modal-suggest-data';
import ModalVerifyOtp from '@/components/modal/modal-verify-otp';
import FeaturedPackData from '@/components/pages/pack-data/featured-pack';
import { modal } from '@/context/modal-context';
import Routers from '@/routes/routers';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import Link from 'next/link';
import { Listbox } from '@headlessui/react';

type PageProps = {};
const dataMonth = [
  {
    id: 1,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833027/itel-web/d94a25d1f3c25c68a87bc114e36151cc_cscfuq.png'
  },
  {
    id: 2,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833015/itel-web/7f5bcbffefbce407b627c36d68863275_wnecjr.png'
  },
  {
    id: 3,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'may49',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833015/itel-web/7f5bcbffefbce407b627c36d68863275_wnecjr.png'
  },
  {
    id: 4,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833027/itel-web/d94a25d1f3c25c68a87bc114e36151cc_cscfuq.png'
  },
  {
    id: 5,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'd49',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833027/itel-web/d94a25d1f3c25c68a87bc114e36151cc_cscfuq.png'
  },
  {
    id: 6,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'dplus49',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833015/itel-web/7f5bcbffefbce407b627c36d68863275_wnecjr.png'
  },
  {
    id: 7,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'da20',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833015/itel-web/7f5bcbffefbce407b627c36d68863275_wnecjr.png'
  },
  {
    id: 8,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'may79',
    image: 'https://res.cloudinary.com/dgkrchato/image/upload/v1684833027/itel-web/d94a25d1f3c25c68a87bc114e36151cc_cscfuq.png'
  }
];

const dataPackOutstanding = [
  { id: 1, name: 'PARTY129', data: '3', newPrice: '129.000', oldPrice: '159.000', saleOff: '40' },
  { id: 2, name: 'PARTY179', data: '5', newPrice: '179.000', oldPrice: '79.000', saleOff: '40' },
  { id: 3, name: 'PARTY79', data: '2', newPrice: '199.000', oldPrice: '99.000', saleOff: '40' }
];

const dataTag = [
  {
    id: 1,
    name: '10-12 GB'
  },
  {
    id: 2,
    name: '200-250 phút'
  }
];

interface DataTagFilter {
  id: number;
  name: string;
}

const DataSuggestion: NextPage<PageProps> = ({ router }) => {
  const { t } = useTranslation('common');

  const [dataUsed, setDataUsed] = useState<Option>();
  const [minutesCall, setMinutesCall] = useState<Option>();
  const [price, setPrice] = useState<Option>();
  const [filterTag, setFilterTag] = useState<DataTagFilter[]>(dataTag);

  const removeFilterTag = (remove_id: number) => {
    let _filterTag = [...filterTag];
    _filterTag = _filterTag.filter((tag) => {
      return tag.id !== remove_id;
    });
    setFilterTag(_filterTag);
  };

  const data = [
    {
      id: 1,
      title: 'Số Data sử dụng/ tháng',
      options: dataUsedOption,
      value: dataUsed,
      onChange: setDataUsed,
      placeholder: 'Chọn mức data'
    },
    {
      id: 2,
      title: 'Số phút gọi/ tháng',
      options: minutesAmountOption,
      value: minutesCall,
      onChange: setMinutesCall,
      placeholder: 'Chọn số phút'
    },
    {
      id: 3,
      title: 'Số tiền/ tháng',
      options: priceUsedOption,
      value: price,
      onChange: setPrice,
      placeholder: 'Chọn mức tiền'
    }
  ];

  const handleModalVerifyOtp = useCallback((data: { phone: string }) => {
    modal.open({
      render: <ModalVerifyOtp {...data} />,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
      // onDone: handleRegistrantionRenewal
    });
  }, []);
  // Case 1
  const handleRegistrantionRenewal = useCallback(
    (data: { phone: string }) => {
      modal.confirm({
        content: (
          <>
            Gói cước <b className="text-base-content">PARTY79</b> đang được thuê bao{' '}
            <b className="text-base-content">{formatPhoneNumber(data.phone)}</b> sử dụng (HSD: còn 18 ngày). Bằng việc bấm “Tiếp tục”, bạn
            đồng ý gia hạn gói cước này.
          </>
        ),
        type: 'middle-sheet',
        title: 'Gia hạn đăng ký',
        rejectLable: 'Thay đổi số',
        confirmLable: 'Tiếp tục',
        onDone: () => handleModalVerifyOtp(data)
      });
    },
    [handleModalVerifyOtp]
  );
  // Case 2
  const handleModalChangePack = useCallback(() => {}, []);
  // Case 3
  const handleModalRegisterPack = useCallback(() => {}, []);
  // Case 4
  const handleNotEnoughRequirement = useCallback(() => {}, []);

  const handleModalMobileInfo = useCallback(() => {
    modal.open({
      render: <ModalCheckPhone />,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50',
      onDone: handleRegistrantionRenewal
    });
  }, [handleRegistrantionRenewal]);
  const handleViewDetail = useCallback(() => {
    modal.open({
      render: <ModalDataPackageDetail />,
      closeButton: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
      // Call back when click submit in modal,
      onDone: handleModalMobileInfo
    });
  }, [handleModalMobileInfo]);

  return (
    <>
      <Head>
        <title>{`Itel - Gợi ý gói cước`}</title>
      </Head>
      <HeaderAppDefault title="Gói cước cho riêng bạn" type="fixed" theme="light" />
      {/* <HeaderMobile title="Gói cước cho riêng bạn" /> */}
      <section className="max-md:hidden">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}> Trang chủ </Link>
              </li>
              <li>
                <Link href={Routers.DATA}>Gói cước</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={router.asPath}>Gợi ý gói cước</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="block-img xl:h-[21.25rem] md:h-[36rem] h-[31.25rem] relative" data-theme="dark">
        <img
          src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685194687/itel/images/bg-sim_1_r1xj1z.png"
          alt="bg"
          className="object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-radial from-20% from-neutral-900 to-neutral-900/0" />
        <div className="relative container">
          <div className="pt-20 md:pt-[5.625rem] xl:pt-[3.25rem]">
            <h1 className="font-itel text-center text-h-xs md:text-h-sm xl:text-h-md">
              <b>Gợi ý gói cước phù hợp</b>
            </h1>
            <div className="flex flex-wrap md:-mx-2 bg-transparent gap-y-4 mt-6 md:mt-8 xl:mt-6" data-theme="light">
              {data.map((data) => (
                <div className="w-full xl:w-1/3 xl:px-2" key={data.id}>
                  <Listbox value={data.value} onChange={data.onChange}>
                    <div className="relative">
                      <Listbox.Button className="rounded-xl py-3 px-4 bg-neutral-0 flex items-center w-full overflow-hidden">
                        {({ open }) => (
                          <>
                            <div className="flex-1 text-left overflow-hidden">
                              <p className="text-sm font-medium text-subtle-content">{data.title}</p>
                              {data.value ? (
                                <p className="truncate mt-1 font-bold">{data.value.name}</p>
                              ) : (
                                <p className="truncate mt-1 font-bold text-subtle-content">{data.placeholder}</p>
                              )}
                            </div>
                            <div>
                              <Svg src="/icons/bold/down.svg" width={24} height={24} className={`${open && 'rotate-180'} transition-all`} />
                            </div>
                          </>
                        )}
                      </Listbox.Button>
                      <Listbox.Options as="div" className="absolute mt-2 outline-none z-10 font-medium">
                        <ul className="menu p-2 bg-neutral-0 rounded-xl shadow-itel">
                          {data.options.map((option) => (
                            <Listbox.Option key={option.id} value={option}>
                              <p className="text-left">{option.name}</p>
                            </Listbox.Option>
                          ))}
                        </ul>
                      </Listbox.Options>
                    </div>
                  </Listbox>
                </div>
              ))}
            </div>
            <div className="mt-6 md:mt-8 xl:mt-10 text-center">
              <button className="btn btn-primary btn-sm md:btn-lg w-[13.25rem] rounded-full" data-theme="light">
                Tra cứu gói cước
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 md:bg-neutral-100 py-2 md:py-20">
        <div className="md:container">
          <div className="md:uppercase font-bold mt-4 md:mt-0 text-[16px] md:text-[40px] text-neutral-800 md:font-itel px-4 md:px-0">
            Danh sách Gói cước phù hợp
          </div>
          <div className="mt-3 md:mt-6 xl:mt-10 gap-[8px] flex items-center px-4 md:px-0">
            {filterTag.map((tag) => (
              <div key={tag.id} className="p-[10px] pl-[16px] rounded-[48px] gap-[4px] flex items-center border-[1px] border-neutral-400">
                <div className="text-neutral-800 text-[14px] ">{tag.name}</div>
                <button onClick={() => removeFilterTag(tag.id)}>
                  <Svg src="/icons/line/close.svg" className="w-[20px] h-[20px]" />
                </button>
              </div>
            ))}
          </div>
          <div className="grid h-max w-full lg:grid-cols-2 md:grid-cols-1 flex-wrap gap-x-6 md:gap-y-10 mt-3 md:mt-6 xl:mt-8 max-md:grid-cols-1 bg-neutral-0 md:bg-transparent px-4 md:px-0">
            {dataMonth.map((item) => (
              <div key={item.id}>
                <CardDataPack image={item.image} onDetail={handleViewDetail} onRegister={handleModalMobileInfo} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-10 py-8 md:py-[80px] bg-neutral-0">
        <p className="md:font-itel text-h5 md:text-h3 font-bold md:uppercase text-neutral-800 container">
          Gói cước <span className="text-red-500">nổi bật</span>
        </p>
        <div className="-mt-6 md:mt-14 overflow-hidden bg-neutral-0">
          <div className="container">
            <FeaturedPackData data={[1, 2, 4, 5, 7, 8]} onRegister={handleModalMobileInfo} onClickDetail={handleViewDetail} />
          </div>
        </div>
      </div>
    </>
  );
};

DataSuggestion.getLayout = (page) => (
  <>
    <LayoutDefault footerClassName="bg-neutral-50">{page}</LayoutDefault>
    <ChatBoxLazy />
  </>
);
const getStaticProps = getServerPropsWithTranslation();

export default DataSuggestion;
export { getStaticProps };
