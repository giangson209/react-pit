import { Fragment, memo, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';

import Svg from '../icon/svg';
import ContentVietlott from './ContentVietlott';
import { CustomProps } from '@/types/element-type';

type IProps = {
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
};
const PopupService = ({ open, setOpen, handleClose, children }: CustomProps<IProps>) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay-popup bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full lg:items-center md:items-end justify-center p-4 sm:p-0">
            <div className="relative lg:rounded-3xl rounded-t-3xl bg-neutral-0 p-10 mt-12 pb-24 w-full lg:p-0 lg:w-fit overflow-hidden">
              <Svg
                src="/icons/line/close.svg"
                className="absolute right-4 top-4 h-14 w-14 cursor-pointer rounded-full bg-neutral-100 p-4"
                onClick={handleClose}
              />
              {children}
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default memo(PopupService);
