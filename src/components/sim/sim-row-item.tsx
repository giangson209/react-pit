import { Model } from '@/types/model';
import { toCurrency } from '@/utilities/currency';
import { formatPhone } from '@/utilities/formatSimNumber';
import { formatNumber } from '@/utilities/number';
import Svg from '../icon/svg';
import TagVip from '../tag-chip/tag-vip';
import GiftTooltip from '../tag-chip/gift-tooltip';
import Tooltip from '../tooltip/tooltip';
import TagSale from '../tag-chip/tag-sale';

type SimInforProps = {
  item: Model.Sim;
  pack: Model.PackOfData;
  gift?: Model.Gift;
  onAddToCart?(): void;
  onBuy?(): void;

  tags?: { id: number | string; name: string }[];
  onSelectTag?(tag: any): void;
};

const SimRowItem = ({ item, onAddToCart, onBuy, pack, gift, tags = [], onSelectTag }: SimInforProps) => {
  const handleOpenAddToCardModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart ? onAddToCart() : void 0;
  };
  const handleOnBuy = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onBuy ? onBuy() : void 0;
  };

  const discountPercentage = item.discount_price ? (item.discount_price - item.price) / item.price : 0;

  return (
    <tr className="group relative flex-wrap border-b border-neutral-200 py-5 max-md:flex md:border-none">
      {/* Infor */}
      <td className="table-cell w-full max-w-xs md:w-auto md:py-6 md:pb-6 md:pl-4 md:pr-3">
        <span className="transition-default pointer-events-none absolute inset-0 rounded-xl border border-transparent duration-200 group-hover:border-red-500 max-md:hidden"></span>
        <p className="flex items-center gap-1 text-h-xs leading-6 md:text-xl xl:text-2xl">
          <b className="font-itel">{formatPhone(item.phone)}</b>
          {item.is_vip ? <TagVip /> : null}
          <span className="hidden md:block xl:hidden" >
            <Tooltip
              content={
                <div className="flex gap-4">
                  <img src="/images/gift-bonus.png" alt="gift bonus" className="h-14 w-14 object-cover" />
                  <div>
                    <p className="mb-1 text-sm font-bold">Tai nghe không dây chụp tai Sony WH-1000X có công nghệ chống ồn</p>
                    <p className="text-sm font-bold">
                      0đ <span className="ml-1 text-xs text-neutral-500 line-through">990.000đ</span>
                    </p>
                  </div>
                </div>
              }
              preventDefault
              className="cursor-default"
            >
              <Svg src="/icons/bold/gift.svg" width={16} height={16} />
            </Tooltip>
          </span>
        </p>
        <p className="xl:hidden text-sm">
          <b className="text-base">{pack.name} </b>

          <b>
            {'('}
            {formatNumber(pack.data, ['B', 'KB', 'GB'])}
          </b>
          <span className="text-neutral-500">/ngày</span>
          <span> | </span>
          <b>{formatNumber(pack.price)}</b>
          <span className="text-neutral-500">/tháng{')'}</span>
        </p>
        <ul className="mt-2 space-x-1">
          {tags.map((tag) => (
            <li
              key={tag.id}
              className="tag tag-primary xl:tag-md cursor-pointer"
              onClick={
                onSelectTag
                  ? (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onSelectTag(tag);
                    }
                  : void 0
              }
            >
              {tag.name}
            </li>
          ))}
        </ul>
        <div className="mt-3 md:hidden xl:flex">
          <GiftTooltip />
        </div>
      </td>
      {/* Pack data */}
      <td className="px-3 py-6 text-left max-md:hidden">
        <div className="flex items-center gap-1 md:mb-1">
          <p className="md:text-sm xl:text-base">
            <b>{pack.name}</b>
          </p>
          <Tooltip withArrow content={<b>Yêu cầu sử dụng gói cước ITEL149 trong thời gian tối thiểu 36 tháng sau khi kích hoạt Sim.</b>}>
            <Svg src="/icons/line/information.svg" width={20} height={20} />
          </Tooltip>
        </div>
        <div className="items-center text-xs xl:flex">
          <div>
            <b className="xl:text-sm">{formatNumber(pack.data, ['B', 'KB', 'GB'])}</b>
            <span className="text-neutral-500">/ngày</span>
          </div>
          <span className="mx-2 hidden text-sm text-neutral-500 xl:block">|</span>
          <div>
            <b className="xl:text-sm">{formatNumber(pack.price)}</b>
            <span className="text-neutral-500">/tháng</span>
          </div>
        </div>
        <p className="mt-1 hidden text-xs text-neutral-500 xl:block">
          Cam kết trong <b>36 tháng</b>
        </p>
      </td>
      {/* Price */}
      <td className="mt-3 w-full md:w-auto md:px-3 md:py-6">
        <div className="flex min-w-max flex-wrap items-center md:items-start justify-between md:flex-nowrap">
          <div className="flex-1">
            <div className="price-info items-start">
              <div className="flex items-center gap-1 md:block">
                <p className="text-base md:text-sm xl:text-base">
                  <b>{toCurrency(item.discount_price || item.price)}</b>
                </p>
                {item.discount_price && (
                  <p className="text-xs font-normal text-neutral-500">
                    <s>{toCurrency(item.price)}</s>
                  </p>
                )}
              </div>
              {discountPercentage && <span className="badge badge-sale hidden md:flex">{Math.floor(discountPercentage * 100)}%</span>}
            </div>
            {item.sale_expiry && (
              <TagSale className="absolute right-0 top-6 md:static tag-xs xl:tag-sm rounded-l md:mt-1">
                <TagSale.Icon className="hidden xl:block" />
                <TagSale.Timer expiry={item.sale_expiry} />
              </TagSale>
            )}
          </div>
          {/* Action */}
          <div className="flex gap-3">
            <button className="btn-tertiary btn btn-sm btn-circle" onClick={handleOpenAddToCardModal}>
              <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
            </button>
            <button className="btn-secondary btn btn-sm rounded-full" onClick={handleOnBuy}>
              Mua ngay
            </button>
          </div>
        </div>
      </td>
      {/* {isOpenAddToCartModal && (
        <ModalAddToCart handleCloseModal={() => setIsOpenAddToCartModal(false)} haveGiftBonus={simItem.gift ? true : false} />
      )}
      {isOpenModalPickSim && (
        <ModalPickSim handleCloseModal={() => setIsOpenModalPickSim(false)} haveGiftBonus={simItem.gift ? true : false} />
      )} */}
    </tr>
  );
};

export default SimRowItem;
