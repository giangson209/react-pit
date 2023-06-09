import { useEffect, useRef, useState } from 'react';

type RangeSliderProps = {
  initialMin: number;
  initialMax: number;
  min: number;
  max: number;
  step: number;
  priceCap: number;
};

const RangeSlider = ({ initialMin, initialMax, min, max, step, priceCap }: RangeSliderProps) => {
  const progressRef = useRef<HTMLInputElement>(null);
  const [minValue, setMinValue] = useState(initialMin);
  const [maxValue, setMaxValue] = useState(initialMax);

  const handleMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) > maxValue) {
      } else {
        setMinValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) < minValue) {
        setMinValue(parseInt(e.target.value));
      }
    }
  };

  const handleMax = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (maxValue - minValue >= priceCap && maxValue <= max) {
      if (parseInt(e.target.value) < minValue) {
      } else {
        setMaxValue(parseInt(e.target.value));
      }
    } else {
      if (parseInt(e.target.value) > maxValue) {
        setMaxValue(parseInt(e.target.value));
      }
    }
  };

  useEffect(() => {
    if (progressRef.current !== null) {
      progressRef.current.style.left = (minValue / max) * step + '%';
      progressRef.current.style.right = step - (maxValue / max) * step + '%';
    }
  }, [minValue, maxValue, max, step]);

  return (
    <div className="w-full">
      <div className="mb-5 flex w-full items-center rounded-lg border border-neutral-300 p-4">
        <input
          onChange={(e) => setMinValue(Number(e.currentTarget.value))}
          value={minValue}
          placeholder="50.000đ"
          className="w-full rounded-lg bg-neutral-0 p-0 text-base font-medium text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
        />
        <div className="mx-4 h-5 w-0.5 bg-neutral-400"></div>
        <input
          onChange={(e) => setMaxValue(Number(e.currentTarget.value))}
          value={maxValue}
          placeholder="1.000.000đ"
          className="w-full rounded-lg bg-neutral-0 p-0 text-base font-medium text-neutral-800 placeholder:text-neutral-300 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <div className="relative h-1 rounded-md bg-neutral-200">
          <div className="absolute h-1 rounded bg-neutral-800 " ref={progressRef}></div>
        </div>
        <div className="relative">
          <input
            onChange={handleMin}
            type="range"
            min={min}
            step={step}
            max={max}
            value={minValue}
            className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />
          <input
            onChange={handleMax}
            type="range"
            min={min}
            step={step}
            max={max}
            value={maxValue}
            className="pointer-events-none absolute -top-1 h-1 w-full appearance-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
