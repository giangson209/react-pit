import { CustomProps } from '@/types/element-type';
import dynamic from 'next/dynamic';
import { createContext, useCallback, useEffect, useRef, useState } from 'react';
import FooterDefault from '../footer/default';
import HeaderSecondary from '../header/header-secondary';
import InputSearchWithoutAction from '../input/input-search';
import { INavgationList } from '../header';
import Routers from '@/routes/routers';
import useBoolean from '@/hooks/useBoolean';
import HeaderNavigation from '../header/header-navigation';
import { useRouter } from 'next/router';
import useDebounced from '@/hooks/useDebounce';
import ModalShared from '@/components/modal/modal-shared';
import SectionSearchIGame from '@/components/section/section-search-igame';
import HeaderIGame from '@/components/header/header-igame';

const SettingsDrawer = dynamic(() => (process.env.NODE_ENV === 'development' ? import('@/dev/settings') : Promise.resolve(() => null)), {
  ssr: false
});

type DefaultProps = { isSearchPage?: boolean; title?: string; pageMobileTitle?: string };
type Props = CustomProps<DefaultProps>;

export const navigations: INavgationList = [
  {
    id: '0',
    title: 'Hành động',
    href: Routers.IGAME_ACTION
  },
  {
    id: '1',
    title: 'Thể thao',
    href: Routers.IGAME_SPORTS
  },
  {
    id: '2',
    title: 'Trí tuệ',
    href: Routers.IGAME_INTELLECTUAL
  }
];

const recentSearch = [
  { id: 0, text: '0876 686 868' },
  { id: 1, text: 'Nạp thẻ' },
  { id: 2, text: 'Sim số đẹp' },
  { id: 3, text: 'OPPO Reno' },
  { id: 4, text: 'Xem phim' }
];

export const IGameContext = createContext({
  quickSearch(v: string) {},
  query: '',
  isShow: false
});

const LayoutIgame = ({ children, isSearchPage, title, pageMobileTitle = '', ...rest }: Props) => {
  const menu = useBoolean();
  const router = useRouter();
  const search = useBoolean();

  const ref = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const setValue = useCallback(
    (value: string) => {
      setQuery(value);
      const query = value ? { s: value } : {};
      router.push(
        {
          href: router.pathname,
          query: { ...router.query, ...query }
        },
        value ? `/igame/search?s=${value}` : router.pathname,
        {
          shallow: true
        }
      );
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

  const isShow = !isSearchPage && (Boolean(query) || search.value);

  return (
    <IGameContext.Provider value={{ quickSearch: onQuickSearch, query, isShow }}>
      <SettingsDrawer />
      <HeaderIGame
        pageMobileTitle={pageMobileTitle}
        navigations={navigations}
        title={title}
        onClose={menu.setFalse}
        toggleMenu={menu.toggle}
        isFocus={isShow}
      >
        <InputSearchWithoutAction
          placeholder="Game săn mồi"
          className="h-12 w-full"
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
      </HeaderIGame>
      <HeaderNavigation onClose={menu.setFalse} className="pt-24 xl:pt-24" isShow={menu.value} navigations={navigations} />
      <main className="md:bg-neutral-0" {...rest}>
        {children}
      </main>
      <FooterDefault className="bg-neutral-0" />
      {isShow && (
        <ModalShared onClose={() => void 0} defaultUrl={Routers.IGAME}>
          <div className="h-full overflow-auto pt-4">
            <SectionSearchIGame recentSearch={recentSearch} />
          </div>
        </ModalShared>
      )}
    </IGameContext.Provider>
  );
};

export default LayoutIgame;
