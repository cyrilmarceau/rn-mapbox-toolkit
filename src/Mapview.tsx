import React from 'react';
import type { MapViewProps } from './Mapview.type';
import NativeComponentsMapView from './specs/NativeComponentsMapView';

const MapView: React.FC<MapViewProps> = (props) => {
  return <NativeComponentsMapView {...props} />;
};

export default MapView;
