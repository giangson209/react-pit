import { RootState } from '../store';

export function selectCartItems(state: RootState) {
  return state.cart.cartItems;
}
export function selectCartSimItems(state: RootState) {
  return state.cart.cartSimItem;
}
export function getTotalItemInCart(state: RootState) {
  return state.cart.cartItems.length + state.cart.cartSimItem.length;
}
