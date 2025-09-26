import React from 'react';
import { findNodeHandle } from 'react-native';
import NativeComponentsMapView from '../../specs/NativeComponentsMapView';
import MapViewTurboModule from '../../specs/NativeMapViewModule';
import type { MapViewProps, MapViewRef } from './Mapview.type';

const MapView = React.forwardRef<MapViewRef, MapViewProps>((props, ref) => {
  const nativeRef = React.useRef<React.ElementRef<
    typeof NativeComponentsMapView
  > | null>(null);

  const getZoomLevel = async (): Promise<number> => {
    const viewTag = findNodeHandle(nativeRef.current);
    if (!viewTag) {
      throw new Error('Could not find native MapView ref');
    }

    try {
      return await MapViewTurboModule.getZoomLevel(viewTag);
    } catch (error) {
      throw new Error('Failed to execute getZoomLevel');
    }
  };

  React.useImperativeHandle(ref, () => ({
    getZoomLevel,
  }));

  return <NativeComponentsMapView {...props} ref={nativeRef} />;
});

export default MapView;
