import React from 'react';
import type { CameraRef, CameraViewProps } from './Camera.type';
import { findNodeHandle } from 'react-native';
import NativeCameraModule from '../../specs/NativeCameraModule';
import NativeComponentCamera from '../../specs/NativeComponentCamera';

export type NCC = React.ElementRef<typeof NativeComponentCamera>;

const Camera = React.forwardRef<CameraRef, CameraViewProps>((props, ref) => {
  const getZoomLevel = async (): Promise<number> => {
    const viewTag = findNodeHandle(nativeRef.current);
    if (!viewTag) {
      throw new Error('Could not find native Camera ref');
    }

    return await NativeCameraModule.getZoomLevel(viewTag);
  };

  const nativeRef = React.useRef<NCC | null>(null);

  React.useImperativeHandle(ref, () => ({
    getZoomLevel,
  }));

  return <NativeComponentCamera {...props} ref={nativeRef} />;
});

export default Camera;
