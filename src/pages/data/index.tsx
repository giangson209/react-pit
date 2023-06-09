import CardDataPack from '@/components/card/card-data-pack';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import { toggleModalDataSuggest } from '@/components/modal/modal-suggest-data';
import FeaturedPackData from '@/components/pages/pack-data/featured-pack';
import PackSearchBar from '@/components/pages/pack-data/filter';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import Routers from '@/routes/routers';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Components
import HeaderWebDefault from '@/components/header/header-web-default';
import { useDataModal } from '@/store/cart/hooks/data';

const dataPackOutstanding = [
  { id: 1, name: 'PARTY129', data: '3', newPrice: '129.000', oldPrice: '159.000', saleOff: '40' },
  { id: 2, name: 'PARTY179', data: '5', newPrice: '179.000', oldPrice: '79.000', saleOff: '40' },
  { id: 3, name: 'PARTY79', data: '2', newPrice: '199.000', oldPrice: '99.000', saleOff: '40' }
];

const tabs = [
  { id: 'monthly', label: 'Gói tháng', icon: '/icons/bold/data-pack/month.svg' },
  { id: 'daily', label: 'Gói ngày', icon: '/icons/bold/data-pack/day.svg' },
  { id: 'extra', label: 'Gói mua thêm', icon: '/icons/bold/data-pack/add.svg' }
];

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

const dataDay = [
  {
    id: 1,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  },
  {
    id: 2,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  },
  {
    id: 3,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'may49',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  },
  {
    id: 4,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  },
  {
    id: 5,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'd49',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  },
  {
    id: 6,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'dplus49',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  },
  {
    id: 7,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'da20',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  },
  {
    id: 8,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'may79',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953648/bg-day-package_n7dtrc.png'
  }
];

const dataAdded = [
  {
    id: 1,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  },
  {
    id: 2,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  },
  {
    id: 3,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'may49',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  },
  {
    id: 4,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'itel149',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  },
  {
    id: 5,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'd49',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  },
  {
    id: 6,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'dplus49',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  },
  {
    id: 7,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'da20',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  },
  {
    id: 8,
    sms: '300',
    data: '3',
    newPrice: '50.000',
    oldPrice: '77.000',
    name: 'may79',
    image: 'https://res.cloudinary.com/drlprpabx/image/upload/v1685953649/bg-add-package_m7nlu8.png'
  }
];

