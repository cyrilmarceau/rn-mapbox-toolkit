import React from 'react';

import NativeComponentHillshadeLayer from '../../specs/NativeComponentHillshadeLayer';
import type { HillshadeLayerProps } from './HillshadeLayer.type';

const HillshadeLayer: React.FC<HillshadeLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentHillshadeLayer {...props} layerStyle={styleLayer} />;
};

export default HillshadeLayer;
