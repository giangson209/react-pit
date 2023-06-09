import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useState } from 'react';

import CardProduct from '../card/card-product';
import { ImalContext, quickSearchs } from '../layout/layout-imall';

import Routers from '@/routes/routers';
import useProduct from '@/store/cart/hooks/product';
import { Data } from '@/types/model';
import { sleep } from '@/utilities/time';

type Props = {};

const SharedSectionSearch = (props: Props) => {
  const router = useRouter();
  const { quickSearch } = useContext(ImalContext);
  const { addToCart } = useProduct();
  const [products, setProducts] = useState<Data.Product[]>([]);
  const [peopleSearch, setPeopleSearch] = useState<Data.Product[]>([]);

  const { s } = router.query;

  useEffect(() => {
    async function search() {
      setProducts([]);
      const products = await searchProducts({ q: String(s), limit: 8 });
      setPeopleSearch(products);
    }
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    async function search() {
      setProducts([]);
      await sleep(1000);
      const products = await searchProducts({ q: String(s), limit: 30 });
      setProducts(products);
    }
    s && search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [s]);
  const searchProducts = useCallback(async (params: { q: string; limit: number; skip?: number }) => {
    const value = await fetch('/api/products?' + new URLSearchParams(params as any)).then((v) => v.json());
    return value.data;
  }, []);

  return (
    <div className="container relative z-10 pb-10 pt-2">
      {!s && (
        <div className="mt-4">
          <ul className="flex flex-wrap gap-2">
            {quickSearchs.slice(0, 10).map((search) => {
              return (
                <li key={search.id}>
                  <button
                    className="btn-outline btn h-9 text-sm md:text-base md:h-11 rounded-full border-neutral-300 font-medium"
                    onClick={() => quickSearch(search.text)}
                  >
                    {search.text}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className="mt-10">
        <h4 className="text-s-sm font-bold text-neutral-800">{s ? `Kết quả cho "${s}"` : 'Mọi người cũng tìm kiếm'}</h4>
        <div className="-mx-1.5 md:-mx-2 xl:-mx-3 flex flex-wrap">
          {(s ? products : peopleSearch).map((product) => {
            return (
              <div key={product.id} className="mt-6 w-1/2 px-1.5 md:px-2 xl:px-3 md:w-1/3 xl:w-1/4">
                <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
                  <CardProduct
                    title={product.name}
                    img={product.thumbnail}
                    installment
                    type="secondary"
                    onAddToCart={() => addToCart(product.variant, product)}
                    bodyClassName="pt-2 md:pb-6 md:pb-4 xl:pt-4 space-y-2 md:space-y-3 xl:space-y-4"
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SharedSectionSearch;
