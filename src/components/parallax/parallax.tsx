import React, { useEffect, useLayoutEffect, useRef } from 'react';

type Props = {};

const Parallax = (props: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {}, []);

  return <div ref={ref}>Parallax</div>;
};

export default Parallax;
