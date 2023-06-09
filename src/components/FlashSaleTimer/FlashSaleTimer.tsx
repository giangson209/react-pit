import React, { useEffect, useState } from 'react';
import Svg from '@/components/icon/svg';
import { useTimer } from '@/hooks/useTimer';
import { formatTime } from '@/utilities/formatTime';
const expiresInSeconds = new Date().getTime() + 24 * 60 * 60 * 1000;

const FlashSaleTimer = () => {
  const { seconds, minutes, hours } = useTimer({
    expiresInSeconds
  });
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    <>
      {hydrated && (
        <div className="relative">
          <img src="/images/flashsale-bg.png" alt="flash sale" className="h-7 w-[6.5rem] xl:h-8 xl:w-[11rem]" />
          <div className="absolute left-1 top-1 flex items-center gap-2">
            <Svg src="/icons/bold/flash-sale.svg" className="h-6 w-12 hidden xl:block" />
            <div className="flex items-center gap-1 font-bold text-orange text-xs xl:text-sm">
              <TimeUnit value={hours} />
              <div className="text-neutral-0">:</div>
              <TimeUnit value={minutes} />
              <div className="text-neutral-0">:</div>
              <TimeUnit value={seconds} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const TimeUnit = (props: { value: number }) => {
  const { value } = props;
  return <div className="flex h-5 w-6 items-center justify-center rounded bg-neutral-0 xl:h-6 xl:w-7">{formatTime(value)}</div>;
};

export default FlashSaleTimer;
