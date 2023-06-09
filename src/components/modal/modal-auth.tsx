import React from 'react';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import Svg from '../icon/svg';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useModal } from '@/context/modal-context';
import HeaderMiddleAndFull from './header/header-middle-and-full';
import Link from 'next/link';

type IFormSignIn = {
  phone: number;
};
type ModalAuthProps = {
  // onValid: SubmitHandler<IFormSignIn>;
};

const oauth = [
  { provider: 'facebook', icon: '/icons/others/facebook.svg' },
  { provider: 'google', icon: '/icons/others/gmail.svg' },
  { provider: 'zalo', icon: '/icons/others/zalo.svg' }
];

const ModalAuth = (props: ModalAuthProps) => {
  const { done } = useModal();
  const methods = useForm<IFormSignIn>();

  const className = ({ selected }: any) =>
    clsx('tab tab-bordered w-1/2 whitespace-nowrap border-red-500 border-opacity-0 py-4 text-s-sm outline-none', selected && 'tab-active');
  const onSubmit: SubmitHandler<IFormSignIn> = (params) => {
    done(params);
  };

  return (
    <div>
      <HeaderMiddleAndFull title="Yêu cầu đăng nhập" desc="Vui lòng Đăng nhập để trải nghiệm dịch vụ tốt nhất của iTel" />
      <Tab.Group as="div" className="mt-8 md:space-y-10">
        <Tab.List className="max-md:hidden tabs flex-nowrap gap-x-6">
          <Tab className={className}>Dùng số điện thoại</Tab>
          <Tab className={className}>Dùng mã QR</Tab>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel as="form" onSubmit={methods.handleSubmit(onSubmit)} className="px-6">
            <div className="md:hidden my-10">
              <div className="text-center flex">
                <Svg src="/logo/logo-color.svg" width={98} height={40} className="text-red-500 dark:text-neutral-0 mx-auto" />
              </div>
              <p className="text-center mt-6">
                Vui lòng Đăng nhập để trải nghiệm
                <br />
                dịch vụ tốt nhất của iTel
              </p>
            </div>
            <div className="input-leading-icon relative text-xl">
              <input
                className="input-bordered input rounded-full py-4d:py-[1.125rem] pl-14"
                type="text"
                placeholder="Số điện thoại"
                {...methods.register('phone', {
                  pattern: {
                    value: /^(0|\+84)(3[2-9]|5[2689]|7[0-79]|8[1-689]|9[0-4|6-9])[0-9]{7}$/,
                    message: 'phone is not valid'
                  },
                  required: 'Phone is required'
                })}
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                <Svg src="/icons/line/phone.svg" width={24} height={24} />
              </div>
            </div>
            {methods.formState.errors.phone && (
              <p className="label">
                <span className="label-text-alt text-red-500 first-letter:capitalize">{methods.formState.errors.phone.message}</span>
              </p>
            )}
            <button
              className="btn-primary btn btn-sm max-md:h-12 md:btn-lg mt-6 w-full rounded-full"
              disabled={!methods.formState.isValid || methods.formState.isSubmitting}
            >
              Tiếp tục
            </button>
          </Tab.Panel>
          <Tab.Panel>
            <div className="">
              <img width={248} height={248} className="mx-auto bg-base-200 object-cover center-by-grid" alt="cover" />
            </div>
            <p className="mt-2 text-center text-subtle-content">Sử dụng app My iTel quét mã QR để đăng nhập</p>
          </Tab.Panel>
        </Tab.Panels>
        <div className="px-6 mt-6">
          <div className="text-sm overflow-hidden px-8 text-center text-neutral-300">
            <div className="divider-hr">
              <span className="text-subtle-content">hoặc tiếp tục với</span>
            </div>
          </div>
          <div className="mt-6 flex gap-2 md:gap-4">
            {oauth.map((o) => (
              <button key={o.provider} className="btn-tertiary btn btn-sm flex-1 gap-x-2 rounded-full capitalize">
                <Svg src={o.icon} width={20} height={20} />
                <span className="max-md:hidden">{o.provider}</span>
              </button>
            ))}
          </div>
        </div>
      </Tab.Group>
    </div>
  );
};

export default ModalAuth;
