import { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import React from 'react';
import Svg from '../icon/svg';
import useIsClient from '@/hooks/useIsClient';
import Tooltip from '../tooltip/tooltip';

type Props = {
  totalPrice: number;
  discounts: Pick<Model.DiscountCode, 'code' | 'is_fix' | 'discount_amount' | 'maximum_discount_amount' | 'name'>[];
  fees?: Array<{ name: string; value: number; options?: Array<any> }>;

  awarded?: number;
};

const PriceSummary = ({ totalPrice, discounts, fees, awarded }: Props) => {
  let total = totalPrice;
  return (
    <dl className="rounded-lg bg-base-100 px-4 py-5 text-sm">
      <div className="flex">
        <dt>
          Tạm tính
          <Tooltip withArrow content="Đây là thông tin cần lưu ý" className="ml-2 inline-block align-middle">
            <Svg src="/icons/line/information.svg" width={20} height={20} />
          </Tooltip>
        </dt>
        <dd className="flex-1 text-right font-medium">{toCurrency(total)}</dd>
      </div>
      {fees?.map((fee) => {
        total += fee.value;
        return (
          <div key={fee.name} className="mt-3 flex">
            <dt>{fee.name}</dt>
            <dd className="flex-1 text-right font-medium">-{toCurrency(fee.value)}</dd>
          </div>
        );
      })}
      {discounts.map((discount) => {
        const value = discount.is_fix
          ? discount.discount_amount
          : Math.min(discount.discount_amount * total, discount.maximum_discount_amount);
        total -= value;
        return (
          <div key={discount.code} className="mt-3 flex">
            <dt>{discount.name}</dt>
            <dd className="flex-1 text-right font-medium">{toCurrency(value ? -value : value)}</dd>
          </div>
        );
      })}
      {awarded && (
        <div className="mt-4 rounded-sm bg-green-100 px-3 py-2 text-xs text-green-600">
          Bạn được tặng <b>{awarded}</b> điểm khi thanh toán thành công
        </div>
      )}
      <hr className="my-4 border-neutral-200" />
      <div className="mt-4 flex justify-between">
        <dt>
          <b>Tổng tiền</b>
        </dt>
        <dd>
          <b>{toCurrency(total - (awarded ?? 0))}</b>
        </dd>
      </div>
    </dl>
  );
};

export default PriceSummary;
