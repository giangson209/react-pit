import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react';

import Routers from '@/routes/routers';
import { INavigationItem } from '.';
import Accordions from '../accordion/accordions';
import Svg from '../icon/svg';
import { NavigationItem } from './navigation-item';

type Props = {
  isShow?: boolean;
  navigations: Array<Omit<INavigationItem, 'childs'> & { childs?: INavigationItem[] }>;
  className?: string;

  onClose(): void;
};

const HeaderNavigation = ({ isShow, navigations, className, onClose }: Props) => {
  const [navActiveId, setNavActiveId] = useState<string | number | undefined>(-1);
  const router = useRouter();

  return isShow ? (
    <>
      <div className="fixed inset-0 z-30 bg-base-100"></div>
      <div className={clsx('fixed inset-0 z-40 overflow-auto', className)}>
        <div className="min-h-full bg-neutral-0 px-4 md:px-8 md:text-2xl">
          <div className="w-full">
            {navigations.map(({ href, title, id, childs }) =>
              childs?.length ? (
                <Accordions as="div" key={id} isActive={id === navActiveId}>
                  <div className="flex w-full items-center justify-between border-b border-neutral-200">
                    <Link href={href} className="block py-3.5 md:py-5">
                      <h2 role="button" className="select-none font-bold">
                        {title}
                      </h2>
                    </Link>
                    <Accordions.Button
                      className="flex-1 flex justify-end"
                      onClick={() => setNavActiveId((prev) => (prev === id ? -1 : id))}
                    >
                      {({ open }) => (
                        <Svg
                          src="/icons/line/chevron-down.svg"
                          className={clsx('transition-default h-5 w-5 duration-300 md:h-8 md:w-8', open ? '-rotate-180' : '')}
                        />
                      )}
                    </Accordions.Button>
                  </div>
                  <Accordions.Panel>
                    <ul className="menu w-full rounded-[1.25rem] bg-base-100">
                      {childs.map((item) => {
                        return (
                          <Fragment key={item.title}>
                            <li>
                              <NavigationItem
                                // onClick={onClose}
                                href={item.href}
                                title={item.title}
                                description={item.description}
                                icon={item.icon}
                              />
                            </li>
                            {item.childs ? (
                              <li className="menu-title">
                                <ul className="menu-sub">
                                  {item.childs.map((item) => (
                                    <li key={item.title}>
                                      <NavigationItem
                                        // onClick={onClose}
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
                  </Accordions.Panel>
                </Accordions>
              ) : (
                <div key={id} className="border-b border-neutral-200">
                  <Link href={href} onClick={onClose} className="flex w-full items-center justify-between border-b border-neutral-200 p-4">
                    <h2 role="button" className="select-none font-bold">
                      {title}
                    </h2>
                  </Link>
                </div>
              )
            )}

            <ul className="flex flex-row flex-wrap whitespace-nowrap py-2 md:hidden">
              {['Về iTel', 'Tin tức', 'Tuyển dụng', 'Hợp tác', 'Doanh nghiệp'].map((v) => (
                <li key={v} className="w-1/3">
                  <Link href="/" shallow className="block py-3">
                    {v}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href={router.pathname} as={Routers.LOGIN} className="btn-primary btn w-full rounded-full md:hidden">
              Đăng nhập
            </Link>
          </div>
          <div className="mx-auto py-4">
            <div className="flex flex-wrap items-center justify-center text-sm text-subtle-content">
              <div className="flex w-full items-center justify-center md:w-auto">
                <Link href="/" className="mr-4 whitespace-nowrap py-2 hover:underline md:mr-3">
                  Điều khoản bảo mật
                </Link>
                <span className="mr-4 inline-block h-1 w-1 rounded-full bg-neutral-500 md:mr-3" />
                <Link href="/" className="mr-4 whitespace-nowrap py-2 hover:underline md:mr-3">
                  Điều khoản sử dụng
                </Link>
              </div>
              <span className="mr-4 hidden h-1 w-1 rounded-full bg-neutral-500 md:mr-3 md:inline-block" />
              <Link href="/" className="mr-4 py-2 hover:underline md:mr-3 ">
                Quyền riêng tư
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default HeaderNavigation;
