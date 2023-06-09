import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

// import useSticky from '@/hooks/useSticky';

import Accordions from '@/components/accordion/accordions';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Svg from '@/components/icon/svg';
import LayoutImall from '@/components/layout/layout-imall';

import Routers from '@/routes/routers';

import { getBrands } from '@/services/brand/getBrands';
import { getCategories } from '@/services/category/category';
import { getListProduct } from '@/services/product/product';

import useBoolean from '@/hooks/useBoolean';
import useProduct from '@/store/cart/hooks/product';

import CardProduct from '@/components/card/card-product';
import FilterList from '@/components/filter/filter-list';
import FilterPrice from '@/components/filter/filter-price';
import SectionProduct from '@/components/section/section-products';

import HeaderWebDefault from '@/components/header/header-web-default';
import ModalImallFilter from '@/components/modal/modal-imall-filter';
import PaginationSimple from '@/components/pagination/pagination-simple';
import SectionImallBanner from '@/components/section/section-imall-banner';
import { IMALL_DEVICE_ATTRIBUTES, IMALL_PRICE_LIST } from '@/constants/imall.constants';
import { modal } from '@/context/modal-context';
import { Data, Model } from '@/types/model';
import { Listbox } from '@headlessui/react';

export type DevicePageProps = {
  categories: Model.Category[];
  brands: Model.Brand[];
  featured_products: Data.Product[];
};

export type IFormSearch = {
  category: string;
  categoryMobile: string;
  range: [number, number];
  options: Record<string, string[]>;
};

