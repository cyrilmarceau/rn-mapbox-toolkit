import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type {
  Double,
  DirectEventHandler,
} from 'react-native/Libraries/Types/CodegenTypesNamespace';
import type { Expression } from '../common/shared.types';
import type { UnsafeMixed } from './codegenUtils';

type OnLayerStyleErrorEventHandler = DirectEventHandler<
  Readonly<{ properties: { message: string } }>
>;

interface NativeComponentsCircleLayerProps extends ViewProps {
  layerID: string;
  minZoom?: Double;
  maxZoom?: Double;

  sourceID: string;
  /**
   * Omit type is refused by codegen so use other name only from ts -> kt
   */
  layerStyle?: string;

  filter?: UnsafeMixed<Expression>;
  onLayerStyleError?: OnLayerStyleErrorEventHandler;
}

export default codegenNativeComponent<NativeComponentsCircleLayerProps>(
  'RnMapboxToolkitCircleLayer'
) as HostComponent<NativeComponentsCircleLayerProps>;
