import React, { useState } from 'react';

type Props = {};

const useAccordion = (props: Props) => {
  const [height, setHeight] = useState<number>();
  return { height };
};

export default useAccordion;