const ImallDevicePage: NextPage<DevicePageProps> = ({ categories, brands, featured_products }) => {
  const loadingData = useBoolean(false);
  const [suggested, setSuggested] = useState<Data.Product[]>([]);
  const methods = useForm<IFormSearch>({ defaultValues: { category: 'all', categoryMobile: 'all' } });
  const [mergedCategories] = useState([{ id: 'all', name: 'Tất cả' }, ...categories]);

  const { addToCart, likeItem } = useProduct();

  useEffect(() => {
    async function getSuggestedProducts() {
      loadingData.setTrue();
      const products = await getListProduct({ limit: 12 });
      // Fake delay calling api
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSuggested(products);
      loadingData.setFalse();
    }
    getSuggestedProducts();
  }, [loadingData]);

  const handleModalFilter = () => {
    const defaultValues = methods.getValues();
    Object.assign(defaultValues.options, { brands: defaultValues.options.brandMobile });

    modal.open({
      render: <ModalImallFilter defaultValues={defaultValues} brands={brands} />,
      onDone(data: IFormSearch) {
        Object.assign(data.options, { brandMobile: data.options.brands });
        methods.reset(data);
      },
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel md:bg-neutral-0',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleRemoveAttributes = (item: { value: string; name: string; type: string }) => {
    const currentValues = methods.getValues(`options.${item.type}`);
    const index = currentValues.indexOf(item.value);
    if (index !== -1) {
      currentValues.splice(index, 1);
      methods.setValue(`options.${item.type}`, currentValues);
    }
  };

  const options = useWatch({ name: 'options', control: methods.control });
  const filters = useMemo(() => {
    const data: { value: string; name: string; type: string }[] = [];
    if (!options) return data;
    IMALL_DEVICE_ATTRIBUTES.forEach((attribute) => {
      const values = options[attribute.type];
      if (values) {
        for (let index = 0; index < attribute.options.length; index++) {
          const element = attribute.options[index];

          if (values.some((item) => item == String(element.value))) {
            data.push({ ...element, value: String(element.value), type: attribute.type });
          }
        }
      }
    });

    return data;
  }, [options]);

  return (
    <FormProvider {...methods}>
      {/* <HeaderMobileWeb title="Điện thoại thiết bị" /> */}
      <HeaderWebDefault title="Điện thoại thiết bị" withCart withMenu withSearch />
      <div className="container max-md:p-0 flex w-full gap-x-6 pt-4">
        <div className="hidden w-[18.75rem] flex-shrink-0 xl:block">
          <div className="menu h-[30rem] overflow-auto rounded-lg border border-neutral-300 px-6 pb-6">
            <ul className="font-bold">
              <li className="menu-title pb-4 pt-6">
                <span className="py-0">Danh mục</span>
              </li>
              {mergedCategories.map(({ id, name }) => {
                const key = `category.${id}`;
                return (
                  <li key={key}>
                    <input id={key} type="radio" hidden value={id} className="peer hidden" {...methods.register('category')} />
                    <label htmlFor={key} className="peer-checked:bg-neutral-100">
                      {name}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="mt-4 space-y-8 rounded-lg border border-neutral-300 p-6">
            <FilterComponents brands={brands} categories={categories} filters={IMALL_DEVICE_ATTRIBUTES} />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="md:pb-16 xl:-mr-1.5">
            <section className="bg-neutral-0 md:bg-transparent pb-4 px-4 md:p-0">
              <SectionImallBanner />
              <div className="md:mt-6 w-full overflow-hidden xl:hidden">
                <ul className="tabs flex-nowrap md:gap-x-8 overflow-x-auto scrollbar-hide">
                  {mergedCategories.map((cat) => (
                    <li key={cat.id}>
                      <label>
                        <input type="radio" hidden value={cat.id} className="peer hidden" {...methods.register('categoryMobile')} />
                        <span className="tab tab-bordered box-content whitespace-nowrap border-red-500 border-opacity-0 p-4 text-base peer-checked:tab-active">
                          {cat.name}
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 md:pt-4 flex items-center justify-end flex-row-reverse md:flex-row gap-2">
                  <ul className="flex whitespace-nowrap overflow-auto scrollbar-hide h-full gap-x-2 flex-1">
                    {filters.length
                      ? filters.map((item) => (
                          <li key={item.type + item.value}>
                            <span className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3">
                              {item.name}
                              <button type="button" onClick={() => handleRemoveAttributes(item)}>
                                <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                              </button>
                            </span>
                          </li>
                        ))
                      : brands.map(({ id, name }, i) => (
                          <li key={id}>
                            <label>
                              <input
                                type="checkbox"
                                className="peer sr-only"
                                hidden
                                value={id}
                                {...methods.register('options.brandMobile')}
                              />
                              <span className="btn-tertiary btn btn-sm border-none font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">
                                {name}
                              </span>
                            </label>
                          </li>
                        ))}
                  </ul>
                  <button
                    type="button"
                    className={clsx(
                      'relative btn-tertiary btn btn-sm btn-square md:w-auto md:btn-lg md:rounded-full flex-shrink-0',
                      filters.length && 'btn-active'
                    )}
                    onClick={handleModalFilter}
                  >
                    <Svg src="/icons/bold/filter.svg" width={24} height={24} />
                    {filters.length ? (
                      <span className="badge z-50 badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                        <span>{filters.length}</span>
                      </span>
                    ) : null}
                  </button>
                </div>
              </div>
            </section>
            {filters.length ? (
              <SectionProduct title="Danh sách sản phẩm" className="mt-2 md:mt-16 xl:mt-20 px-4 py-6 md:p-0">
                <ul className="max-md:hidden flex whitespace-nowrap overflow-auto scrollbar-hide h-full gap-x-2 flex-1 mt-4">
                  {filters.map((item) => (
                    <li key={item.type + item.value}>
                      <span className="chip-outline chip gap-x-1 border-neutral-300 h-9 text-sm px-3">
                        {item.name}
                        <button type="button" onClick={() => handleRemoveAttributes(item)}>
                          <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="-mx-1 md:-mt-2 flex xl:-mx-3 flex-wrap">
                  {featured_products.map((product, index) => (
                    <div key={product.id} className="mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:px-3">
                      <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                        <CardProduct
                          img={product.thumbnail}
                          installment={Boolean(index % 3)}
                          title={product.name}
                          type="secondary"
                          onLike={() => likeItem(product)}
                          onAddToCart={() => addToCart(product.variant, product)}
                        >
                          <CardProduct.Body
                            tags={product.tags}
                            price={product.priceRange.max}
                            discountPrice={product.priceRange.discount_min}
                            name={product.name}
                            discountPercentage
                            rate={4.5}
                            sold={888}
                          />
                        </CardProduct>
                      </Link>
                    </div>
                  ))}
                </div>
              </SectionProduct>
            ) : (
              <>
                <SectionProduct title="Sản phẩm nổi bật" className="mt-2 md:mt-16 xl:mt-20 px-4 py-6 md:p-0">
                  <div className="-mx-1 mt-2 flex md:flex-wrap xl:-mx-3 overflow-x-auto scrollbar-hide">
                    {featured_products.map((product, index) => (
                      <div key={product.id} className="mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:px-3">
                        <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                          <CardProduct
                            img={product.thumbnail}
                            installment={Boolean(index % 3)}
                            title={product.name}
                            type="secondary"
                            onLike={() => likeItem(product)}
                            onAddToCart={() => addToCart(product.variant, product)}
                          >
                            <CardProduct.Body
                              tags={product.tags}
                              price={product.priceRange.max}
                              discountPrice={product.priceRange.discount_min}
                              name={product.name}
                              discountPercentage
                              rate={4.5}
                              sold={888}
                            />
                          </CardProduct>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SectionProduct>
                <SectionProduct title="Sản phẩm cho bạn" className="mt-2 md:mt-16 xl:mt-20 px-4 pt-6 md:p-0">
                  <div className="-mx-1 mt-2 flex flex-wrap xl:-mx-3">
                    {suggested.map((product) => (
                      <div key={product.id} className="mt-6 w-1/2 px-2 md:w-1/3 xl:mt-8 xl:w-1/4 xl:px-3">
                        <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                          <CardProduct
                            img={product.thumbnail}
                            title={product.name}
                            installment={product.id % 2 === 0 ? true : false}
                            type="secondary"
                            onLike={() => likeItem(product)}
                            onAddToCart={() => addToCart(product.variant, product)}
                          >
                            <CardProduct.Body
                              price={product.priceRange.max}
                              discountPrice={product.priceRange.discount_min}
                              name={product.name}
                              rate={4.5}
                              sold={888}
                            />
                          </CardProduct>
                        </Link>
                      </div>
                    ))}
                  </div>
                </SectionProduct>
              </>
            )}
            <div className="bg-neutral-0 max-md:hidden pb-6">
              <PaginationSimple totalPage={100} adjacent={4} />
            </div>
            <div className="bg-neutral-0 md:hidden pb-6">
              <PaginationSimple totalPage={100} adjacent={[3, 1]} />
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export const FilterComponents = ({
  brands,
  categories,
  filters
}: {
  brands: Model.Brand[];
  categories: Model.Category[];
  filters?: {
    type: string;
    title: string;
    options: { value: number; name: string }[];
  }[];
}) => {
  const methods = useFormContext<IFormSearch>();

  const [selectedPrice, setSelectedPrice] = useState(IMALL_PRICE_LIST[0]);

  return (
    <>
      <Controller
        control={methods.control}
        defaultValue={[0, 5_000_000]}
        name="range"
        render={({ field: { value, onChange } }) => {
          return (
            <FilterPrice min={0} max={5_000_000} step={100_000} value={value} className="space-y-4 py-4 xl:py-0" onChange={onChange}>
              <Listbox as="div" className="relative" value={selectedPrice} onChange={setSelectedPrice}>
                <Listbox.Button className={'relative w-full text-left'}>
                  <div className="input-bordered input w-full outline-none">{selectedPrice.name}</div>
                  <div className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
                    <Svg src="/icons/bold/down.svg" width={24} height={24} />
                  </div>
                </Listbox.Button>
                <Listbox.Options className="absolute z-20 my-2 max-h-60 w-full overflow-auto rounded-md border border-neutral-300 bg-neutral-0 py-1 shadow-itel top-full">
                  {IMALL_PRICE_LIST.map((option) => (
                    <li key={typeof option === 'string' ? option : option.id}>
                      <Listbox.Option
                        as="button"
                        type="button"
                        value={option}
                        className={({ active }) =>
                          clsx(
                            'relative w-full  select-none py-2 pl-3 pr-9 text-left',
                            active ? 'text-white bg-neutral-300' : 'text-gray-900'
                          )
                        }
                      >
                        <span className="block truncate">{option.name}</span>
                      </Listbox.Option>
                    </li>
                  ))}
                </Listbox.Options>
              </Listbox>
            </FilterPrice>
          );
        }}
      />

      <FilterList title="Thương hiệu" options={brands} {...methods.register('options.brand')} className="space-y-4 py-4 xl:py-0" />
      <FilterList title="Loại sản phẩm" options={categories} {...methods.register('options.type')} className="space-y-4 py-4 xl:py-0" />
      {filters?.length &&
        filters.map((filter) => (
          <div key={filter.type} className="">
            <Accordions>
              <Accordions.Button className="flex h-14 w-full items-center justify-between font-bold xl:h-auto">
                {({ open }) => (
                  <>
                    <span>{filter.title}</span>
                    <Svg
                      className={clsx(open ? 'rotate-180' : '', 'transition-default h-8 w-8 xl:h-6 xl:w-6')}
                      src="/icons/line/chevron-up.svg"
                    />
                  </>
                )}
              </Accordions.Button>
              <Accordions.Panel>
                <ul className="pt-2">
                  {filter.options.map(({ name, value }) => (
                    <li key={filter.type + '_' + value}>
                      <label role="button" className="flex h-12 items-center">
                        <input type="checkbox" value={value} className="mr-2" {...methods.register(`options.${filter.type}`)} />
                        <span>{name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordions.Panel>
            </Accordions>
          </div>
        ))}
    </>
  );
};

export function Layout(page: any) {
  const router = useRouter();
  return (
    <>
      <LayoutImall footerClassName="bg-neutral-50" className="md:bg-neutral-0">
        <Head>
          <title>{`Imall - ${router.pathname === Routers.IMALL_MOTHER_TO_BABY ? 'Mẹ và bé' : 'Điện thoại thiết bị'}`}</title>
        </Head>
        {page}
      </LayoutImall>
      <ChatBoxLazy></ChatBoxLazy>
    </>
  );
}
ImallDevicePage.getLayout = Layout;

const getStaticProps = getServerPropsWithTranslation<DevicePageProps>(async () => {
  return {
    props: {
      categories: await getCategories({ parent_id: 1 }),
      brands: await getBrands({}),
      featured_products: await getListProduct({ limit: 12 })
    },
    revalidate: 8600
  };
});
export { getStaticProps };
export default ImallDevicePage;
