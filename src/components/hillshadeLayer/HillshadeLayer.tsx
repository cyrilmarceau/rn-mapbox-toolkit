import React from 'react';

import NativeComponentHillShadeLayer from '../../specs/NativeComponentHillShadeLayer';
import type { HillshadeLayerProps } from './HillshadeLayer.type';

const HeatmapLayer: React.FC<HillshadeLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentHillShadeLayer {...props} layerStyle={styleLayer} />;
};

export default HeatmapLayer;
