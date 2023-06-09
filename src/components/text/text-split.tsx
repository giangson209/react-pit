import { ComponentWithRef, Props } from '@/types/element-type';
import { ReactTag } from '@/types/element-type';
import { forwardRefWithAs } from '@/utilities/render';
// import { Props } from '@headlessui/react/dist/types';
import React from 'react';
import Element from '../element/element';

type TextSplitProps = {
  text: React.ReactNode[];
};
let DEFAULT_TEXT_SPLIT_TAG: 'div';
const TextSplit = function TextSplit<TTag extends ReactTag = typeof DEFAULT_TEXT_SPLIT_TAG>({
  text,
  ...rest
}: Props<TTag, TextSplitProps>) {
  return (
    <>
      {text.map((text, idx) => (
        <Element {...rest} key={idx}>
          {text}
        </Element>
      ))}
    </>
  );
};

export default TextSplit;
