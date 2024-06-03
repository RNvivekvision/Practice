import React from 'react';
import { Routes } from './Navigation';
import { StickerProvider } from './Components/ImageEditing/Editing/StickerContext';

const App = () => {
  return (
    <StickerProvider>
      <Routes />
    </StickerProvider>
  );
};

export default App;
