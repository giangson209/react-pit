import React from 'react';
import Svg from '../icon/svg';

type Props = {};

const ModalImallSearch = (props: Props) => {
  return (
    <div>
      <header className="md:hidden sticky w-full top-0 bg-neutral-0 py-2 z-10">
        <div className="flex px-2">
          <button type="button" className="btn btn-circle btn-ghost bg-neutral-100" onClick={close}>
            <Svg src="/icons/line/close.svg" width={24} height={24} />
          </button>
        </div>
      </header>
      <div className="max-md:hidden absolute top-8 right-8">
        <button
          className="btn-tertiary btn btn-circle fixed md:static right-8 z-50 md:bg-neutral-100 xl:bg-neutral-0 xl:hover:bg-neutral-50"
          type="button"
          onClick={close}
        >
          <Svg src="/icons/line/close.svg" width={24} height={24} />
        </button>
      </div>
      <div className="space-y-8 container md:px-0 pt-6 pb-20 md:py-0"></div>
    </div>
  );
};

export default ModalImallSearch;
