import React from 'react';

import NativeComponentHeatmapLayer from '../../specs/NativeComponentHeatmapLayer';
import type { HeatmapLayerProps } from './HeatmapLayer.type';

const HeatmapLayer: React.FC<HeatmapLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentHeatmapLayer {...props} layerStyle={styleLayer} />;
};

export default HeatmapLayer;
