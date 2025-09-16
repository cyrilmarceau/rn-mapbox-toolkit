import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypesNamespace';

interface NativeComponentsCircleLayerProps extends ViewProps {
  layerID: string;
  minZoom?: Double;
  maxZoom?: Double;

  sourceID: string;
  /**
   * Omit type is refused by codegen so use other name only from ts -> kt
   */
  layerStyle?: string;
}

export default codegenNativeComponent<NativeComponentsCircleLayerProps>(
  'RnMapboxToolkitCircleLayer'
) as HostComponent<NativeComponentsCircleLayerProps>;
