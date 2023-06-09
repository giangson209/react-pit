import { formattedPrice } from '@/utilities';
import { toCurrency } from '@/utilities/currency';
import React from 'react';

type Props = {
  price: number;
  percent: number;
  setCardPricePicked: (price: number) => void;
  pricePicked: number;
};

export default function CardItem({ price, percent, setCardPricePicked, pricePicked }: Props) {
  return (
    <div
      onClick={() => setCardPricePicked(price)}
      className={`relative mt-2 cursor-pointer items-center justify-center overflow-hidden rounded-lg border bg-secondary px-[15px] py-6 hover:border-modern-red focus:border-modern-red sm:px-8 sm:py-2 ${
        pricePicked === price ? 'border-modern-red' : 'border-neutral-200'
      }`}
    >
      <div className="absolute -top-4 right-0 h-10 w-10 rounded-bl-lg bg-orange">
        <span className="absolute bottom-1 left-2 text-center  text-sm font-medium text-neutral-0">-{percent}%</span>
      </div>
      <p className="text-center text-xl font-medium text-neutral-800 sm:text-2xl">{toCurrency(price)}</p>
      <p className="text-center text-sm font-medium leading-5 text-modern-red">Giá bán: {toCurrency(price - price * (percent / 100))}</p>
    </div>
  );
}
