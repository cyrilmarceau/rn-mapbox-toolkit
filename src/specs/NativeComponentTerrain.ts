import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypesNamespace';

interface NativeComponentsTerrainProps extends ViewProps {
  sourceID: string;

  exaggeration: Double;
}

export default codegenNativeComponent<NativeComponentsTerrainProps>(
  'RnMapboxToolkitTerrain'
) as HostComponent<NativeComponentsTerrainProps>;
