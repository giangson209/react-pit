import { Fragment, memo, useRef } from 'react';

import { Dialog, Transition } from '@headlessui/react';
import { Data } from '@/types/model';

import Svg from '../icon/svg';
import DetailVoucher from './DetailVoucher';

type IProps = {
  data: Data.VoucherDetail;
  open: boolean;
  setOpen: (e: boolean) => void;
  handleClose: () => void;
};
const PopupViewDetailVoucher = ({ open, setOpen, data, handleClose }: IProps) => {
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

        <div className="fixed inset-0 z-10">
          {/* <div className="flex min-h-full items-end justify-center md:p-4 sm:items-center p-0"> */}
          <div className="relative md:rounded-3xl bg-neutral-0 md:p-10 md:mt-12 pb-24 w-full md:mb-27 md:modal-bottom-sheet">
            <Svg
              src="/icons/line/close.svg"
              className="absolute md:right-4 md:top-4 md:h-14 md:w-14 cursor-pointer rounded-full bg-neutral-100 md:p-4 z-10 left-2 md:left-auto top-3 w-10 h-10 p-2"
              onClick={handleClose}
            />
            <div className="lg:container">
              <DetailVoucher {...data} isPopup />
            </div>
          </div>
          {/* </div> */}
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default memo(PopupViewDetailVoucher);
