import Svg from '@/components/icon/svg';
import { formattedPrice } from '@/utilities';
import clsx from 'clsx';
import React from 'react';

export type EwalletProps = {
  walletName: string;
  salePrice: number;
  logoPath: string;
  setEwallet?: any;
  walletPicked?: string;
  //   setEwallet?: (w: string) => void;
};

export default function Ewallet({ walletName, salePrice, logoPath, setEwallet, walletPicked }: EwalletProps) {
  return (
    <div
      onClick={() => setEwallet(walletName)}
      className={clsx(
        walletName === walletPicked ? 'border-red-600' : 'border-neutral-300',
        'flex cursor-pointer items-center justify-between rounded-xl border border-neutral-300 bg-neutral-0 px-4 py-3'
      )}
    >
      <div className="flex items-center">
        <div className="relative mr-4 h-5 w-5 rounded-full border border-neutral-300">
          <div
            className={`${
              walletName === walletPicked ? 'block' : 'hidden'
            } absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600`}
          />
        </div>
        <div>
          <p className="text-base font-medium text-neutral-800">{walletName}</p>
          <p className="text-sm font-normal text-neutral-500">
            Giảm đến <span className="font-bold text-primary">{formattedPrice(salePrice)}</span>
          </p>
        </div>
      </div>
      <Svg src={logoPath} className="ml-auto h-10 w-10" />
    </div>
  );
}
