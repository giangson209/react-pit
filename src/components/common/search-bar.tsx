import useBoolean from '@/hooks/useBoolean';
import useControlled from '@/hooks/useControlled';
import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useRef } from 'react';
import Svg from '../icon/svg';

type Props = {
  children?: React.ReactNode | ((props: { focus?: boolean }) => React.ReactNode);
  value?: string;
  onChange?(v: string): void;
  onSearch?(v: string): void;
  placeholder?: string;
};

const SearchBar = ({ children, value: valueProp, onChange, placeholder, onSearch }: Props) => {
  const [query, setQuery] = useControlled(valueProp, '', onChange);
  const focusInput = useBoolean(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, focusInput.setFalse);

  const handleSearch = () => {
    onSearch?.(query);
    focusInput.setFalse();
  };
  return (
    <div className="relative flex rounded-full bg-neutral-100 flex-1" ref={ref}>
      <div className="p-4">
        <Svg src="/icons/bold/vector.svg" width={24} height={24} />
      </div>
      {typeof children === 'function' ? children({ focus: focusInput.value }) : children}
      <input
        placeholder={placeholder}
        className="flex-1 truncate bg-transparent outline-none p-4 h-14"
        onFocus={focusInput.setTrue}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {focusInput.value && (
        <div className="hidden xl:flex items-center gap-4">
          {query && (
            <button onClick={() => setQuery('')}>
              <Svg src="/icons/line/close.svg" className="inline h-5 w-5 cursor-pointer" />
            </button>
          )}
          <button className="btn-secondary btn btn-lg w-[8.5rem] rounded-full" onClick={handleSearch}>
            Tìm kiếm
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
