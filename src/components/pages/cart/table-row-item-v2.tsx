import Stepper from '@/components/stepper/stepper';
import { toCurrency } from '@/utilities/currency';
import React from 'react';

import Svg from '@/components/icon/svg';
import Tooltip from '@/components/tooltip/tooltip';
import useBoolean from '@/hooks/useBoolean';
import useControlled from '@/hooks/useControlled';
import styles from '@/styles/cart.module.scss';
import clsx from 'clsx';
import { useSwipeable } from 'react-swipeable';

type CommonProps = {
  // quanitty
  // Option for quanity
  min?: number;
  max?: number;
  quantity?: number;
  editable?: boolean;
  onChange?(quantity: number): void;

  title?: string;
  desc?: string;
  price?: number;
  discountPrice?: number;
};

type Props = {
  children?: React.ReactNode;
  hasChild?: boolean;
  totalRow?: number;
  img?: string;
  isLast?: boolean;

  subtotalPrice: number;
  subtotalDiscountPrice?: number;

  onRemove?(): void;
} & CommonProps;

const TableRowItemV2 = ({
  price = 0,
  discountPrice,
  title,
  desc,
  children,
  hasChild,
  totalRow = 1,
  onRemove,
  editable,
  img,
  isLast,
  quantity: quantityProp,
  onChange,
  subtotalPrice,
  subtotalDiscountPrice
}: Props) => {
  const deleteable = useBoolean(false);
  const [quantity, setQuantity] = useControlled(quantityProp, 1, onChange);

  const handler = useSwipeable({
    // onSwiping(e) {},
    onSwipedLeft: deleteable.setTrue,
    onSwipedRight: deleteable.setFalse,
    swipeDuration: 300,
    preventScrollOnSwipe: true,
    trackMouse: process.env.NODE_ENV === 'development',
    trackTouch: true
  });

  return (
    <tbody
      className={clsx('transition-default', styles.row_group, isLast && 'rounded-b-lg')}
      {...handler}
      draggable={false}
      style={{ userSelect: 'none', transform: `translateX(${deleteable.value ? -74 : 0}px)` }}
    >
      <tr
        className="md:hidden absolute right-0 inset-y-0 bg-red-500 mb-px transition-default"
        data-theme="dark"
        style={{ transform: `translateX(${deleteable.value ? 74 : 0}px)`, width: 74 }}
        onClick={onRemove}
      >
        <td className="center-by-grid h-full text-sm" style={{ background: 'transparent' }}>
          <div>Xoá</div>
        </td>
      </tr>
      <tr className={clsx(styles.row_parent, { [styles.has_child]: hasChild })}>
        <td className={styles.cell_first} />
        {/* Cell checkbox */}
        <td className={styles.cell_checkbox}>
          <input type="checkbox" className="flex" name="sim" />
        </td>
        {/* Cell for image */}
        <td className={clsx('w-1 max-md:hidden', styles.cell_image)}>
          <div className="w-20">
            <div className="block-img block-square">
              <img
                src={
                  img ||
                  'https://res.cloudinary.com/dt1oay7cv/image/upload/v1684957785/itel/images/4e87ea61423288978707da5222343030_dn3nfl.png'
                }
                alt="this is sim"
                className="rounded-lg bg-neutral-200 object-cover"
              />
            </div>
          </div>
        </td>
        {/* Cell for information */}
        <td>
          <div className="flex items-center">
            <div className="md:hidden w-18 md:w-16 mr-2">
              <div className="block-img block-square">
                <img
                  src={
                    img ||
                    'https://res.cloudinary.com/dt1oay7cv/image/upload/v1684957785/itel/images/4e87ea61423288978707da5222343030_dn3nfl.png'
                  }
                  alt="this is sim"
                  className="rounded-lg bg-neutral-200 object-cover"
                />
              </div>
            </div>
            <div className="flex">
              <div>
                <div className="text-sm md:text-base">
                  <b>{title}</b>
                </div>
                <p className="text-xs md:text-sm text-subtle-content">{desc}</p>
              </div>
            </div>
          </div>
        </td>
        {/* Cell for basic price */}
        <td className="max-xl:hidden" />
        <td className="max-md:hidden">
          {editable && (
            <div className="inline-flex">
              <Stepper className="w-min" min={1} max={20} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
          )}
        </td>
        {/* Cell for basic quantity and unit */}
        <td className="text-sm text-right">
          <div className="md:text-base">
            <b>{toCurrency(subtotalDiscountPrice ?? subtotalPrice)}</b>
          </div>
          {subtotalDiscountPrice && (
            <p className="text-xs md:text-sm text-subtle-content xl:hidden">
              <s>{toCurrency(subtotalPrice)}</s>
            </p>
          )}
        </td>
        <td className="md:hidden w-4" rowSpan={totalRow}></td>
        <td className="w-1 max-md:hidden">
          <div className="px-4 py-5 inset-y-0 right-0">
            <button type="button" className="block" onClick={onRemove}>
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </button>
          </div>
        </td>
      </tr>
      {children}
      <tr>
        <td className={clsx(hasChild ? 'md:h-4' : undefined, 'bg-neutral-0 border-b border-neutral-200')} colSpan={999} />
      </tr>
    </tbody>
  );
};
type TableRowSubItemProps = {
  img?: React.ReactNode;

  // type
  type?: 'pack' | 'sim' | 'product' | 'gift';

  selectable?: boolean;
  onSelect?(): void;
} & CommonProps;
export const TableRowSubItem = ({
  price = 0,
  discountPrice,
  title,
  desc,
  img,
  selectable,
  editable,
  onChange,
  quantity: quantityProp,
  onSelect,
  type = 'product'
}: TableRowSubItemProps) => {
  const [quantity, setQuantity] = useControlled(quantityProp, 1, onChange);

  return (
    <tr className={clsx(styles.row_item, styles.first_child)}>
      <td className={styles.cell_first} />
      {/* Cell for checkbox */}
      <td className={styles.cell_checkbox}></td>
      {/* Cell for image */}
      <td className={clsx('w-1 max-md:hidden', styles.cell_image)} />
      {/* Cell for information */}
      <td>
        <div className="flex items-center">
          <div className="w-10 xl:w-14">
            <div className="block-img block-square">
              {typeof img === 'string' ? (
                <img src={img} alt={img} className="rounded-lg object-cover" />
              ) : type === 'sim' ? (
                <div className="absolute inset-0 rounded-lg bg-dark-blue center-by-grid">
                  <span className="xl:px-2 text-center font-itel text-xs xl:text-sm leading-[0.875rem] text-neutral-0">Giá sim</span>
                </div>
              ) : type == 'pack' ? (
                <div className="absolute inset-0 rounded-lg bg-blue-500 center-by-grid">
                  <span className="xl:px-2 text-center font-itel text-xs xl:text-sm leading-[0.875rem] text-neutral-0">Gói cước</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="ml-2 md:ml-3 xl:ml-4 flex-1">
            <div className="text-sm flex items-center">
              <b>{title}</b>
              <Tooltip content="Cam kết">
                <Svg src="/icons/others/hand-shake.svg" width={20} height={20} className="inline-block" />
              </Tooltip>

              {selectable && (
                <button className="ml-2 md:hidden" onClick={onSelect}>
                  <Svg src="/icons/line/chevron-down.svg" width={24} height={24} />
                </button>
              )}
            </div>
            <p className="text-xs text-subtle-content">{desc}</p>
          </div>
          {selectable && (
            <button className="ml-2 max-md:hidden" onClick={onSelect}>
              <Svg src="/icons/line/chevron-down.svg" width={24} height={24} />
            </button>
          )}
        </div>
      </td>
      {/* Cell for basic price */}
      <td className="text-xs max-xl:hidden text-right tabular-nums">
        <p className="md:text-sm font-medium">{toCurrency(discountPrice ?? price)}</p>
        {typeof discountPrice === 'number' ? (
          <p className="text-subtle-content">
            <s>{toCurrency(price)}</s>
          </p>
        ) : null}
      </td>
      {/* Cell for basic quantity and unit */}
      <td className="max-md:hidden text-center">
        {editable && (
          <div className="inline-flex">
            <Stepper className="w-min" min={1} max={100} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>
        )}
      </td>
      {/* Cell for summary */}
      <td className="text-xs text-right">
        <p className="md:text-sm tabular-num text-subtle-content">{toCurrency((discountPrice ?? price) * quantity)}</p>
        {typeof discountPrice === 'number' ? (
          <p className="text-xs text-subtle-content xl:hidden">
            <s>{toCurrency(price * quantity)}</s>
          </p>
        ) : null}
      </td>
      <td className="max-md:hidden" />
    </tr>
  );
};

export const TableRowBreak = () => {
  return (
    <tr>
      <td colSpan={2} className="md:hidden"></td>
      <td colSpan={3} className="max-md:hidden"></td>
      <td className="xl:hidden !px-0" colSpan={3}>
        <hr className="border-neutral-200" />
      </td>
      <td className="max-xl:hidden !px-0" colSpan={4}>
        <hr className="border-neutral-200" />
      </td>
      <td colSpan={999}></td>
    </tr>
  );
};
export default TableRowItemV2;
