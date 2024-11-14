import { NavRoutes } from '../Navigation';

const DummyData = {
  Screens: [
    {
      title: 'Todo App With Node js',
      navigate: NavRoutes.TodoApp,
    },
    {
      title: 'Animated Accordion',
      navigate: NavRoutes.AnimatedAccrodion,
    },
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
  Filters: [
    {
      title: 'Rotate',
    },
    {
      title: 'Scale',
    },
  ],
};

export default DummyData;
