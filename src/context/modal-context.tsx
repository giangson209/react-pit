import { Logger } from '@/utilities/logger';
import { isNumber, isString } from '@/utilities/validator';
import React, { useCallback, useEffect, useRef, useState, createContext, useContext } from 'react';
import Modal from '@/components/modal/modal';
import { Router } from 'next/router';
import ModalConfirm from '@/components/modal/modal-confirm';
import { sleep } from '@/utilities/time';

export enum Event {
  Show = 'show',
  Close = 'close',
  Cancel = 'cancel',
  Confirm = 'confirm',
  Resolve = 'Resolve',
  Reject = 'Reject',
  DidMount = 'DidMount',
  WillUnmount = 'WillUnmount'
}

type Callback = (...args: any[]) => any | Promise<any>;
type EventManager<E> = {
  queue: any[];
  list: Map<E, Callback[]>;
  emitQueue: Map<E, NodeJS.Timeout[]>;

  on(event: E, callback: Callback): EventManager<E>;
  off(event: E, callback?: Callback): EventManager<E>;
  cancelEmit(event: E): EventManager<E>;
  emit(event: E, ...args: any[]): void;
};

function createEventManager<E extends string | number | symbol>() {
  const eventManager: EventManager<E> = {
    queue: [],
    list: new Map(),
    emitQueue: new Map(),
    on(event, callback) {
      // console.log('on', event);
      this.list.has(event) || this.list.set(event, []);
      this.list.get(event)!.push(callback);
      return this;
    },

    off(event, callback) {
      // console.log('off', event);
      if (callback) {
        const cb = this.list.get(event)!.filter((cb) => cb !== callback);
        this.list.set(event, cb);
        return this;
      }
      this.list.delete(event);
      return this;
    },
    cancelEmit(event) {
      const timers = this.emitQueue.get(event);
      if (timers) {
        // console.log('has timers', event);
        timers.forEach(clearTimeout);
        this.emitQueue.delete(event);
      }

      return this;
    },

    emit(event, ...args) {
      // console.log(event);
      this.list.has(event) &&
        this.list.get(event)!.forEach((callback: Callback) => {
          const timer: NodeJS.Timeout = setTimeout(() => {
            callback(...args);
          }, 0);

          this.emitQueue.has(event) || this.emitQueue.set(event, []);
          this.emitQueue.get(event)!.push(timer);
        });
    }
  };
  return eventManager as EventManager<E>;
}
type ContainerInstance = {
  id?: Id | null;
  count: number;
  props: ModalProviderProps;
  queue: any[];
};
const containers = new Map<Id | ContainerInstance, ContainerInstance>();
const eventManager = createEventManager<Event>();

type Id = string | number;

type ModalRenderProps<T = unknown> = {
  close(): void;
  done(data: T): void | Promise<any>;
};
type ModalOptions<T = unknown> = {
  modalId?: Id;
  render: React.ReactNode | ((props: ModalRenderProps<T>) => React.ReactNode);
  /**
   * default true
   */
  transition?: boolean | {};
  classNameContainer?: string;
  classNameContainerOverwrite?: boolean;
  className?: string;
  classNameOverwrite?: boolean;
  classNameOverlay?: string;
  onClose?(): void;
  onDone?(data: T): void | Promise<any>;
  hideOnClickOutside?: boolean;

  closeButton?: boolean;
};
type ModalProviderProps = {};
type ModalOptionsInternal<T = unknown> = Omit<ModalOptions<T>, 'modalId'> & { modalId: Id };
type ModalProps<T = unknown> = ModalOptionsInternal<T> &
  ModalRenderProps<T> & {
    deleteModal(): void;
  };
type Modal = {
  content: React.ReactNode;
  data: ModalProps;
};
type ModalConfirmOptions<T = unknown> = {
  title: string;
  desc?: string;
  content?: React.ReactNode | ((props: ModalRenderProps<T>) => React.ReactNode);
  render?: React.ReactNode | ((props: ModalRenderProps<T>) => React.ReactNode);
  confirmLable?: string;
  rejectLable?: string;
  onClose?(): void;
  onDone?(): void;

  type?: 'middle' | 'middle-sheet';
};

const logger = new Logger('Modal');
function dispatchModal<T = unknown>(options: ModalOptions<T>) {
  if (containers.size > 0) eventManager.emit(Event.Show, mergeOptions(options));
  else queue.push(options);
}

/**
 *
 * @param options
 * @returns
 */
function modal(options: ModalOptions) {
  return dispatchModal(options);
}

let MODAL_ID = 1;
/**
 * Generate a random id
 */
function generateModalId() {
  return `${MODAL_ID++}`;
}
function getModalId(options?: ModalOptions) {
  return options && (isString(options.modalId) || isNumber(options.modalId)) ? options.modalId : generateModalId();
}

function mergeOptions(options: ModalOptions) {
  return {
    ...options,
    modalId: getModalId(options)
  };
}
let queue: ModalOptions[] = [];

