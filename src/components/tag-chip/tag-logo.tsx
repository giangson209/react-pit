import clsx from 'clsx';
import React from 'react';
import Svg from '../icon/svg';

type Props = {} & JSX.IntrinsicElements['span'];

const TagLogo = ({ className, ...rest }: Props) => {
  return (
    <span className={clsx('tag tag-vector bg-red-500', className)} {...rest}>
      <Svg src="/logo/logo-color.svg" width={78} height={32} className="text-red-500 dark:text-neutral-0" />
    </span>
  );
};

export default TagLogo;
