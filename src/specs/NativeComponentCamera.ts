import type { HostComponent, ViewProps } from 'react-native';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

interface NativeComponentsCameraProps extends ViewProps {}

interface NativeCommands {
  flyTo: (
    viewRef: React.ElementRef<HostComponent<NativeComponentsCameraProps>>,
    cameraOptions: string,
    animationOptions?: string
  ) => Promise<void>;
  easeTo: (
    viewRef: React.ElementRef<HostComponent<NativeComponentsCameraProps>>,
    cameraOptions: string,
    animationOptions?: string
  ) => Promise<void>;
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['flyTo', 'easeTo'],
});

export default codegenNativeComponent<NativeComponentsCameraProps>(
  'RnMapboxToolkitCamera'
) as HostComponent<NativeComponentsCameraProps>;
