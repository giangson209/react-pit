import Drag from '@/components/drag/drag';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import SearchForm from '@/components/sim/SearchForm';
import QualitySimCard from '@/components/sim/quality-sim-card';
import SimSearchBar from '@/components/sim/sim-search-bar';
import SimTable from '@/components/sim/table';
import Tab from '@/components/tabs/tabs';
import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { serverHighestSearch, simOption } from '@/mock/sim';
import Routers from '@/routes/routers';

import { modal } from '@/context/modal-context';
import { generateSimNumber } from '@/services/sim';

import SimModalCommentary from '@/components/modal/modal-sim-commentary';
import ModalSimInfo from '@/components/modal/modal-sim-info';
import PaginationSimple from '@/components/pagination/pagination-simple';
import SectionSimCommentary from '@/components/section/section-sim-commentary';
import SectionGeoSimResult from '@/components/section/section-sim-result';
import SearchFormModal from '@/components/sim/search-form-modal';
import useSimFilter from '@/hooks/useSimFilter';
import useSimAction from '@/store/cart/hooks/sim';
import { Model } from '@/types/model';
import Link from 'next/link';

import HeaderWebDefault from '@/components/header/header-web-default';
import { SimQuery, simTypes } from '@/constants/sim.constants';
import { FormProvider, useWatch } from 'react-hook-form';
import { tabsFengshui } from './geo-sim';

// mock

