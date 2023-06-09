import useControlled from '@/hooks/useControlled';
import useIsomorphicLayoutEffect from '@/hooks/useIsomorphicLayoutEffect';
import { Props, ReactTag } from '@/types/element-type';
import React, { Fragment, createContext, useCallback, useContext, useRef, useState } from 'react';
import Element from '../element/element';

type AccordionsProps = {
  children?: React.ReactNode;
  isActive?: boolean;
  onChange?(isActive: boolean): void;
  className?: ControlClassName;
};

type ControlClassName = ((bag: { open: boolean }) => string) | string;

const AccordionContext = createContext({
  toggle() {},
  isOpen: false
});
const Accordions = <TTag extends ReactTag = typeof Fragment>({
  onChange,
  children,
  isActive,
  ...rest
}: Props<TTag, AccordionsProps, { open: boolean }>) => {
  const [isOpen, setIsActive] = useControlled<boolean>(isActive, false, onChange);

  const toggle = useCallback(() => setIsActive((pre) => !pre), [setIsActive]);
  if ('className' in rest) {
    (rest as any).className = typeof rest.className === 'function' ? rest.className({ open: isOpen }) : rest.className;
  }
  return (
    <AccordionContext.Provider value={{ toggle, isOpen }}>
      <Element {...rest}>{children}</Element>
    </AccordionContext.Provider>
  );
};

const AccordionButton = (props: Props<'button', {}, { open: boolean }>) => {
  const { children, onClick, ref, ...rest } = props;
  const { toggle, isOpen } = useContext(AccordionContext);
  const mergedOnClick = (e: any) => {
    toggle();
    onClick?.(e);
  };
  return (
    <button {...rest} onClick={mergedOnClick}>
      {typeof children === 'function' ? children({ open: isOpen }) : children}
    </button>
  );
};

const AccordionPanel = function AccordionPanel<TTag extends ReactTag = 'div'>(
  props: Props<TTag, { children?: React.ReactNode; className?: ControlClassName }>
) {
  const { children, style, className, ...rest } = props as Props<'div', { children?: React.ReactNode; className?: ControlClassName }>;
  const { isOpen } = useContext(AccordionContext);
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'enter' | 'entering' | 'entered' | 'exit' | 'exiting' | 'exited'>(isOpen ? 'entered' : 'exited');
  const [height, setHeight] = useState<number | undefined>(isOpen ? undefined : 0);

  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      switch (state) {
        case 'exited':
          setHeight(undefined);
          setState('enter');
          break;
        case 'enter':
          const height = getElementHeight();
          setHeight(0);
          requestAnimationFrame(() => {
            setHeight(height);
            setState('entering');
          });
          break;
        case 'entered':
          setHeight(undefined);
          break;
        case 'entering':
          break;
        default:
          break;
      }
    } else {
      switch (state) {
        case 'entered':
          setHeight(getElementHeight());
          setState('exit');
          break;
        case 'exit':
          const height = getElementHeight();
          setHeight(height);
          requestAnimationFrame(() => {
            setHeight(0);
            setState('exiting');
          });
          break;
        case 'exited':
          setHeight(undefined);
        default:
          break;
      }
    }
  }, [isOpen, state]);

  const getElementHeight = () => {
    const el = ref.current!;
    const computedStyle = getComputedStyle(el);
    const height = el.offsetHeight;
    const marginTop = parseFloat(computedStyle.marginTop);
    const marginBottom = parseFloat(computedStyle.marginBottom);
    return height + marginTop + marginBottom;
  };

  function onTransitionEnd() {
    if (state === 'entering') setState('entered');
    else if (state === 'exiting') setState('exited');
  }

  return (
    <Element
      ref={ref}
      defaultClassName="transition-default"
      onTransitionEnd={onTransitionEnd}
      className={typeof className === 'function' ? className({ open: isOpen }) : className}
      {...rest}
      style={{ height, display: state == 'exited' ? 'none' : undefined, overflow: 'hidden', ...style }}
    >
      {children}
    </Element>
  );
};

export default Object.assign(Accordions, { Button: AccordionButton, Panel: AccordionPanel });
