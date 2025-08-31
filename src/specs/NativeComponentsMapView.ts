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
  scaleBarOptions: {
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
  logoOptions: {
    enabled: boolean;
    marginBottom: Float;
    marginLeft: Float;
    marginRight: Float;
    marginTop: Float;
    position: Double;
  };
  attributionOptions: {
    clickable: boolean;
    enabled: boolean;
    iconColor: string;
    marginBottom: Float;
    marginLeft: Float;
    marginRight: Float;
    marginTop: Float;
    position: Double;
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
}

export default codegenNativeComponent<NativeComponentsMapViewProps>(
  'RnMapboxToolkitView'
) as HostComponent<NativeComponentsMapViewProps>;
