import type { NativeSyntheticEvent } from 'react-native';
export type LatLng = {
  latitude: number;
  longitude: number;
};

export type Point = {
  x: number;
  y: number;
};

const PositionToGravity = {
  /** Anchors to top-left corner */
  TopLeft: 0,

  /** Anchors to top-right corner */
  TopRight: 1,

  /** Anchors to bottom-right corner */
  BottomRight: 2,

  /** Anchors to bottom-left corner */
  BottomLeft: 3,
} as const;

export type PositionToGravity =
  (typeof PositionToGravity)[keyof typeof PositionToGravity];

export type OnLayerStyleError = NativeSyntheticEvent<{
  properties: { message: string };
}>;
