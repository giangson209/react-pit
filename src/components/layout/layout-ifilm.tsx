import { CustomProps } from '@/types/element-type';
import { useRouter } from 'next/router';
import { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import FooterDefault from '../footer/default';
import { INavgationList } from '../header';
import HeaderSecondary from '../header/header-secondary';
import InputSearchWithoutAction from '../input/input-search';

import useBoolean from '@/hooks/useBoolean';
import useDebounced from '@/hooks/useDebounce';
import Routers from '@/routes/routers';

import HeaderNavigation from '../header/header-navigation';
import ModalSharedFilm from '../modal/modal-shared-film';
import SharedFilmSectionSearch from '../section/shared-film-section-search';
import films from '@/mock/film.json';
import { CardFilmItem } from '../card/card-film';
import WidgetScroll from '../scroll/widget-scroll';
import clsx from 'clsx';

type DefaultProps = { isSearchPage?: boolean; title?: string; footerClassName?: string; isHomePage?: boolean };
type Props = CustomProps<DefaultProps>;

export const navigations: INavgationList = [
  {
    id: '0',
    title: 'Phim bộ',
    href: Routers.FILM_SERIES
  },
  {
    id: '1',
    title: 'Phim lẻ',
    href: Routers.FILM_FEATURED
  },
  {
    id: '2',
    title: 'Phổ biến',
    href: Routers.FILM_POPULAR
  },
  {
    id: '3',
    title: 'Phim của tôi',
    href: Routers.FILM_FAVORITE
  }
];

export const filmQuickSearchs = [
  { id: 0, text: 'Tòa án' },
  { id: 1, text: 'Người đẹp Gangnam' },
  { id: 2, text: 'Điên thì có sao' },
  { id: 3, text: 'Mùa hè' },
  { id: 4, text: 'Bom tấn' },
  { id: 5, text: 'Hài hước' },
  { id: 6, text: 'Gia đình' },
  { id: 7, text: 'Học đường' },
  { id: 8, text: 'Hài hước' },
  { id: 9, text: 'Hoàng hậu' },
  { id: 10, text: 'Người đẹp Gangnam' },
  // { id: 11, text: 'Tòa án' },
  // { id: 12, text: 'Mùa hè' },
  // { id: 13, text: 'Bom tấn' },
  // { id: 14, text: 'Hài hước' },
  // { id: 15, text: 'Gia đình' },
  // { id: 16, text: 'Điên thì có sao' },
  // { id: 17, text: 'Điên thì có sao' },
  // { id: 18, text: 'Học đường' }
];

export const IfilmContext = createContext({ quickSearch(v: string) {}, query: '', isShow: false });
const LayoutIFilm = ({ children, isSearchPage, title, footerClassName, isHomePage, ...rest }: Props) => {
  const menu = useBoolean();
  const router = useRouter();
  const search = useBoolean();

  const ref = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const setValue = useCallback(
    (value: string) => {
      setQuery(value);
      const query = value ? { s: value } : {};
      router.push({ href: router.pathname, query: { ...router.query, ...query } }, value ? `/ifilm/search?s=${value}` : router.pathname, {
        shallow: true
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.pathname]
  );

  const [inputValue, setInputValue] = useState<string>('');

  useEffect(() => {
    if (!router.query.s) setValue('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const setTextDebounced = useDebounced(setValue, [], 300, true);
  const onFocus = () => {
    search.setTrue();
  };

  function onQuickSearch(v: string) {
    if (ref.current) ref.current.value = v;
    setValue(v);
    search.setFalse();
  }

  const isShow = !isSearchPage && (Boolean(query) || search.value);

  return (
    <IfilmContext.Provider value={{ quickSearch: onQuickSearch, query, isShow }}>
      <HeaderSecondary
        navigations={navigations}
        isFocus={search.value}
        toggleMenu={menu.toggle}
        theme="dark"
        logo="/logo/ifilm.svg"
        haveCart={false}
        routerLogo={Routers.IFILM}
        isHomePage={isHomePage}
      >
        <InputSearchWithoutAction
          placeholder="The glory"
          className="h-12 w-full bg-neutral-600"
          ref={ref}
          onChange={(e) => {
            setTextDebounced(e.target.value);
            setInputValue(e.target.value);
          }}
          onClear={() => {
            onQuickSearch('');
          }}
          autoFocus={false}
          // onBlur={search.setFalse}
          onFocus={onFocus}
          forceShow={isShow}
          theme="dark"
        >
          <SuggestList inputValue={inputValue} onClick={() => setInputValue('')} />
        </InputSearchWithoutAction>
      </HeaderSecondary>
      <HeaderNavigation
        onClose={menu.toggle}
        className={clsx(isHomePage ? 'pt-[4.5rem]' : 'pt-16', 'md:pt-[7.5rem]')}
        isShow={menu.value}
        navigations={navigations}
      />
      <main {...rest}>{children}</main>
      <FooterDefault className={footerClassName} theme="dark" />
      {isShow && (
        <ModalSharedFilm onClose={() => void 0}>
          <div className="h-full overflow-auto pt-4">
            <SharedFilmSectionSearch />
          </div>
        </ModalSharedFilm>
      )}
    </IfilmContext.Provider>
  );
};

type SuggestListProps = {
  inputValue: string;
  onClick: () => void;
};

const SuggestList = ({ inputValue, onClick }: SuggestListProps) => {
  const suggestList = useMemo(() => {
    let data = films.filter((item) => item.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));
    return data;
  }, [inputValue]);

  return (
    <>
      {inputValue.length > 0 && (
        <div className="w-[90%] overflow-auto rounded-xl flex flex-col bg-neutral-700 p-2 absolute h-fit max-h-[19rem] mt-14 right-0 shadow-itel">
          {suggestList.map((item) => (
            <button key={item.id} className="w-full p-4 rounded-lg hover:bg-neutral-800 text-start" onClick={onClick}>
              <span className="text-base text-neutral-0 font-bold">{item.name}</span>
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default LayoutIFilm;
