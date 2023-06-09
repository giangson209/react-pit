import { configureStore } from '@reduxjs/toolkit';
import settingReducer from './setting/settingSlice';
import cartReducer from './cart/cartSlice';
import { listenerMiddleware } from './listenerMiddleware';

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    cart: cartReducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(listenerMiddleware.middleware);
  }
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
