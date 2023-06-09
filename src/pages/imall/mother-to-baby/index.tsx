import { NextPage } from 'next';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';

import Routers from '@/routes/routers';

import CardProduct from '@/components/card/card-product';
import Svg from '@/components/icon/svg';
import ModalImallFilter from '@/components/modal/modal-imall-filter';
import PaginationSimple from '@/components/pagination/pagination-simple';
import SectionImallBanner from '@/components/section/section-imall-banner';
import SectionProduct from '@/components/section/section-products';
import { modal } from '@/context/modal-context';
import useBoolean from '@/hooks/useBoolean';
import { getBrands } from '@/services/brand/getBrands';
import { getCategories } from '@/services/category/category';
import { getListProduct } from '@/services/product/product';
import useProduct from '@/store/cart/hooks/product';
import { Data, Model } from '@/types/model';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { FilterComponents, IFormSearch, Layout } from '../device';

export type DevicePageProps = {
  categories: Model.Category[];
  brands: Model.Brand[];
  featured_products: Data.Product[];
};

const MotherToBabySearchPage: NextPage<DevicePageProps> = ({ categories, brands, featured_products }) => {
  const loadingData = useBoolean(false);
  const [suggested, setSuggested] = useState<Data.Product[]>([]);
  const methods = useForm<IFormSearch>();
  const { likeItem } = useProduct();
  const [mergedCategories] = useState([{ id: 'all', name: 'Tất cả' }, ...categories]);

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
    modal.open({
      render: <ModalImallFilter defaultValues={methods.getValues()} brands={brands} />,
      onDone(data: IFormSearch) {
        methods.reset(data);
      },
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel md:bg-neutral-0',
      classNameContainer: 'modal-full md:modal-bottom-sheet',
      classNameOverlay: 'bg-neutral-100 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const onSumbit: SubmitHandler<IFormSearch> = (values) => {
    // console.log(values);
  };

  return (
    <FormProvider {...methods}>
      <div className="container flex w-full gap-x-6 pt-4">
        <div className="hidden w-[18.75rem] flex-shrink-0 xl:block">
          <div className="">
            <div className="menu h-[40.5rem] overflow-auto rounded-lg border border-neutral-300 px-6 pb-6">
              <ul className="font-bold">
                <li className="menu-title pb-4 pt-6">
                  <span className="py-0">Danh mục</span>
                </li>
                {categories.map(({ id, name }) => {
                  return (
                    <li key={`category.${id}`}>
                      <span>{name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="mt-4 space-y-8 rounded-lg border border-neutral-300 p-6">
              <FilterComponents brands={brands} categories={categories} />
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="space-y-10">
            <section className="bg-neutral-0 md:bg-transparent pb-4 px-4 md:p-0">
              <SectionImallBanner />
              <div className="mt-6 w-full overflow-hidden xl:hidden">
                <ul className="tabs flex-nowrap gap-x-8 overflow-x-auto scrollbar-hide">
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
                <div className="mt-4 flex items-center flex-row-reverse md:flex-row gap-2">
                  <div className="flex gap-2 overflow-auto scrollbar-hide flex-1">
                    {brands.map(({ id, name }, i) => (
                      <div key={id}>
                        <span className="btn-tertiary btn btn-sm border-none font-medium peer-checked:bg-red-600 peer-checked:text-neutral-0">
                          {name}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="btn-tertiary btn btn-sm btn-square md:w-auto md:btn-lg md:rounded-full"
                    onClick={handleModalFilter}
                  >
                    <Svg src="/icons/bold/filter.svg" width={24} height={24} />
                  </button>
                </div>
              </div>
            </section>

            <SectionProduct title="sản phẩm nổi bật">
              <div className="-mx-1 mt-2 flex flex-wrap xl:-mx-3">
                {featured_products.map((product) => (
                  <div key={product.id} className="mt-8 w-1/2 px-2 md:w-1/3 xl:px-3">
                    <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                      <CardProduct
                        img={product.thumbnail}
                        installment={product.id == 1}
                        title={product.name}
                        type="secondary"
                        onLike={() => likeItem({ id: product.id })}
                      >
                        <CardProduct.Body
                          tags={product.tags}
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
            <SectionProduct title="sản phẩm cho bạn">
              <div className="-mx-1 mt-2 flex flex-wrap xl:-mx-3">
                {suggested.map((product) => (
                  <div key={product.id} className="mt-8 w-1/2 px-2 md:w-1/3 xl:w-1/4 xl:px-3">
                    <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                      <CardProduct
                        img={product.thumbnail}
                        title={product.name}
                        installment={product.installment}
                        type="secondary"
                        onLike={() => likeItem({ id: product.id })}
                      >
                        <CardProduct.Body
                          tags={product.tags}
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
              <div className="max-md:hidden mt-6">
                <PaginationSimple totalPage={100} adjacent={4} />
              </div>
              <div className="md:hidden mt-6">
                <PaginationSimple totalPage={100} adjacent={[3, 1]} />
              </div>
            </SectionProduct>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

MotherToBabySearchPage.getLayout = Layout;

const getStaticProps = getServerPropsWithTranslation<DevicePageProps>(async () => {
  return {
    props: {
      categories: (await getCategories({})).filter((v) => v.parent_id === 8),
      brands: await getBrands({}),
      featured_products: await getListProduct({ limit: 12 })
    },
    revalidate: 8600
  };
});
export { getStaticProps };
export default MotherToBabySearchPage;
