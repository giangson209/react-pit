import useControlled from '@/hooks/useControlled';
import { clamp } from '@/utilities/number';
import React from 'react';
import InputSliderRange from '../input/input-slider';

type Props = {
  min: number;
  max: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onChange?(value: [number, number]): void;

  className?: string;

  children?: React.ReactNode;
};

function FilterPrice({ min, max, step = 1, value, defaultValue, onChange, className, children }: Props) {
  const [price, setPrice] = useControlled(value, defaultValue, onChange);

  return (
    <div className={className}>
      <p className="font-bold">Mức giá</p>
      {children}
      <div className="pb-6 md:pb-8 xl:pb-0">
        <div className="form-control">
          <div className="input-bordered input-group input rounded-lg p-0">
            <input
              className="input w-1/2 border-none outline-none"
              placeholder="50.000đ"
              type="number"
              size={1}
              value={price[0]}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (isNaN(v)) return;
                setPrice([clamp(v, 0, price[1]), price[1]]);
              }}
            />
            <hr className="my-auto border-r border-neutral-400 py-4" />
            <input
              className="input w-1/2 border-none outline-none"
              placeholder="1.000.000đ"
              type="number"
              size={1}
              value={price[1]}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (isNaN(v)) return;
                setPrice([price[0], clamp(v, price[0], 5_000_000)]);
              }}
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <InputSliderRange min={min} max={max} step={step} value={price} defaultValue={price} onChange={(e, value) => setPrice(value)} />
        </div>
      </div>
    </div>
  );
}

export default FilterPrice;
