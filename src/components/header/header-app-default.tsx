import { useModal } from '@/context/modal-context';
import useIsSticky from '@/hooks/useIsSticky';
import clsx from 'clsx';
import React, { useRef } from 'react';
import Svg from '../icon/svg';
import { useRouter } from 'next/router';

type Props = {
  type?: 'sticky' | 'fixed' | 'static';
  theme?: 'light' | 'dark';
  mode?: 'close' | 'back';

  withoutBorder?: boolean;

  title?: string;
};

const HeaderAppDefault = ({ title, type = 'sticky', theme = 'light', mode = 'back', withoutBorder }: Props) => {
  const { close } = useModal();
  const ref = useRef<HTMLHRElement>(null);
  const isSticky = useIsSticky(ref, {});
  const router = useRouter();

  const handleBack = mode == 'back' ? router.back : close;

  const isHeaderSticky = type === 'sticky' || isSticky;

  return (
    <>
      <hr className="border-none absolute w-full h-px pointer-events-none" ref={ref}></hr>
      <nav className={clsx(type, 'w-full md:hidden top-0 z-50 bg-transparent')} data-theme={theme}>
        <div className="relative flex items-center">
          <div
            className={clsx(
              isHeaderSticky ? 'bg-neutral-0 border-neutral-200' : 'bg-transparent border-transparent pointer-events-none',
              withoutBorder ? '' : 'border-b',
              'transition-default w-full'
            )}
          >
            <div className="container h-16 flex items-center w-full">
              <div
                className={clsx(
                  type == 'fixed' ? (isSticky ? 'text-base-content' : 'text-transparent') : 'text-base-content',
                  'flex-1 flex justify-center text-[1.125rem] font-bold truncate px-16 overflow-hidden'
                )}
              >
                <h1 className="truncate max-w-xs">{title}</h1>
              </div>
            </div>
          </div>
          <div
            className={clsx('absolute left-2 bg-transparent', {
              'text-neutral-0': !isHeaderSticky
            })}
          >
            {mode === 'back' ? (
              <button type="button" className="center-by-grid btn-sm btn-circle" onClick={handleBack}>
                <Svg src="/icons/line/arrow-left.svg" width={24} height={24} />
              </button>
            ) : (
              <button
                type="button"
                className={clsx(
                  'center-by-grid btn-sm btn-circle text-base-content transition-default',
                  !isHeaderSticky && 'bg-neutral-100'
                )}
                onClick={handleBack}
              >
                <Svg src="/icons/line/close.svg" width={24} height={24} />
              </button>
            )}
          </div>

          <div className="absolute right-4">{/* Action on right */}</div>
        </div>
      </nav>
    </>
  );
};

export default HeaderAppDefault;
