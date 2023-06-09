import Routers from '@/routes/routers';
import { CustomProps } from '@/types/element-type';
import { Data, Model } from '@/types/model';
import Link from 'next/link';
import CardProduct from '../card/card-product';
import RatingProduct from '../rating/rating-product';
import clsx from 'clsx';
import { useGlobalContext } from '@/context/global';
import { useRef } from 'react';
import useProduct from '@/store/cart/hooks/product';

type Props = {
  products: Data.Product[];
  installmentTag?: boolean;

  maxItem?: {
    pc?: number;
    tablet?: number;
    default?: number;
  };
};
export const mapingProduct = (d: Model.Product) => ({
  id: d.id,
  img: d.thumbnail,
  tags: d.tags,

  discountPrice: 999_999,
  price: 1_999_999,
  name: d.name,
  rate: 4.5,
  sold: 999,
  discountPercentage: 99,
  installment: true,
  tagPrice: true
});

const ListProduct = ({ products: data, maxItem = { pc: 8, tablet: 6, default: 4 }, installmentTag, ...rest }: CustomProps<Props>) => {
  const { addToCart, likeItem } = useProduct();

  return (
    <div {...rest}>
      <div className="-mx-1.5 md:-mx-3 mt-3 flex flex-wrap gap-y-6 md:mt-6 xl:mt-8 xl:gap-y-8">
        {data.map((product, index) => (
          <div
            key={product.id}
            className={clsx(
              'w-1/2 px-1.5 md:px-3 md:w-1/3 xl:w-1/4',
              maxItem.default && index >= maxItem.default ? 'hidden' : 'block',
              maxItem.tablet && index >= maxItem.tablet ? 'md:hidden' : 'md:block',
              maxItem.pc && index >= maxItem.pc ? 'xl:hidden' : 'xl:block'
            )}
          >
            <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: product.id } }}>
              <CardProduct
                img={product.thumbnail}
                title={product.name}
                installment={installmentTag && product.installment}
                type="secondary"
                onLike={() => likeItem(product)}
                onAddToCart={() => addToCart(product.variant, product)}
                className="rounded-lg md:rounded-2xl"
                bodyClassName="pt-2 md:pb-6 md:pb-4 xl:pt-4 space-y-2 md:space-y-3 xl:space-y-4"
              >
                <CardProduct.Body
                  discountPercentage={Math.ceil((product.priceRange.discount_min / product.priceRange.max) * 100)}
                  discountPrice={product.priceRange.discount_min}
                  price={product.priceRange.max}
                  name={product.name}
                  tags={product.tags}
                  rate={4.5}
                  sold={888}
                />
              </CardProduct>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListProduct;
