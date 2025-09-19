import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypesNamespace';

interface NativeComponentsShapeSourceProps extends ViewProps {
  shape: string;
  sourceID: string;
  buffer?: Double;
  tolerance?: Double;
  cluster?: boolean;
  clusterRadius?: Double;
  clusterMaxZoom?: Double;
  clusterMinPoints?: Double;
}

export default codegenNativeComponent<NativeComponentsShapeSourceProps>(
  'RnMapboxToolkitShapeSource'
) as HostComponent<NativeComponentsShapeSourceProps>;
