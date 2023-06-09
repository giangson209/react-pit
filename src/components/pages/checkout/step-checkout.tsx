import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import PriceSummary from '@/components/cart/price-summary';
import VoucherSelector from '@/components/cart/voucher-selector';
import Svg from '@/components/icon/svg';

import { PayloadRecharge } from '@/store/cart/cartSlice';
import { formattedPrice } from '@/utilities';
import { toCurrency } from '@/utilities/currency';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';

import styles from './checkout.module.scss';

import { Model } from '@/types/model';
import LayoutDefault from '@/components/layout/layout-default';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import { CARD_NETWORK } from '@/constants/recharge.constants';
import HeaderWebDefault from '@/components/header/header-web-default';

type StepCheckoutProps = {
  onDone(data: any): void;
  data: PayloadRecharge;
};
const StepCheckout = ({ data, onDone }: StepCheckoutProps) => {
  const { t } = useTranslation('common');
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const [paymentOptions] = useState([
    {
      name: 'VNPay',
      salePrice: 200000,
      logoPath: '/icons/payment/vnpay.svg'
    },
    {
      name: 'ZaloPay',
      salePrice: 200000,
      logoPath: '/icons/payment/zalo.svg'
    },
    {
      name: 'Ví Momo',
      salePrice: 200000,
      logoPath: '/icons/payment/momo.svg'
    },
    {
      name: 'Chuyển khoản ngân hàng',
      salePrice: 200000,
      logoPath: '/icons/payment/transfer.svg'
    }
  ]);

  const methods = useForm<{ phone: number; method: string }>({
    defaultValues: { method: paymentOptions[0].name }
  });

  const handleCheckout = () => {
    onDone({});
  };
  if (!data) return null;

  const currentNetwork = CARD_NETWORK.find((nw) => nw.name === data?.network)!;

  let total = 0 + data.price;
  const title = t('checkout');

  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0">
        <HeaderWebDefault title="Thanh toán" withMenu withSearch />
        <form onSubmit={methods.handleSubmit(handleCheckout)}>
          <div className="container md:pt-10 max-md:px-0">
            <h1 className="hidden md:block font-itel text-h3 font-bold">{title}</h1>
            <div className="md:mt-6 flex w-full flex-col gap-x-6 gap-y-4 xl:flex-row">
              {/* Left column */}
              <div className="w-full min-w-0">
                {/* Recharge section */}
                <section className="container mt-2 md:rounded-lg bg-neutral-0 md:px-8 md:mt-0">
                  <SectionHeader title="Thông tin đơn hàng" />
                  <hr className="max-md:hidden border-neutral-200" />
                  <div className={styles.row_recharge}>
                    <div className={styles.order_left + ' flex items-center'}>
                      <img src={currentNetwork.path!} className="mr-4 h-18 w-18 rounded-lg bg-neutral-100" alt={data.network} />
                      <div>
                        <p className="text-base font-bold capitalize">
                          <b>
                            {data.network} {toCurrency(data.price)}
                          </b>
                        </p>
                        <p className="text-xs md:text-sm font-normal text-neutral-500 mt-2.5 md:mt-0">
                          {data.type === 'code' ? 'Thẻ nạp điện thoại' : 'Nạp tiền điện thoại'}
                        </p>
                      </div>
                    </div>
                    <div className={styles.order_center}>
                      {data.type === 'recharge' ? (
                        <div className="flex flex-row-reverse justify-between md:flex-col md:justify-center h-full">
                          <p>
                            <b>{formatPhoneNumber(data.receiver)}</b>
                          </p>
                          <p className="text-sm font-normal text-neutral-500">Số điện thoại nhận</p>
                        </div>
                      ) : (
                        <div className="flex items-center h-full">
                          Số lượng: <b> {data.quantity}</b>
                        </div>
                      )}
                    </div>
                    <div className={styles.order_right}>
                      <div className="flex flex-col justify-center h-full text-right">
                        <p className="text-base font-medium md:font-bold">{toCurrency(data.price)}</p>
                        <p className="text-xs md:text-sm font-normal text-neutral-500 mt-2.5 md:mt-0">
                          <s>120.000đ</s>
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Receiver information */}
                {data.type === 'code' && (
                  <section className="container mt-2 md:rounded-lg bg-neutral-0 md:px-8 md:mt-4">
                    <SectionHeader title="Thông tin nhận mã thẻ" desc="Bạn sẽ nhận được mã thẻ qua số điện thoại hoặc email của bạn." />
                    <div className="pb-4 md:py-6 md:border-t border-neutral-200">
                      <div className="form-control">
                        <label>
                          <div className="label pt-0">
                            <span className="label-text" aria-required>
                              Số điện thoại/ email
                            </span>
                          </div>
                          <input
                            type="tel"
                            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                            className="input input-bordered w-full md:w-1/2"
                            placeholder="Nhập số điện thoại/ email"
                            {...methods.register('phone', {
                              shouldUnregister: true,
                              pattern: {
                                value: /^(?:\+?84|0)(?:\d){9,10}|([A-Za-z0-9._%\+\-]+@[a-z0-9.\-]+\.[a-z]{2,3})$/,
                                message: 'Số điện thoại không đúng định dạng'
                              },
                              required: 'Số điện thoại không đúng định dạng'
                            })}
                          />
                        </label>
                        {methods.formState.errors.phone && (
                          <p className="flex items-center text-sm text-primary mt-2">
                            <Svg className="mr-1 h-4 w-4" src="/icons/line/danger-circle.svg" />
                            {methods.formState.errors.phone.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </section>
                )}

                <section className="container mt-2 md:rounded-lg bg-neutral-0 md:px-6 xl:px-8 md:mt-4">
                  <div className="py-4 md:py-5">
                    <h3 className="md:text-xl">
                      <b>Phương thức thanh toán</b>
                    </h3>
                    <img
                      src="https://res.cloudinary.com/dt1oay7cv/image/upload/v1684872101/itel/images/Promotion_fhj5sr.png"
                      alt="banner-payment-momo"
                      className="mt-2"
                    />
                  </div>
                  <div className="pb-4 md:pb-8">
                    <div className="grid md:grid-cols-2 md:gap-4 divide-y divide-neutral-200 md:divide-none">
                      {paymentOptions.map((option) => {
                        return (
                          <div className="" key={option.name}>
                            <label className="flex items-center relative px-4 xl:px-6 py-3.5">
                              <input type="radio" className="peer mr-4" value={option.name} {...methods.register('method')} />
                              <span className="max-md:hidden absolute inset-0 peer-checked:border-red-600 border border-neutral-300 rounded-xl" />
                              <div className="flex-1 mr-3">
                                <p className="text-base font-medium">{option.name}</p>
                                <p className="text-sm text-neutral-500">
                                  Giảm đến <b className="text-primary">{formattedPrice(option.salePrice)}</b>
                                </p>
                              </div>
                              <div>
                                <img src={option.logoPath} className="w-10 h-10" alt={option.name} />
                              </div>
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </section>
              </div>
              {/* Right column */}
              <div className="w-full flex-shrink-0 xl:w-[25.5rem]">
                <div>
                  <VoucherSelector totalPrice={total} onSelectedVouchers={setSelectedVouchers} selected={selectedVouchers.length} />
                </div>
                <div className="px-4 mt-4 bg-neutral-0 md:rounded-lg">
                  <PriceSummary totalPrice={total} discounts={selectedVouchers} />
                </div>
                <div className="mt-6 md:mt-4 px-4 md:px-0">
                  <div className="space-y-3">
                    <button type="submit" className="btn-primary btn btn-lg w-full rounded-full">
                      Thanh toán
                    </button>
                    {/* <ButtonIntallment title="Trả góp qua thẻ" desc="Visa, Mastercard, JCB, Amex" className="w-full bg-transparent" />
            <ButtonIntallment title="Trả góp 0%" desc="Duyệt hồ sơ trong 5 phút" className="w-full bg-transparent"/> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container pt-6 pb-2 md:pt-8 md:pb-16 xl:pt-12 xl:pb-20">
            <div className="text-xs font-medium text-neutral-500">
              <p>Bằng việc tiến hành Đặt Mua, khách hàng đồng ý với các Điều Kiện Giao Dịch Chung được ban hành bởi iTel:</p>
              <div className="mt-1 flex-wrap flex divide-x">
                <p className="mr-2 ">Quy chế hoạt động</p>
                <p className="mr-2 pl-2">Chính sách bảo hành</p>
                <p className="mr-2 pl-2">Chính sách bảo mật thanh toán</p>
                <p className="mr-2 pl-2">Chính sách bảo mật thông tin cá nhân</p>
              </div>
              <p className="mt-1">© 2021 - Bản quyền của Cổ phần Viễn thông Di động iTel - itel.vn</p>
            </div>
          </div>
        </form>
      </LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};

const SectionHeader = (props: { title: string; desc?: string }) => {
  return (
    <div className="py-4 md:py-5">
      <h3 className="md:text-xl">
        <b>{props.title}</b>
      </h3>
      {props.desc && <p className="max-md:hidden mt-1 text-sm text-neutral-500">{props.desc}</p>}
    </div>
  );
};
export default StepCheckout;
