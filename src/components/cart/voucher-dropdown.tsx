import useVouchers from '@/hooks/useVouchers';
import { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import VoucherList from './voucher-list';

type DropdownVoucherProps = {
  total: number;
  done(data: Model.DiscountCode[]): void;
};

const DropdownVoucher = ({ total, done }: DropdownVoucherProps) => {
  const vouchers = useVouchers({});

  const methods = useForm<{ vouchers: number[] }>();
  const selected = useWatch({ control: methods.control, name: 'vouchers' });

  const totalDiscount = selected
    ? selected.reduce((subtotal, id) => {
        const discount = vouchers.byId[id];
        if (!discount) return subtotal;
        const value = discount.is_fix
          ? discount.discount_amount
          : Math.min(discount.discount_amount * total, discount.maximum_discount_amount);
        return subtotal + value;
      }, 0)
    : 0;

  const handleSubmit = (values: { vouchers: number[] }) => {
    done((values.vouchers || []).map((id) => vouchers.byId[id]));
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <div className="max-h-[37.5rem] overflow-auto">
          <div className="p-6">
            <p className="font-bold">Voucher iTel</p>
            <VoucherList totalPrice={total} vouchers={vouchers} />
          </div>
          <div className="sticky bottom-0">
            <div className="flex gap-2 border-t border-neutral-200 bg-neutral-0 p-6 pt-4">
              <div className="flex-1">
                <p className="text-subtle-content">Đã chọn {selected?.length ?? 0} ưu đãi</p>
                <p className="text-orange">
                  <b>Giảm {toCurrency(totalDiscount)}</b>
                </p>
              </div>
              <button type="submit" className="btn-primary btn flex-1 rounded-full">
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default DropdownVoucher;
