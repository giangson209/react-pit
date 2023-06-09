import Link from 'next/link';
import { Fragment, useState } from 'react';

import Avatar from '../avatar/avatar';
import Svg from '../icon/svg';

import { useGlobalContext } from '@/context/global';
import Routers from '@/routes';
import { getTotalItemInCart, selectCartItems } from '@/store/cart/selector';
import { useAppSelector } from '@/store/hooks';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { INavigationItem } from '.';
import { NavigationItem } from './navigation-item';
import useBoolean from '@/hooks/useBoolean';

type Props = {
  navigations: Array<Omit<INavigationItem, 'childs'> & { childs?: INavigationItem[] }>;
  logo?: string;
  children?: React.ReactNode;
  isFocus?: boolean;
  toggleMenu?(): void;
  theme?: 'light' | 'dark';
  routerLogo?: string;
  haveCart?: boolean;
  isHomePage?: boolean;
};

const HeaderSecondary = ({
  isFocus,
  isHomePage,
  toggleMenu,
  navigations,
  children,
  logo = '/logo/imall.svg',
  theme = 'light',
  routerLogo = Routers.IMALL,
  haveCart = true
}: Props) => {
  const searching = useBoolean(false);
  const router = useRouter();
  const { status, toggleModalAuth } = useGlobalContext();
  const totalItem = useAppSelector(getTotalItemInCart);
  const isLoggedIn = status === 'authenticated';

  return (
    <nav className={clsx(isHomePage ? '' : 'max-md:hidden', 'sticky top-0 z-50 w-full')} data-theme={theme}>
      <div className="relative border-b border-neutral-200 bg-neutral-0 dark:bg-neutral-800 dark:border-transparent">
        <div>
          <div className="container flex items-center max-xl:px-6">
            <div className={clsx('left-10 items-center xl:absolute xl:flex xl:h-full', isFocus ? 'hidden' : 'flex')}>
              <Link href={Routers.HOME} className="my-auto">
                <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
              </Link>
            </div>
            <div className={clsx(isFocus ? 'max-md:hidden ml-4' : 'ml-auto', 'xl:ml-0')}>
              <Link href={routerLogo}>
                <Svg src={logo} width={78} height={32} className="text-red-500 dark:text-neutral-0" />
              </Link>
            </div>
            <ul className="ml-10 hidden items-baseline space-x-10 whitespace-nowrap text-sm font-bold xl:flex">
              {navigations.map(({ title, href: url, childs }, index) => {
                const isActive = router.asPath.includes(url);
                return (
                  <li key={index} className="group relative py-[1.625rem]">
                    {isActive && <span className="absolute -bottom-px h-[3px] w-full bg-red-500"></span>}
                    <Link href={url} className="hover:text-red-500">
                      {title}
                    </Link>
                    {childs?.length ? (
                      <div className="transition-default pointer-events-none absolute w-max max-w-md opacity-0 group-hover:pointer-events-auto group-hover:opacity-100">
                        <ul className="menu w-full rounded-[1.25rem] bg-base-100 p-4">
                          {childs.map((item) => {
                            return (
                              <Fragment key={item.title}>
                                <li>
                                  <NavigationItem href={item.href} title={item.title} description={item.description} icon={item.icon} />
                                </li>
                                {item.childs ? (
                                  <li className="menu-title">
                                    <ul className="menu-sub">
                                      {item.childs.map((item) => (
                                        <li key={item.title}>
                                          <NavigationItem
                                            href={item.href}
                                            title={item.title}
                                            description={item.description}
                                            icon={item.icon}
                                            className="menu-sub-item"
                                          />
                                        </li>
                                      ))}
                                    </ul>
                                  </li>
                                ) : null}
                              </Fragment>
                            );
                          })}
                        </ul>
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
            <div
              className={clsx(
                'md:ml-10 flex justify-end gap-x-4 whitespace-nowrap py-3 md:py-6 xl:flex-1 xl:py-3 items-center',
                isFocus ? 'flex-1' : 'ml-10'
              )}
            >
              {children}
              <div className={clsx(isFocus ? 'hidden' : 'flex', 'gap-x-4 tooltip-light xl:flex')}>
                {haveCart && (
                  <Link href={Routers.CART} className="transition-default btn-tertiary btn btn-circle tooltip max-md:hidden">
                    <Svg src="/icons/bold/cart.svg" className="h-6 w-6" />
                    <span className="tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">Giỏ hàng của bạn</span>
                    <span className="badge badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                      <span>{totalItem}</span>
                    </span>
                  </Link>
                )}
                {isLoggedIn ? (
                  <button className="flex">
                    <Avatar
                      alt="Avatar"
                      img="https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg"
                      className="w-12 rounded-full"
                      noti={6}
                    />
                  </button>
                ) : (
                  <button
                    className="transition-default btn-primary btn btn-sm md:btn-md rounded-full max-md:hidden"
                    onClick={toggleModalAuth}
                  >
                    Đăng nhập
                  </button>
                )}
                <button type="button" onClick={toggleMenu} className="btn-tertiary btn btn-circle btn-sm md:btn-md xl:hidden">
                  <Svg src="/icons/line/menu.svg" className="w-5 md:h-6 h-5 md:w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderSecondary;
