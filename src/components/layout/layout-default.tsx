import dynamic from 'next/dynamic';
import React, { Fragment, PropsWithChildren } from 'react';
import ChatBoxLazy from '../chat/chat-box-lazy';
import FooterDefault from '../footer/default';
import HeaderDefault, { navigations } from '../header/header-default';
import HeaderNavigation from '../header/header-navigation';
import { useGlobalContext } from '@/context/global';
import clsx from 'clsx';

const SettingsDrawer = dynamic(() => (process.env.NODE_ENV === 'development' ? import('@/dev/settings') : Promise.resolve(() => null)), {
  ssr: false
});

type DefaultProps = {
  footerClassName?: string;
  isHomePage?: boolean;
};
type Props = PropsWithChildren<DefaultProps & Omit<JSX.IntrinsicElements['main'], keyof DefaultProps>>;

const LayoutDefault = ({ children, footerClassName, isHomePage, ...rest }: Props) => {
  const { menu } = useGlobalContext();
  return (
    <Fragment>
      <SettingsDrawer />
      <HeaderDefault isHomePage={isHomePage} isMenuShow={menu.value} toggleMenu={menu.toggle} />
      <HeaderNavigation
        onClose={menu.toggle}
        className={clsx(isHomePage ? 'pt-[4.5rem]' : 'pt-16', 'md:pt-[7.5rem]')}
        isShow={menu.value}
        navigations={navigations}
      />

      <main {...rest}>{children}</main>
      <FooterDefault className={footerClassName} />
    </Fragment>
  );
};

export function LayoutWithChatBox(page: React.ReactNode) {
  return (
    <>
      <LayoutDefault footerClassName="bg-neutral-0">{page}</LayoutDefault>
      <ChatBoxLazy />
    </>
  );
}

export default LayoutDefault;
