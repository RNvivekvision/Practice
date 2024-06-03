import { Skia, rect } from '@shopify/react-native-skia';

export const inflate = (rct, amount) =>
  rect(
    rct.x - amount,
    rct.y - amount,
    rct.width + amount * 2,
    rct.height + amount * 2,
  );

export const deflate = (rct, amount) =>
  rect(
    rct.x + amount,
    rct.y + amount,
    rct.width - amount * 2,
    rct.height - amount * 2,
  );

export const scale = (matrix, s, origin) => {
  'worklet';
  const source = Skia.Matrix(matrix.get());
  source.translate(origin.x, origin.y);
  source.scale(s, s);
  source.translate(-origin.x, -origin.y);
  return source;
};

export const rotateZ = (matrix, theta, origin) => {
  'worklet';
  const source = Skia.Matrix(matrix.get());
  source.translate(origin.x, origin.y);
  source.rotate(theta);
  source.translate(-origin.x, -origin.y);
  return source;
};

export const translate = (matrix, x, y) => {
  'worklet';
  const m = Skia.Matrix();
  m.translate(x, y);
  m.concat(matrix);
  return m;
};

const MatrixIndex = {
  TransX: 12,
  TransY: 13,
  ScaleX: 0,
  ScaleY: 5,
  SkewX: 4,
  SkewY: 1,
  Persp0: 2,
  Persp1: 6,
  Persp2: 10,
};

export const toM4 = m3 => {
  'worklet';
  const m = m3.get();
  const tx = m[MatrixIndex.TransX];
  const ty = m[MatrixIndex.TransY];
  const sx = m[MatrixIndex.ScaleX];
  const sy = m[MatrixIndex.ScaleY];
  const skewX = m[MatrixIndex.SkewX];
  const skewY = m[MatrixIndex.SkewY];
  const persp0 = m[MatrixIndex.Persp0];
  const persp1 = m[MatrixIndex.Persp1];
  const persp2 = m[MatrixIndex.Persp2];
  return [
    sx,
    skewY,
    persp0,
    0,
    skewX,
    sy,
    persp1,
    0,
    0,
    0,
    1,
    0,
    tx,
    ty,
    persp2,
    1,
  ];
};
