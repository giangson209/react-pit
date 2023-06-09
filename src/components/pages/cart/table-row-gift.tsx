import CardGiftSelect from '@/components/card/card-gift-select';
import Svg from '@/components/icon/svg';
import { modal } from '@/context/modal-context';
import { changeGift } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { Listbox } from '@headlessui/react';
import { useState } from 'react';

import styles from '@/styles/cart.module.scss';

const SelectGiftModal = (props: any) => {
  const { gift } = props;
  const [selected, setSelected] = useState(props.id);
  return (
    <>
      <ul className="mt-4 space-y-4">
        {gift.ids.map((id: number) => {
          const item = gift.byId[id];
          return (
            <li key={id} value={id}>
              <CardGiftSelect
                name="product"
                checked={selected === id}
                image={item.image}
                title={item.name}
                price={99_999}
                discountPrice={0}
                onChange={() => setSelected(id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
};

type TableRowGiftProps = {
  itemId: string;
  id: number;
  image?: string;
  name?: string;

  price: number;
  discountPrice?: number;

  gift: {
    ids: number[];
    byId: Record<number, Model.Gift>;
    selected: number[];
  };
};
const TableRowGift = (rootProps: TableRowGiftProps) => {
  const { gift } = rootProps;
  const dispatch = useAppDispatch();

  const onChangeGift = (id: number) => {
    dispatch(changeGift({ itemId: rootProps.itemId, giftId: id }));
  };
  const modalGift = () => {
    modal.confirm({
      content: function Render(props) {
        return <SelectGiftModal id={rootProps.id} gift={gift} />;
      },
      title: 'Chọn quà tặng',
      type: 'middle-sheet',
      confirmLable: 'Xác nhận'
      // closeButton: true
    });
  };

  return (
    <tr className={styles.row_gift}>
      <td className={styles.cell_first} />
      <td className={styles.cell_checkbox} />
      <td className="w-1 max-md:hidden" />
      <td>
        <Listbox value={rootProps.id} onChange={onChangeGift}>
          <div className="relative flex items-center">
            <div className="h-14 w-14">
              <img src={rootProps.image} alt={rootProps.name} className="h-full w-full rounded-lg object-cover" />
            </div>
            <div className="ml-4 flex-1">
              <div className="text-base flex items-center">
                <b>{rootProps.name}</b>
                <button className="ml-2 md:hidden" onClick={modalGift}>
                  <Svg src="/icons/line/chevron-down.svg" width={24} height={24} />
                </button>
              </div>
              <p className="text-sm text-subtle-content">Quà tặng</p>
            </div>
            <button className="ml-2 max-md:hidden xl:hidden" onClick={modalGift}>
              <Svg src="/icons/line/chevron-down.svg" width={24} height={24} />
            </button>
            <Listbox.Button className="ml-2 hidden xl:block">
              <Svg src="/icons/line/chevron-down.svg" width={24} height={24} />
            </Listbox.Button>
            <Listbox.Options
              className="absolute right-0 top-full z-10 mt-2 w-[27.5rem] origin-top-right rounded-2xl px-6 py-4 shadow-itel"
              data-theme="light"
            >
              <div className="text-xl">
                <b>Chọn quà tặng</b>
              </div>
              <div className="mt-4 space-y-4">
                {gift.ids.map((id) => {
                  const item = gift.byId[id];
                  return (
                    <Listbox.Option key={id} value={id}>
                      {({ selected }) => {
                        return <CardGiftSelect image={item.image} title={item.name} price={99_999} discountPrice={0} checked={selected} />;
                      }}
                    </Listbox.Option>
                  );
                })}
              </div>
            </Listbox.Options>
          </div>
        </Listbox>
      </td>
      <td className="max-xl:hidden text-right tabular-nums">
        <p className="font-medium">{toCurrency(rootProps.discountPrice ?? rootProps.price)}</p>
        {typeof rootProps.discountPrice === 'number' && (
          <p className="text-xs text-subtle-content">
            <s>{toCurrency(rootProps.price)}</s>
          </p>
        )}
      </td>
      <td className="max-md:hidden" />
      <td className="text-right">
        <div className="md:hidden">
          <p className="font-medium">{toCurrency(rootProps.discountPrice ?? rootProps.price)}</p>
          {typeof rootProps.discountPrice === 'number' && (
            <p className="text-xs text-subtle-content">
              <s>{toCurrency(rootProps.price)}</s>
            </p>
          )}
        </div>
      </td>
      <td className="max-md:hidden" />
    </tr>
  );
};
export default TableRowGift;
