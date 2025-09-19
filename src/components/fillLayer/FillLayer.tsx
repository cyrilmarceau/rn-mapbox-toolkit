import React from 'react';
import type { FillLayerProps } from './FillLayer.type';
import NativeComponentFillLayer from '../../specs/NativeComponentFillLayer';

const FillLayer: React.FC<FillLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentFillLayer {...props} layerStyle={styleLayer} />;
};

export default FillLayer;
