import React from 'react';

import type { FillExtrusionLayerProps } from './FillExtrusionLayer.type';
import NativeComponentFillExtrusionLayer from '../../specs/NativeComponentFillExtrusionLayer';

const FillExtrusionLayer: React.FC<FillExtrusionLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return (
    <NativeComponentFillExtrusionLayer {...props} layerStyle={styleLayer} />
  );
};

export default FillExtrusionLayer;
