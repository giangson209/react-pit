import { simNumberTypeGrid } from '@/utilities/formatSimNumber';
import { useState } from 'react';
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
  isHaveGift?: boolean;
  gift?: string;
  isFlashSale?: boolean;
};

type SimInforProps = {
  simItem: simItem;
  isSecondaryBanner?: boolean;
  handleRechangeSim?: () => void;
};

const SimBanner = ({ simItem, isSecondaryBanner, handleRechangeSim }: SimInforProps) => {
  const [isOpenModalPickSim, setIsOpenModalPickSim] = useState<boolean>(false);
  return (
    <div
      className={`relative z-10 flex w-full justify-between px-4 py-6 ${
        isSecondaryBanner ? 'md:items-center md:gap-6 xl:items-start xl:gap-10' : 'gap-8 md:items-start xl:items-center'
      }`}
    >
      <div
        className={`${
          isSecondaryBanner ? 'md:items-center md:gap-12 xl:items-start xl:gap-10' : 'xl:items-center md:items-start md:gap-2 xl:gap-8'
        } flex  justify-between `}
      >
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className={`font-itel font-bold text-neutral-0 md:text-2xl ${isSecondaryBanner ? 'xl:text-h4' : 'xl:text-h3'} `}>
              {simNumberTypeGrid(simItem.simNumber)}
            </p>
            <ButtonVip size="large" />
            <div className={`xl:hidden ${simItem.isHaveGift ? 'md:block' : ''}`}>
              <ButtonGift isHaveGift={simItem.isHaveGift} />
            </div>
          </div>
          <ul className="mt-2">
            {['Tam hoa', 'Tài lộc', 'Lộc phát'].map((label) => (
              <li
                key={`key-${label}`}
                className={`${
                  isSecondaryBanner ? 'tag-sim-list' : 'tag-sim bg-neutral-900/[.15]'
                } tag mr-1 cursor-pointer border-none text-xs`}
              >
                {label}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <p className="font-bold text-neutral-0 md:text-base xl:text-xl">{simItem.name}</p>
            <ButtonInformation isShowTooltip isStrokeWhite />
          </div>
          <div
            className={`flex md:items-start md:gap-0 xl:flex-row xl:items-center xl:gap-2 ${
              isSecondaryBanner ? 'md:items-center md:gap-2' : 'md:flex-col'
            }`}
          >
            <p className={`${isSecondaryBanner ? 'md:text-sm' : 'md:text-xs'} font-bold text-neutral-0 xl:text-base`}>
              {simItem.data}GB
              <span className={`${isSecondaryBanner ? 'text-sm' : 'md:text-xs xl:text-sm'} font-normal text-neutral-0 `}>/ngày</span>
            </p>
            <p className={`${isSecondaryBanner ? 'block' : 'md:hidden xl:block'} text-sm font-normal text-neutral-0 `}>|</p>
            <p className={`${isSecondaryBanner ? 'md:text-sm' : 'md:text-xs'} font-bold text-neutral-0 xl:text-base`}>
              {simItem.fee}k
              <span className={`${isSecondaryBanner ? 'text-sm' : 'md:text-xs xl:text-sm'} font-normal text-neutral-0 `}>/tháng</span>
            </p>
          </div>
        </div>
      </div>

      <div
        className={`${isSecondaryBanner ? 'items-start xl:w-[35%]' : 'items-center md:gap-6 xl:w-[40%] xl:gap-8'} flex  justify-between `}
      >
        <div className="flex flex-col">
          <div className={`flex items-center gap-1`}>
            <p className="font-bold text-neutral-0 md:text-base xl:text-xl">{simItem.newPrice}</p>
            <span className={`rounded bg-red-500 px-1 py-0.5 text-center text-xs font-medium text-neutral-0`}>-{simItem.saleOff}%</span>
          </div>
          <span className="text-sm font-normal text-neutral-0 line-through opacity-80">{simItem.oldPrice}</span>
        </div>
        {isSecondaryBanner ? (
          <button className="btn-secondary btn btn-lg flex items-center justify-center gap-2 rounded-full md:hidden xl:block">
            <Svg src="/icons/bold/rechange.svg" className="mr-2 inline h-6 w-6" />
            <span>Chọn lại</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <button className="btn-tertiary btn btn-circle btn-md" onClick={handleRechangeSim}>
              <Svg src="/icons/bold/rechange.svg" className="inline h-6 w-6" />
            </button>
            <button
              className="btn-secondary btn btn-md rounded-full border-none xl:w-[9.25rem]"
              onClick={() => setIsOpenModalPickSim(true)}
            >
              Mua ngay
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimBanner;
