import React from 'react';

import NativeComponentClipLayer from '../../specs/NativeComponentClipLayer';
import type { ClipLayerProps } from './ClipLayer.type';

const ClipLayer: React.FC<ClipLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentClipLayer {...props} layerStyle={styleLayer} />;
};

export default ClipLayer;
