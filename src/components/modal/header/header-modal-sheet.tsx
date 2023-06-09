import Svg from '@/components/icon/svg';
import { useModal } from '@/context/modal-context';
import React from 'react';

type Props = {
  title?: string;
};

const HeaderModalSheet = ({ title }: Props) => {
  const { close } = useModal();
  return (
    <header className="flex items-center">
      <h2 className="flex-1 text-lg md:text-s-md font-bold">{title}</h2>
      <button type="button" onClick={close}>
        <Svg src="/icons/line/close.svg" width={24} height={24} />
      </button>
    </header>
  );
};

export default HeaderModalSheet;
