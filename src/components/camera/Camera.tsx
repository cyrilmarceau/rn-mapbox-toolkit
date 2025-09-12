import React from 'react';
import {
  type AnimationOptions,
  type CameraOptions,
  type CameraViewProps,
} from './Camera.type';
import { findNodeHandle } from 'react-native';
import NativeCameraModule from '../../specs/NativeCameraModule';
import NativeComponentCamera, {
  Commands,
} from '../../specs/NativeComponentCamera';

export interface CameraRef {
  getZoomLevel: () => Promise<number>;
  flyTo: (
    cameraOptions: CameraOptions,
    animationOptions?: AnimationOptions
  ) => Promise<void>;
  easeTo: (
    cameraOptions: CameraOptions,
    animationOptions?: AnimationOptions
  ) => Promise<void>;
}

export type NCC = React.ElementRef<typeof NativeComponentCamera>;

const Camera = React.forwardRef<CameraRef, CameraViewProps>((props, ref) => {
  const nativeRef = React.useRef<NCC | null>(null);

  const getZoomLevel = async (): Promise<number> => {
    const viewTag = findNodeHandle(nativeRef.current);
    if (!viewTag) {
      throw new Error('Could not find native Camera ref');
    }

    try {
      return await NativeCameraModule.getZoomLevel(viewTag);
    } catch (error) {
      throw new Error('Failed to getZoomLevel');
    }
  };

  const flyTo = async (
    cameraOptions: CameraOptions,
    animationOptions?: AnimationOptions
  ): Promise<void> => {
    if (!nativeRef.current) return;

    try {
      await Commands.flyTo(
        nativeRef.current,
        JSON.stringify(cameraOptions),
        animationOptions && JSON.stringify(animationOptions)
      );
    } catch (error) {
      throw new Error('Failed to flyTo');
    }
  };

  const easeTo = async (
    cameraOptions: CameraOptions,
    animationOptions?: AnimationOptions
  ): Promise<void> => {
    if (!nativeRef.current) return;

    try {
      await Commands.easeTo(
        nativeRef.current,
        JSON.stringify(cameraOptions),
        animationOptions && JSON.stringify(animationOptions)
      );
    } catch (error) {
      throw new Error('Failed to easeTo');
    }
  };

  React.useImperativeHandle(ref, () => ({
    getZoomLevel,
    flyTo,
    easeTo,
  }));

  return <NativeComponentCamera {...props} ref={nativeRef} />;
});

export default Camera;
