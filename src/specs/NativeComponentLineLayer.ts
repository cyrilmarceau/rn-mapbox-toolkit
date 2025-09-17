import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type {
  DirectEventHandler,
  Double,
} from 'react-native/Libraries/Types/CodegenTypesNamespace';
import type { UnsafeMixed } from './codegenUtils';
import type { Expression } from '../common/shared.types';

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

  filter?: UnsafeMixed<Expression>;

  onLayerStyleError?: OnLayerStyleErrorEventHandler;
}

export default codegenNativeComponent<NativeComponentsLineLayerProps>(
  'RnMapboxToolkitLineLayer'
) as HostComponent<NativeComponentsLineLayerProps>;
