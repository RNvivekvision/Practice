import { configureStore } from '@reduxjs/toolkit';
import { StickerReducer } from './Reducers';

const Store = configureStore({
  reducer: { StickerReducer },
});

export default Store;
