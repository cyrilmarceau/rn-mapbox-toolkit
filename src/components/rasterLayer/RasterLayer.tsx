import React from 'react';

import NativeComponentRasterLayer from '../../specs/NativeComponentRasterLayer';
import type { RasterLayerProps } from './RasterLayer.type';

const RasterLayer: React.FC<RasterLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentRasterLayer {...props} layerStyle={styleLayer} />;
};

export default RasterLayer;
