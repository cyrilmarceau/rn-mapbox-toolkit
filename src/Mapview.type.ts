import type { NativeSyntheticEvent } from 'react-native';
import type { LatLng, PositionToGravity } from './common/shared.types';
import type { StyleURL } from './specs/NativeComponentsMapView';
import type { ViewProps } from 'react-native';

export type OnMapIdleEvent = NativeSyntheticEvent<{
  properties: {
    pitch: number;
    bearing: number;
    zoom: number;
    coordinate: LatLng;
  };
}>;

type OnStyleDataEventSourceType = 'Style' | 'Sprite' | 'Sources';
export type OnStyleDataEvent = NativeSyntheticEvent<{
  properties: {
    type: OnStyleDataEventSourceType;
  };
}>;

export interface MapViewProps extends ViewProps {
  color?: string;
  styleUrl?: StyleURL;

  showScaleBar: boolean;
  scaleBarOptions?: {
    /**
     * Defines the margin to the bottom that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginBottom?: number;
    /**
     * Defines the margin to the left that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginLeft?: number;
    /**
     * Defines the margin to the top that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginTop?: number;
    /**
     * Defines the margin to the right that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginRight?: number;
    /**
     * Defines text color of the scale bar
     * @default "#000000"
     */
    textColor?: string;
    /**
     * Defines primary color of the scale bar
     * @default "#000000"
     */
    primaryColor?: string;
    /**
     * Defines secondary color of the scale bar
     * @default "#000000"
     */
    secondaryColor?: string;
    /**
     * @default 2
     */
    borderWidth?: number;
    /**
     * Defines text size of the scale bar
     * @default 8
     */
    textSize?: number;
    /**
     * Configures minimum refresh interval, in millisecond
     * @default 15
     */
    refreshInterval?: number;
    /**
     * Configures ratio of scale bar max width compared with MapView width
     * @default 0.5
     */
    ratio?: number;
    /**
     * Whether the scale bar is using metric unit. True if the scale bar is using metric system, false if the scale bar is using imperial units.
     * @default true
     */
    isMetricUnits?: boolean;
    /**
     * Defines where the logo is positioned on the map Default value: "top-left".
     *
     * **Available positions:**
     * - `TopLeft` (0) - Anchors to top-left corner
     * - `TopRight` (1) - Anchors to top-right corner
     * - `BottomRight` (2) - Anchors to bottom-right corner
     * - `BottomLeft` (3) - Anchors to bottom-left corner
     *  * @default TopLeft
     */
    position?: number;
  };
  logoOptions?: {
    /**
     * Whether the logo is visible on the map. Default value: true.
     */
    enabled?: boolean;
    /**
     * Defines the margin to the bottom that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginBottom?: number;
    /**
     * Defines the margin to the left that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginLeft?: number;
    /**
     * Defines the margin to the right that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginRight?: number;
    /**
     * Defines the margin to the top that the attribution icon honors. Default value: 4. This property is specified in pixels.
     * @default 4
     */
    marginTop?: number;
    /**
     * Defines where the logo is positioned on the map Default value: "bottom-left".
     *
     * **Available positions:**
     * - `TopLeft` (0) - Anchors to top-left corner
     * - `TopRight` (1) - Anchors to top-right corner
     * - `BottomRight` (2) - Anchors to bottom-right corner
     * - `BottomLeft` (3) - Anchors to bottom-left corner
     *  * @default BottomLeft
     */
    position?: PositionToGravity;
  };
  attributionOptions?: {
    /**
     * Whether the attribution can be clicked and click events can be registered. Default value: true.
     * @default true
     */
    clickable?: boolean;
    /**
     * Whether the attribution icon is visible on the map.
     * @default true
     */
    enabled?: boolean;
    /**
     * Defines text color of the attribution icon. Default value:
     * @default "#FF1E8CAB"
     */
    iconColor?: string;
    /**
     * Defines the margin to the bottom that the attribution icon honors.
     * @default 4
     */
    marginBottom?: number;
    /**
     * Defines the margin to the left that the attribution icon honors.
     * @default 4
     */
    marginLeft?: number;
    /**
     * Defines the margin to the right that the attribution icon honors.
     * @default 4
     */
    marginRight?: number;
    /**
     * Defines the margin to the top that the attribution icon honors.
     * @default 4
     */
    marginTop?: number;
    /**
     * Defines where the attribution icon is positioned on the map Default value: "bottom-left".
     *
     * **Available positions:**
     * - `TopLeft` (0) - Anchors to top-left corner
     * - `TopRight` (1) - Anchors to top-right corner
     * - `BottomRight` (2) - Anchors to bottom-right corner
     * - `BottomLeft` (3) - Anchors to bottom-left corner
     *  * @default BottomLeft
     */
    position?: PositionToGravity;
  };
  compassOptions?: {
    /**
     * Whether the compass can be clicked and click events can be registered. Default value: true.
     */
    clickable?: boolean;
    /**
     * Whether the compass is visible on the map. Default value: true.
     */
    enabled?: boolean;
    /**
     * Whether the compass fades out to invisible when facing north direction. Default value: true.
     */
    fadeWhenFacingNorth?: boolean;
    /**
     * Defines the margin to the bottom that the compass icon honors. Default value: 4.
     * @default 4
     */
    marginBottom?: number;
    /**
     * Defines the margin to the left that the compass icon honors. Default value: 4.
     * @default 4
     */
    marginLeft?: number;
    /**
     * Defines the margin to the right that the compass icon honors. Default value: 4.
     * @default 4
     */
    marginRight?: number;
    /**
     * Defines the margin to the top that the compass icon honors. Default value: 4.
     * @default 4
     */
    marginTop?: number;
    /**
     * The alpha channel value of the compass image Default value: 1.
     * @default 1
     */
    opacity?: number;
    /**

    /**
     * Defines where the compass is positioned on the map Default value: "top-right".
     * 
     * **Available positions:**
     * - `TopLeft` (0) - Anchors to top-left corner
     * - `TopRight` (1) - Anchors to top-right corner
     * - `BottomRight` (2) - Anchors to bottom-right corner
     * - `BottomLeft` (3) - Anchors to bottom-left corner
     *  * @default TopRight
     */
    position?: PositionToGravity;
    /**
     * The clockwise rotation value in degrees of the compass. Default value: 0.
     * @default 0
     */
    rotation?: number;
    /**
     * Whether the compass is displayed. Default value: true.
     * @default true
     */
    visibility?: boolean;
  };

  /**
   * The `map` has entered the idle state.
   * The `map` is idle when there are no ongoing animations, transitions and the `map` has rendered all requested non-volatile tiles (e.g., live traffic tiles).
   * The event will not be emitted if `setUserAnimationInProgress` and / or `setGestureInProgress` is set to `true`.
   * The `onMapIdle` will also be emitted after expired resources are re-fetched and `map` re-renders the new data.
   * @param e
   * @returns
   */
  onMapIdle?: (e: OnMapIdleEvent) => void;

  /**
   * The style has been fully loaded, and the `map` has rendered all visible tiles.
   * The event will be emitted only once for the current style.
   * If it is required to continuously observe an event where all the necessary resources are loaded or rendered, please check the following events: `onMapIdle`, `onStyleDataLoaded`, and `onRenderFrameFinished`.
   * @returns
   */
  onMapLoaded?: () => void;

  onStyleDataLoaded?: (e: OnStyleDataEvent) => void;
}
