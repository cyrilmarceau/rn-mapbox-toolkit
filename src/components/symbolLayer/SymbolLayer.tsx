import React from 'react';
import type { SymbolLayerProps } from './SymbolLayer.type';
import NativeComponentSymbolLayer from '../../specs/NativeComponentSymbolLayer';

const SymbolLayer: React.FC<SymbolLayerProps> = (props) => {
  const styleLayer = React.useMemo(
    () => JSON.stringify(props.layerStyle),
    [props.layerStyle]
  );
  return <NativeComponentSymbolLayer {...props} layerStyle={styleLayer} />;
};

export default SymbolLayer;
