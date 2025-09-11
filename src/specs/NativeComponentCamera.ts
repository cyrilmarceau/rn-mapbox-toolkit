import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeComponentsCameraProps extends ViewProps {}

export default codegenNativeComponent<NativeComponentsCameraProps>(
  'RnMapboxToolkitCamera'
) as HostComponent<NativeComponentsCameraProps>;
