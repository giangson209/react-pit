import { ChangeEvent, useState } from 'react';
import Svg from '../icon/svg';
import clsx from 'clsx';

export type TextInputProps = {
  inputLabel: string;
  placeholder: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: ChangeEvent<HTMLInputElement>) => void;
  clear?: boolean;
  errorMessage?: string;
  disabled?: boolean;
};

const TextInput = ({ inputLabel, placeholder, value, onChange, onBlur, clear, errorMessage, disabled }: TextInputProps) => {
  return (
    <div>
      <div className="mb-2 text-base font-medium">
        {inputLabel}
        <span className="text-red-500"> *</span>
      </div>
      <div className="relative flex items-center">
        <input
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          className={clsx(
            'w-full rounded-lg border border-neutral-300  p-4 text-base font-medium focus:border-neutral-800',
            disabled ? 'bg-neutral-100' : 'bg-transparent'
          )}
        />
        {clear && value && (
          <div
            className="absolute right-5 cursor-pointer"
            onClick={() => onChange?.({ currentTarget: { value: '' }, target: { value: '' } } as ChangeEvent<HTMLInputElement>)}
          >
            <Svg width={22} height={22} src="/icons/line/close.svg" />
          </div>
        )}
      </div>
      {errorMessage && (
        <div className="flex items-center gap-1 text-red-500 mt-2">
          <Svg src="/icons/line/danger-circle.svg" width={15} height={15} />
          <p className="flex-1 truncate">{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
