import { Props, ReactTag } from '@/types/element-type';
import { forwardRefWithAs } from '@/utilities/render';
import { ForwardedRef } from 'react';
import Element from '../element/element';
import Svg from '../icon/svg';

type ButtonProps = {
  children?: React.ReactNode;
};

const ButtonFilter = forwardRefWithAs(function ButtonFilter<TTag extends ReactTag = 'button'>(
  { as = 'button' as TTag, children, ...rest }: Props<TTag, ButtonProps>,
  ref: ForwardedRef<HTMLButtonElement>
) {
  return (
    <Element as={as} defaultClassName="btn-filter btn rounded-full px-6 gap-x-2" {...rest} ref={ref}>
      {children}
      <Svg src="/icons/bold/down.svg" width={24} height={24} />
    </Element>
  );
});

export default ButtonFilter;
