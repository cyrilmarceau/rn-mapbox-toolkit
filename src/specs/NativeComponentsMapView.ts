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
    marginLeft?: number;
    marginTop?: number;
    marginRight?: number;
    marginBottom?: number;
    textColor?: string;
    primaryColor?: string;
    secondaryColor?: string;
    borderWidth?: number;
    textSize?: number;
    refreshInterval?: number;
    ratio?: number;
    isMetricUnits?: boolean;
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
     * @default 1
     */
    position?: Double;
  };
  attributionOptions?: {
    clickable?: boolean;
    enabled?: boolean;
    iconColor?: string;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    position?: Double;
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
     * Defines where the compass is positioned on the map Default value: "top-right".
     * @default 1
     */
    position?: number;
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
