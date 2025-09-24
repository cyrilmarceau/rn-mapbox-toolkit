import React from 'react';
import NativeComponentShapeSource from '../../specs/NativeComponentShapeSource';

import { type NativeSyntheticEvent, findNodeHandle } from 'react-native';
import NativeShapeSourceModule from '../../specs/NativeShapeSourceModule';
import { isCircleLayer, isFillLayer, isLineLayer } from '../tools';
import {
  type GetGeoJsonClusterLeaves,
  type ShapeSourceProps,
  type ShapeSourceRef,
} from './ShapeSource.type';

export type NShapeSource = React.ElementRef<typeof NativeComponentShapeSource>;

const ShapeSource = React.forwardRef<ShapeSourceRef, ShapeSourceProps>(
  (props, ref) => {
    const nativeRef = React.useRef<NShapeSource | null>(null);

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

    const onShapePressed = (
      e: NativeSyntheticEvent<{ features: GeoJSON.Feature[] }>
    ) => {
      if (props?.onPress) {
        props.onPress?.(e.nativeEvent.features);
      }
    };

    const getGeoJsonClusterLeaves = async (
      params: GetGeoJsonClusterLeaves
    ): Promise<GeoJSON.FeatureCollection> => {
      const viewTag = findNodeHandle(nativeRef.current);
      if (!viewTag) {
        throw new Error('Could not find native ShapeSource ref');
      }

      try {
        const { feature, limit, offset } = params;
        const JSONFeature = JSON.stringify(feature);

        return await NativeShapeSourceModule.getGeoJsonClusterLeaves(
          viewTag,
          JSONFeature,
          limit,
          offset
        );
      } catch (error) {
        throw new Error('Failed to getGeoJsonClusterLeaves');
      }
    };

    const getGeoJsonClusterExpansionZoom = async (
      feature: GeoJSON.Feature
    ): Promise<number> => {
      const viewTag = findNodeHandle(nativeRef.current);
      if (!viewTag) {
        throw new Error('Could not find native ShapeSource ref');
      }

      try {
        const JSONFeature = JSON.stringify(feature);

        return await NativeShapeSourceModule.getGeoJsonClusterExpansionZoom(
          viewTag,
          JSONFeature
        );
      } catch (error) {
        throw new Error('Failed to getGeoJsonClusterLeaves');
      }
    };

    const getGeoJsonClusterChildren = async (
      feature: GeoJSON.Feature
    ): Promise<GeoJSON.FeatureCollection> => {
      const viewTag = findNodeHandle(nativeRef.current);
      if (!viewTag) {
        throw new Error('Could not find native ShapeSource ref');
      }

      try {
        const JSONFeature = JSON.stringify(feature);

        return await NativeShapeSourceModule.getGeoJsonClusterChildren(
          viewTag,
          JSONFeature
        );
      } catch (error) {
        throw new Error('Failed to getGeoJsonClusterLeaves');
      }
    };

    React.useEffect(() => {
      if (process.env.NODE_ENV === 'production') return;

      dev__checkLayerID();
    }, [dev__checkLayerID]);

    React.useImperativeHandle(ref, () => ({
      getGeoJsonClusterLeaves,
      getGeoJsonClusterExpansionZoom,
      getGeoJsonClusterChildren,
    }));

    return (
      <NativeComponentShapeSource
        {...props}
        onPress={onShapePressed}
        shape={geojson}
        ref={nativeRef}
      />
    );
  }
);

export default ShapeSource;
