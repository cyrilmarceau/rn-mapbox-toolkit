import {
  codegenNativeComponent,
  type HostComponent,
  type ViewProps,
} from 'react-native';

interface NativeComponentsImagesProps extends ViewProps {
  images: ReadonlyArray<{
    name: string;
    uri: string;
    sdf: boolean;
  }>;
}

export default codegenNativeComponent<NativeComponentsImagesProps>(
  'RnMapboxToolkitImages'
) as HostComponent<NativeComponentsImagesProps>;
