import React from 'react';

import NativeComponentRasterParticleLayer from '../../specs/NativeComponentRasterParticleLayer';
import type { RasterParticleLayerProps } from './RasterParticleLayer.type';

const RasterParticle: React.FC<RasterParticleLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return (
    <NativeComponentRasterParticleLayer {...props} layerStyle={styleLayer} />
  );
};

export default RasterParticle;
