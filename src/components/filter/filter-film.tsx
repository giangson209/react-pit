import useOnClickOutside from '@/hooks/useOnClickOutside';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import Svg from '../icon/svg';
import WidgetScroll from '../scroll/widget-scroll';
import { modal, useModal } from '@/context/modal-context';
import useWindowDimensions from '@/hooks/useWindowDimention';

type FilterFilmProps = {
  categoryList: string[];
  handleChooseOption: (option: string) => void;
};

const FilterFilm = ({ categoryList, handleChooseOption }: FilterFilmProps) => {
  const { width } = useWindowDimensions();
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [filmCategory, setFilmCategory] = useState<string>('Tất cả thể loại');
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowOptionList(false));

  useEffect(() => {
    if (width) {
      if (width < 640) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    }
  }, [width]);

  const handleModalFilmFilter = () => {
    modal.open({
      render: <FilterFilmModal categoryList={categoryList} handleChooseOption={handleChooseOption} />,
      transition: false,
      closeButton: false,
      className: 'modal-box shadow-itel bg-neutral-0 md:bg-neutral-100',
      classNameContainer: 'modal-full',
      classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50'
    });
  };

  const handleShowOptionList = () => {
    setShowOptionList(true);
  };

  return (
    <div className="relative z-10 cursor-pointer" ref={ref}>
      <button
        className="md:btn md:btn-secondary md:btn-md md:rounded-full md:bg-neutral-700 bg-transparent w-full md:gap-6 gap-2 md:justify-between whitespace-nowrap flex justify-center items-center h-7"
        data-theme="dark"
        onClick={isMobile ? handleModalFilmFilter : handleShowOptionList}
      >
        <p className="md:text-base text-sm">{filmCategory}</p>
        <Svg
          src="/icons/bold/right.svg"
          className={clsx(
            'inline h-6 w-6 transition-all ease-linear duration-300',
            showOptionList ? 'md:-rotate-90 rotate-90' : 'rotate-90'
          )}
        />
      </button>
      {showOptionList && (
        <div className="bg-neutral-700 rounded-xl p-2 w-64 absolute right-0 mt-4 shadow-itel h-[20rem] hidden md:block">
          <WidgetScroll>
            {categoryList.map((category, index) => (
              <button
                key={`${index}-category`}
                className={clsx(
                  'w-full text-start p-4 hover:bg-neutral-900 rounded-lg',
                  category === filmCategory ? 'bg-neutral-900' : 'bg-transparent'
                )}
                onClick={() => {
                  setFilmCategory(category);
                  handleChooseOption(category);
                  setShowOptionList(false);
                }}
              >
                <p className="text-base text-neutral-0 font-bold ">{category}</p>
              </button>
            ))}
          </WidgetScroll>
        </div>
      )}
    </div>
  );
};

type FilterFilmModalProps = {
  categoryList: string[];
  handleChooseOption: (option: string) => void;
};

const FilterFilmModal = ({ categoryList, handleChooseOption }: FilterFilmModalProps) => {
  const { close } = useModal();
  const [filmCategory, setFilmCategory] = useState<string>('Tất cả thể loại');

  return (
    <div className="w-full h-screen bg-neutral-700 fixed inset-0 flex flex-col justify-between">
      <div className="flex justify-between items-center px-4 py-3 w-full border-b border-b-neutral-600">
        <button className="btn btn-ghost btn-xs px-0" onClick={close}>
          <Svg src="/icons/line/close.svg" className="inline h-6 w-6 text-neutral-0" />
        </button>
        <p className="text-[1.125rem] leading-[1.75rem] font-bold text-neutral-0">Thể loại</p>
        <div className="w-8 h-8" />
      </div>
      <div className="w-full flex-1 p-4">
        {categoryList.map((category, index) => (
          <button
            key={`${index}-category`}
            className={clsx(
              'w-full text-start p-4 hover:bg-neutral-900 rounded-lg',
              category === filmCategory ? 'bg-neutral-900' : 'bg-transparent'
            )}
          >
            <p className="text-base text-neutral-0 font-bold ">{category}</p>
          </button>
        ))}
      </div>
      <div className="px-4 pt-2 pb-8 border-t border-t-neutral-600">
        <button className="btn btn-primary btn-md w-full rounded-full" onClick={close}>
          Áp dụng
        </button>
      </div>
    </div>
  );
};

export default FilterFilm;
