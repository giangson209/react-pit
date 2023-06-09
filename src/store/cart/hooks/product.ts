import { useGlobalContext } from '@/context/global';
import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks';
import { CartItem, addToCart } from '../cartSlice';
import { Data, Model } from '@/types/model';
import { toast } from 'react-hot-toast';

const useProduct = () => {
  const dispatch = useAppDispatch();
  const { withAuth } = useGlobalContext();
  const onAddToCart = useCallback(
    (
      variant: Model.Variant,
      product: Model.Product,
      options?: {
        quantity?: number;
        gift?: {
          id?: number;
          options: Model.Gift[];
        };
      }
    ) => {
      const mergedOptions = Object.assign({ quantity: 1 }, options);
      if (!variant || !product) return toast.error('Không thể thêm sản phẩm này');
      dispatch(addToCart({ variant, product, quantity: mergedOptions.quantity, gift: mergedOptions.gift }));
      toast.success('Thêm giỏ hàng thành công');
    },
    [dispatch]
  );
  const onLikeItem = withAuth((item: { id: number }) => {}, []);
  return { addToCart: onAddToCart, likeItem: onLikeItem };
};

export default useProduct;
