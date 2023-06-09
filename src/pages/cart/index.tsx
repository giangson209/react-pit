import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import Head from 'next/head';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

import { removeFromCart, setQuantity } from '@/store/cart/cartSlice';
import { selectCartItems, selectCartSimItems } from '@/store/cart/selector';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { toCurrency } from '@/utilities/currency';
import { capitalizeFirstLetter } from '@/utilities/string';

import styles from '@/styles/cart.module.scss';

import ButtonIntallment from '@/components/button/button-installment';
import PriceSummary from '@/components/cart/price-summary';
import VoucherSelector from '@/components/cart/voucher-selector';
import HeaderWebDefault from '@/components/header/header-web-default';
import InderterminateCheckbox from '@/components/input/indeterminate-checkbox';
import { LayoutWithChatBox } from '@/components/layout/layout-default';
import TableRowItemV2, { TableRowBreak, TableRowSubItem } from '@/components/pages/cart/table-row-item-v2';
import useBoolean from '@/hooks/useBoolean';
import { Model } from '@/types/model';
import { formatPhoneNumber } from '@/utilities/formatSimNumber';
import clsx from 'clsx';
import { modal } from '../../context/modal-context';
// import TableRowSubItem from '@/components/pages/cart/table-row-sub-item';

type CartPageProps = {};

