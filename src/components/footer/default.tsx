import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import Svg from '../icon/svg';
import ButtonAppStore from '../button/ButtonAppStore';
import ButtonGooglePlay from '../button/ButtonGooglePlay';
import useControlled from '@/hooks/useControlled';
import clsx from 'clsx';

type Props = {
  className?: string;
  theme?: 'light' | 'dark';
};

const data: { id: string; title: string; navigations: { title: string; key?: string; url?: string }[] }[] = [
  {
    id: 'service',
    title: 'Dịch vụ di động',
    navigations: [{ title: 'Chọn số - Mua sim' }, { title: 'Nạp thẻ' }, { title: 'Gói cước' }]
  },
  {
    id: 'iwow',
    title: 'Ưu đãi iWow',
    navigations: [{ title: 'Ưu đãi iTel Club' }, { title: 'Săn quà iZui' }, { title: 'Chương trình hot' }]
  },
  {
    id: 'imall',
    title: 'Mua sắm',
    navigations: [{ title: 'Điện thoại - Thiết bị' }, { title: 'Thời trang ' }, { title: 'Mẹ và bé' }]
  },
  {
    id: 'other',
    title: 'Khác',
    navigations: [{ title: 'Về iTel' }, { title: 'Tin tức' }, { title: 'Tuyển dụng' }]
  },
  {
    id: 'other_service',
    title: 'Dịch vụ số',
    navigations: [{ title: 'iTel Travel' }, { title: 'iTel Finance' }, { title: 'iTel Health' }]
  },

  {
    id: 'support',
    title: 'Hỗ trợ',
    navigations: [
      { title: 'Theo dõi đơn hàng' },
      { title: 'Kích hoạt sim' },
      { title: 'Mở khóa sim' },
      { title: 'Đổi/Cấp lại sim/ eSim' },
      { title: 'Tải ứng dụng My iTel' }
    ]
  },
  {
    id: 'turtorial',
    title: 'Hướng dẫn',
    navigations: [
      { title: 'Hướng dẫn người dùng' },
      { title: 'Câu hỏi thường gặp' },
      { title: 'Liên hệ' },
      { title: 'Danh sách đại lý' },
      { title: 'Phản hồi - Góp ý' }
    ]
  },
  {
    id: 'qtr',
    title: 'Quy trình',
    navigations: [
      { title: 'Mua bán' },
      { title: 'Điểm bán hàng lưu động' },
      { title: 'Điểm uỷ quyền' },
      { title: 'Quản lý chất lượng dịch vụ' },
      { title: 'Giấy phép cung cấp dịch vụ viễn thông' }
    ]
  },
  {
    id: 'entertainment',
    title: 'Giải trí',
    navigations: [{ title: 'iTel Film' }, { title: 'iTel Game' }]
  }
];

export const foo = [
  { key: 'terms', title: 'Điều khoản bảo mật' },
  { key: 'terms_of_use', title: 'Điều khoản sử dụng' },
  { key: 'privacy_policy', title: 'Quyền riêng tư' }
];

const FooterDefault = ({ className, theme = 'light' }: Props) => {
  return (
    <footer className={className} data-theme={theme}>
      <div className="container pt-10 xl:pt-20">
        <div className="flex flex-col gap-y-10 xl:flex-row">
          <div className="order-3 mb-6 flex flex-wrap justify-between text-subtle-content md:mb-0 md:mr-24 xl:order-2 xl:max-w-xs xl:flex-col">
            <div className="mb-4 w-full">
              <Link href="/" className="mb-4 block h-12">
                <h2>
                  <Svg
                    src="/logo/logo-color.svg"
                    className="h-12 w-28 text-red-500 dark:text-neutral-0"
                    preserveAspectRatio="xMinYMid meet"
                  />
                </h2>
              </Link>
              <p>
                Website chính thức của mạng di động iTel.
                <br />
                Cơ quan chủ quản: Công ty Cổ phần Viễn thông Di động Đông Dương Telecom.
              </p>
              <Link href="/" className="mt-4 flex items-center text-sm font-bold text-base-content">
                <Svg src="/icons/bold/hotline.svg" className="mr-2 inline-block h-5 w-5" />
                0877 087 087
              </Link>
            </div>
            <div className="w-full md:w-auto xl:mt-12 xl:w-full lg:mt-12 md:mt-12">
              <div>Tải ứng dụng My iTel</div>
              <ul className="mt-4 flex gap-4">
                <li>
                  <Link href="/">
                    <ButtonAppStore className="btn max-md:h-10 border-none bg-transparent p-0 text-neutral-0" theme={theme} />
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <ButtonGooglePlay className="btn max-md:h-10 border-none bg-transparent p-0 text-neutral-0" theme={theme} />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:mt-4 w-full md:w-auto xl:w-full md:mt-12">
              <div>Đi cùng iTel</div>
              <ul className="mt-4 flex gap-6">
                <li>
                  <Link href="/">
                    <Svg className="h-8 w-8 dark:text-neutral-0" src="/icons/bold/facebook.svg" />
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <Svg className="h-8 w-8 dark:text-neutral-0" src="/icons/bold/instagram.svg" />
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <Svg className="h-8 w-8 dark:text-neutral-0" src="/icons/bold/twitter.svg" />
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-4 w-full">
              <img src="/images/registed.png" alt="Đã đăng ký" className="h-10" />
            </div>
          </div>
          <div className="order-2 hidden flex-1 grid-cols-1 md:grid-cols-4 md:gap-x-6 md:gap-y-12 xl:grid">
            {data.map(({ id, navigations, title }, index) => {
              return (
                <div key={id} className={[5, 6, 7].includes(index) ? 'row-span-2' : undefined}>
                  <button className="flex w-full items-center justify-between dark:text-neutral-0 border-neutral-200 p-4 max-md:border-b md:mb-4 md:p-0">
                    <h2 role="button" className="select-none font-bold">
                      {title}
                    </h2>
                  </button>
                  <ul className="overflow-hidden text-sm font-medium text-subtle-content transition-all duration-500 ease-out md:block">
                    {navigations.map(({ title, url }, index) => {
                      return (
                        <li key={index} className="p-4 md:p-0 md:pb-4">
                          <Link href={url || '/'} className="hover:underline">
                            {title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
        <hr className="mt-6 border-neutral-200 dark:border-neutral-500 sm:mx-auto xl:mt-14" />
        <div className="sub-footer">
          <ul className="dark:text-gray-400 mt-3 hidden flex-wrap items-center text-sm font-medium sm:mt-0 xl:flex">
            {foo.map(({ key, title }, index) => {
              return (
                <li key={key} className="flex items-center">
                  {index ? <span className="mr-4 inline-block h-1 w-1 rounded-full bg-neutral-500 md:mr-3" /> : null}
                  <Link href="/" className="mr-4 hover:underline md:mr-3 ">
                    {title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="dark:text-gray-400 text-sm sm:text-center xl:mt-0">
            © Copyright 2022{' '}
            <a href="#" className="hover:underline">
              iTel
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default FooterDefault;