const tabs = [
  { id: 1, label: 'Tất cả' },
  { id: 2, label: 'Gia đạo tình duyên' },
  { id: 3, label: 'Đại cát' },
  { id: 4, label: 'Công danh' },
  { id: 5, label: 'Tài lộc' },
  { id: 6, label: 'Mệnh Thủy' },
  { id: 7, label: 'Mệnh Hoả' },
  { id: 8, label: 'Mệnh Kim' },
  { id: 9, label: 'Mệnh Mộc' }
];
type PageProps = {
  sim: ReturnType<typeof generateSimNumber>[number];
  data: ReturnType<typeof generateSimNumber>;
};
const GeoSimResult: NextPage<PageProps> = ({ data, sim }) => {
  const router = useRouter();
  const { gender, option, date, mode, phoneNumber } = router.query;
  const [tabId, setTabId] = useState<number>(1);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const { selectedAttributes, handleModalFilter, handleRemoveAttributes, methods } = useSimFilter();

  const { handleAddToCart } = useSimAction();

  useEffect(() => {
    if (showSearchModal) {
      if (document) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'scroll';
    }
  });

  const handleModalCommentary = () => {
    modal.open({
      render: <SimModalCommentary title="Thành đầu thổ - Đất trên thành" type="feng_shui" />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 xl:bg-neutral-100',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleModalDetail = (item: Model.Sim & { gift?: Model.Gift; pack: Model.PackOfData }) => {
    modal.open({
      render: (
        <ModalSimInfo
          title="Chi tiết luận giải"
          item={item}
          tags={['Tam hoa', 'Tài lộc', 'Lộc phát']}
          onAddToCart={() => handleAddToCart(item)}
          onBuyNow={() => handleAddToCart(item, 'buy')}
        />
      ),
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 xl:bg-neutral-100',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };
  const query = useWatch({ control: methods.control, name: 'query' });
  const isMark = mode === SimQuery.MarkPhone;

  return (
    <>
      <Head>
        <title>Kết quả sim phong thủy</title>
      </Head>
      <HeaderWebDefault title="Kết quả tra cứu" withMenu />
      <section className="md:bg-neutral-0">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.HOME}>Trang chủ</Link>
              </li>
              <li>
                <Link href={Routers.SIM} className="max-md:hidden">
                  Chọn số mua sim
                </Link>
                <span className="md:hidden">...</span>
              </li>
              <li>
                <Link href={Routers.SIM_FENG_SHUI}>Sim phong thuỷ</Link>
              </li>
              <li className="overflow-hidden text-neutral-800">
                <Link href={router.asPath} className="truncate">
                  {isMark ? 'Kết quả chấm điểm sim' : 'Kết quả sim phong thuỷ'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Section information */}
      <SectionGeoSimResult
        onChange={() => setShowSearchModal(true)}
        type={isMark ? 'secondary' : 'primary'}
        title={isMark ? 'Chấm điểm sim' : 'Kết quả sim phong thuỷ'}
        queries={isMark ? ['0877 123 456', 'Nguyễn Bảo Ngọc', date] : [gender, date, option]}
        bannerTitle={`Chào ${gender || 'Nữ'} thí chủ xinh đẹp!`}
        bannerDesc="iTel sẽ bói cho nữ thí chủ một quẻ để tìm ra số Sim đẹp nhất, hợp nhất nhé!"
        imageTitle="Thành dầu thổ"
        attributes={[
          { label: 'Năm Can Chi', value: 'Kỷ Mão' },
          { label: 'Mệnh niên', value: 'Thổ - Thành Đầu Thổ - Đất trên thành' },
          { label: 'Mệnh quái', value: 'Cung Cấn Mệnh Thổ' },
          { label: 'Con Giáp', value: 'Sơn Lâm Chi Thố - Thỏ ở rừng' }
        ]}
        content="Thí chủ Nam mệnh Sơn đầu hỏa mang nghĩa “lửa trên núi”. Cùng là hành Hỏa nhưng sau khi đi kèm với yếu tố nạp âm, mệnh Sơn Đầu Hỏa lại mang những đặc trưng khác biệt với những mệnh Hỏa khác. Thí chủ phù hợp với các số 3,7, 6 và kỵ với các số 1, 9, nên chọn các số thuộc mệnh Hỏa, mệnh Mộc và tránh lựa chọn các số thuê bao thuộc mệnh Thủy."
        className="md:mt-10"
        onClickDetail={handleModalCommentary}
      />
      {isMark && (
        <SectionSimCommentary
          item={sim}
          title="Điểm thần phong thuỷ"
          mobileTitle="Điểm phong thuỷ"
          point={8}
          type="feng_shui"
          attributes={[
            { title: 'Mệnh', value: 'Hoả' },
            { title: 'Số nút', value: '7' },
            { title: 'Cát - hung', value: 'Đại Cát' }
          ]}
          tags={['Tam hoa', 'Tài lộc', 'Lộc phát']}
          onCart={() => handleAddToCart(sim)}
          onBuy={() => handleAddToCart(sim, 'buy')}
          onViewDetail={() => handleModalDetail(sim)}
        />
      )}

      <section className="container py-6 md:mt-10 md:pb-16 xl:pb-20 md:pt-0 xl:mt-14">
        {/* Heade PC */}
        <div className="max-md:hidden">
          <Drag className="select-none items-center justify-between overflow-auto scrollbar-hide md:flex">
            {tabs.map((tab) => (
              <Tab key={tab.id} label={tab.label} onClick={() => setTabId(tab.id)} isActive={tabId === tab.id} size="small" />
            ))}
          </Drag>

          <div className="mb-6 w-full border-b border-b-neutral-300" />
          <div className="mt-4 w-full rounded-2xl bg-neutral-0 p-6">
            <div className="flex items-center justify-between gap-6">
              <img src="/images/sim-image-4.png" alt="sim-img" className="aspect-square w-28 rounded-lg" />
              <div>
                <p className="mb-2 text-xl font-bold">Sim Gia đạo tình duyên</p>
                <p className="font-medium text-neutral-500 md:text-sm xl:text-base">
                  Xem xét số chủ đạo của sim có mối tương quan như nào với các chỉ số của bạn. Trong đó quan trọng nhất là của bạn. Sau đó
                  tùy vào mục tiêu mà xem xét tới các chỉ số khác: tính cách, linh hồn, thái độ,…
                </p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="text-xl block md:hidden">
          <b>Danh sách sim</b>
        </h3>
        <FormProvider {...methods}>
          {/* Filter for mobile */}
          <SimSearchBar
            className="md:mt-8"
            selectedAttributes={selectedAttributes}
            tags={serverHighestSearch}
            onRemoveAttributes={handleRemoveAttributes}
            handleShowFilterModal={handleModalFilter}
            changeBg
          />
        </FormProvider>
        {/* {query && <div className="md:hidden font-bold text-xl">Kết quả cho “{query}”</div>} */}

        <div className="mt-3 md:mt-8 grid gap-x-4 gap-y-8 xl:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {data.map((item) => (
            <SimTable
              key={item.id}
              simItem={item}
              inSearchResult
              pack={item.pack}
              onViewCommentary={() => handleModalDetail(item)}
              onAddToCart={() => handleAddToCart(item)}
              onBuy={() => handleAddToCart(item, 'buy')}
              tags={simTypes.slice(1, 4)}
              onSelectTag={(tag) => handleRemoveAttributes({ name: '', id: String(tag.id), type: 'type' })}
            />
          ))}
        </div>
        <div className="flex w-full items-center justify-center mt-3 md:mt-8">
          <div className="max-md:hidden">
            <PaginationSimple totalPage={100} adjacent={4} />
          </div>
          <div className="md:hidden">
            <PaginationSimple totalPage={100} adjacent={[3, 1]} />
          </div>
        </div>
      </section>
      <section className="md:bg-neutral-50 py-6 md:mt-0 bg-transparent md:py-16 xl:py-28">
        <QualitySimCard simOption={simOption} />
      </section>
      <SectionSupports />
      {showSearchModal && (
        <div className="fixed inset-0 z-50 md:flex h-screen w-full items-center justify-center bg-overlay-popup/50 hidden overflow-auto">
          <div className="flex items-center justify-center md:w-[70%] xl:w-[40%]">
            <SearchForm tabs={tabsFengshui} handleCloseModal={() => setShowSearchModal(false)} isModal />
          </div>
        </div>
      )}
      {showSearchModal && (
        <div className="block md:hidden">
          <SearchFormModal tabs={tabsFengshui} handleCloseModal={() => setShowSearchModal(false)} />
        </div>
      )}
    </>
  );
};

GeoSimResult.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation<PageProps>(() => {
  return {
    props: {
      sim: generateSimNumber({ limit: 1 })[0],
      data: generateSimNumber({ limit: 12 })
    }
  };
});
export { getStaticProps };

export default GeoSimResult;
