import clsx from 'clsx';
import Svg from '../icon/svg';
import { FC } from 'react';

interface Props {
  className?: string;
}

const SectionLogin: FC<Props> = ({ className }) => {
  return (
    <div className={clsx('bg-neutral-0 rounded-lg p-8 text-center', className)}>
      <Svg width={80} height={80} src="/icons/others/payment-success.svg" className="mx-auto" />

      <p className="text-sm mt-4">
        <span className="font-bold text-base text-red-500">Đăng nhập</span> để trải nghiệm dịch vụ tốt hơn
      </p>
    </div>
  );
};
export default SectionLogin;
