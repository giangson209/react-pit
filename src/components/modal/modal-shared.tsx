import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { forwardRef, useEffect } from 'react';

type Props = {
  defaultUrl?: string;
  onClose?(): void;
  children?: React.ReactNode;
  isHome?: boolean;
};

const ModalShared = forwardRef<HTMLDivElement, Props>(function ModalShared({ onClose, children, defaultUrl, isHome }: Props, ref) {
  const router = useRouter();
  function handleClose() {
    router.push(defaultUrl ?? '/imall', undefined, { shallow: true });
    onClose?.();
  }
  useEffect(() => {
    const before = () => {
      let documentElement = document.documentElement;
      let ownerWindow = document.defaultView ?? window;

      const scrollbarWidthBefore = ownerWindow.innerWidth - documentElement.clientWidth;
      documentElement.style.overflow = 'hidden';
    };
    const after = () => {};
    const clear = () => {
      document.documentElement.style.overflow = '';
    };
    before();
    after();

    return clear;
  }, []);

  return (
    <div ref={ref} className={clsx(isHome ? '' : '', 'fixed inset-0 top-16 md:top-24 xl:top-[4.5rem] z-10')} data-theme="light">
      <div key="backdrop" onClick={handleClose} className="fixed inset-0 top-16 md:top-24 xl:top-[4.5rem] z-10 bg-neutral-50"></div>
      {children}
    </div>
    //    <div className="fixed inset-0 top-[4.5rem] z-10 flex items-center justify-center">
    //    <div key="backdrop" onClick={handleClose} className="bg-black/70 fixed inset-0 top-[4.5rem] z-10 backdrop-blur-2xl" />
    //  </div>
  );
});

export default ModalShared;