const validTabs = ['monthly', 'daily', 'extra'];
const DataPackPage: NextPage = ({ router }) => {
  const currentTab = validTabs.includes(String(router.query.tab)) ? String(router.query.tab) : validTabs[0];
  const [tabId, setTabId] = useState<string>('monthly');
  const [dataPack, setDataPack] = useState<any[]>(dataMonth);
  const [filterPackData, setFilterPackData] = useState<any>(null);

  const handleToggleModalSuggest = () => {
    toggleModalDataSuggest(({ data, minutes, price }) => {
      // Handle ehere
      router.push(Routers.DATA_SUGGESTION);
    });
  };

  const removeFilterTag = (delete_fil: any) => {
    let _filterPackData = [...filterPackData];
    _filterPackData = _filterPackData.filter((fil) => {
      return fil.id !== delete_fil.id && fil.name !== delete_fil.name;
    });

    setFilterPackData(_filterPackData);
  };

  useEffect(() => {
    if (tabId === 'monthly') {
      setDataPack(dataMonth);
    }
    if (tabId === 'daily') {
      setDataPack(dataDay);
    }
    if (tabId === 'extra') {
      setDataPack(dataAdded);
    }
  }, [tabId]);

  const { handleViewDetail, handleModalPhoneCheck } = useDataModal();

  return (
    <>
      <Head>
        <title>Gói cước</title>
      </Head>
      <HeaderWebDefault title="Gói cước" withMenu withSearch />
      <section>
        <div className="relative h-48 md:h-64 xl:h-[21.25rem]" data-theme="dark">
          <img
            src="https://res.cloudinary.com/dgkrchato/image/upload/v1684774447/itel-web/data-pack-banner_tvzdbo.png"
            alt="packdata"
            className="absolute inset-0 h-full w-full object-cover object-right hidden lg:block"
          />
          <img
            src="https://res.cloudinary.com/drlprpabx/image/upload/v1686132031/Block_Image_ehnsu5.png"
            alt="packdata"
            className="absolute inset-0 h-full w-full object-cover object-right hidden md:block lg:hidden"
          />
          <img
            src="https://res.cloudinary.com/drlprpabx/image/upload/v1686131972/Block_Image_b9dvqf.png"
            alt="packdata"
            className="absolute inset-0 h-full w-full object-cover object-right md:hidden"
          />
          <div className="relative">
            <div className="container z-0 pt-16 md:pt-12 xl:pt-[4.75rem]">
              <h3 className="max-xl:hidden mb-2 font-itel text-h-md font-bold w-3/4">Gói may đột phá - bá chủ data</h3>
              <h3 className="xl:hidden mb-2 font-itel text-h-xxs md:text-h-sm font-bold w-3/4">
                Gói may đột phá
                <br />
                bá chủ data
              </h3>
              <p className="max-md:hidden text-base font-medium text-neutral-200">
                4GB/ ngày 77K/ tháng <br />
                Miễn phí gọi nội mạng iTel & Vinaphone
              </p>
              <button
                className="max-xl:hidden btn-primary btn btn-lg mt-7 whitespace-nowrap rounded-full"
                onClick={handleToggleModalSuggest}
              >
                Đăng ký ngay
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-neutral-0 xl:py-20 py-8">
        <div className="container">
          <div className="relative w-full flex md:flex-row flex-col justify-between">
            <h3 className="md:font-itel xl:text-h3 text-2xl font-bold xl:uppercase text-neutral-800">
              Gói cước <span className="text-red-500">nổi bật</span>
            </h3>
            <div className="flex relative w-full md:w-[24rem] lg:w-[27.5rem] lg:-mt-8 md:-mt-20 max-h-[90px] mt-4 rounded-xl bg-neutral-500 py-3 pl-6">
              <div className="flex flex-col pr-[7.5rem]">
                <p className="text-base font-bold text-neutral-0">Tips! Đăng nhập ngay </p>
                <p className="text-sm font-normal text-neutral-0">để chọn gói cước phù hợp nhất với thuê bao nha!</p>
              </div>
              <img
                src="https://res.cloudinary.com/dgkrchato/image/upload/v1684776424/itel-web/tooltip-image_ydntbc.png"
                alt="tooltip"
                className="absolute -right-4 bottom-0 aspect-tivi w-[7.5rem]"
              />
            </div>
          </div>
        </div>
        <div className="xl:mt-14 mt-2 overflow-hidden">
          <div className="container">
            <FeaturedPackData data={[1, 2, 4, 5, 7, 9]} onRegister={handleModalPhoneCheck} onClickDetail={handleViewDetail} />
          </div>
        </div>
        <div className="mt-3 md:mt-8 xl:mt-14 container">
          <div className="xl:h-[17.375rem] md:h-[14.3125rem] h-[10.375rem] relative overflow-hidden rounded-b-2xl">
            <img
              src="https://res.cloudinary.com/dgkrchato/image/upload/v1684777536/itel-web/banner-pack-data-1_kluyal.png"
              alt="GỢI Ý GÓI CƯỚC CHO RIÊNG BẠN"
              className="absolute inset-0 object-contain object-top xl:block hidden"
            />
            <img
              src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685618370/itel/images/c84867ca983486c7f85bea188a10e8d3_rl2txa.png"
              alt="GỢI Ý GÓI CƯỚC CHO RIÊNG BẠN"
              className="absolute inset-0 object-contain object-top max-md:hidden xl:hidden"
            />
            <img
              src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1685618684/itel/images/2a782dce1f4ff25cab0741cb38ecf4e3_by3wt7.png"
              alt="GỢI Ý GÓI CƯỚC CHO RIÊNG BẠN"
              className="absolute inset-0 object-contain object-top md:hidden"
            />
            <div className="relative bg-transparent" data-theme="dark">
              <div className="h-full pt-8 pl-5 md:pt-12 xl:pt-16 md:pl-10 xl:pl-[12.5rem]">
                <h3 className="font-itel text-h-xxs md:text-h-xs xl:text-h-sm font-bold whitespace-pre md:whitespace-normal">
                  {'GỢI Ý GÓI CƯỚC CHO \nRIÊNG BẠN'}
                </h3>
                <p className="max-md:hidden mt-2">
                  Lạc lối trong ưu đãi, băn khoăn không biết chọn gói cước nào? <br />
                  Chia sẻ mong muốn để iTel tư vấn gói cước dành riêng cho bạn nhé!
                </p>
                <div className="mt-4 md:mt-6 xl:mt-8">
                  <button onClick={handleToggleModalSuggest} className="btn-primary btn btn-sm xl:btn-lg whitespace-nowrap rounded-full">
                    Khám phá ngay
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="mobile-container mt-2 md:mt-0 pt-6 pb-3 md:pb-2 xl:pb-6 md:pt-16 xl:pt-20">
        <div className="container">
          <h2 className="md:text-center font-itel text-xl md:text-h3">
            <b>Danh sách Gói cước</b>
          </h2>
        </div>
      </section>
      <section className="sticky md:static top-16 mobile-container z-10">
        <div className="container max-md:px-0">
          <div>
            <div className="tabs flex-nowrap gap-x-4 whitespace-nowrap text-base scrollbar-hide md:justify-center overflow-x-auto">
              {tabs.map((tab) => {
                const isActive = tab.id === currentTab;
                return (
                  <Link
                    key={tab.id}
                    href={{ pathname: Routers.DATA, query: { tab: tab.id } }}
                    shallow
                    onClick={() => setTabId(tab.id)}
                    className={clsx('tab-bordered flex-nowrap gap-x-2 pt-1 md:p-4 tab tab-primary', isActive && 'tab-active')}
                  >
                    <Svg
                      src={tab.icon}
                      className={clsx('max-md:hidden', isActive ? 'text-red-500' : 'text-base-content')}
                      width={32}
                      height={32}
                    />
                    {tab.label}
                  </Link>
                );
              })}
            </div>
            <hr className="border-neutral-200 -mt-px" />
          </div>
          <div className="py-2 md:py-6 xl:py-10">
            <PackSearchBar onChangeFilter={(data) => setFilterPackData(data)} />
          </div>
        </div>
      </section>
      <section className="max-md:hidden xl:hidden pb-6">
        <div className="container max-md:px-0">
          <div className="gap-[8px] flex items-center md:px-0">
            {filterPackData &&
              filterPackData.map((fil: any) => (
                <div key={fil.id} className="p-[10px] pl-[16px] rounded-[48px] gap-[4px] flex items-center border-[1px] border-neutral-400">
                  <div className="text-neutral-800 text-[10px] md:text-[14px]">{fil.name}</div>
                  <button onClick={() => removeFilterTag(fil)}>
                    <Svg src="/icons/line/close.svg" className="w-[20px] h-[20px]" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="mobile-container">
        <div className="container max-md:px-0 pb-6 md:pb-16 xl:pb-[7.5rem]">
          <div className="grid h-max w-full xl:grid-cols-2 flex-wrap gap-x-6 md:gap-y-10">
            {dataPack.map((item) => (
              <div key={item.id}>
                <CardDataPack image={item.image} onDetail={handleViewDetail} onRegister={handleModalPhoneCheck} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="relative md:h-[21.25rem] h-[12rem] w-full" data-theme="light">
        <img
          src="https://res.cloudinary.com/dgkrchato/image/upload/v1684809355/itel-web/banner-pack-data-2_iuvaqg.png"
          alt=""
          className="absolute inset-0 object-cover w-full h-full"
        />
        <span className="absolute inset-0 bg-overlay-popup bg-opacity-20" />
        <div className="relative container flex h-full lg:items-center lg:justify-between lg:flex-row md:flex-col md:justify-center md:items-start">
          <div className="flex flex-col gap-2 justify-center md:justify-start">
            <p className="font-itel lg:text-h3 md:text-h4 text-h5 font-bold uppercase w-2/3 md:w-full">mua Sim số đẹp ngay tại itel</p>
            <p className="text-base font-bold hidden md:block">
              Khám phá thần số học, phong thủy, cung hoàng đạo{' '}
              <span className="font-normal text-neutral-500">
                chọn <br />
                cho mình số Sim của riêng bạn
              </span>
            </p>
          </div>
          <button className="btn-primary btn btn-lg rounded-full md:mt-5 hidden md:block">Khám phá ngay</button>
        </div>
      </section>
    </>
  );
};

DataPackPage.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default DataPackPage;
