import React from 'react';
import type { CircleLayerProps } from './CircleLayer.type';
import NativeComponentCircleLayer from '../../specs/NativeComponentCircleLayer';

const CircleLayer: React.FC<CircleLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentCircleLayer {...props} layerStyle={styleLayer} />;
};

export default CircleLayer;
