import { type TurboModule, TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {}

export default TurboModuleRegistry.getEnforcing<Spec>(
  'NativeShapeSourceModule'
);
