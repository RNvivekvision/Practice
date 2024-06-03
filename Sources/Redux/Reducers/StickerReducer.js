import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stickers: [],
};

const StickerReducer = createSlice({
  name: 'StickerReducer',
  initialState: initialState,
  reducers: {
    addSticker: (s, a) => {
      s.stickers = s.stickers.concat(a.payload);
    },
  },
});

export const { addSticker } = StickerReducer.actions;
export default StickerReducer.reducer;
