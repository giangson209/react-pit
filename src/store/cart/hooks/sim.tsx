import { useCallback } from 'react';
import { toast } from 'react-hot-toast';

// Need refactor positoin type
import BottomSheetAddToCart from '@/components/modal/modal-add-sim';
import { modal } from '@/context/modal-context';
import { Model } from '@/types/model';
import { PayloadAddSimToCart } from '../cartSlice';

const useSimAction = () => {
  const handleBuyNow = useCallback((data: PayloadAddSimToCart) => {
    // Add item to checkout here
    toast("We haven't processed the logic for this part yet", { ariaProps: { role: 'alert' } as any });
  }, []);
  const handleAddToCart = useCallback(
    (item: Model.Sim | Model.Sim[], mode?: 'cart' | 'buy') => {
      modal.open({
        render: <BottomSheetAddToCart items={Array.isArray(item) ? item : [item]} mode={mode} />,
        closeButton: false,
        transition: false,
        className: 'modal-box shadow-itel',
        classNameContainer: 'modal-full md:modal-bottom-sheet',
        classNameOverlay: 'bg-neutral-0 md:bg-neutral-900 md:bg-opacity-50',
        // Call back when click submit in modal,
        onDone: handleBuyNow
      });
    },
    [handleBuyNow]
  );
  return { handleBuyNow, handleAddToCart };
};

export default useSimAction;
