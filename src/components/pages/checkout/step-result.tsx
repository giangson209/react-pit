import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import DropdownShare from '@/components/dropdown/dropdown-share';
import Svg from '@/components/icon/svg';
import ModalSharePost from '@/components/modal/modal-share-post';
import ModalSupport from '@/components/modal/modal-support';
import { modal } from '@/context/modal-context';

import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import LayoutDefault from '@/components/layout/layout-default';
import Routers from '@/routes/routers';
import { useAppSelector } from '@/store/hooks';
import { copyTextToClipboard } from '@/utilities/copy';
import { toCurrency } from '@/utilities/currency';

interface IFormRatingService {
  content: string;
  point: number;
}

const cardOrder: any = {
  id: 'iTel123478sd45',
  status: 'success',
  method: 'momo',
  created_at: '2023-05-23T11:53:40.112Z',
  payment_time: '2023-05-23T11:53:40.112Z'
};

const cardProductRecharge = { image: '/logo/viettel.svg', name: 'Viettel 100.000đ', price: 100_000, desc: 'Nạp tiền điện thoại' };
const cardProductCode = { image: '/logo/viettel.svg', name: 'Viettel 100.000đ', price: 100_000, desc: 'Thẻ nạp điện thoại' };

const orderFailureDataByType: Record<string, { data: PaymentResponse }> = {
  recharge: {
    data: {
      product: cardProductRecharge,
      order: cardOrder,
      data: {
        receiver: '0987654321'
      },
      message:
        'Đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng gọi đến Hotline 0877 087 087 (miễn cước iTel) để được Nhân viên tư vấn hỗ trợ giải đáp.',
      status: 'failed'
    }
  },
  code: {
    data: {
      product: cardProductCode,
      order: cardOrder,
      data: {},
      message:
        'Đã có lỗi xảy ra trong quá trình xử lý giao dịch. Vui lòng gọi đến Hotline 0877 087 087 (miễn cước iTel) để được Nhân viên tư vấn hỗ trợ giải đáp.',
      status: 'failed'
    }
  }
};
const orderSuccessDataByType: Record<string, { data: PaymentResponse }> = {
  recharge: {
    data: {
      product: cardProductRecharge,
      order: cardOrder,
      data: {
        receiver: '0987654321'
      },
      message: 'Để kiểm tra số dư tài khoản chính, Bạn vui lòng bấm gọi *101#. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️.',
      status: 'success'
    }
  },
  code: {
    data: {
      product: cardProductCode,
      order: cardOrder,
      data: {
        code: '3291 8231 0275 135',
        serial: '20000236912641'
      },
      message: 'Thông tin mã thẻ nạp sẽ được gửi vào email/ SĐT của bạn. Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của iTel ♥️.',
      status: 'success'
    }
  }
};

