import React from 'react';
import NativeComponentShapeSource from '../../specs/NativeComponentShapeSource';

import { type ShapeSourceProps } from './ShapeSource.type';
import { isCircleLayer, isFillLayer, isLineLayer } from '../tools';

type NShapeSource = {
  children: React.ReactNode;
} & ShapeSourceProps;

const ShapeSource: React.FC<NShapeSource> = (props) => {
  const geojson = React.useMemo(
    () => JSON.stringify(props.shape),
    [props.shape]
  );

  /**
   * Instead of throw new Error in native side because it's not really one
   * Informate in js side of duplicate error
   */
  const dev__checkLayerID = React.useCallback(() => {
    const seen = new Set();
    const duplicate: string[] = [];

    React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child)) return;

      // Type guard for props inference
      if (isCircleLayer(child) || isLineLayer(child) || isFillLayer(child)) {
        const { layerID } = child.props;

        seen.has(layerID) ? duplicate.push(layerID) : seen.add(layerID);
      }

      if (duplicate.length > 0) {
        console.error(
          `Found duplicate layer ID \nSourceID => "${props.sourceID}" \nIdentified layerID =>`,
          duplicate
        );
      }
    });
  }, [props.children, props.sourceID]);

  React.useEffect(() => {
    if (process.env.NODE_ENV === 'production') return;

    dev__checkLayerID();
  }, [dev__checkLayerID]);

  return <NativeComponentShapeSource {...props} shape={geojson} />;
};

export default ShapeSource;
