/* eslint-disable react-hooks/exhaustive-deps */
import ModalAuth from '@/components/modal/modal-auth';
import Modal from '@/components/modal/modal';
import useBoolean, { UseBooleanOutput } from '@/hooks/useBoolean';
import { loadFromLocal } from '@/store/cart/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ModalProvider, modal } from './modal-context';
import { Router, useRouter } from 'next/router';

type Props = {
  children?: React.ReactNode;
};

type WithAuth<T extends (...args: any) => void> = (cb: T, deps: any[]) => T;

type GlobalContextState = {
  status: 'loading' | 'authenticated' | 'unauthenticated';
  withAuth<T extends (...args: any) => void>(cb: T, deps: any[]): T;
  showModalAuth(): void;
  hideModalAuth(): void;
  toggleModalAuth(): void;
  menu: UseBooleanOutput;
};
const GlobalContext = createContext<GlobalContextState>({
  status: 'unauthenticated',
  withAuth: (cb) => cb,
  showModalAuth() {},
  hideModalAuth() {},
  toggleModalAuth() {},
  menu: {} as any
});
const GlobalProvider = ({ children }: Props) => {
  const router = useRouter();
  // const modal = useBoolean(false);
  const [status, setStatus] = useState<'loading' | 'authenticated' | 'unauthenticated'>('unauthenticated');
  const dispatch = useAppDispatch();
  const menu = useBoolean(false);

  const handleMoldalAuth = () => {
    modal.open({
      render: <ModalAuth />,
      onDone(data) {
        setStatus('authenticated');
        // modal.setFalse();
      },
      transition: false,
      className: 'modal-box shadow-itel md:max-w-[35rem]',
      classNameContainer: 'modal-full md:modal-middle',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const withAuth: WithAuth<any> = useCallback(
    function (cb, deps) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useCallback(
        (...args: any[]) => {
          if (status !== 'authenticated') return handleMoldalAuth();
          return cb(...args);
        },
        [status, ...deps]
      );
    },
    [status]
  );
  useEffect(() => {
    dispatch(loadFromLocal());
  }, []);
  useEffect(() => {
    Router.events.on('routeChangeComplete', menu.setFalse);
    return () => {
      Router.events.off('routeChangeComplete', menu.setFalse);
    };
  }, []);
  useEffect(() => {
    const initWidth = innerWidth;
    function handleResize() {
      if (innerWidth !== initWidth) menu.setFalse();
    }
    if (menu.value) {
      window.addEventListener('resize', handleResize);
      document.scrollingElement?.setAttribute('style', 'overflow:hidden');
    } else document.scrollingElement?.setAttribute('style', '');
    return () => {
      window.removeEventListener('resize', handleResize);
      document.scrollingElement?.setAttribute('style', '');
    };
  }, [menu.value]);

  return (
    <GlobalContext.Provider value={{ status, withAuth, showModalAuth() {}, hideModalAuth() {}, toggleModalAuth: handleMoldalAuth, menu }}>
      {children}
      {/* <Modal open={modal.value}>
        <Modal.ModalBody className="w-full max-w-[35rem] rounded-lg bg-neutral-0 p-10" onClose={modal.setFalse}>
          <ModalAuth
            onValid={() => {
              setStatus('authenticated');
              modal.setFalse();
            }}
          />
        </Modal.ModalBody>
      </Modal> */}
      <ModalProvider />
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider;
