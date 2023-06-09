import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Fragment, useMemo, useRef, useState } from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/router';
import Avatar from '../avatar/avatar';
import Svg from '../icon/svg';

import { locales } from '@/configs/locales';
import { useGlobalContext } from '@/context/global';
import useBoolean from '@/hooks/useBoolean';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import Routers from '@/routes';

import { selectCartItems, selectCartSimItems, getTotalItemInCart } from '@/store/cart/selector';
import { useAppSelector } from '@/store/hooks';

import { INavgationList } from '.';
import HeaderNavigation from './header-navigation';
import { NavigationItem } from './navigation-item';

type Props = {
  toggleMenu?(): void;
  isMenuShow?: boolean;
  isHomePage?: boolean;
};

const tabs = [
  { id: 0, title: 'personal' },
  { id: 1, title: 'collaborate' },
  { id: 2, title: 'enterprise' }
];

export interface INavigationItem {
  title: string;
  description?: string;
  href: string;
  icon?: string;
  childs?: Omit<INavigationItem, 'childs'>[];
}

export const navigations: INavgationList = [
  {
    id: 'service',
    title: 'Dịch vụ di động',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Chọn số - Mua Sim',
        description: 'Kho sim số đẹp, phong thủy',
        href: Routers.SIM,
        icon: '/icons/bold/sim.svg',
        childs: [
          { title: 'Kho Sim iTel', href: Routers.SIM },
          { title: 'Sim phong thủy', href: Routers.SIM_FENG_SHUI },
          { title: 'Sim thần số học', href: Routers.SIM_NUMEROLOGY },
          { title: 'Sim ưu đãi', href: Routers.SIM_COUPLE }
        ]
      },
      {
        title: 'Gói cước',
        description: 'Data thả ga, miễn phí gọi nội mạng',
        href: Routers.DATA,
        icon: '/icons/bold/pack-of-data.svg'
      },
      {
        title: 'Nạp thẻ',
        description: 'Nhanh chóng, thuận tiện, nhiều ưu đãi',
        href: Routers.RECHARGE,
        icon: '/icons/bold/recharge-card.svg'
      }
    ]
  },
  {
    id: 'iwow',
    title: 'Ưu đãi iWow',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Ưu đãi iTel Club',
        description: 'Đổi điểm tích tắc, nhận ngàn voucher',
        href: Routers.IWOW_CLUB,
        icon: '/icons/bold/iclub.svg'
      },
      {
        title: 'Săn quà iZui',
        description: 'Chơi game zui, tích điểm lớn, nhận quà hay',
        href: Routers.IWOW_IZUI,
        icon: '/icons/bold/izui.svg'
      },
      {
        title: 'Chương trình hot',
        description: 'Mới ưu đãi, nóng khuyến mại',
        href: Routers.IWOW_HOT,
        icon: '/icons/bold/tag-hot.svg'
      }
    ]
  },
  {
    id: 'imall',
    title: 'Mua sắm',
    href: Routers.IMALL,
    header: true,
    childs: [
      {
        title: 'Điện thoại - Thiết bị',
        description: 'Sắm đồ công nghệ, ghé shop iTel',
        href: Routers.IMALL_DEVICE,
        icon: '/icons/bold/mobile.svg'
      },
      {
        title: 'Thời trang',
        description: 'Thỏa thích shopping, đồ xinh quá trời',
        href: Routers.IMALL_FASHION,
        icon: '/icons/bold/fashion.svg'
      },
      {
        title: 'Mẹ và bé',
        description: 'Mẹ có deal ngon, bé có đồ mới',
        href: Routers.IMALL_MOTHER_TO_BABY,
        icon: '/icons/bold/mom-and-baby.svg'
      },
      {
        title: 'Ẩm thực',
        description: 'Voucher nóng hổi, vừa thổi vừa xơi',
        href: Routers.IMALL_FOOD,
        icon: '/icons/bold/food.svg'
      }
    ]
  },
  {
    id: 'entertainment',
    title: 'Giải trí',
    href: '/',
    header: true,
    childs: [
      {
        title: 'iTel Film',
        description: 'Phim hay, xem ngay miễn phí',
        href: '/ifilm',
        icon: '/icons/bold/itel-movie.svg'
      },
      {
        title: 'iTel Game',
        description: 'Làm chủ cuộc chơi, đua top nhận quà',
        href: Routers.IGAME,
        icon: '/icons/bold/itel-game.svg'
      }
    ]
  },
  {
    id: 'digital',
    title: 'Dịch vụ số',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Du lịch & di chuyển',
        description: 'Săn vé rẻ, đặt phòng nhanh ',
        href: Routers.ITRAVEL_SERVIVE,
        icon: '/icons/bold/travel.svg'
      },
      {
        title: 'Tài chính & bảo hiểm',
        description: 'Tiết kiệm, vay & mua bảo hiểm dễ dàng',
        href: Routers.IFINANCE_SERVIVE,
        icon: '/icons/bold/insurance-finance.svg'
      },
      {
        title: 'Y tế & sức khỏe',
        description: 'Dịch vụ chăm sóc sức khỏe',
        href: Routers.IHEALTH_SERVIVE,
        icon: '/icons/bold/itel-health.svg'
      },
      {
        title: 'Xổ số Vietlott',
        description: 'Ghé iTel, gặp vận đỏ',
        href: Routers.IFINANCE_VIETLOTT_SERVIVE,
        icon: '/icons/bold/lottery.svg'
      }
    ]
  },
  {
    id: 'support',
    title: 'Hỗ trợ',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Theo dõi đơn hàng',
        description: 'Cập nhật tình trạng đơn hàng của bạn',
        href: Routers.TRACKING_ORDER,
        icon: '/icons/bold/tracking-order-bold.svg'
      },
      {
        title: 'Kích hoạt sim',
        description: 'Dành cho khách hàng đăng ký Sim mới',
        href: Routers.ACTIVATE_SIM,
        icon: '/icons/bold/sim-activation.svg'
      },
      {
        title: 'Cập nhật thông tin thuê bao',
        description: 'Dễ dàng thay đổi thông tin chính chủ',
        href: Routers.SUBSCRIBER_INFORMATION,
        icon: '/icons/bold/sim-update.svg'
      },
      {
        title: 'Đổi/Cấp lại Sim/ eSim',
        description: 'Dành cho khách hàng cần cấp lại Sim/ eSim',
        href: Routers.CHANGE_SIM,
        icon: '/icons/bold/sim-exchange.svg'
      },
      {
        title: 'Mở khóa sim',
        description: 'Dành cho khách hàng bị khóa Sim',
        href: Routers.UNLOCK_SIMS,
        icon: '/icons/bold/sim-unlock.svg'
      },
      {
        title: 'Tải ứng dụng My iTel',
        description: 'Mở My iTel - Một chạm vạn tiện ích',
        href: Routers.DOWNLOAD_ITEL,
        icon: '/icons/bold/my-itel.svg'
      }
    ]
  },
  {
    id: 'turtorial',
    title: 'Hướng dẫn',
    href: '/',
    header: true,
    childs: [
      {
        title: 'Hướng dẫn người dùng',
        description: 'Đơn giản, dễ hiểu, xem là biết',
        href: '#',
        icon: '/icons/bold/guide.svg'
      },
      {
        title: 'Câu hỏi thường gặp',
        description: 'Bạn hỏi, iTel trả lời',
        href: '#',
        icon: '/icons/bold/question.svg'
      },
      {
        title: 'Điểm dịch vụ khách hàng',
        description: 'Điểm phân phối Sim & dịch vụ khách hàng',
        href: '#',
        icon: '/icons/bold/shop.svg'
      },
      {
        title: 'Liên hệ',
        description: 'Giải đáp rõ ràng, hỗ trợ nhanh chóng',
        href: '#',
        icon: '/icons/bold/contact.svg'
      },
      {
        title: 'Phản hồi - Góp ý',
        description: 'iTel sẵn sàng nhận góp ý của bạn',
        href: '#',
        icon: '/icons/bold/feedback.svg'
      }
    ]
  }
  // {
  //   id: 'qtr',
  //   title: 'Quy trình',
  //   header: false,
  //   href: '/',
  //   childs: [
  //     { title: 'Mua bán', href: '#' },
  //     { title: 'Điểm bán hàng lưu động', href: '#' },
  //     { title: 'Điểm uỷ quyền', href: '#' },
  //     { title: 'Quản lý chất lượng dịch vụ', href: '#' },
  //     { title: 'Giấy phép cung cấp dịch vụ viễn thông', href: '#' }
  //   ]
  // }
];

