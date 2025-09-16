import React from 'react';
import NativeComponentShapeSource from '../../specs/NativeComponentShapeSource';
import { type ShapeSourceProps } from './ShapeSource.type';

type NShapeSource = {
  children: React.ReactNode;
} & ShapeSourceProps;

const ShapeSource: React.FC<NShapeSource> = (props) => {
  const geojson = React.useMemo(
    () => JSON.stringify(props.shape),
    [props.shape]
  );

  return <NativeComponentShapeSource {...props} shape={geojson} />;
};

export default ShapeSource;
