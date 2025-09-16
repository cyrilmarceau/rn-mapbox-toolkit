import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';

import type {
  Double,
  DirectEventHandler,
} from 'react-native/Libraries/Types/CodegenTypesNamespace';

type OnLayerStyleErrorEventHandler = DirectEventHandler<
  Readonly<{ properties: { message: string } }>
>;

interface NativeComponentsLineLayerProps extends ViewProps {
  layerID: string;
  sourceID: string;
  minZoom?: Double;
  maxZoom?: Double;
  /**
   * Omit type is refused by codegen so use other name only from ts -> kt
   */
  layerStyle?: string;

  onLayerStyleError?: OnLayerStyleErrorEventHandler;
}

export default codegenNativeComponent<NativeComponentsLineLayerProps>(
  'RnMapboxToolkitLineLayer'
) as HostComponent<NativeComponentsLineLayerProps>;
