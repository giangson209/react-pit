import Svg from '@/components/icon/svg';
import { Disclosure, Transition } from '@headlessui/react';
import { ReactElement } from 'react';

type DisclosureWrapperProps = {
  title: string;
  children: ReactElement;
  option?: string;
  optionList?: string[];
};

const DisclosureWrapper = ({ title, children, option, optionList }: DisclosureWrapperProps) => {
  return (
    <div className="w-full">
      <div className="bg-white w-full">
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full items-center justify-between text-base font-bold">
                <div className="flex items-center justify-start">
                  <span>{title}</span>
                  <div className="flex items-center justify-start">
                    {optionList &&
                      optionList.length > 0 &&
                      optionList.map((item, index) => (
                        <span key={`item-${index}`} className="ml-2 text-sm font-bold text-red-500">
                          {item}
                        </span>
                      ))}
                  </div>
                  <span className="ml-2 text-sm font-bold text-red-500">{option}</span>
                </div>
                <Svg src="/icons/bold/right-arrow.svg" className={`${open ? '-rotate-90 transform' : ''} h-4 w-4 rotate-90`} />
              </Disclosure.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel>{children}</Disclosure.Panel>
              </Transition>
              <div className="my-4 border-b border-neutral-200" />
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default DisclosureWrapper;
