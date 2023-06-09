import React from 'react';
import Svg from '../icon/svg';
import { useModal } from '@/context/modal-context';
import Modal from './modal';

type ModalConfirmOptions<T = unknown> = {
  title: string;
  desc?: string;
  content?: React.ReactNode | ((props: { close(): void; done(data: T): void }) => React.ReactNode);
  confirmLable?: string;
  rejectLable?: string;
  onClose?(): void;
  onDone?(): void;

  type?: 'middle' | 'middle-sheet';
};
const ModalConfirm = ({ title, content, confirmLable, desc, onClose, onDone, rejectLable, type }: ModalConfirmOptions) => {
  const { close, done } = useModal();

  return type === 'middle' ? (
    <div className="space-y-4 md:space-y-8">
      <Modal.Heading title={title} desc={desc} />
      <Modal.ModalContent className="whitespace-pre-line text-subtle-content">
        {typeof content === 'function' ? content({ close, done }) : content}
      </Modal.ModalContent>
      {(rejectLable || confirmLable) && (
        <Modal.ModalActions className="-mx-1.5 md:-mx-2 flex justify-center pt-2 md:pt-0">
          {rejectLable && (
            <div className="w-1/2 px-1.5 md:px-2">
              <button
                type="button"
                onClick={close}
                className="transition-default btn-secondary btn text-sm md:text-base md:btn-lg w-full rounded-full px-0"
              >
                {rejectLable}
              </button>
            </div>
          )}
          {confirmLable && (
            <div className="w-1/2 px-1.5 md:px-2">
              <button
                type="button"
                onClick={done}
                className="transition-default btn-primary btn text-sm md:text-base md:btn-lg w-full rounded-full px-0"
              >
                {confirmLable}
              </button>
            </div>
          )}
        </Modal.ModalActions>
      )}
    </div>
  ) : (
    <div className="px-4 pb-24 pt-6 md:p-0">
      <div className="flex items-center">
        <h2 className="text-xl md:text-s-md font-bold">{title}</h2>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <p className="mt-4 md:mt-8 text-subtle-content"> {typeof content === 'function' ? content({ close, done }) : content}</p>
      <div className="fixed left-0 bottom-0 md:relative w-full py-2 md:py-0 bg-neutral-0 mt-0 md:mt-8">
        <div className="flex -mx-1.5 px-4 md:px-0">
          {rejectLable && (
            <div className="w-1/2 px-1.5">
              <button type="button" onClick={close} className="transition-default h-11 btn-secondary btn md:btn-lg w-full rounded-full">
                {rejectLable}
              </button>
            </div>
          )}
          {confirmLable && (
            <div className="w-1/2 px-1.5">
              <button type="button" onClick={done} className="transition-default h-11 btn-primary btn md:btn-lg w-full rounded-full">
                {confirmLable}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalConfirm;
