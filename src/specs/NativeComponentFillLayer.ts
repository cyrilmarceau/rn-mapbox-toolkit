import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';
import type {
  Double,
  DirectEventHandler,
} from 'react-native/Libraries/Types/CodegenTypesNamespace';
import type { UnsafeMixed } from './codegenUtils';
import type { Expression } from '../common/shared.types';

type OnLayerStyleErrorEventHandler = DirectEventHandler<
  Readonly<{ properties: { message: string } }>
>;

interface NativeComponentsFillLayerProps extends ViewProps {
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

export default codegenNativeComponent<NativeComponentsFillLayerProps>(
  'RnMapboxToolkitFillLayer'
) as HostComponent<NativeComponentsFillLayerProps>;
