import Link from 'next/link';
import React, { Fragment, useContext } from 'react';

import Avatar from '../avatar/avatar';
import Svg from '../icon/svg';

import { useGlobalContext } from '@/context/global';
import Routers from '@/routes';
import { getTotalItemInCart } from '@/store/cart/selector';
import { useAppSelector } from '@/store/hooks';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { INavigationItem } from '.';
import { NavigationItem } from './navigation-item';
import { IGameContext } from '../layout/layout-igame';

type Props = {
  title?: string;
  navigations: Array<Omit<INavigationItem, 'childs'> & { childs?: INavigationItem[] }>;
  children?: React.ReactNode;
  isFocus?: boolean;
  toggleMenu?(): void;
  pageMobileTitle?: string;
  onClose?(): void;
  onCloseSearch?(): void;
};

const HeaderIGame = ({ title, isFocus, toggleMenu, navigations, children, pageMobileTitle, onClose, onCloseSearch }: Props) => {
  const router = useRouter();
  const { status, toggleModalAuth } = useGlobalContext();
  const { quickSearch } = useContext(IGameContext);

  const isLoggedIn = status === 'authenticated';

  return (
    <nav className="sticky top-0 z-50 w-full" data-theme="light">
      <div className="relative flex border-b border-neutral-200 bg-neutral-0">
        <div className="flex-1">
          <div className="container flex items-center max-md:px-4 max-lg:px-6 justify-between">
            <div
              className={clsx(
                'left-10 items-center xl:absolute xl:flex xl:h-full',
                isFocus ? 'hidden' : 'flex',
                pageMobileTitle && 'max-md:hidden flex'
              )}
            >
              <Link href={Routers.HOME} className="my-auto">
                <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
              </Link>
            </div>
            {isFocus ? (
              <>
                <button
                  type="button"
                  className="md:hidden"
                  onClick={() => {
                    onClose && onClose();
                    quickSearch('');
                    router.back();
                  }}
                >
                  <Svg src="/icons/line/chevron-left.svg" width={36} height={36} />
                </button>
                <Link href={Routers.IGAME} className="max-md:hidden">
                  <Svg src="/logo/igame.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
                </Link>
              </>
            ) : (
              <>
                {pageMobileTitle && (
                  <div className="flex items-center gap-4 sm:hidden">
                    <button
                      type="button"
                      onClick={() => {
                        onClose && onClose();
                        router.back();
                      }}
                    >
                      <Svg src="/icons/line/chevron-left.svg" width={36} height={36} />
                    </button>
                    <h1 className="text-[18px] font-bold">{pageMobileTitle}</h1>
                  </div>
                )}
                <div className={clsx(isFocus ? 'ml-4' : 'ml-auto', 'xl:ml-0', pageMobileTitle && 'hidden sm:flex')}>
                  <Link href={Routers.IGAME}>
                    <Svg src="/logo/igame.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
                  </Link>
                </div>
              </>
            )}
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
                'ml-10 flex justify-end gap-x-4 whitespace-nowrap py-3 xl:flex-1 xl:py-3',
                isFocus && 'flex-1 max-lg:ml-4 max-md:ml-2'
              )}
            >
              {children}
              <div className={clsx(isFocus ? 'hidden' : 'flex', 'gap-x-4 tooltip-light xl:flex')}>
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
                  <button className="transition-default btn-primary btn rounded-full max-md:hidden" onClick={toggleModalAuth}>
                    Đăng nhập
                  </button>
                )}
                <button type="button" onClick={toggleMenu} className="btn-tertiary btn btn-circle xl:hidden">
                  <Svg src="/icons/line/menu.svg" className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderIGame;
