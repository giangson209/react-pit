/* eslint-disable react-hooks/exhaustive-deps */
import { Listbox, Menu } from '@headlessui/react';
import clsx from 'clsx';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm, useWatch } from 'react-hook-form';

import getServerPropsWithTranslation from '@/i18n/getServerPropsWithTranslation';
import { generateGiftProducts, getListProduct, getProductById } from '@/services/product/product';

import ButtonIntallment from '@/components/button/button-installment';
import CardPolicy from '@/components/card/card-policy';
import CardRating from '@/components/card/card-rating';
import ChatBoxLazy from '@/components/chat/chat-box-lazy';
import Comment from '@/components/comment/comment';
import DropdownShare from '@/components/dropdown/dropdown-share';
import Svg from '@/components/icon/svg';
import LayoutImall from '@/components/layout/layout-imall';
import ListProduct from '@/components/list/list-product';
import ModalReview from '@/components/modal/modal-reviews';
import ModalSharePost from '@/components/modal/modal-share-post';
import PriceListProduct from '@/components/price/price-list-product';
import RatingProductDetail from '@/components/rating/rating-product-detail';
import SectionProduct from '@/components/section/section-products';
import Stepper from '@/components/stepper/stepper';
import TagSale from '@/components/tag-chip/tag-sale';
import HTMLContent from '@/components/text/html-content';

import { Data, Model } from '@/types/model';

import HeaderWebDefault from '@/components/header/header-web-default';
import SectionSupports from '@/components/section/section-supports';
import { useGlobalContext } from '@/context/global';
import { modal } from '@/context/modal-context';
import useBoolean from '@/hooks/useBoolean';
import Routers from '@/routes/routers';
import { CommentService } from '@/services/comment/comment';
import { ImageService } from '@/services/image/image';
import useProduct from '@/store/cart/hooks/product';
import { copyTextToClipboard } from '@/utilities/copy';
import { toCurrency } from '@/utilities/currency';
import { toast } from 'react-hot-toast';

type PageProps = {
  product: Data.ProductDetail;
  similarProducts: Data.Product[];
  flashSaleExpiry?: number;
  isFlashSale?: boolean;
  gifts: Array<Model.Gift>;
  simGift: any;
};
interface IFormBuy {
  product_id: number;
  options: Array<{ option_id: number; option_value: number }>;
  quantity: number;

  gift?: number;
}

const tabs = [
  { id: 'content', title: 'Thông tin sản phẩm' },
  { id: 'system', title: 'Cấu hình' },
  { id: 'rating', title: 'Đánh giá' },
  { id: 'policy', title: 'Mua hàng & bảo hành' }
];

type Rate = { id: number; rate?: number; value?: number; name: string };
const rates = [
  { id: 2, rate: 5, value: 99, name: '5 sao' },
  { id: 3, rate: 4, value: 66, name: '4 sao' },
  { id: 4, rate: 3, value: 33, name: '3 sao' },
  { id: 5, rate: 2, value: 22, name: '2 sao' },
  { id: 6, rate: 1, value: 11, name: '1 sao' }
];
const rateDefault = { id: 1, rate: undefined, name: 'Tất cả' };
const rateWithDefault = [rateDefault, ...rates];

