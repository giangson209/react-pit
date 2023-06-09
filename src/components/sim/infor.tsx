import { simNumberTypeList } from '@/utilities/formatSimNumber';
import FlashSaleTimer from '../FlashSaleTimer/FlashSaleTimer';
import ButtonCommit from '../button/button-commit';
import ButtonGift from '../button/button-gift';
import ButtonInformation from '../button/button-information';
import ButtonVip from '../button/button-vip';
import Svg from '../icon/svg';

export type simItem = {
  id: number;
  simNumber: string;
  name: string;
  data: string;
  fee: string;
  newPrice: string;
  oldPrice: string;
  saleOff?: string | number;
  isVip: boolean;
  gift?: string;
  isFlashSale?: boolean;
};

type SimInforProps = {
  simItem: simItem;
  onAddToCart?(): void;
  onBuy?(): void;
};

const SimInfor = ({ simItem, onAddToCart, onBuy }: SimInforProps) => {
  const isHasGift = Boolean(simItem.gift);

  return (
    <div className="flex items-start justify-between px-4 py-6">
      <div className="flex items-start justify-between gap-6 xl:w-1/2 md:w-fit">
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-itel font-bold text-neutral-800 md:text-xl xl:text-2xl">{simNumberTypeList(simItem.simNumber)}</p>
            {simItem.isVip ? <ButtonVip /> : <ButtonCommit />}
            <div className={`xl:hidden ${isHasGift ? 'md:block' : ''}`}>
              <ButtonGift isHaveGift={isHasGift} />
            </div>
          </div>
          <ul className="mt-2">
            {['Tam hoa', 'Tài lộc', 'Lộc phát'].map((label) => (
              <li key={`key-${label}`} className="tag tag-md tag-sim-list mr-1 cursor-pointer border-none text-xs md:px-2 xl:px-3">
                {label}
              </li>
            ))}
          </ul>
          <div className={`mt-3 items-center gap-2 xl:flex ${simItem.gift ? 'opacity-100' : 'opacity-0'} md:hidden`}>
            <div className="flex w-fit items-center gap-1 rounded-md bg-neutral-100 px-1 py-0.5">
              <div className="flex h-4 w-4 items-center justify-center pb-[0.1875rem]">
                <ButtonGift isHaveGift={isHasGift} size="small" />
              </div>
              <span className="text-xs font-medium text-neutral-500">Quà</span>
            </div>
            <span className="w-[12rem] truncate text-xs font-medium text-neutral-500">{simItem.gift}</span>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 md:mb-1">
            <p className="font-bold text-neutral-800 md:text-sm xl:text-base">{simItem.name}</p>
            <ButtonInformation isShowTooltip />
          </div>
          <div className="flex md:flex-col md:items-start md:gap-0 xl:flex-row xl:items-center xl:gap-2">
            <p className="font-bold text-neutral-800 md:text-xs xl:text-base">
              {simItem.data}GB<span className="text-xs font-normal text-neutral-500">/ngày</span>
            </p>
            <p className="text-sm font-normal text-neutral-500 md:hidden xl:block">|</p>
            <p className="font-bold text-neutral-800 md:text-xs xl:text-base">
              {simItem.fee}k<span className="text-xs font-normal text-neutral-500">/tháng</span>
            </p>
          </div>
          <div className="mt-1 text-xs font-normal italic text-neutral-500 md:hidden xl:block">
            Cam kết trong <span className="font-bold">36 tháng</span>
          </div>
        </div>
      </div>
      <div className="flex items-start justify-between gap-6">
        <div className="flex flex-col">
          <div className={`flex items-center gap-1`}>
            <p className="text-base font-bold text-neutral-800">{simItem.newPrice}</p>
            <span
              className={`rounded bg-red-500 px-1 py-0.5 text-center text-xs font-medium text-neutral-0 ${
                simItem.saleOff ? 'opacity-100' : 'opacity-0'
              }`}
            >
              -{simItem.saleOff}%
            </span>
          </div>
          <div className={`${simItem.saleOff ? 'opacity-100' : 'opacity-0'}`}>
            {simItem.saleOff && <span className="text-xs font-normal text-neutral-500 line-through">{simItem.oldPrice}</span>}
          </div>
          <div className={`${simItem.isFlashSale ? 'opacity-100' : 'opacity-0'}`}>
            <FlashSaleTimer />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-tertiary btn btn-sm btn-circle" onClick={onAddToCart}>
            <Svg src="/icons/bold/cart.svg" className="inline h-5 w-5" />
          </button>
          <button className="btn-secondary btn btn-sm rounded-full" onClick={onBuy}>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimInfor;
