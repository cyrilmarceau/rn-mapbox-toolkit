import React from 'react';

import NativeComponentSkyLayer from '../../specs/NativeComponentSkyLayer';
import type { SkyLayerProps } from './SkyLayer.type';

const SkyLayer: React.FC<SkyLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentSkyLayer {...props} layerStyle={styleLayer} />;
};

export default SkyLayer;
