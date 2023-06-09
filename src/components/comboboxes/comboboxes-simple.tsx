import { useRef, useState } from 'react';
import { Combobox } from '@headlessui/react';
import clsx from 'clsx';
import Svg from '../icon/svg';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import useBoolean from '@/hooks/useBoolean';

type ComboboxesSimpleProps<D> = {
  options: D[];
  displayValue?(item: D): string;
  value?: D;
  onChange?: (item?: D) => void;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  placeholder?: string;
  className?: string;
  classNameOptions?: string;
  disableInput?: boolean;
};
export default function ComboboxesSimple<D extends { id: number; name?: string }>({
  displayValue = (value) => (typeof value === 'string' ? value : value.name)!,
  options,
  value,
  onChange,
  onClick,
  placeholder,
  className,
  classNameOptions,
  disableInput
}: ComboboxesSimpleProps<D>) {
  const [query, setQuery] = useState('');

  const filteredOption =
    query === ''
      ? options
      : options.filter((option) => {
          return displayValue(option).toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" className={'relative'} value={value} onChange={onChange}>
      {({ open }) => (
        <>
          <div className="relative">
            {disableInput ? (
              <Combobox.Button
                className={clsx(
                  `input-bordered input-trailing-icon truncate text-left input w-full outline-none ${!value && 'text-neutral-500'}`,
                  className
                )}
                onClick={onClick}
                placeholder={placeholder}
              >
                {value ? displayValue(value) : placeholder}
              </Combobox.Button>
            ) : (
              <Combobox.Input<D>
                className={clsx('input-bordered input w-full outline-none', className)}
                placeholder={placeholder}
                onChange={(event) => {
                  setQuery(event.target.value);
                }}
                displayValue={displayValue}
              />
            )}
            <Combobox.Button
              className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
              onClick={onClick}
            >
              <Svg src="/icons/bold/down.svg" width={24} height={24} className={`${open && 'rotate-180'} transition-all`} />
            </Combobox.Button>
          </div>
          <OptionsList className={classNameOptions} open={open} options={filteredOption} displayValue={displayValue} />
        </>
      )}
    </Combobox>
  );
}
type OptionsProps<D> = {
  options: D[];
  open: boolean;
  displayValue?(item: D): string;
  className?: string;
};
function OptionsList<D extends { id: number } | string>({
  options,
  open,
  className,
  displayValue = (item) => item as string
}: OptionsProps<D>) {
  const ref = useRef<HTMLUListElement>(null);
  const { value: isAbove, setValue } = useBoolean(false);
  useIsomorphicLayoutEffect(() => {
    if (!ref.current) return;
    const parent = ref.current.parentElement;
    if (!parent) return;
    if (open) {
      const bcr = parent.getBoundingClientRect();
      const { height, top } = ref.current.getBoundingClientRect();
      setValue(bcr.top + bcr.height + height > innerHeight ? true : false);
    }
  }, [open, options.length]);
  return open ? (
    <Combobox.Options
      ref={ref}
      static
      className={clsx(
        'absolute z-20 my-2 max-h-60 w-full overflow-auto rounded-md border border-neutral-300 bg-neutral-0 py-1 shadow-itel',
        isAbove ? 'bottom-full' : 'top-full',
        className
      )}
    >
      {options.map((option, id) => (
        <li key={typeof option === 'string' ? option : option.id}>
          <Combobox.Option
            as="button"
            type="button"
            value={option}
            className={({ active }) =>
              clsx('relative w-full  select-none py-2 pl-3 pr-9 text-left', active ? 'text-white bg-neutral-300' : 'text-gray-900')
            }
          >
            <span className="block truncate">{displayValue(option)}</span>
          </Combobox.Option>
        </li>
      ))}
      {/*  */}
    </Combobox.Options>
  ) : null;
}
