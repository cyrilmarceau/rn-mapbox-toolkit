import type { LatLng, Point } from '../../common/shared.types';

export type CameraViewProps = {};

export type CameraOptions = {
  center: LatLng;
  anchor?: Point;
  zoom?: number;
  bearing?: number;
  pitch?: number;
};

export type AnimationOptions = {
  /**
   * The duration of the animation in milliseconds
   * @default 300ms
   */
  duration?: number;
  /**
   * The amount of time, in milliseconds, to delay starting the animation after animation start.
   */
  startDelay?: number;
};
