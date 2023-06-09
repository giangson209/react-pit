import React from 'react';
import Svg from '../icon/svg';

type Props = {
  title: string;
  onClose?(): void;
};

const ModalMobileHeader = ({ title, onClose }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-xl font-bold">{title}</h3>
      <button onClick={onClose}>
        <Svg src="icons/line/close.svg" width={24} height={24} />
      </button>
    </div>
  );
};

export default ModalMobileHeader;
