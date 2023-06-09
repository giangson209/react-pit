import React, { Fragment, useCallback } from 'react';
import TableRowGift from './table-row-gift';
import Stepper from '@/components/stepper/stepper';
import { toCurrency } from '@/utilities/currency';
import { CartItem, removeFromCart, setQuantity } from '@/store/cart/cartSlice';

import styles from '@/styles/cart.module.scss';
import Routers from '@/routes/routers';
import Link from 'next/link';
import Svg from '@/components/icon/svg';
import { useAppDispatch } from '@/store/hooks';
import { toast } from 'react-hot-toast';
import { modal } from '@/context/modal-context';

type Props = {
  item: CartItem;
  subtotal: number;
};

const TableRowItem = ({ item, subtotal }: Props) => {
  const dispatch = useAppDispatch();

  const onChangeQuantity = useCallback(
    (e: any) => dispatch(setQuantity({ id: e.target.name, quantity: Number(e.target.value) })),
    [dispatch]
  );

  const onRemoveFromCart: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      const id = e.currentTarget.dataset.id;
      if (!id) return toast.error('Có gì đó không đúng');

      modal.confirm({
        title: 'Bạn muốn xóa sản phẩm?',
        content: 'Bằng việc lựa chọn "Xoá", sản phẩm sẽ không còn tồn tại trong giỏ hàng và bạn không thể quay trở lại thao tác này.',
        confirmLable: 'Xoá sản phẩm',
        rejectLable: 'Giữ sản phẩm',
        onDone() {
          dispatch(removeFromCart(id));
        }
      });
    },
    [dispatch]
  );

  return (
    <Fragment>
      <tr className={item.gift ? styles.sub : undefined}>
        <td className="w-0">
          <input
            type="checkbox"
            className="flex"
            name="product"
            // checked={selectedProduct[item.merchandise.id] || false}
            // value={item.merchandise.id}
            // onChange={onSelect}
          />
        </td>
        <td className="w-0">
          <div className="w-20">
            <div className="block-img block-square">
              <img src={item.merchandise.product.thumbnail} alt={item.merchandise.product.name} className="rounded-lg object-cover" />
            </div>
          </div>
        </td>
        <td>
          <div className="flex">
            <div>
              <Link href={{ pathname: Routers.IMALL_DETAIL, query: { id: item.merchandise.product.id } }} className="text-base">
                <b>{item.merchandise.product.name}</b>
              </Link>
              <p className="text-sm text-subtle-content">{item.merchandise.title}</p>
            </div>
            <span className="ml-2 ">
              <div className="block tooltip tooltip-light">
                <Svg src="/icons/others/hand-shake.svg" width={20} height={20} />
                <span className="tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">Cam kết</span>
              </div>
            </span>
          </div>
        </td>
        <td className="text-right tabular-nums">
          <p className="font-medium">{toCurrency(item.merchandise.discountPrice || item.merchandise.price)}</p>
          {item.merchandise.discountPrice && (
            <p className="text-xs text-subtle-content">
              <s>{toCurrency(item.merchandise.price)}</s>
            </p>
          )}
        </td>
        <td className="text-center">
          <div className="inline-flex">
            <Stepper
              className="w-min"
              min={1}
              max={20}
              name={item.id}
              value={item.quantity}
              onChange={onChangeQuantity}
              defaultValue={item.quantity}
            />
          </div>
        </td>
        <td className="text-right text-base">
          <b className="tabular-nums">{toCurrency(subtotal)}</b>
        </td>
        <td>
          <button type="button" className="block" data-id={item.id} onClick={onRemoveFromCart}>
            <Svg src="/icons/line/close.svg" width={24} height={24} />
          </button>
        </td>
      </tr>
      {item.gift?.selected.map((id, index) => {
        const gift = item.gift!.byId[id];
        return (
          <TableRowGift
            itemId={item.id}
            id={id}
            key={index}
            price={gift.price}
            discountPrice={0}
            image={gift.image}
            name={gift.name}
            gift={item.gift!}
          />
        );
      })}
    </Fragment>
  );
};

export default TableRowItem;
