import React, { useEffect } from 'react';
import useBoolean from './useBoolean';

const useIsClient = () => {
  const bool = useBoolean(false);
  useEffect(() => bool.setTrue(), [bool]);
  return [bool.value, bool.toggle] as [boolean, () => void];
};

export default useIsClient;
