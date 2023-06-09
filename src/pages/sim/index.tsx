import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ISimFilter } from '@/components/modal/modal-sim-filter';
import { simOption } from '@/mock/sim';
import { generateSimNumber } from '@/services/sim';

import CardSimLottery from '@/components/card/card-sim-lottery';
import Svg from '@/components/icon/svg';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import SectionSupports from '@/components/section/section-supports';
import QualitySimCard from '@/components/sim/quality-sim-card';
import SimRowItem from '@/components/sim/sim-row-item';
import SimSearchBar from '@/components/sim/sim-search-bar';
import SimTable from '@/components/sim/table';
import TagSim from '@/components/tag-chip/tag-sim';
import TagVip from '@/components/tag-chip/tag-vip';

import PaginationSimple from '@/components/pagination/pagination-simple';
import useBoolean from '@/hooks/useBoolean';
import useSimFilter from '@/hooks/useSimFilter';
import Routers from '@/routes/routers';
import useSimAction from '@/store/cart/hooks/sim';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import { DeepPartial, FormProvider, useWatch } from 'react-hook-form';

import { simTypes } from '@/constants/sim.constants';

import { serverHighestSearch } from '@/mock/sim';
import HeaderWebDefault from '@/components/header/header-web-default';

const PickSim: NextPage = () => {
  const simlist = useBoolean(true);
  const [excludeNumber, setExcludeNumber] = useState<string[]>([]);
  const [data, setData] = useState<ReturnType<typeof generateSimNumber>>([]);
  const [randomIndex, setRandomIndex] = useState(0);
  const simByYear = useBoolean(false);
  const { selectedAttributes, handleRemoveAttributes, methods, handleModalFilter } = useSimFilter();

  const { handleAddToCart } = useSimAction();

  useEffect(() => {
    function handleChange(values?: DeepPartial<ISimFilter>) {
      const data = generateSimNumber({ limit: 20, exclude: values?.excluded?.map(Number) });

      setData(data);
    }
    handleChange();
    const subscription = methods.watch(handleChange);
    return () => {
      subscription.unsubscribe();
    };
  }, [methods]);

  const handleClickRemoveNumber = (item: string) => {
    setExcludeNumber((prev: any) => {
      const isChecked = excludeNumber && excludeNumber.includes(item);
      if (isChecked) {
        return excludeNumber.filter((item) => item !== item);
      } else {
        return [...prev, item];
      }
    });
  };

  const tags = ['Tam hoa', 'Tài lộc', 'Lộc phát'];
  const query = useWatch({ control: methods.control, name: 'query' });

  return (
    <>
      <Head>
        <title>Itel - Theo là thích</title>
      </Head>
      {/* <HeaderMobileWeb title="Sim số" /> */}
      <HeaderWebDefault title="Sim số" withMenu withSearch />
      <section className="bg-neutral-0 md:bg-transparent">
        <FormProvider {...methods}>
          <div className="container pb-10 pt-6 md:pt-10 xl:pb-20">
            {/* Banner */}
            {data.length && (
              <CardSimLottery title="Tadaa! Số may mắn dành riêng cho bạn là:" mobileTitle="Số may mắn dành cho bạn!">
                <div className="w-full md:w-auto">
                  <p className="flex items-center gap-1 text-h-xs xl:text-h-md">
                    <b className="font-itel">{formatPhoneNumber(data[randomIndex].phone)}</b>
                    {data[randomIndex].is_vip ? <TagVip className="h-8 w-8 xl:w-10 xl:h-10" /> : <TagSim className="h-8 w-8" />}
                  </p>
                  <ul className="flex mt-1 xl:mt-2 space-x-1">
                    {tags.map((label) => (
                      <li
                        key={label}
                        className="tag tag-primary md:bg-base-100/[0.15] tag-sm xl:tag-md md:border-transparent md:text-neutral-0"
                      >
                        {label}
                      </li>
                    ))}
                  </ul>
                </div>
                <CardSimLottery.PackOfData pack={data[randomIndex].pack} />
                <CardSimLottery.RightContent>
                  <CardSimLottery.Price
                    price={data[randomIndex].price}
                    discountPrice={data[randomIndex].discount_price}
                    discountPercentage
                  />
                  <div className="flex gap-4">
                    <button
                      className="btn-primary md:text-neutral-800 btn btn-sm md:btn-md btn-circle !p-0"
                      onClick={() => setRandomIndex(Math.floor(Math.random() * data.length))}
                    >
                      <Svg src="/icons/bold/refresh.svg" className="h-5 md:h-6 w-5 md:w-6" />
                    </button>
                    <button
                      className="btn-primary btn btn-sm md:btn-md rounded-full"
                      onClick={() => handleAddToCart(data[randomIndex], 'buy')}
                    >
                      Mua ngay
                    </button>
                  </div>
                </CardSimLottery.RightContent>
              </CardSimLottery>
            )}
            <h3 className="text-xl block md:hidden pt-6">
              <b>Danh sách sim</b>
            </h3>
            <SimSearchBar
              className="md:mt-10"
              selectedAttributes={selectedAttributes}
              tags={serverHighestSearch}
              handleClickRemoveNumber={handleClickRemoveNumber}
              onRemoveAttributes={handleRemoveAttributes}
              handleShowFilterModal={handleModalFilter}
              isShowTagList
              isShowDataPack
            />

            <div className="mt-7 hidden md:flex">
              <div className="flex flex-1 flex-wrap gap-2">
                {selectedAttributes && selectedAttributes.length > 0 ? (
                  selectedAttributes.map((item, index) => (
                    <span key={item.type + index} className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3">
                      {item.name}
                      <button type="button" onClick={() => handleRemoveAttributes(item)}>
                        <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                      </button>
                    </span>
                  ))
                ) : (
                  <div className="text-2xl font-bold text-neutral-800">
                    Danh sách Sim <span className="text-sm font-medium text-neutral-800">(1200 số)</span>
                  </div>
                )}
              </div>
              <div className="gap flex">
                <button
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded ${simlist.value ? 'bg-neutral-0' : ''}`}
                  onClick={simlist.setTrue}
                >
                  <Svg src="/icons/bold/sim-list.svg" className="inline h-6 w-6" />
                </button>
                <button
                  className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded ${!simlist.value ? 'bg-neutral-0' : ''}`}
                  onClick={simlist.setFalse}
                >
                  <Svg src="/icons/bold/sim-table.svg" className="inline h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="md:mt-5 flex items-start justify-between gap-6">
              {/* Left content, filter */}
              <div className="hidden w-[18.75rem] rounded-2xl bg-neutral-0 p-6 xl:block">
                <div className="mb-4 text-base font-bold text-neutral-800">Loại trừ số</div>
                <ul className="flex flex-wrap items-center justify-between gap-3 text-center">
                  {['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((number, index) => (
                    <li key={number}>
                      <label>
                        <input type="checkbox" className="peer sr-only" value={number} {...methods.register('excluded')} />
                        <div className="inline-block rounded-full h-10 w-10 peer-checked:bg-red-500 peer-checked:text-neutral-0 bg-neutral-100 center-by-grid">
                          <b>{number}</b>
                        </div>
                      </label>
                    </li>
                  ))}
                </ul>
                <hr className="border-neutral-200 mt-4" />
                <div className="flex flex-col md:gap-3 xl:gap-10">
                  <ul className="font-medium">
                    {simTypes.map(({ id, name: label }) => {
                      return (
                        <li key={id}>
                          <label className="w-full flex items-center py-4 cursor-pointer">
                            <input type="checkbox" value={id} {...methods.register('type')} />
                            <span className="ml-2 first-letter:uppercase inline-block">
                              {id !== 1 ? 'Sim ' : undefined}
                              {label.toLowerCase()}
                            </span>
                          </label>
                        </li>
                      );
                    })}
                    <li>
                      <label className="w-full flex items-center py-4 cursor-pointer">
                        <input type="checkbox" checked={simByYear.value} onChange={simByYear.toggle} />
                        <span className="ml-2 first-letter:uppercase inline-block">Sim theo năm sinh</span>
                      </label>
                    </li>
                    {simByYear.value && (
                      <li>
                        <input
                          type="tel"
                          className="input input-bordered w-full py-3"
                          placeholder="Nhập năm sinh..."
                          {...methods.register('year', { shouldUnregister: true })}
                        />
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {/*
              Right content
              This is table layout, do not use flexbox to render if you see list item have header above
             */}
              <div className="flex-1">
                <div className="rounded-lg ">
                  {simlist.value ? (
                    <div className="md:bg-neutral-0">
                      <div className="md:mx-2">
                        <table className="w-full md:table">
                          <thead className="hidden md:table-header-group">
                            <tr className="text-left text-sm font-medium">
                              <td className="table-cell py-4 pl-4 pr-3 xl:py-6">SỐ SIM</td>
                              <td className="table-cell px-3 py-4 xl:py-6">
                                <div className="flex items-center gap-1 whitespace-nowrap">
                                  <span>GÓI CƯỚC</span>
                                  <span className="hidden xl:block">CAM KẾT</span>
                                  <span className="inline-block tooltip tooltip-light">
                                    <Svg src="/icons/line/information.svg" className="h-5 w-5" />
                                    <span className="tooltip-bottom pointer-events-none whitespace-break-spaces max-w-xs shadow-itel tooltip-text">
                                      <b>Yêu cầu sử dụng gói cước ITEL149 trong thời gian tối thiểu 36 tháng sau khi kích hoạt Sim.</b>
                                    </span>
                                  </span>
                                </div>
                              </td>
                              <td className="table-cell px-3 py-4 xl:py-6">GIÁ TIỀN</td>
                            </tr>
                            <tr>
                              <th colSpan={33} className="" aria-colspan={12}>
                                <hr className="-mx-2 border-neutral-300" />
                              </th>
                            </tr>
                          </thead>
                          <tbody className="block align-top md:table-row-group">
                            {data.map((item) => (
                              <SimRowItem
                                key={item.id}
                                item={item}
                                pack={item.pack}
                                onAddToCart={() => handleAddToCart(item)}
                                onBuy={() => handleAddToCart(item, 'buy')}
                                onSelectTag={(tag) => handleRemoveAttributes({ name: '', id: tag.id, type: 'type' })}
                                tags={simTypes.slice(1, 4)}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-4">
                      {data.map((item) => (
                        <SimTable
                          key={item.id}
                          simItem={item}
                          pack={item.pack}
                          tags={simTypes.slice(1, 4)}
                          onAddToCart={() => handleAddToCart(item)}
                          onBuy={() => handleAddToCart(item, 'buy')}
                          onSelectTag={(tag) => handleRemoveAttributes({ name: '', id: String(tag.id), type: 'type' })}
                        />
                      ))}
                    </div>
                  )}
                </div>
                {/* Unable to use this pagniation list on mobile */}
                <div className="max-md:hidden mt-3 md:mt-10">
                  <PaginationSimple totalPage={100} adjacent={4} />
                </div>
                <div className="md:hidden mt-3 md:mt-10">
                  <PaginationSimple totalPage={100} adjacent={[3, 1]} />
                </div>
              </div>
            </div>
          </div>
        </FormProvider>
      </section>
      {/* <hr className="h-2 bg-neutral-100 md:hidden border-none" /> */}
      {/* Banner 2 */}
      <section className="bg-neutral-0 md:bg-transparent py-6 mt-2 md:mt-0 md:py-16 xl:py-28">
        <QualitySimCard simOption={simOption} />
      </section>
      {/* Banner 3 */}
      <section className="bg-neutral-0 py-6 md:py-0">
        <div className="mx-4 md:mx-0 block-img block-cinema xl:block-banner bg-cover bg-center rounded-2xl md:rounded-none overflow-hidden">
          <img src="/images/sim-banner.png" className="object-cover" alt="Home banner" />
          <div className="absolute inset-0">
            <div className="container flex h-full items-center relative">
              <div className="my-auto">
                <div className="text-neutral-0 mb-2 font-itel md:whitespace-pre-line text-xl md:text-h4 xl:text-h-xl max-md:max-w-[200px]">
                  <b>{'Thần Sim phong thủy \nThời tới cản không kịp'}</b>
                </div>
                <div className="mb-8 font-normal text-neutral-0 text-sm xl:text-base max-md:hidden">
                  Lo lắng về việc chọn sim không phù hợp?
                  <br />
                  Hãy cùng thần số học chọn cho mình số Sim của riêng bạn
                </div>
                <Link
                  className="btn-primary btn w-[8.5rem] rounded-full md:btn-md xl:btn-lg max-md:hidden"
                  data-theme="dark"
                  href={Routers.SIM_FENG_SHUI}
                >
                  Tìm kiếm
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionSupports />
    </>
  );
};

PickSim.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();
export { getStaticProps };

export default PickSim;
