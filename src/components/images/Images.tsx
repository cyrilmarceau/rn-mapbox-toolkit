import React from 'react';
import NativeComponentImages from '../../specs/NativeComponentImages';
import type { ImagesProps } from './Images.type';

const Images: React.FC<ImagesProps> = ({ images }) => {
  console.log('Binded images:', images);

  return <NativeComponentImages images={images} />;
};

export default Images;
