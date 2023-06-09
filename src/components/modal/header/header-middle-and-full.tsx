import Svg from '@/components/icon/svg';
import { useModal } from '@/context/modal-context';
import React from 'react';
import HeaderModalFull from './header-modal-full';

type Props = {
  title: string;
  mobileTitle?: string;
  desc?: React.ReactNode;
};

const HeaderMiddleAndFull = ({ title, mobileTitle = title, desc }: Props) => {
  const { close } = useModal();
  return (
    <>
      <HeaderModalFull className="md:hidden" title={title} />
      {/* Header tablet and pc */}
      <div className="max-md:hidden flex items-center">
        <div>
          <h2 className="text-xl md:text-s-md font-bold">{mobileTitle}</h2>
          {desc && <p className="mt-2 text-subtle-content">{desc}</p>}
        </div>
        <button
          className="btn-ghost btn btn-circle absolute right-5 top-4 !mt-0 md:bg-neutral-100 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
    </>
  );
};

export default HeaderMiddleAndFull;
