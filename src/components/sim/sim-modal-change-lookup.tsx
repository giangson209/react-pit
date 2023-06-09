import { useModal } from '@/context/modal-context';
import React from 'react';

type Props = {};

const SimModalChangeLookup = (props: Props) => {
  const { done, close } = useModal();
  return (
    <div className="md:p-10">
      <div>Đây là modal thay đổi thông tin tra cứu, chưa xong</div>
      <div className="mt-8 items-center">
        <div className="w-1/2 mx-auto">
          <button onClick={close} className="btn btn-primary rounded-full w-full">
            Tra cứu
          </button>
        </div>
      </div>
    </div>
  );
};

export default SimModalChangeLookup;