type SettingState = {
  type: 'normal' | 'out_of_stock' | 'price_changed' | 'expired_discount_code';
  methods: [];
};
const CartPage: NextPage<CartPageProps> = (props) => {
  const [settings, setSettings] = useState<SettingState>({
    type: 'normal',
    methods: []
  });
  const isReached = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      isReached.setValue(e.isIntersecting);
    });

    ref.current ? observer.observe(ref.current) : void 0;
    return () => {
      observer.disconnect();
    };
  }, [isReached]);

  const { t } = useTranslation('common');
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<Record<string, boolean>>({});
  const [selectedVouchers, setSelectedVouchers] = useState<Model.DiscountCode[]>([]);
  const cartItems = useAppSelector(selectCartItems);
  const cartSimItems = useAppSelector(selectCartSimItems);

  const dispatch = useAppDispatch();

  const onChangeQuantity = useCallback(
    (e: any) => dispatch(setQuantity({ id: e.target.name, quantity: Number(e.target.value) })),
    [dispatch]
  );

  const onRemoveFromCart = useCallback(
    (id: string) => {
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

  const onSelect: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    const update = (prev: any) => {
      if (e.target.checked) return { ...prev, [e.target.value]: true };
      else {
        const { [e.target.value]: id, ...rest } = prev;
        return rest;
      }
    };
    if (e.target.name === 'product') setSelectedProduct(update);
    else setSelected(update);
  }, []);
  const onChangeIndertermidate: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const setSelect = e.target.name === 'list_sim' ? setSelected : setSelectedProduct;
      const data = e.target.name === 'list_sim' ? cartItems : cartItems;

      if (!e.target.indeterminate) {
        if (e.target.checked) {
          setSelect(
            data.reduce((obj, v) => {
              obj[v.id] = true;
              return obj;
            }, {} as any)
          );
        } else {
          setSelect({});
        }
      }
    },
    [cartItems]
  );
  const onChangeRootIndertermidate: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (!e.target.indeterminate) {
        if (e.target.checked) {
          setSelected(
            cartItems.reduce((obj, v) => {
              obj[v.merchandise.id] = true;
              return obj;
            }, {} as any)
          );
          setSelectedProduct(
            cartItems.reduce((obj, v) => {
              obj[v.merchandise.id] = true;
              return obj;
            }, {} as any)
          );
        } else {
          setSelected({});
          setSelectedProduct({});
        }
      }
    },
    [cartItems]
  );
  const handleCheckout = () => {
    modal.confirm({
      title: 'Sản phẩm đã hết hàng',
      content:
        'Đã có người nhanh tay hơn mua hết món hàng cuối cùng trong kho với sản phẩm Sim số 0877 123 456.\nBạn vui lòng bỏ hoặc lựa chọn sản phẩm tương tự để tiếp tục thanh toán nhé!',
      rejectLable: 'Tìm sản phẩm mới',
      confirmLable: 'Bỏ sản phẩm',
      onDone() {}
    });
    // modal.confirm({
    //   title: 'Sản phẩm cập nhật giá',
    //   content:
    //     'Trong thời gian từ khi bạn đưa Sim số 0877 123 456 vào giỏ hàng đến nay, mức giá sản phẩm đã có cập nhật thay đổi.\nVui lòng tải lại trang để iTel cập nhật giúp bạn mức giá mới nhất trước khi tiến hành thanh toán nhé!',
    //   confirmLable: 'Tải lại trang',
    //   rejectLable: 'Bỏ sản phẩm',
    //   onDone() {}
    // });
    // modal.confirm({
    //   title: 'Mã giảm giá hết hiệu lực',
    //   content:
    //     'Tiếc quá, một trong các mã giảm giá bạn đang lựa chọn đã hết hiệu lực sử dụng!\nVui lòng xóa hoặc lựa chọn mã giảm giá mới để tiếp tục.',
    //   confirmLable: 'Xóa mã',
    //   rejectLable: 'Chọn mã khác',
    //   onDone() {}
    // });
    // modal.confirm({
    //   title: 'Hình thức thanh toán không khả dụng',
    //   content:
    //     'Tài khoản của bạn đang trong thời gian hạn chế thanh toán bằng phương thức COD do có nhiều giao dịch thất bại gần đây.\nVui lòng chọn hình thức khác hoặc liên hệ tổng đài chăm sóc khách hàng của iTel để được trợ giúp.',
    //   confirmLable: 'Tôi đã hiểu',
    //   onDone() {}
    // });
  };

  let total = 0;
  const totalItem = cartSimItems.length + cartItems.length;

  const additionalNumber = 24_000;

  const isSelectAllSim = Object.keys(selected).length === cartSimItems.length;
  const isSelectAllProduct = Object.keys(selectedProduct).length === cartItems.length;
  const isSelectSomeSim = Object.keys(selected).length && Object.keys(selected).length !== cartSimItems.length;
  const isSelectSomeProduct = Object.keys(selectedProduct).length && Object.keys(selectedProduct).length !== cartItems.length;

  return (
    <>
      <Head>
        <title>{`Itel - ${capitalizeFirstLetter(t('cart'))}`}</title>
      </Head>
      {/* Header mobile */}
      <HeaderWebDefault title={`Giỏ hàng (${4})`} withMenu withSearch />

      {/* Header tablet and pc */}
      <section className="max-md:hidden container bg-neutral-0 md:bg-transparent">
        <div className="pt-10">
          <h1 className="font-itel text-h3 font-bold">{t('cart')}</h1>
        </div>
      </section>

      <section className="container max-md:px-0 pb-20">
        <div className="mt-2 md:mt-6 flex w-full flex-col gap-x-6 gap-y-4 xl:flex-row">
          {/* Left column */}
          <div className="w-full min-w-0 text-sm">
            <table className={styles.table}>
              <thead className="md:rounded-lg font-bold">
                <tr className="z-10 shadow-itel">
                  <th className={styles.cell_first} />
                  <th className={styles.cell_checkbox}>
                    <InderterminateCheckbox
                      type="checkbox"
                      name="all"
                      checked={isSelectAllProduct && isSelectAllSim}
                      inderterminate={
                        isSelectAllSim && isSelectAllProduct
                          ? false
                          : isSelectSomeSim || isSelectSomeProduct || isSelectAllProduct || isSelectAllSim
                      }
                      onChange={onChangeRootIndertermidate}
                    />
                  </th>
                  <th className="text-left" colSpan={2}>
                    Tất cả {totalItem} sản phẩm
                  </th>
                  <th className="max-xl:hidden">Đơn giá</th>
                  <th>
                    <span className="max-xl:hidden">Số lượng</span>
                  </th>
                  <th className="text-right">
                    <span className="max-xl:hidden">Thành tiền</span>
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className={clsx(styles.heading, 'md:rounded-lg')}>
                <tr>
                  <th className={styles.cell_first} />
                  <th className={styles.cell_checkbox}>
                    <InderterminateCheckbox
                      type="checkbox"
                      name="list_sim"
                      checked={isSelectAllSim}
                      inderterminate={isSelectSomeSim}
                      onChange={onChangeIndertermidate}
                    />
                  </th>
                  <th colSpan={999}>
                    <div className="flex justify-between pr-4 items-center">
                      <p className="font-medium">Tất cả {cartSimItems.length} sim số</p>
                      <div className="text-xs font-normal text-subtle-content">
                        <p className="max-md:hidden">Đơn hàng eSim sẽ được gửi về địa chỉ email của bạn</p>
                        <p className="md:hidden">Xong</p>
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
              {cartSimItems.map((item, i) => {
                const isSingle = item.type === 'single';
                const desc = 'Mua Sim đôi được quà Hot';
                const title = isSingle ? `Sim và Gói cước` : 'Sim đôi ưu đãi';
                const hasGift = item.gift && item.gift.selected.length !== 0;

                let price = 0;
                let discountPrice = 0;

                const Sim = item.merchandise.map((item, index) => {
                  discountPrice += item.discount_price || 0;
                  price += item.price;
                  price += item.pack.price;
                  return (
                    <Fragment key={index}>
                      <TableRowBreak />
                      <TableRowSubItem
                        price={item.price}
                        type="sim"
                        discountPrice={item.discount_price}
                        title={formatPhoneNumber(item.phone)}
                        desc="Sim"
                        editable
                      />
                      <TableRowSubItem
                        price={item.pack.price}
                        type="pack"
                        title={'Gói ' + item.pack.name}
                        desc="Cam kết trong 36 tháng"
                        selectable
                      />
                    </Fragment>
                  );
                });
                const Gift = hasGift && (
                  <>
                    <TableRowBreak />
                    {item.gift!.selected.map((id, index) => {
                      const gift = item.gift!.byId[id];
                      return (
                        <TableRowSubItem
                          key={index}
                          title={gift.name}
                          img={gift.image}
                          price={gift.price}
                          discountPrice={0}
                          desc="Quà tặng"
                        />
                      );
                    })}
                  </>
                );

                total += price;

                return (
                  <TableRowItemV2
                    key={i}
                    price={price}
                    discountPrice={discountPrice}
                    subtotalPrice={price}
                    subtotalDiscountPrice={discountPrice}
                    title={title}
                    desc={desc}
                    hasChild
                    totalRow={9}
                    onRemove={() => onRemoveFromCart(item.id)}
                    isLast={cartSimItems.length - 1 == i}
                  >
                    {Sim}
                    {Gift}
                  </TableRowItemV2>
                );
              })}

              <tbody className={clsx(styles.heading, 'md:rounded-lg')}>
                <tr>
                  <th className={styles.cell_first} />
                  <th className={styles.cell_checkbox}>
                    <InderterminateCheckbox
                      type="checkbox"
                      name="list_sim"
                      checked={isSelectAllSim}
                      inderterminate={isSelectSomeSim}
                      onChange={onChangeIndertermidate}
                    />
                  </th>
                  <th colSpan={999}>
                    <div className="flex justify-between pr-4 items-center">
                      <p className="font-medium">Tất cả {cartSimItems.length} sim số</p>
                      <div className="text-xs font-normal text-subtle-content">
                        <p className="max-md:hidden">Đơn hàng eSim sẽ được gửi về địa chỉ email của bạn</p>
                        <p className="md:hidden">Xong</p>
                      </div>
                    </div>
                  </th>
                </tr>
              </tbody>
              {cartItems.map((item, id) => {
                const hasChild = item.gift && item.gift.selected.length !== 0;
                const totalRow = (item.gift ? item.gift.selected.length * 2 : 0) + 1;

                let subtotal = item.merchandise.price * item.quantity;
                let subtotalDiscount = (item.merchandise.discountPrice ?? item.merchandise.price) * item.quantity;

                total += subtotalDiscount;

                return (
                  <TableRowItemV2
                    key={item.id}
                    title={item.merchandise.product.name}
                    desc={item.merchandise.title}
                    img={item.merchandise.product.thumbnail}
                    price={item.merchandise.price}
                    discountPrice={item.merchandise.discountPrice ?? item.merchandise.price}
                    subtotalPrice={subtotal}
                    subtotalDiscountPrice={subtotalDiscount}
                    editable
                    hasChild={hasChild}
                    totalRow={totalRow}
                    isLast={cartItems.length - 1 == id}
                    onChange={(v) => dispatch(setQuantity({ id: item.id, quantity: Number(v) }))}
                    onRemove={() => onRemoveFromCart(item.id)}
                  >
                    {hasChild && (
                      <>
                        <TableRowBreak />
                        {item.gift!.selected.map((id, index) => {
                          const gift = item.gift!.byId[id];
                          return (
                            <TableRowSubItem
                              key={index}
                              title={gift.name}
                              img={gift.image}
                              price={gift.price}
                              discountPrice={0}
                              desc="Quà tặng"
                              selectable
                            />
                          );
                        })}
                      </>
                    )}
                  </TableRowItemV2>
                );
              })}
            </table>
          </div>
          {/* Right column */}
          <div className="w-full flex-shrink-0 space-y-4 xl:w-[18.75rem]">
            <div>
              <VoucherSelector totalPrice={total} onSelectedVouchers={setSelectedVouchers} selected={selectedVouchers.length} />
            </div>
            <div className="px-4 mt-4 bg-neutral-0 md:rounded-lg">
              <PriceSummary totalPrice={total} discounts={selectedVouchers} awarded={additionalNumber} />
            </div>
            <div ref={ref}>
              <div className="flex justify-end xl:block gap-3 xl:gap-0 xl:space-y-3">
                <button
                  onClick={handleCheckout}
                  className="order-3 xl:order-none btn-primary btn btn-lg w-[13.5rem] xl:w-full rounded-full"
                >
                  Thanh toán (2)
                </button>
                <ButtonIntallment
                  title="Trả góp qua thẻ"
                  desc="Visa, Mastercard, JCB, Amex"
                  className="w-[13.5rem] xl:w-full bg-transparent"
                />
                <ButtonIntallment title="Trả góp 0%" desc="Duyệt hồ sơ trong 5 phút" className="w-[13.5rem] xl:w-full bg-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={clsx(isReached.value ? 'hidden' : '', 'z-10 max-md:hidden fixed bg-neutral-0 bottom-0 xl:hidden inset-x-0')}>
        <div className="container flex justify-between pt-3 pb-4">
          <div>
            <p>Tổng tiền</p>
            <p className="text-s-sm">
              <b>{toCurrency(total)}</b>
            </p>
          </div>
          <div className="flex gap-x-3">
            <ButtonIntallment title="Trả góp qua thẻ" desc="Visa, Mastercard, JCB, Amex" className="bg-transparent px-3" />
            <ButtonIntallment title="Trả góp qua hồ sơ" desc="Thủ tục đơn giản & nhanh chóng" className="bg-transparent px-3" />
            <button onClick={handleCheckout} className="order-3 xl:order-none btn-primary btn btn-lg rounded-full">
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

CartPage.getLayout = LayoutWithChatBox;
const getStaticProps = getServerPropsWithTranslation();

export default CartPage;
export { getStaticProps };