eventManager
  .on(Event.DidMount, (containerInstance: ContainerInstance) => {
    containers.set(containerInstance.id || containerInstance, containerInstance);
    // console.log('Didmount', containers.size);
    queue.forEach((item) => {
      eventManager.emit(Event.Show, item);
    });

    queue = [];
  })
  .on(Event.WillUnmount, (containerInstance: ContainerInstance) => {
    containers.delete(containerInstance.id || containerInstance);
    // console.log('delete instance');

    if (containers.size === 0) {
      eventManager.off(Event.Show);
      // .off(Event.Clear)
      // .off(Event.ClearWaitingQueue);
    }
  });

modal.open = dispatchModal;
modal.confirm = function ({
  title,
  desc,
  confirmLable,
  content,
  render,
  rejectLable,
  onClose,
  onDone,
  type = 'middle'
}: ModalConfirmOptions) {
  const options =
    type === 'middle'
      ? {
          className: 'modal-box max-w-[35rem]'
        }
      : {
          classNameOverwrite: true,
          transition: false,
          className: 'modal-box shadow-itel md:max-w-[35rem]',
          classNameContainer: 'modal-bottom-sheet md:modal-middle',
          classNameOverlay: 'bg-neutral-900 bg-opacity-50'
        };
  return dispatchModal({
    render: <ModalConfirm {...{ title, desc, confirmLable, content, render, rejectLable, type }} />,
    closeButton: true,
    ...options,
    onClose,
    onDone
  });
};

const ModalContext = createContext({ modalId: 0 as Id } as ModalProps);
export function useModal<T = unknown>() {
  return useContext(ModalContext as React.Context<ModalProps<T>>);
}
// export default modal;
export const ModalProvider = (props: ModalProviderProps) => {
  const [modalIds, setModalIds] = useState<Record<Id, boolean>>({});
  const modalToRender = useRef(new Map<Id, Modal>()).current;
  const instance = useRef<ContainerInstance>({
    count: 0,
    queue: [],
    props,
    id: null
  }).current;

  const removeModal = (modalId?: Id) => {
    modalId == null
      ? setModalIds({})
      : setModalIds((state) => {
          const { [modalId]: remove, ...newState } = state;
          return newState;
        });
  };
  /**
   * check if a container is attached to the dom
   * check for multi-container, build only if associated
   * check for duplicate toastId if no update
   */
  const isNotValid = useCallback(
    (options: ModalOptionsInternal) => {
      return modalToRender.has(options.modalId);
    },
    [modalToRender]
  );

  const appendModal = useCallback(
    (content: React.ReactNode, modalProps: ModalProps) => {
      const { modalId } = modalProps;
      modalToRender.set(modalId, { content, data: modalProps });
      setModalIds((state) => ({ ...state, [modalId]: true }));
    },
    [modalToRender]
  );
  const buildModal = useCallback(
    function Modal(options: ModalOptionsInternal) {
      const newOptions = Object.assign({}, { ...options });
      if (isNotValid(newOptions)) return;
      logger.info('Modal normal created', newOptions.modalId);
      const Render = newOptions.render;
      const modalRenderProps = {
        close() {
          newOptions.onClose?.();
          removeModal(newOptions.modalId);
        },
        async done(data: unknown) {
          if (newOptions.onDone) await newOptions.onDone(data);
          setTimeout(() => removeModal(newOptions.modalId), 0);
          // removeModal(newOptions.modalId)
        }
      };
      const modalProps: ModalProps = {
        ...newOptions,
        ...modalRenderProps,
        deleteModal() {
          modalToRender.delete(newOptions.modalId);
        }
      };
      const content = typeof Render === 'function' ? Render(modalRenderProps) : Render;
      appendModal(content, modalProps);
    },
    [appendModal, isNotValid, modalToRender]
  );

  const onClose = () => {};

  useEffect(() => {
    eventManager.cancelEmit(Event.WillUnmount).on(Event.Show, buildModal).on(Event.Close, onClose).emit(Event.DidMount, instance);
    return () => {
      modalToRender.clear();
      eventManager.emit(Event.WillUnmount, instance);
    };
  }, [buildModal, instance, modalToRender]);

  useEffect(() => {
    function handleCloseAll() {
      removeModal();
    }
    Router.events.on('routeChangeComplete', handleCloseAll);
    return () => Router.events.off('routeChangeComplete', handleCloseAll);
  }, []);

  return (
    <div id="__modal_root">
      {Array.from(modalToRender.values()).map(({ content, data: props }) => {
        return (
          <ModalContext.Provider key={props.modalId} value={props}>
            <Modal
              open={Boolean(modalIds[props.modalId])}
              setOpen={props.hideOnClickOutside ? props.close : () => void 0}
              done={props.deleteModal}
              className={props.classNameContainer}
              overwrite={props.classNameContainerOverwrite}
              classNameOverlay={props.classNameOverlay}
              transition={props.transition}
              appear
            >
              <Modal.ModalBody
                overwrite={props.classNameOverwrite}
                className={props.className || 'modal-box'}
                onClose={props.closeButton ? props.close : undefined}
              >
                {content}
              </Modal.ModalBody>
            </Modal>
          </ModalContext.Provider>
        );
      })}
    </div>
  );
};
export { modal };
