import React from 'react';

import type { BuildingLayerProps } from './BuildingLayer.type';
import NativeComponentBuildingLayer from '../../specs/NativeComponentBuildingLayer';

const BuildingLayer: React.FC<BuildingLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentBuildingLayer {...props} layerStyle={styleLayer} />;
};

export default BuildingLayer;
