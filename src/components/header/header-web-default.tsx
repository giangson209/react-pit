import { locales } from '@/configs/locales';
import { useGlobalContext } from '@/context/global';
import Routers from '@/routes/routers';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useRef } from 'react';
import Svg from '../icon/svg';
import useIsSticky from '@/hooks/useIsSticky';

type Props = {
  className?: string;
  title?: string;

  type?: 'sticky' | 'fixed' | 'static';
  theme?: 'light' | 'dark';
  mode?: 'close' | 'back';

  withCart?: boolean;
  withMenu?: boolean;
  withSearch?: boolean;

  actionBackground?: boolean;

  onClose?(): void;
};

const HeaderWebDefault = (props: Props) => {
  const {
    className,
    title,
    type = 'sticky',
    theme = 'light',
    mode = 'back',
    withCart,
    withMenu,
    withSearch,
    actionBackground,
    onClose = () => void 0
  } = props;
  const router = useRouter();
  const { menu } = useGlobalContext();
  const ref = useRef<HTMLHRElement>(null);
  const stickyStatus = useIsSticky(ref, {});

  const onGoBack = menu.value ? menu.setFalse : mode === 'back' ? router.back : onClose;

  const isSticky = type === 'sticky' || stickyStatus;

  const currentLocale = useMemo(() => {
    return router.locale ? locales.find((l) => l.locale === router.locale) : locales[0];
  }, [router.locale]);

  return (
    <>
      <hr className="border-none absolute w-full h-px pointer-events-none" ref={ref}></hr>
      <nav className={clsx(type, 'md:hidden w-full top-0 z-50')}>
        {!menu.value ? (
          <div className="relative">
            {/* Background */}
            <div
              className={clsx(
                isSticky ? 'bg-base-100 text-base-content' : 'bg-transparent text-base-content',
                'absolute inset-0 transition-default'
              )}
            />
            <div className="relative container pl-2 flex items-center py-3">
              <button
                type="button"
                className={clsx(
                  'btn btn-sm btn-circle btn-tertiary transition-default',
                  isSticky ? 'text-base-content bg-transparent border-transparent' : 'text-base-content'
                )}
                onClick={onGoBack}
              >
                <Svg src={mode === 'back' ? '/icons/line/arrow-left.svg' : '/icons/line/close.svg'} width={24} height={24} />
              </button>
              <h2
                className={clsx(
                  isSticky ? 'text-base-content' : 'text-transparent pointer-events-none',
                  'transition-colors flex-1 text-[1.125rem] capitalize select-none truncate'
                )}
              >
                <b>{title}</b>
              </h2>
              <div className="ml-2 flex gap-3">
                {withSearch && <ButtonSearch />}
                {withCart && <ButtonCart />}
                {withMenu && <ButtonMenu />}
              </div>
            </div>
          </div>
        ) : (
          <div className="container relative bg-neutral-0 py-3">
            <div className="flex">
              <div className="flex-1 flex items-center">
                <Link href={Routers.HOME}>
                  <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
                </Link>
              </div>
              <div className="flex items-center gap-x-3">
                <Link href={router.asPath} locale={router.locale === 'vi' ? 'en' : 'vi'} className="btn-sm btn-tertiary btn rounded-full">
                  {currentLocale?.short}
                </Link>
                <ButtonCart />
                <button className={clsx('btn-tertiary btn btn-sm btn-circle')} onClick={menu.toggle}>
                  <Svg src="/icons/line/close.svg" width={24} height={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

type ButtonProps = { bg?: boolean };
const ButtonMenu = (props: ButtonProps) => {
  const { menu } = useGlobalContext();
  return (
    <button className={clsx('btn-tertiary btn btn-sm btn-circle')} onClick={menu.toggle}>
      <Svg src={menu.value ? '/icons/line/close.svg' : '/icons/line/menu.svg'} width={24} height={24} />
    </button>
  );
};
const ButtonCart = (props: ButtonProps) => {
  return (
    <Link href={Routers.CART} className={clsx('btn-tertiary btn btn-sm btn-circle')}>
      <Svg src="/icons/bold/cart.svg" width={20} height={20} />
    </Link>
  );
};
const ButtonSearch = (props: ButtonProps) => {
  return (
    <button className={clsx('btn-tertiary btn btn-sm btn-circle')}>
      <Svg src="/icons/bold/vector.svg" width={20} height={20} />
    </button>
  );
};
export default HeaderWebDefault;
