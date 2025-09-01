// @ts-nocheck
import type { HostComponent, ViewProps } from 'react-native';
import type { Double } from 'react-native/Libraries/Types/CodegenTypes';
import type {
  Float,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type StyleURL =
  | 'standard'
  | 'standard-satellite'
  | 'streets-v12'
  | 'outdoors-v12'
  | 'light-v11'
  | 'dark-v11'
  | 'satellite-v9'
  | 'satellite-streets-v12'
  | 'traffic-day-v2'
  | 'traffic-night-v2';

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

interface NativeComponentsMapViewProps extends ViewProps {
  color?: string;
  styleUrl?: WithDefault<StyleURL, 'standard'>;
  showScaleBar: boolean;
  scaleBarOptions?: {
    marginLeft?: Float;
    marginTop?: Float;
    marginRight?: Float;
    marginBottom?: Float;
    textColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    borderWidth?: Float;
    textSize?: Float;
    refreshInterval?: Float;
    ratio?: Float;
    isMetricUnits?: boolean;
    position?: Double;
  };
  logoOptions?: {
    enabled?: boolean;
    marginBottom?: Float;
    marginLeft?: Float;
    marginRight?: Float;
    marginTop?: Float;
    position?: Double;
  };
  attributionOptions?: {
    clickable?: boolean;
    enabled?: boolean;
    iconColor?: string;
    marginBottom?: Float;
    marginLeft?: Float;
    marginRight?: Float;
    marginTop?: Float;
    position?: Double;
  };
  compassOptions?: {
    clickable?: boolean;
    enabled?: boolean;
    marginBottom?: Float;
    marginLeft?: Float;
    marginRight?: Float;
    marginTop?: Float;
    position?: Double;
    fadeWhenFacingNorth?: boolean;
    opacity?: Double;
    rotation?: Double;
    visibility?: boolean;
  };
}

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
}

export default codegenNativeComponent<NativeComponentsMapViewProps>(
  'RnMapboxToolkitView'
) as HostComponent<NativeComponentsMapViewProps>;
