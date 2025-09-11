import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getZoomLevel(viewTag: number): Promise<number>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeCameraModule');
