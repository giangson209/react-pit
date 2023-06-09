/* eslint-disable react-hooks/rules-of-hooks */
import { Logger } from '@/utilities/logger';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Svg from '../icon/svg';

type Props = {};

const logger = new Logger('Chat Box');
const ChatBox = (props: Props) => {
  const [hasChatBot, setHasChatBot] = useState(false);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    logger.log('initial logger');
    setHasChatBot(innerWidth >= 768);
  }, []);

  return hasChatBot ? (
    <div id="__chatbox">
      <div className="fixed bottom-6 right-6 z-20">
        <div
          className={clsx(
            isShow ? 'h-80 w-80 rounded-3xl' : 'h-18 w-18 rounded-[2.5rem]',
            'transition-default relative bg-neutral-600 text-neutral-0'
          )}
        >
          <div
            className={clsx(
              isShow ? 'top-[82px] w-[196px] translate-x-6' : '-top-1.5 w-27 translate-x-4',
              'transition-default absolute right-0'
            )}
          >
            <img src="/images/chat-icon.png" alt="Chat icon" />
          </div>
          <div className="h-full w-full overflow-hidden p-4 pb-6">
            <div className={clsx(isShow ? 'scale-100' : 'scale-0 opacity-0', 'transition-default')}>
              <div className="font-bold">Bạn cần trợ giúp?</div>
              <ul className="mt-1 space-y-2 text-sm">
                <li>Kích hoạt sim</li>
                <li>Mở khóa sim</li>
                <li>Đổi/Cấp lại sim</li>
              </ul>
            </div>

            <div className={clsx(isShow ? 'scale-100' : 'scale-0 opacity-0', 'transition-default mt-12 origin-top-left')}>
              <div className="font-bold">Trò chuyện cùng iTel?</div>
              <div className="relative mt-3 rounded-md bg-neutral-0 text-sm">
                <input type="text" placeholder="" className="peer w-full bg-transparent px-4 py-3 text-neutral-800 outline-none" />
                <label className="pointer-events-none invisible absolute left-0 top-0 translate-x-4 translate-y-3 text-neutral-500 text-opacity-50 peer-placeholder-shown:visible">
                  Nhập tên của bạn <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="mt-2 flex items-center gap-2">
                <div className="relative rounded-md bg-neutral-0 text-sm">
                  <input type="text" placeholder="" className="peer w-full bg-transparent px-4 py-3 text-neutral-800 outline-none" />
                  <label className="pointer-events-none invisible absolute left-0 top-0 translate-x-4 translate-y-3 text-neutral-500 text-opacity-50 peer-placeholder-shown:visible">
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                </div>
                <div className="flex-shrink-0">
                  <button className="btn-primary btn btn-sm gap-x-2 rounded-full px-2.5">
                    <Svg className="h-5 w-5" src="/icons/bold/send.svg" />
                    Bắt đầu
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className={clsx(
              isShow ? 'top-0 rotate-180' : 'top-full',
              'transition-default absolute right-2 -translate-y-1/2 rounded-full bg-red-500'
            )}
            onClick={() => setIsShow(!isShow)}
          >
            <Svg src="/icons/bold/up.svg" className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default ChatBox;