const HeaderDefault = ({ toggleMenu, isMenuShow, isHomePage }: Props) => {
  const { status, toggleModalAuth } = useGlobalContext();
  const { value: isShowLang, setTrue: showLang, setFalse: hideLang } = useBoolean(false);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const totalItem = useAppSelector(getTotalItemInCart);
  const ref = useRef<HTMLButtonElement>(null);
  useOnClickOutside(ref, hideLang);

  const router = useRouter();
  const currentLocale = useMemo(() => {
    return router.locale ? locales.find((l) => l.locale === router.locale) : locales[0];
  }, [router.locale]);

  const { t } = useTranslation('common');

  const isLoggedIn = status === 'authenticated';

  return (
    <>
      <nav className={clsx(isHomePage ? '' : 'max-md:hidden', 'md:block sticky top-0 z-50 w-full')} data-theme="light">
        <div id="subheader" className="hidden md:block" data-theme="dark">
          <div className="container flex items-center justify-between text-sm">
            <ul className="flex font-bold">
              {tabs.map((tab) => {
                return (
                  <li key={tab.id}>
                    <button
                      className={clsx(
                        'transition-default h-10 border-b-2 border-transparent px-6 capitalize',
                        tab.id === selectedTab.id ? 'border-red-300 bg-red-500' : 'hover:bg-neutral-600'
                      )}
                      onClick={() => setSelectedTab(tab)}
                    >
                      {t(tab.title)}
                    </button>
                  </li>
                );
              })}
            </ul>
            <div className="hidden align-middle xl:block">
              <span>Tận hưởng trọn vẹn.</span>
              <Link href="/" className="ml-2 font-bold text-yellow-400 hover:underline">
                Tải ngay My iTel
              </Link>
            </div>
            <div className="relative flex items-center">
              <div className="tabs text-sm">
                <a className="tab">Về iTel</a>
                <Link className="tab" href={Routers.NEWS}>
                  Tin tức
                </Link>
                <a className="tab">Tuyển dụng</a>
              </div>
              <button ref={ref} onClick={showLang} className="btn btn-sm h-7 rounded px-3 font-normal uppercase" data-theme="light">
                {currentLocale?.short}
              </button>
              <div
                className={clsx(
                  isShowLang ? 'pointer-events-auto' : 'pointer-events-none opacity-0',
                  'transition-default absolute right-0 top-full z-10 rounded-md'
                )}
                data-theme="light"
              >
                <ul className="menu w-52 p-2 font-bold">
                  {locales.map((locale) => (
                    <li key={locale.locale}>
                      <Link href={router.asPath} locale={locale.locale} className="flex justify-between rounded-md p-4">
                        <span> {locale.title}</span>
                        {router.locale === locale.locale ? (
                          <span>
                            <Svg src="/icons/line/check.svg" className="h-4 w-4 text-red-500" />
                          </span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="relative border-b border-neutral-200 bg-neutral-0">
          <div className="container flex items-center py-3 md:py-4 xl:py-3">
            <div>
              <Link href="/">
                <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
              </Link>
            </div>
            <ul className="ml-10 hidden flex-grow items-baseline space-x-10 text-sm font-bold xl:flex">
              {navigations.map(({ title, href, childs, header }, index) => {
                if (!header) return null;
                return (
                  <li key={index} className="group relative py-3.5">
                    <Link href={href} className="text-xs hover:text-red-500 2xl:text-sm">
                      {title}
                    </Link>
                    {childs?.length ? (
                      <div className="transition-default pointer-events-none absolute w-max max-w-md rounded-xl opacity-0 shadow-itel group-hover:pointer-events-auto group-hover:opacity-100">
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
            <div className="ml-10 flex flex-1 justify-end gap-x-4 whitespace-nowrap tooltip-light">
              <button className={clsx(isMenuShow ? 'md:hidden' : 'hidden', 'transition-default btn-tertiary btn rounded-full')}>
                {currentLocale?.short}
              </button>
              <button
                type="button"
                className={clsx(isMenuShow ? 'max-md:hidden' : '', 'transition-default btn-tertiary btn btn-circle tooltip')}
              >
                <Svg src="/icons/bold/vector.svg" className="h-6 w-6" />
                <span className="tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">Tìm kiếm</span>
              </button>
              <button type="button" className="transition-default btn-tertiary btn btn-circle tooltip hidden">
                <Svg src="/icons/bold/package.svg" className="h-6 w-6" />
                <span className="tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">Theo dõi đơn hàng</span>
              </button>
              <Link
                href={Routers.CART}
                className={clsx('transition-default btn-tertiary btn btn-circle tooltip', isMenuShow ? '' : 'max-md:hidden')}
              >
                <Svg src="/icons/bold/cart.svg" className="h-6 w-6" />
                <span className="tooltip-bottom pointer-events-none drop-shadow-itel tooltip-text">Giỏ hàng của bạn</span>
                <span className="badge badge-sm badge-center absolute -right-0.5 -top-0.5 w-4 rounded-full bg-red-500 ring-1 ring-neutral-0">
                  <span>{totalItem}</span>
                </span>
              </Link>
              {isLoggedIn ? (
                <button type="button" className="flex">
                  <Avatar
                    alt="Avatar"
                    img="https://i.pinimg.com/originals/ba/92/7f/ba927ff34cd961ce2c184d47e8ead9f6.jpg"
                    className="w-12 rounded-full"
                    noti={6}
                  />
                </button>
              ) : (
                <button type="button" className="transition-default btn-primary btn rounded-full max-md:hidden" onClick={toggleModalAuth}>
                  Đăng nhập
                </button>
              )}
              <button className="btn-tertiary btn btn-circle xl:hidden" onClick={toggleMenu}>
                <Svg src={isMenuShow ? '/icons/line/close.svg' : '/icons/line/menu.svg'} className="h-6 w-6"></Svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default HeaderDefault;
