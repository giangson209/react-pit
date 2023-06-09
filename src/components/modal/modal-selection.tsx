import { modal, useModal } from '@/context/modal-context';
import { useState } from 'react';
import HeaderModalSheet from './header/header-modal-sheet';
import Svg from '../icon/svg';

type Props<T = unknown> = {
  options?: T[];
  defaultValue?: T;
  displayValue?(item: T): string;
  title?: string;
};

const ModalSelection = (props: Props) => {
  const {
    title,
    defaultValue,
    options = [],
    displayValue = (option) => (typeof option === 'string' ? option : (option as any).name)
  } = props;
  const [selected, setSelected] = useState(defaultValue);
  const { done } = useModal();
  const handleSelect = () => {
    done(selected);
  };
  return (
    <div className="mobile-container pt-6 pb-16">
      <HeaderModalSheet title={title} />
      <div className="mt-4">
        <ul className="menu">
          {options.map((option, index) => {
            const isSelected = option === selected;
            return (
              <li key={index} className={isSelected ? 'menu-active w-full' : 'w-full'}>
                <button onClick={() => setSelected(option)} className="py-3 font-medium rounded-lg flex w-full">
                  <span className="flex-1 text-left truncate">{displayValue(option)}</span>
                  {isSelected && <Svg src="/icons/bold/tick-circle.svg" className="text-red-500 ml-2" width={20} height={20} />}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <footer className="fixed left-0 bottom-0 w-full bg-neutral-0 py-2 md:pt-6 md:pb-8">
        <div className="mobile-container">
          <div className="flex justify-center">
            <div className="w-full">
              <button className="md:w-[9.52rem] btn-primary btn w-full rounded-full" onClick={handleSelect}>
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export const toggleModalSelection = async <T = unknown,>(props: Props<T>) => {
  return new Promise<T>((resolve, reject) => {
    modal.open({
      render: <ModalSelection {...props} />,
      classNameOverwrite: true,
      transition: false,
      className: 'modal-box shadow-itel',
      classNameContainer: 'modal-bottom-sheet',
      // classNameOverlay: 'bg-neutral-900 bg-opacity-50',
      onClose: reject,
      onDone: resolve
    });
  });
};

export default ModalSelection;
