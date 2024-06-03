import { createContext, useCallback, useContext, useReducer } from 'react';

const StickerContext = createContext(null);

const stickerReducer = (stickers, action) => {
  return [...stickers, action.sticker];
};

export const useStickerContext = () => {
  const ctx = useContext(StickerContext);
  if (ctx === null) {
    throw new Error('No Sticker context found');
  }
  const { stickers, dispatch } = ctx;
  const addSticker = useCallback(
    sticker => {
      dispatch({ action: 'add', sticker });
    },
    [dispatch],
  );
  return {
    stickers,
    addSticker,
  };
};

export const StickerProvider = ({ children }) => {
  const [stickers, dispatch] = useReducer(stickerReducer, []);
  return (
    <StickerContext.Provider value={{ stickers, dispatch }}>
      {children}
    </StickerContext.Provider>
  );
};
