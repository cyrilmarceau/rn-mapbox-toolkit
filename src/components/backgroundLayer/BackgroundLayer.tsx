import React from 'react';
import NativeComponentBackgroundLayer from '../../specs/NativeComponentBackgroundLayer';
import type { BackgroundLayerProps } from './BackgroundLayer.type';

const BackgroundLayer: React.FC<BackgroundLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentBackgroundLayer {...props} layerStyle={styleLayer} />;
};

export default BackgroundLayer;