type PaymentResponse = {
  product: { image: string; name: string; price: number; desc: string };
  order: { id: string; status: 'success' | 'failed'; method: string; created_at: string; payment_time: string };
  data: any;
  message: string;
  status: 'success' | 'failed';
};
type StepResultProps = {
  // onDone(data: any): void;
};
const StepResult = (props: StepResultProps) => {
  const router = useRouter();
  const d = useAppSelector((state) => state.cart.checkoutBuyCode);
  const key = d?.type === 'code' ? 'code' : 'recharge';
  const [{ data, message, order, product, status }, setData] = useState<PaymentResponse>(orderSuccessDataByType[key].data);
  const methods = useForm<IFormRatingService>({ defaultValues: { point: 7 } });
  const point = useWatch({ name: 'point', control: methods.control });

  const isSuccess = status === 'success';
  const title = isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!';
  const attibutes = [
    { name: 'Phương thức thanh toán', value: order.method },
    { name: 'Thời gian thanh toán', value: dayjs(order.payment_time).format('HH:mm - DD/MM/YYYY') },
    { name: 'Trạng thái', value: isSuccess ? 'Thành công' : 'Thất bại' }
  ];
  isSuccess ? attibutes.unshift({ name: 'Mã đơn hàng', value: order.id }) : void 0;
  const isCode = key === 'code';
  function handleCopy() {
    copyTextToClipboard(data.code).then(() => toast.success('Đã sao chép mã thẻ'));
  }
  function handleShare() {
    toast.success('Chia sẻ mã thẻ thành công');
  }
  const handleModalShare = useCallback(() => {
    modal.open({
      render() {
        return (
          <ModalSharePost
            itemImage={product.image}
            itemName="Mã thẻ di động Viettel"
            itemDesc={'Số thẻ: ' + data.code}
            onCopy={handleCopy}
            onShare={handleShare}
          />
        );
      },
      classNameOverwrite: true,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-bottom-sheet md:modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  }, [data, product.image]);

  const handleRequestSupport = useCallback(() => {
    modal.open({
      render: <ModalSupport product={product} order={order} />,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  }, [order, product]);
  function updateData() {
    setData(status == 'success' ? orderFailureDataByType[key].data : orderSuccessDataByType[key].data);
  }

  function handleNavigate() {
    router.push({
      pathname: '/recharge',
      query: { tab: isCode ? 'code' : 'recharge' }
    });
  }
  return (
    <>
      <LayoutDefault footerClassName="max-md:hidden bg-neutral-50">
        <nav className="bg-neutral-0 transition-default sticky w-full md:hidden top-0 z-50 border-b border-neutral-200">
          <div className="container">
            <div className="relative flex items-center gap-2 h-16">
              <div className="absolute left-0">
                <Link type="button" className="btn-ghost btn btn-sm btn-circle" href={Routers.RECHARGE}>
                  <Svg src="/icons/line/close.svg" width={24} height={24} />
                </Link>
              </div>
              <div className="flex-1 flex justify-center text-[1.125rem] font-bold truncate p-16 overflow-hidden">
                <h1 className="truncate max-w-xs">Chi tiết giao dịch</h1>
              </div>
            </div>
          </div>
        </nav>
        <section className="md:bg-neutral-0">
          <div className="container max-md:px-0">
            <div className="md:mx-auto md:max-w-[35rem] md:space-y-8 pb-20 md:pt-10">
              {/* Order status */}
              <MobileSection className="text-center py-6 md:py-0">
                <div>
                  <Svg
                    src={isSuccess ? '/icons/others/payment-success.svg' : '/icons/others/payment-failed.svg'}
                    className="inline-block w-12 h-12 md:w-20 md:h-20"
                  />
                </div>
                <div className="mt-3 md:mt-6 space-y-1 md:space-y-2">
                  <h2 className="text-xl md:text-s-sm">
                    <b>{title}</b>
                  </h2>
                  <div className={clsx('text-2xl md:text-s-md', isSuccess ? 'text-green-500' : 'text-red-500')}>
                    <b>{toCurrency(product.price)}</b>
                  </div>
                  <p className="whitespace-pre-wrap text-sm text-subtle-content">{message}</p>
                </div>
              </MobileSection>
              {/* Order return */}
              <MobileSection withoutOffset className="px-0">
                <div className="md:rounded-lg border-t md:border border-neutral-300 p-4">
                  <div className="flex items-center">
                    <div className="mr-2 md:mr-6 w-12 md:w-18">
                      <div className="card-image block-img block-square w-full">
                        <img src={product.image} alt={product.name} className="rounded-lg bg-neutral-100 object-contain" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm md:text-base">
                        <b>{product.name}</b>
                      </p>
                      <p className="mt-1 md:mt-0 text-xs md:text-sm text-subtle-content">{product.desc}</p>
                    </div>
                    {!isCode && (
                      <div className="flex-1 text-right md:text-left">
                        <p className="text-sm md:text-base">
                          <b>{data.receiver}</b>
                        </p>
                        <p className="mt-1 md:mt-0 text-xs md:text-sm text-subtle-content">Số điện thoại nhận</p>
                      </div>
                    )}
                  </div>
                  {isSuccess && isCode && (
                    <div className="mt-4 flex rounded-lg bg-neutral-50 p-3">
                      <div className="flex-1">
                        <p>
                          <b>{data.code}</b>
                        </p>
                        <p className="text-xs md:text-sm capitalize text-subtle-content">Số Seri: {data.serial}</p>
                      </div>
                      <div className="relative flex items-center">
                        <Menu>
                          <Menu.Button type="button" className="transition-default btn-ghost btn btn-circle mr-2 max-xl:hidden">
                            <Svg src="/icons/bold/share.svg" width={24} height={24} />
                          </Menu.Button>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              className="absolute right-0 z-10 mt-2 w-[25rem] origin-top-right rounded-2xl shadow-itel"
                              data-theme="light"
                            >
                              <DropdownShare
                                itemImage={product.image}
                                from="payment-status"
                                itemName="Mã thẻ di động Viettel"
                                itemDesc={'Số thẻ: ' + data.code}
                                onCopy={handleCopy}
                                onShare={handleShare}
                              />
                            </Menu.Items>
                          </Transition>
                        </Menu>
                        <button
                          type="button"
                          onClick={handleModalShare}
                          className="transition-default btn-ghost btn btn-circle btn-sm md:btn-md md:px-0 mr-1 md:mr-2 xl:hidden"
                        >
                          <Svg src="/icons/bold/share.svg" width={24} height={24} />
                        </button>
                        <button
                          type="button"
                          onClick={handleCopy}
                          className="transition-default btn-ghost btn btn-circle btn-sm md:btn-md md:px-0 mr-1 md:mr-0"
                        >
                          <Svg src="/icons/bold/copy.svg" width={24} height={24} />
                        </button>
                        <button className="md:hidden btn btn-primary rounded-full btn-sm">Nạp</button>
                      </div>
                    </div>
                  )}
                </div>
              </MobileSection>
              {/* Order infomation */}
              <MobileSection className="py-4 text-sm md:py-0">
                <table className="w-full">
                  <tbody>
                    {attibutes.map(({ name, value }) => (
                      <tr key={name}>
                        <td className="py-2 text-subtle-content">{name}</td>
                        <td className="py-2 md:text-base text-right font-medium md:font-bold">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </MobileSection>
              <hr className="border-neutral-200" />
              {/* Rating service */}
              {isSuccess ? (
                <MobileSection className="py-4 md:py-0">
                  <div className="flex flex-col space-y-4 text-center mt-2 md:mt-0">
                    <p className="mx-auto text-sm">Đánh giá trải nghiệm dịch vụ để giúp iTel phát triển hơn nhé ♥️</p>
                    <div className="w-full md:w-auto md:mx-auto">
                      <div className="flex justify-between">
                        {[1, 2, 3, 4, 5, 6, 7].map((value, i) => (
                          <label key={value} className="block cursor-pointer whitespace-nowrap p-1 text-center text-xs font-medium md:p-4">
                            <input type="radio" className="sr-only" value={value} {...methods.register('point')} />
                            <Svg
                              className={clsx(Number(point) < value ? 'text-neutral-100' : 'text-yellow-500', 'inline')}
                              src="/icons/bold/star.svg"
                              width={32}
                              height={32}
                            />
                          </label>
                        ))}
                      </div>
                      <div className="mt-2 flex text-center text-xs md:text-sm">
                        {['Rất khó khăn', 'Bình thường', 'Rất dễ dàng'].map((v) => {
                          return (
                            <span key={v} className="flex-1 first:text-left last:text-right">
                              {v}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    <textarea
                      className="input-bordered input h-24 resize-none text-sm"
                      placeholder="Nhập nội dung phản hồi (nếu có)"
                      {...methods.register('content')}
                    />
                  </div>
                </MobileSection>
              ) : (
                <div className="h-20" />
              )}
              {/* CTA */}
              <div className="px-4 md:px-0 fixed bottom-0 md:static left-0 w-full bg-neutral-0 md:bg-transparent py-2 md:py-0">
                <div className="flex gap-4">
                  <Link href={Routers.HOME} className="btn-secondary btn btn-lg w-full rounded-full">
                    Về trang chủ
                  </Link>
                  <button onClick={handleNavigate} type="button" className="btn-primary btn btn-lg w-full rounded-full">
                    {isSuccess ? 'Mua thêm' : 'Thử lại'}
                  </button>
                </div>
                {!isSuccess && (
                  <button type="button" onClick={handleRequestSupport} className="btn-ghost btn btn-lg mt-4 w-full rounded-full">
                    Yêu cầu hỗ trợ
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
        <div className="fixed left-0 top-1/2">
          <button className="btn-tertiary btn rounded-full" onClick={updateData}>
            Demo
          </button>
        </div>
      </LayoutDefault>
      <ChatBoxLazy />
    </>
  );
};

const MobileSection = ({ className, withoutOffset, ...props }: React.HTMLAttributes<HTMLDivElement> & { withoutOffset?: boolean }) => {
  return (
    <div
      className={clsx(withoutOffset ? undefined : 'mt-2 md:mt-0', 'bg-neutral-0 md:bg-transparent container md:px-0', className)}
      {...props}
    />
  );
};

export default StepResult;
