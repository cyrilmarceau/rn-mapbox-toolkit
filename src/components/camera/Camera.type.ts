import type { LatLng, Point } from '../../common/shared.types';

export type CameraViewProps = {
  /**
   * The minimum zoom level, in Mapbox zoom levels 0-25.5.
   */
  minZoom?: number;
  /**
   * The maximum zoom level, in Mapbox zoom levels 0-25.5.
   */
  maxZoom?: number;
  /**
   * The minimum allowed pitch value in degrees.
   */
  minPitch?: number;
  /**
   * The maximum allowed pitch value in degrees.
   */
  maxPitch?: number;
};

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
