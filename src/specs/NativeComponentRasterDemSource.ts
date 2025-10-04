import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypesNamespace';

interface NativeComponentsRasterDemSourceProps extends ViewProps {
  url?: string;

  sourceID: string;

  maxZoom?: Double;

  minZoom?: Double;

  tileSize?: Double;
}

export default codegenNativeComponent<NativeComponentsRasterDemSourceProps>(
  'RnMapboxToolkitRasterDemSource'
) as HostComponent<NativeComponentsRasterDemSourceProps>;
