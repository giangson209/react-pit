import { CustomProps } from '@/types/element-type';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Fragment, createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import FooterDefault from '../footer/default';
import { INavgationList } from '../header';
import HeaderSecondary from '../header/header-secondary';
import InputSearchWithoutAction from '../input/input-search';
import ModalShared from '../modal/modal-shared';

import useBoolean from '@/hooks/useBoolean';
import useDebounced from '@/hooks/useDebounce';
import Routers from '@/routes/routers';

import SharedSectionSearch from '../section/shared-section-search';
import { Transition } from '@headlessui/react';
import HeaderNavigation from '../header/header-navigation';
import { modal } from '@/context/modal-context';
import { useGlobalContext } from '@/context/global';
import clsx from 'clsx';
import Svg from '../icon/svg';

const SettingsDrawer = dynamic(() => (process.env.NODE_ENV === 'development' ? import('@/dev/settings') : Promise.resolve(() => null)), {
  ssr: false
});

type DefaultProps = {
  isSearchPage?: boolean;
  title?: string;
  footerClassName?: string;
  headerClassName?: string;
  isHomePage?: boolean;
};
type Props = CustomProps<DefaultProps>;

export const navigations: INavgationList = [
  {
    id: '0',
    title: 'Điện thoại - Thiết bị',
    href: Routers.IMALL_DEVICE
  },
  {
    id: '1',
    title: 'Thời trang',
    href: Routers.IMALL_FASHION
  },
  {
    id: '2',
    title: 'Mẹ và bé',
    href: Routers.IMALL_MOTHER_TO_BABY
  },
  {
    id: '3',
    title: 'Ăn uống',
    href: Routers.IMALL_FOOD
  }
];

export const quickSearchs = [
  { id: 0, text: 'Oppo A16' },
  { id: 1, text: 'Oppo A16' },
  { id: 2, text: 'Bỉm cho bé' },
  { id: 3, text: 'Sữa ngoại' },
  { id: 4, text: 'Iphone XS' },
  { id: 5, text: 'Sạc dự phòng' },
  { id: 6, text: 'Hài hước' },
  { id: 7, text: 'Gia đình' },
  { id: 8, text: 'Học đường' },
  { id: 9, text: 'Hài hước' },
  { id: 10, text: 'Hoàng hậu' },
  { id: 11, text: 'Người đẹp Gangnam' },
  { id: 12, text: 'Tòa án' },
  { id: 13, text: 'Mùa hè' },
  { id: 14, text: 'Bom tấn' },
  { id: 15, text: 'Hài hước' },
  { id: 16, text: 'Gia đình' },
  { id: 17, text: 'Điên thì có sao' },
  { id: 18, text: 'Điên thì có sao' },
  { id: 19, text: 'Học đường' }
];

export const ImalContext = createContext({ quickSearch(v: string) {}, query: '', isShow: false });
const LayoutImall = ({ children, isSearchPage, title, footerClassName, isHomePage, ...rest }: Props) => {
  const router = useRouter();
  const search = useBoolean();
  const { menu } = useGlobalContext();

  const ref = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const setValue = useCallback(
    (value: string) => {
      setQuery(value);
      const query = value ? { s: value } : {};
      router.push({ href: router.pathname, query: { ...router.query, ...query } }, value ? `/imall/search?s=${value}` : router.pathname, {
        shallow: true
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.pathname]
  );

  useEffect(() => {
    if (!router.query.s) setValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const setTextDebounced = useDebounced(setValue, [], 300, true);
  const onFocus = () => {
    search.setTrue();
    menu.setFalse();
  };

  function onQuickSearch(v: string) {
    if (ref.current) ref.current.value = v;
    setValue(v);
    search.setFalse();
  }

  function onGlobalSearch() {
    modal.open({ render: <div></div>, classNameContainer: 'modal-full', transition: false, closeButton: false });
  }

  const isShow = !isSearchPage && (Boolean(query) || search.value);
  return (
    <ImalContext.Provider value={{ quickSearch: onQuickSearch, query, isShow }}>
      <SettingsDrawer />
      <HeaderSecondary navigations={navigations} isFocus={search.value} toggleMenu={menu.toggle} isHomePage={isHomePage}>
        <div className="flex items-center w-full">
          {isShow && (
            <div className="md:hidden -ml-2 mr-1">
              <button type="button" className="h-10 w-10 rounded-full center-by-grid" onClick={() => setQuery('')}>
                <Svg src="/icons/line/arrow-left.svg" width={24} height={24} />
              </button>
            </div>
          )}
          <InputSearchWithoutAction
            placeholder="Tìm sản phẩm theo nhu cầu của bạn"
            className="h-10 md:h-12 w-full flex-1"
            ref={ref}
            onChange={(e) => {
              setTextDebounced(e.target.value);
            }}
            onClear={() => {
              onQuickSearch('');
            }}
            autoFocus={false}
            onFocus={onFocus}
            forceShow={isShow}
          />
        </div>
      </HeaderSecondary>
      <HeaderNavigation
        onClose={menu.toggle}
        className={clsx(isHomePage ? 'pt-[6rem]' : 'pt-16', 'md:pt-[6rem]')}
        isShow={menu.value}
        navigations={navigations}
      />

      <main {...rest}>{children}</main>
      <FooterDefault className={footerClassName} />
      {isShow && (
        <ModalShared onClose={() => void 0}>
          <div className="h-full overflow-auto pt-4">
            <SharedSectionSearch />
          </div>
        </ModalShared>
      )}
    </ImalContext.Provider>
  );
};

export default LayoutImall;
