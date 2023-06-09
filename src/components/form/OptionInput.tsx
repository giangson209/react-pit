import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useRef, useState } from 'react';
import Svg from '../icon/svg';
import WidgetScroll from '../scroll/widget-scroll';

type OptionItem = {
  id: number;
  label: string;
};

type OptionInputProps = {
  optionList: OptionItem[];
  handleChooseOption: (option: string) => void;
  inputLabel: string;
};

const OptionInput = ({ optionList, handleChooseOption, inputLabel }: OptionInputProps) => {
  const [showOptionList, setShowOptionList] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [optionId, setOptionId] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setShowOptionList(false));

  return (
    <div ref={ref} className="w-full relative">
      <div className="mb-2 text-base font-medium">
        {inputLabel}
        <span className="text-red-500"> *</span>
      </div>
      <div className="relative w-full">
        <input
          readOnly
          placeholder="Chọn giờ sinh"
          className="w-full cursor-default rounded-lg border border-neutral-300 bg-transparent p-4 text-base font-medium focus:border-neutral-800"
          onFocus={() => setShowOptionList(true)}
          value={value}
        />
        <button>
          <Svg src="/icons/bold/right.svg" className="absolute bottom-4 right-4 inline h-6 w-6 rotate-90 cursor-default" />
        </button>
      </div>
      {showOptionList && (
        <div className="absolute mt-2 h-[16rem] w-full flex-col rounded-xl bg-neutral-0 p-2 shadow-itel hidden md:flex">
          <WidgetScroll>
            {optionList.map((option) => (
              <button
                onClick={() => {
                  setValue(option.label);
                  setShowOptionList(false);
                  handleChooseOption(option.label);
                  setOptionId(option.id);
                }}
                key={option.id}
                className={`rounded-lg p-4 w-full text-start hover:bg-neutral-100 ${option.id === optionId ? 'bg-neutral-100' : ''}`}
              >
                <span className="text-base font-bold">{option.label}</span>
              </button>
            ))}
          </WidgetScroll>
        </div>
      )}
      {showOptionList && (
        <div className="fixed bg-overlay-popup/[.5] inset-0 h-screen z-10 block md:hidden">
          <div className="px-4 py-6 bg-neutral-0 rounded-t-3xl absolute bottom-0 left-0 right-0 max-h-[60%] h-full">
            <div className="w-full flex justify-between items-center">
              <p className="font-bold text-xl text-neutral-800">Chọn giờ sinh</p>
              <button className="btn btn-ghost btn-circle btn-md" onClick={() => setShowOptionList(false)}>
                <Svg src="/icons/bold/cancel.svg" className="w-4 h-4" />
              </button>
            </div>
            <div className="flex flex-col overflow-y-auto h-full pb-8">
              {optionList.map((option) => (
                <button
                  onClick={() => {
                    setValue(option.label);
                    setShowOptionList(false);
                    handleChooseOption(option.label);
                    setOptionId(option.id);
                  }}
                  key={option.id}
                  className={`rounded-lg p-4 text-start flex items-center justify-between group ${
                    option.id === optionId ? 'bg-neutral-100' : ''
                  }`}
                >
                  <span className="text-base font-bold">{option.label}</span>
                  <div
                    className={`w-5 h-5 bg-red-500 items-center rounded-full justify-center ${option.id === optionId ? 'flex' : 'hidden'} `}
                  >
                    <Svg src="/icons/bold/check.svg" className="w-3 h-3 inline" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptionInput;