const ImallDetailPage: NextPage<PageProps> = ({ router, product, similarProducts, flashSaleExpiry, isFlashSale, gifts, simGift }) => {
  const { addToCart } = useProduct();

  const [selectedImage, setSelectedImage] = useState(0);
  const { value: isLiked, toggle: toggleLike } = useBoolean(false);
  const [comments, setComments] = useState<Array<Model.Comment>>([]);
  const viewMoreComment = useBoolean(false);

  const [rateSelected, setRateSelected] = useState<Rate>(rateDefault);
  const methods = useForm<IFormBuy>();
  const { withAuth } = useGlobalContext();

  useEffect(() => {
    CommentService.list({ limit: 10, product_id: product.id, skip: 0, rating: rateSelected.rate }).then((p) => setComments(p));
  }, [product.id, rateSelected.rate]);

  useEffect(() => {
    function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
      if (e.currentTarget.getAttribute('target') === '_blank') return;
      if (e.currentTarget.href.startsWith('/') || e.currentTarget.href.includes(window.location.hostname)) {
        e.preventDefault();
        router.push(e.currentTarget.href);
      }
    }
    document.querySelectorAll('.rich_content a').forEach((e) => {
      e.addEventListener('click', handleClick as any);
    });
    return () => {
      document?.querySelectorAll('.rich_content a').forEach((e) => {
        e.removeEventListener('click', handleClick as any);
      });
    };
  }, []);
  useEffect(() => {
    methods.reset({});
  }, [router.asPath]);

  const selectedOptionValue = useWatch({
    name: product.options.map((option, index) => `options.${index}.option_value`) as `options.${number}.option_id`[],
    control: methods.control
  });

  const optimizedVariants = useMemo(() => {
    const variantByOption: Record<string, Model.Variant> = {};
    // 14
    const optionValueById = product.options.reduce((v: Record<string, Model.OptionValue>, option) => {
      option.options.forEach((option) => {
        v[option.id] = option;
      });
      return v;
    }, {});
    //
    const optionValueAvaible = new Set<number>();

    // 40
    const variantById = product.variants.reduce((obj: Record<number, Model.Variant & { options: Model.OptionValue[] }>, variant) => {
      obj[variant.id] = Object.assign(variant, { options: [] });
      return obj;
    }, {});

    // 80
    product.optionCombinations.forEach(({ option_value_id, variant_id }) => {
      const optionValue = optionValueById[option_value_id];
      const variant = variantById[variant_id];
      variant.options.push(optionValue);

      if (variant.quantity > 0) {
        optionValueAvaible.add(option_value_id);
      }
      if (variant.options.length === product.options.length) {
        const key = variant.options
          .sort((a, b) => a.option_id - b.option_id)
          .map((v) => v.id)
          .join('_');
        variantByOption[key] = variant;
      }
    });
    return {
      variants: product.variants as unknown as (Model.Variant & { options: Model.OptionValue[] })[],
      optionValueAvaible,
      variantByOption
    };
  }, [product]);

  // Take variant from selectedOptionsValue
  const variant = useMemo(() => {
    if (!product.options.length) return optimizedVariants.variants[0];
    if (selectedOptionValue && selectedOptionValue.every((v) => Boolean(v)))
      return optimizedVariants.variantByOption[selectedOptionValue.join('_')];
  }, [selectedOptionValue, optimizedVariants.variantByOption]);

  const handleBuyNow: SubmitHandler<IFormBuy> = (values) => {
    // dispatch(addToCheckout([{ id: variant.id, name: variant.name, price: variant.price, quantity: values.quantity }]));
  };
  const handleBuy: SubmitHandler<IFormBuy> = (values) => {
    if (!variant) return;
    addToCart(
      variant,
      product,
      gifts.length
        ? {
            gift: {
              id: values.gift,
              options: gifts
            }
          }
        : {}
    );
  };
  const handleLike = withAuth(() => {
    toggleLike();
  }, []);

  function handleCopy() {
    copyTextToClipboard(window.location.href).then(() => toast.success('Đã sao chép đường dẫn đến sản phẩm'));
  }
  function handleShare() {
    toast.success('Chia sẻ sản phẩm thành công');
  }
  const handleReview = useCallback(() => {
    modal.open({
      render({ close }) {
        return (
          <ModalReview
            onClose={close}
            itemImage={product.thumbnail}
            itemName={product.name}
            itemPrice={product.priceRange.min}
            itemDesc="123123123"
          />
        );
      },
      className: 'modal-box modal-box-lg',
      closeButton: true
    });
  }, [product]);
  const handleModalShare = useCallback(() => {
    modal.open({
      render: (
        <ModalSharePost
          withLink
          itemImage={product.thumbnail}
          itemName={product.name}
          itemDesc="123123123"
          href={window.location.href}
          onCopy={handleCopy}
          onShare={handleShare}
        />
      ),
      classNameOverwrite: true,
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-bottom-sheet md:modal-middle',
      classNameOverlay: 'bg-neutral-900 bg-opacity-50'
    });
  }, [product]);

  const handleScrollIntoView = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    var headerOffset = 96;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const img = selectedImage == 0 ? product.thumbnail : product.attachments[selectedImage - 1].thumbnail!;

  const [mergedImage] = useState([product.thumbnail, ...product.attachments.map((v) => v.thumbnail!)]);

  return (
    <>
      <Head>
        <title>{`Imall - ${product.name}`}</title>
      </Head>
      <HeaderWebDefault title="Sim thần số học" type="fixed" withMenu withCart withSearch />
      <section className="max-md:hidden md:bg-neutral-0">
        <div className="container">
          <div className="breadcrumbs text-sm text-neutral-500">
            <ul aria-label="Breadcrumb">
              <li>
                <Link href={Routers.IMALL}> Trang chủ </Link>
              </li>
              <li>
                <Link href={Routers.IMALL_DEVICE}>Điện thoại, thiết bị</Link>
              </li>
              <li className="text-neutral-800">
                <Link href={router.asPath}>{product.name}</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="md:bg-neutral-0">
        <div className="md:pt-6 max-md:px-0 container grid w-full gap-x-12 md:gap-y-10 text-subtle-content xl:grid-cols-[1fr,30.8125rem]">
          {/* Product images */}
          <div className="bg-neutral-0 md:bg-transparent overflow-hidden">
            <div className="order-1 flex w-auto flex-col gap-2 overflow-hidden md:-mx-10 xl:mx-0 xl:flex-row-reverse">
              <div className="mx-auto w-full flex-1 md:max-w-[33rem] xl:w-auto box-content md:px-10 xl:px-0">
                <div className="block-img block-square">
                  <img key={img} loading="lazy" src={img} className="md:rounded-xl bg-base-200 object-cover center-by-grid" alt="image" />
                  {isFlashSale && (
                    <div className="md:hidden absolute bottom-0 left-0">
                      <TagSale className="tag-sm flex rounded-l-[0.25rem]">
                        <TagSale.Icon />
                        <TagSale.Timer expiry={flashSaleExpiry} />
                      </TagSale>
                    </div>
                  )}
                  <span className="md:hidden absolute right-2 bottom-2">
                    <span className="tag bg-neutral-0 text-base-content border-none tag-sm">
                      {selectedImage + 1}/{mergedImage.length}
                    </span>
                  </span>
                </div>
              </div>
              <div className="relative w-full xl:h-full xl:w-20">
                <div className="inset-0 xl:absolute">
                  <div className="flex gap-3 overflow-auto px-4 scrollbar-hide md:px-10 xl:flex-col xl:px-0">
                    {mergedImage.map((attachment, index) => {
                      return (
                        <div key={attachment + index} className="h-20 w-20 flex-shrink-0 select-none">
                          <img
                            src={attachment}
                            draggable={false}
                            alt="123123"
                            className="h-full w-full rounded-xl bg-base-200 object-cover"
                            loading="lazy"
                            role="button"
                            onClick={() => setSelectedImage(index)}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Side */}
          <form onSubmit={methods.handleSubmit(handleBuy)} className="order-2 xl:row-span-2">
            <div className="sticky divide-y divide-neutral-200">
              <div className="px-4 py-4 md:p-0 bg-neutral-0 md:bg-transparent space-y-2">
                <div className="flex items-center">
                  <div className="flex-1">
                    <div className="text-sm text-subtle-content">{product.brand?.name}</div>
                    <h2 className="font-itel text-h-xs md:text-h3 font-bold md:font-medium text-base-content">{product.name}</h2>
                  </div>
                  <div className="max-md:hidden relative space-x-3">
                    <Menu>
                      <Menu.Button type="button" className="transition-default btn-tertiary btn btn-circle max-xl:hidden">
                        <Svg src="/icons/bold/share.svg" width={24} height={24} />
                      </Menu.Button>
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-[25rem] origin-top-right rounded-2xl shadow-itel"
                        data-theme="light"
                      >
                        <DropdownShare
                          withLink
                          itemImage={product.thumbnail}
                          itemName={product.name}
                          itemDesc="123123123"
                          href={typeof window !== 'undefined' ? window.location.href : '/'}
                          onCopy={handleCopy}
                          onShare={handleShare}
                        />
                      </Menu.Items>
                    </Menu>
                    <button type="button" className="transition-default btn-tertiary btn btn-circle xl:hidden" onClick={handleModalShare}>
                      <Svg src="/icons/bold/share.svg" width={24} height={24} />
                    </button>
                    <button type="button" className="transition-default btn-tertiary btn btn-circle" onClick={handleLike}>
                      {isLiked ? (
                        <Svg className="text-red-500" src="/icons/others/heart.svg" width={24} height={24} />
                      ) : (
                        <Svg src="/icons/others/heart-stroke.svg" width={24} height={24} />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between">
                  <RatingProductDetail rate={4.5} view={2203} />
                  <div className="md:hidden text-base-content">
                    <button type="button" className="mr-4" onClick={handleLike}>
                      {isLiked ? (
                        <Svg className="text-red-500" src="/icons/others/heart.svg" width={24} height={24} />
                      ) : (
                        <Svg src="/icons/others/heart-stroke.svg" width={24} height={24} />
                      )}
                    </button>
                    <button type="button" onClick={handleModalShare}>
                      <Svg src="/icons/bold/share.svg" width={24} height={24} />
                    </button>
                  </div>
                </div>
                <PriceListProduct
                  isFlasSale={isFlashSale}
                  className="items-center gap-x-2"
                  itemClassName="text-2xl font-bold items-center flex flex-row gap-x-2"
                  discountPrice={variant?.discount_price || product.priceRange.discount_min}
                  price={variant?.price || product.priceRange.max}
                  discountPercentage={20}
                />

                {isFlashSale && (
                  <TagSale className="max-md:hidden rounded-l-[0.25rem]">
                    <TagSale.Icon />
                    <TagSale.Timer expiry={flashSaleExpiry} />
                  </TagSale>
                )}
              </div>
              <div className="mt-2 md:mt-6 md:pb-6 space-y-2 md:space-y-0">
                {/* <ProductOptions /> */}
                <div className="p-4 md:p-0 bg-neutral-0 md:bg-transparent">
                  {product.options.map((option, index) => {
                    return (
                      <dl key={option.id} className="space-y-2 py-3">
                        <dt>{option.name}</dt>
                        <input
                          type="text"
                          hidden
                          {...methods.register(`options.${index}.option_id`, {
                            value: option.id,
                            valueAsNumber: true,
                            shouldUnregister: true
                          })}
                        />
                        <dd className="flex flex-wrap gap-2">
                          {option.options.map((op) => {
                            return (
                              <Fragment key={op.id}>
                                <label>
                                  <input
                                    type="radio"
                                    className="peer"
                                    hidden
                                    value={op.id}
                                    {...methods.register(`options.${index}.option_value`, { valueAsNumber: true, shouldUnregister: true })}
                                  />
                                  <span className="single-select active:text-neutral-0 border-neutral-500 peer-checked:border-red-600 peer-checked:bg-red-600 peer-checked:text-neutral-0 peer-active:bg-red-600 peer-disabled:opacity-30">
                                    {op.value}
                                  </span>
                                </label>
                              </Fragment>
                            );
                          })}
                        </dd>
                      </dl>
                    );
                  })}
                  <div className="flex justify-between md:block md:space-y-2 py-3">
                    <p>Số lượng</p>
                    <Stepper
                      className="w-min"
                      min={1}
                      max={100}
                      {...methods.register('quantity', {
                        min: 1,
                        max: 100,
                        valueAsNumber: true,
                        value: 1
                      })}
                    />
                  </div>
                </div>
                <div className="px-4 md:px-0 bg-neutral-0 md:bg-transparent space-y-2 py-3">
                  <p>Quà tặng kèm</p>
                  <ul className="space-y-2 md:space-y-4">
                    {gifts.map((gift, i) => (
                      <li key={i}>
                        <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                          <input type="radio" value={i} className="relative z-10 peer" {...methods.register('gift')} />
                          <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                          <div className="ml-3 md:ml-4 relative w-14">
                            <div className="card-image block-img block-square shrink-0 overflow-hidden rounded-lg md:rounded-2xl bg-base-200">
                              <img className="object-cover" src={gift.image} alt={gift.name} />
                              <div className="absolute bottom-0 left-0 rounded-tr-xl bg-neutral-100 px-1 py-0.5">
                                <Svg src="/icons/others/gift.svg" width={16} height={16} />
                              </div>
                            </div>
                          </div>
                          <div className="ml-3 md:ml-4 relative card-body p-0">
                            <h5 className="card-title line-clamp-2 font-bold text-base-content">{gift.name}</h5>
                            <p className="max-md:hidden card-desc text-xs">{gift.count} chiếc</p>
                          </div>
                          <div className="ml-2 md:ml-4 relative div min-w-[5rem] text-right">
                            <p className="font-bold text-base-content">{toCurrency(0)}</p>
                            <p className="text-xs">
                              <s>{toCurrency(gift.price)}</s>
                            </p>
                          </div>
                        </label>
                      </li>
                    ))}
                    <li>
                      <label className="relative group card card-side cursor-pointer items-center rounded-3xl text-sm py-3 px-4 md:p-0">
                        <input type="radio" value={'sim'} className="relative peer z-10" {...methods.register('gift')} />
                        <span className="md:hidden border border-neutral-300 bg-neutral-50 peer-checked:bg-neutral-0 peer-checked:border-red-500 absolute inset-0 pointer-events-none rounded-xl" />
                        <div className="ml-3 md:ml-4 relative w-14 flex-shrink-0">
                          <div className="card-image block-img block-square shrink-0 overflow-hidden rounded-lg md:rounded-2xl bg-base-200">
                            <img className="object-cover" src={simGift.image} alt={simGift.phone} />
                            <div className="absolute bottom-0 left-0 rounded-tr-xl bg-neutral-100 px-1 py-0.5">
                              <Svg src="/icons/others/gift.svg" width={16} height={16} />
                            </div>
                          </div>
                        </div>
                        <div className="ml-3 md:ml-4 relative card-body p-0">
                          <h5 className="card-title line-clamp-2 font-bold text-base-content">Tặng Sim số {simGift.phone}</h5>
                          <p className="max-md:hidden card-desc text-xs">Gói cước iTel 77k</p>
                        </div>
                        <div className="ml-2 md:ml-4 relative flex items-center md:flex-row-reverse gap-x-2 md:gap-x-3">
                          <div className="div text-right">
                            <p className="font-bold text-base-content">{toCurrency(0)}</p>
                            <p className="text-xs">
                              <s>{toCurrency(simGift.price)}</s>
                            </p>
                          </div>
                          <button type="button" className="md:p-1 hover:animate-spin " style={{ animationDirection: 'reverse' }}>
                            <Svg src="/icons/line/feather-icon.svg" width={24} height={24} />
                          </button>
                        </div>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="max-md:hidden pt-6">
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 text-center">
                  <button
                    type="submit"
                    className="btn-secondary btn btn-lg rounded-full border-neutral-800 text-neutral-800"
                    disabled={!variant || !variant.quantity}
                  >
                    Thêm vào giỏ
                  </button>
                  <button
                    type="button"
                    className="btn-primary btn btn-lg rounded-full"
                    onClick={methods.handleSubmit(handleBuyNow)}
                    disabled={!variant || !variant.quantity}
                  >
                    Mua ngay
                  </button>
                  <ButtonIntallment as={Link} href="/" title="Trả góp qua thẻ" desc="Visa, Mastercard, JCB, Amex"></ButtonIntallment>
                  <ButtonIntallment as={Link} href="/" title="Trả góp 0%" desc="Duyệt hồ sơ trong 5 phút"></ButtonIntallment>
                </div>
              </div>
            </div>
          </form>
          {/* Products info */}
          <div className="order-3 min-w-0 mt-2 md:mt-0">
            <div className="sticky md:static top-12 px-4 md:p-0 bg-neutral-0 md:bg-transparent z-10">
              <div className="border-b border-neutral-200">
                <div className="tabs -mb-px flex-nowrap gap-x-8 overflow-auto whitespace-nowrap scrollbar-hide">
                  {tabs.map((tab) => (
                    <button
                      type="button"
                      className={clsx(
                        'block tab-bordered border-red-500 border-opacity-0 p-4 text-base tab',
                        tab.id == 'content' && 'tab-active'
                      )}
                      onClick={() => handleScrollIntoView(tab.id)}
                      key={tab.id}
                    >
                      {tab.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="pt-4 px-4 md:p-0 bg-neutral-0 md:bg-transparent">
              {/* HTML */}
              <div id="content" className="md:mt-8" aria-label="content">
                <HTMLContent />
              </div>
            </div>
            {/* System */}
            <div id="system" className="pb-4 pt-6 px-4 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="system">
              <h2 className="text-s-sm font-bold text-base-content">Cấu hình Điện thoại OPPO Reno8 T 5G 256GB</h2>
              <ul className="mt-6">
                {product.attributes.map((attribute) => (
                  <li key={attribute.id} className="-mx-2 flex px-4 py-3 odd:bg-neutral-100">
                    <div className="w-4/12 px-2">{attribute.name}</div>
                    <div className="px-2 font-bold text-base-content">{attribute.value}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 text-center">
                <button className="btn-secondary btn w-[12.5rem] rounded-full">Xem thêm</button>
              </div>
            </div>
            {/* Rating */}
            <div id="rating" className="px-4 py-6 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="rating">
              <div className="flex items-center justify-between">
                <h2 className="text-s-sm font-bold text-base-content">Đánh giá</h2>
                <div className="relative">
                  <Listbox value={rateSelected} onChange={setRateSelected}>
                    <Listbox.Button className={({ open }) => clsx('btn-filter btn gap-x-2 rounded-full px-6', open ? 'text-red-500' : '')}>
                      {rateSelected.name}
                      <Svg src="/icons/bold/down.svg" width={24} height={24} />
                    </Listbox.Button>
                    <Listbox.Options
                      as="ul"
                      className="menu absolute right-0 z-10 mt-2 w-64 rounded-lg p-2 font-medium shadow-itel outline-none"
                      data-theme="light"
                    >
                      {rateWithDefault.map((rate) => {
                        return (
                          <Listbox.Option as="li" className={({ selected }) => (selected ? 'menu-active' : '')} key={rate.id} value={rate}>
                            <button>{rate.name}</button>
                          </Listbox.Option>
                        );
                      })}
                    </Listbox.Options>
                  </Listbox>
                </div>
              </div>
              <div className="mt-6">
                <CardRating maxRating={5} ratings={rates} />
                <div className="space-y-6 divide-y divide-neutral-200 text-base-content">
                  {(viewMoreComment.value ? comments : comments.slice(0, 3)).map((comment) => (
                    <Comment
                      key={comment.id}
                      userName={comment.user_name}
                      userAvatar={comment.user_avatar}
                      userRating={comment.user_rating}
                      createdAt={comment.created_at}
                      content={comment.content}
                      className="pt-6 first:block hidden md:block"
                      attachments={comment.attachments}
                    />
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-4 px-0 py-4 xl:px-16">
                  <button
                    type="button"
                    onClick={handleReview}
                    className="btn-secondary btn w-full flex-1 gap-2 whitespace-nowrap rounded-full md:w-1/2"
                  >
                    <Svg width={24} height={24} src="/icons/bold/edit.svg" />
                    Viết đánh giá
                  </button>
                  <button
                    type="button"
                    onClick={viewMoreComment.setTrue}
                    className="btn-secondary btn w-full flex-1 gap-2 whitespace-nowrap rounded-full md:w-1/2"
                  >
                    Xem 340 đánh giá
                    <Svg width={24} height={24} src="/icons/line/chevron-right.svg" />
                  </button>
                </div>
              </div>
            </div>
            {/* purchase policy */}
            <section id="policy" className="px-4 py-6 md:p-0 bg-neutral-0 mt-2 md:mt-10" aria-label="purchase policy">
              <h2 className="text-s-sm font-bold text-base-content">Chính sách mua hàng</h2>
              <div className="-mx-2 mt-6 flex">
                <div className="w-full px-2">
                  <CardPolicy
                    title="MUA HÀNG & VẬN CHUYỂN"
                    desc="Liên hệ ngay với iTel khi Quý khách cần hỗ trợ các vấn đề khi mua hàng."
                    logo="/logo/logo-color.svg"
                    url="/"
                  />
                </div>
                <div className="w-full px-2">
                  <CardPolicy
                    title="BẢO HÀNH CHÍNH HÃNG"
                    desc="Liên hệ ngay với OPPO khi Quý khách cần hỗ trợ các vấn đề khi mua hàng."
                    logo="https://s3-alpha-sig.figma.com/img/6f66/fa6f/c1a123da1e75579e2191475f0ef2ac33?Expires=1684713600&Signature=pEYokvpJiGO8T3oRfeMAKiIPE28NYS99048b8DV3KHrw~18inO84Bj4pZFPNy4PFRjc7~aQfvlyM8-R16CAxTM7-dCwMq508nNsmTu-A4xzcF5d76yiA08y318rsKWIqyPIT15aMspJA~QLuTOVhIYZbSmjbtk0wGO5qeLoYk1WQfVJjhItj~n2uZTBex2nuBeuxk5wQ4V5Ih4mIPavbVNlyYP1z5syuuZP~HIAfyF9cHSjjSn0VgHRnxzYG700~7leYvs3TlBRtYer~CWCnAe3tFzXy2q5YABkWjbNiyR0JlGGcnRIsJ1XLCel~31pHzkySlUUCtux~088DvHsvwQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
                    logoBg="white"
                    url="/"
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <div className="fixed md:hidden w-full bottom-0 bg-neutral-0">
        <div className="container py-2 flex -mx-1.5">
          <div className="flex-1 px-1.5">
            <button className="btn btn-secondary w-full rounded-full" type="button" onClick={methods.handleSubmit(handleBuy)}>
              Thêm vào giỏ
            </button>
          </div>
          <div className="flex-1 px-1.5">
            <button className="btn btn-primary w-full rounded-full" type="button" onClick={methods.handleSubmit(handleBuy)}>
              Mua ngay
            </button>
          </div>
        </div>
      </div>
      {/* Similar product */}
      <SectionProduct title="Sản phẩm tương tự" className="max-md:hidden container py-16">
        <ListProduct products={similarProducts} maxItem={{ tablet: 3 }} />
      </SectionProduct>
      <SectionSupports className="md:hidden" />
      {/* <DevTool control={methods.control} /> */}
    </>
  );
};

ImallDetailPage.getLayout = function getLayout(page, props) {
  return (
    <>
      <LayoutImall footerClassName="bg-neutral-50">{page}</LayoutImall>
      <ChatBoxLazy />
    </>
  );
};

const getStaticProps = getServerPropsWithTranslation<PageProps>(async ({ params }) => {
  const id = params?.id;
  if (!id) return { notFound: true };
  const [product, products] = await Promise.all([getProductById(Number(id)), getListProduct({ limit: 4 })]);
  const gifts: Model.Gift[] = [...generateGiftProducts()];
  const simGift = { type: 'sim', phone: '087.4553322', image: ImageService.random('artworks'), price: 880_000 };

  if (!product) return { notFound: true };
  const flashSaleExpiry = product.sale_expiry ? new Date(product.sale_expiry).getTime() : 0;
  return {
    props: {
      product,
      similarProducts: products,
      flashSaleExpiry,
      isFlashSale: flashSaleExpiry ? flashSaleExpiry > Date.now() : false,
      gifts,
      simGift
    }
  };
});
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '2' } }, { params: { id: '3' } }],
    fallback: 'blocking' // can also be true or 'blocking'
  };
}
export { getStaticProps };
export default ImallDetailPage;
