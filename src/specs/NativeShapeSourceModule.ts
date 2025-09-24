import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getGeoJsonClusterLeaves(
    viewTag: number,
    feature: string,
    limit: number,
    offset: number
  ): Promise<GeoJSON.FeatureCollection>;

  getGeoJsonClusterExpansionZoom(
    viewTag: number,
    feature: string
  ): Promise<number>;

  getGeoJsonClusterChildren(
    viewTag: number,
    feature: string
  ): Promise<GeoJSON.FeatureCollection>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeShapeSourceModule'
);
