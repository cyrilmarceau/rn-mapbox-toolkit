import React from 'react';
import NativeComponentsMapView from './specs/NativeComponentsMapView';
import type { MapViewProps } from './Mapview.type';

const MapView: React.FC<MapViewProps> = (props) => {
  return <NativeComponentsMapView {...props} />;
};

export default MapView;
