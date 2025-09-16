import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';

import type { Double } from 'react-native/Libraries/Types/CodegenTypesNamespace';

interface NativeComponentsLineLayerProps extends ViewProps {
  layerID: string;
  sourceID: string;
  minZoom?: Double;
  maxZoom?: Double;
  /**
   * Omit type is refused by codegen so use other name only from ts -> kt
   */
  layerStyle?: string;
}

export default codegenNativeComponent<NativeComponentsLineLayerProps>(
  'RnMapboxToolkitLineLayer'
) as HostComponent<NativeComponentsLineLayerProps>;
