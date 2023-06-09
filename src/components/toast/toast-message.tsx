import React from 'react';
import Svg from '../icon/svg';
import { Toast, resolveValue } from 'react-hot-toast';

const ToastMessage = function ToastMessage(toast: Toast) {
  const animationStyle: React.CSSProperties = toast.height
    ? toast.visible
      ? { opacity: 1, transform: 'scale(1)' }
      : { opacity: 0, transform: 'scale(0.8)' }
    : { opacity: 0, transform: 'scale(0.8)' };
  return (
    <div
      className="transition-default flex origin-top items-center gap-x-2.5 rounded-xl px-4 py-2.5 text-sm"
      data-theme="dark"
      style={{ ...animationStyle, ...toast.style }}
    >
      {toast.ariaProps.role === 'alert' ? (
        <Svg src="/icons/line/information.svg" className="text-orange" width={24} height={24} />
      ) : toast.type === 'success' ? (
        <Svg src="/icons/line/check.svg" className="text-green-500" width={24} height={24} />
      ) : toast.type === 'error' ? (
        <Svg src="/icons/line/close.svg" className="text-red-500" width={24} height={24} />
      ) : null}
      <p {...toast.ariaProps}>{resolveValue(toast.message, toast)}</p>
    </div>
  );
};

export default ToastMessage;
