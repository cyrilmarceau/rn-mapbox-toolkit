import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';

interface NativeComponentsShapeSourceProps extends ViewProps {
  shape: string;
  sourceID: string;
}

export default codegenNativeComponent<NativeComponentsShapeSourceProps>(
  'RnMapboxToolkitShapeSource'
) as HostComponent<NativeComponentsShapeSourceProps>;
