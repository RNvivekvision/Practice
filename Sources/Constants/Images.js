const ImagePath = '../Assets/Images/';
const png = '.png';
const jpg = '.jpg';

const Images = {
  DummyImage: require(ImagePath + 'DummyImage' + jpg),
  Instagram: require(ImagePath + 'Instagram' + png),
  Share: require(ImagePath + 'Share' + png),
  Plus: require(ImagePath + 'Plus' + png),
};

export default Images;
