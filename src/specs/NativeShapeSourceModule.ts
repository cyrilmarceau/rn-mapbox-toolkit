import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getGeoJsonClusterLeaves(
    viewTag: number,
    feature: string,
    limit: number,
    offset: number
  ): Promise<GeoJSON.FeatureCollection>;
}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeShapeSourceModule'
);
