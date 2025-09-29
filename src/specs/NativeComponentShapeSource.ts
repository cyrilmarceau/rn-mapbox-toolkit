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

export type OnPressHandler = DirectEventHandler<{
  features: UnsafeMixed<GeoJSON.Feature[]>;
}>;

interface NativeComponentsShapeSourceProps extends ViewProps {
  url?: string;
  shape?: string;
  sourceID: string;
  buffer?: Double;
  tolerance?: Double;
  cluster?: boolean;
  clusterRadius?: Double;
  clusterMaxZoom?: Double;
  clusterMinPoints?: Double;

  hitSlopArea?: {
    width: Double;
    height: Double;
  };

  onPress?: OnPressHandler;
}

export default codegenNativeComponent<NativeComponentsShapeSourceProps>(
  'RnMapboxToolkitShapeSource'
) as HostComponent<NativeComponentsShapeSourceProps>;
