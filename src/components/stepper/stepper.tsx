import React, { ForwardedRef, useImperativeHandle, useRef, useState } from 'react';
import Svg from '../icon/svg';
import { forwardRefWithAs } from '@/utilities/render';
import { Props, ReactTag } from '@/types/element-type';
import Element from '../element/element';
import { UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';

type StepperProps = {
  defaultValue?: number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
} & Partial<Omit<UseFormRegisterReturn, 'children' | 'onChange'>>;

const Stepper = forwardRefWithAs(function Stepper<TTag extends ReactTag = 'input'>(
  {
    onChange,
    onBlur,
    name,
    min,
    max,
    maxLength,
    minLength,
    pattern,
    required,
    disabled,
    defaultValue = 1,
    ...rest
  }: Props<TTag, StepperProps>,
  ref: ForwardedRef<HTMLInputElement>
) {
  const [value, setValue] = useState<number>(defaultValue);
  const innerRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => innerRef.current!);
  const timeout = useRef<NodeJS.Timeout>();
  const interval = useRef<NodeJS.Timeout>();

  let startTime: Date;

  function increase() {
    const el = innerRef.current;
    if (!el) return;
    const value = Number(el.value);
    const newV = value + 1;
    el.value = String(newV);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  function decrease() {
    const el = innerRef.current;
    if (!el) return;
    const value = Number(el.value);
    const newV = value - 1;
    el.value = String(newV);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }
  function handleMouseDown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    startTime = new Date();
    const isIncrease = e.currentTarget.dataset.action === 'increasement';
    isIncrease ? increase() : decrease();

    timeout.current = setTimeout(function runLoop() {
      const now = new Date();
      const delta = now.getTime() - startTime.getTime();
      const n = 10 + 1 / Math.pow(1.1, delta / 1000 - (2 * Math.log(5)) / Math.log(1.1));
      timeout.current = setTimeout(runLoop, parseInt(n.toString()));

      isIncrease ? increase() : decrease();
    }, 300);
  }
  function handleMouseUp() {
    clearTimeout(timeout.current);
    clearInterval(interval.current);
  }

  const disableDecrement = min ? value <= Number(min) : undefined;
  const disableIncrement = max ? value >= Number(max) : undefined;

  return (
    <Element defaultClassName="stepper" {...rest}>
      <button
        disabled={disableDecrement}
        type="button"
        data-action="decrement"
        className="stepper-btn"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Svg src="/icons/line/minus.svg" width={24} height={24} />
      </button>
      <input
        type="number"
        className={clsx('stepper-input', disableDecrement || disableIncrement ? 'bg-neutral-100' : 'bg-transparent')}
        size={1}
        ref={innerRef}
        defaultValue={defaultValue}
        {...{
          onInput(e) {
            let value = Number(e.currentTarget.value);
            if (isNaN(value)) return;

            const _max = Number(max);
            const _min = Number(min);

            if (_max && value > _max) (value = _max), handleMouseUp();
            else if (_min && value <= _min) (value = _min), handleMouseUp();
            e.currentTarget.value = value.toString();
            setValue(value);
            onChange?.(e as any);
            return e;
          },

          onBlur,
          name,
          min,
          max,
          maxLength,
          minLength,
          pattern,
          required,
          disabled
        }}
      />
      <button
        disabled={disableIncrement}
        type="button"
        data-action="increasement"
        className="stepper-btn"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <Svg src="/icons/line/plus.svg" width={24} height={24} />
      </button>
    </Element>
  );
});

export default Stepper;
