import { ReactTag } from '@/types/element-type';
import { forwardRefWithAs } from '@/utilities/render';
import { Dialog, DialogPanelProps, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Fragment, useRef } from 'react';
import Svg from '../icon/svg';

export type ModalProps = {
  open?: boolean;

  children?: React.ReactNode;
  footer?: React.ReactNode;
  transition?: boolean | any;

  className?: string;
  classNameOverlay?: string;
  overwrite?: boolean;
  appear?: boolean;
  done?(): void;
  hideOnClickOutSide?: boolean;
  setOpen?(open: boolean): void;
};
export default function Modal({
  open,
  setOpen = () => {},
  className = 'p-4 sm:p-0 items-center sm:items-center',
  classNameOverlay = 'bg-neutral-900 bg-opacity-50',
  footer,
  children,
  appear,
  done,
  transition = true
}: ModalProps) {
  const cancelButtonRef = useRef(null);
  return (
    <Transition.Root show={open} as={Fragment} appear={appear} afterLeave={done}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={setOpen}>
        {transition ? (
          <TransitionOrDiv transition>
            <div className={clsx('fixed inset-0 transition-opacity', classNameOverlay)} />
          </TransitionOrDiv>
        ) : (
          <div className={clsx('fixed inset-0 transition-opacity', classNameOverlay)} />
        )}

        <div className="fixed inset-0 z-1 overflow-y-auto">
          <div className={clsx('modal', className)}>
            <TransitionOrDiv transition={transition}>{children}</TransitionOrDiv>
          </div>
          {footer && <TransitionOrDiv transition={transition}>{footer}</TransitionOrDiv>}
        </div>
      </Dialog>
    </Transition.Root>
  );
}

function TransitionOrDiv({ children, transition }: { children?: React.ReactNode; transition?: boolean | any }) {
  const transitionParams =
    typeof transition === 'boolean'
      ? {
          enter: 'ease-out duration-200',
          enterFrom: 'opacity-0',
          enterTo: 'opacity-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100',
          leaveTo: 'opacity-0'
        }
      : transition;
  return transition ? (
    <Transition.Child as={Fragment} {...transitionParams}>
      {children}
    </Transition.Child>
  ) : (
    <Fragment>{children}</Fragment>
  );
}

type ModalContentProps = {
  children?: React.ReactNode;
  className?: string;
  overwrite?: boolean;
  onClose?(): void;
};
export const ModalBody = forwardRefWithAs(function ModalBody<TTag extends ReactTag>(
  { className = 'modal-box', overwrite, children, onClose, ...rest }: ModalContentProps & DialogPanelProps<TTag>,
  ref: any
) {
  return (
    <Dialog.Panel className={clsx(overwrite ? undefined : 'relative', className)} ref={ref} {...rest}>
      {children}
      {onClose && (
        <button
          className="btn-tertiary btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:bg-neutral-0 xl:hover:bg-neutral-50"
          type="button"
          onClick={onClose}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      )}
    </Dialog.Panel>
  );
});

export const ModalTitle = Dialog.Title;

export const ModalContent = 'div';

Modal.ModalBody = ModalBody;
Modal.ModalTitle = ModalTitle;
Modal.Heading = function ModalHeading({ title, desc }: { title: string; desc?: string }) {
  return (
    <div>
      <Dialog.Title className="text-xl md:text-s-md font-bold">{title}</Dialog.Title>
      {desc && <Dialog.Description className="mt-2 text-subtle-content">{desc}</Dialog.Description>}
    </div>
  );
};

Modal.ModalContent = 'div' as 'div';
Modal.ModalActions = 'footer' as 'footer';
