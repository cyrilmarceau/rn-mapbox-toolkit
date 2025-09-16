import React from 'react';
import NativeComponentLineLayer from '../../specs/NativeComponentLineLayer';
import { type LineLayerProps } from './LineLayer.type';

const LineLayer: React.FC<LineLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );

  return <NativeComponentLineLayer {...props} layerStyle={styleLayer} />;
};

export default LineLayer;
