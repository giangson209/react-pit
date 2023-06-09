import Svg from '@/components/icon/svg';
import Use from '@/components/icon/use';
import clsx from 'clsx';
import Link from 'next/link';
import React, { Fragment, PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {};
const SettingsDrawer = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const listColor = ['red', 'white', 'gray'];

  function setOption(a: any, b: any) {}

  return createPortal(
    <div>
      <div className="bg-base-100" data-theme="dark">
        <div
          className={clsx(
            'fixed bottom-0 left-0 top-0 z-50 flex w-full max-w-xs flex-col bg-base-100 transition-transform duration-300',
            isExpanded ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          <div className="flex justify-between px-6 pb-1 pt-8 align-baseline">
            <div className="">
              <h5 className="text-xl font-semibold">App Configurator</h5>
              <p className="font-thin">See options.</p>
            </div>
            <button className="translate-y-1" aria-hidden="true" onClick={() => setIsExpanded(false)}>
              <Svg src="/icons/line/close.svg" width={24} height={24} />
            </button>
          </div>
          <div className="p-6 pt-1">
            <FieldBase title="Components" className="mt-6">
              {/* <span className="text-sm font-thin">Choose between different staking types.</span> */}
              <div className="mt-2">
                <Link href="/components/icons" className="btn-secondary btn btn-sm">
                  Icon
                </Link>
              </div>
            </FieldBase>
            <BreakLine />
            <BreakLine />
          </div>
        </div>
      </div>
      <div className="">
        <span
          className="fixed bottom-8 left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-base-100"
          aria-hidden="true"
          role={'button'}
          onClick={() => setIsExpanded(true)}
        >
          <Svg src="/icons/line/information.svg" className="h-8 w-8" />
        </span>
      </div>
    </div>,
    __settings
  );
};

const FieldBase = ({ title, className, children, ...rest }: JSX.IntrinsicElements['div']) => {
  return (
    <div className={className} {...rest}>
      <h6 className="font-semibold">{title}</h6>
      {children}
    </div>
  );
};

type FieldInputProps = PropsWithChildren<{ title: string } & Omit<JSX.IntrinsicElements['input'], 'ref'>>;
const FieldInput = ({ title, children, className, ...rest }: FieldInputProps) => {
  return (
    <FieldBase title={title} className={clsx('flex items-center justify-between', className)}>
      <input className="bg-white/20 text-white w-auto rounded-sm px-3 py-1 text-right" {...rest} />
    </FieldBase>
  );
};
type FieldSelectProps = PropsWithChildren<{ title: string } & Omit<JSX.IntrinsicElements['select'], 'ref'>>;
const FieldSelect = ({ title, className, ...rest }: FieldSelectProps) => {
  return (
    <FieldBase title={title} className={clsx('flex items-center justify-between', className)}>
      <select className="bg-white/20 text-white w-auto rounded-sm px-3 py-1 text-right" {...rest}></select>
    </FieldBase>
  );
};

const BreakLine = () => {
  return <hr className="via-white my-4 h-px flex-shrink-0 border-none bg-gradient-to-r from-transparent to-transparent opacity-25" />;
};
export default SettingsDrawer;
