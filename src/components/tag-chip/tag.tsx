import clsx from 'clsx';
import React, { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  size?: 'md' | 'lg' | 'sm';
}>;

const Tag = ({ children, size }: Props) => {
  return <span className={clsx('tag', size && 'tag-' + size)}>{children}</span>;
};

export default Tag;
