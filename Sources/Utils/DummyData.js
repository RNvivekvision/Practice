import { NavRoutes } from '../Navigation';

const DummyData = {
  Screens: [
    {
      title: 'Webview with automatic form fill up',
      navigate: NavRoutes.WebForm,
    },
    {
      title: 'Open AI',
      navigate: NavRoutes.OpenAI,
    },
    {
      title: 'Image Editing',
      navigate: NavRoutes.ImageEditing,
    },
  ],
};

export default DummyData;
