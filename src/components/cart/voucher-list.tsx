import useDebounced from '@/hooks/useDebounce';
import { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatNumber } from '@/utilities/number';
import { stringToASCII } from '@/utilities/string';
import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Svg from '../icon/svg';
import ItemOffer from '../list/item-voucher';

type Props = {
  vouchers: { ids: (number | string)[]; byId: Record<string | number, Model.DiscountCode & { q: string }> };
  totalPrice: number;
};

const VoucherList = ({ vouchers, totalPrice }: Props) => {
  const [q, setQuery] = useState('');
  const setQueryDebounced = useDebounced((s) => setQuery(stringToASCII(s).toLowerCase()), [], 300, true, false);

  const methods = useFormContext<{ vouchers: number[] }>();

  const filteredData = useMemo(() => {
    if (q) {
      let text = q.split(' ');
      return vouchers.ids.filter((id) => text.every((t) => vouchers.byId[id].q.includes(t)));
    }
    return vouchers.ids;
  }, [q, vouchers]);

  return (
    <div className="mt-4">
      <div className="input-leading-icon relative">
        <input
          className="input rounded-full border-none bg-neutral-100 py-4 pl-14 outline-none"
          type="text"
          placeholder="Tìm/ Nhập mã Voucher"
          onChange={(e) => setQueryDebounced(e.target.value)}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
          <Svg src="/icons/bold/vector.svg" className="block h-6 w-6" />
        </div>
      </div>
      <ul className="mt-4 divide-y divide-neutral-200 overflow-auto text-subtle-content">
        {filteredData.map((id) => {
          const discount = vouchers.byId[id];
          const isInvalid = totalPrice < discount.minimum_order_amount;
          const desc = `Đơn Tối Thiểu ₫${formatNumber(discount.minimum_order_amount)} ${
            discount.is_fix
              ? `Giảm đ${formatNumber(discount.discount_amount)}`
              : `Giảm tối đa đ${formatNumber(discount.maximum_discount_amount)}`
          }`;
          return (
            <li key={discount.code}>
              <ItemOffer
                title={discount.name}
                image={discount.image}
                desc={desc}
                sub="Thanh toán ít nhất 100.000đ"
                disabled={isInvalid}
                value={id}
                {...methods.register('vouchers')}
              >
                {isInvalid && (
                  <p className="mt-2 text-sm font-medium text-red-500">
                    Cần thêm {toCurrency(discount.minimum_order_amount - totalPrice)} để dùng mã giảm giá này!
                  </p>
                )}
              </ItemOffer>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default VoucherList;
