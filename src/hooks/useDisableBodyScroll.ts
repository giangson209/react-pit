import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useDisableBodyScroll = (open:boolean) => {
  const router = useRouter()
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    if(!router.asPath) {
      document.body.style.overflow = 'unset';
    }
  }, [open, router]);
};

export default useDisableBodyScroll