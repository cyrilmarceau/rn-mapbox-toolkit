// @ts-nocheck
import type { ViewProps } from 'react-native';
import type {
  WithDefault,
  Double,
} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type { HostComponent } from 'react-native';
import type { Float } from 'react-native/Libraries/Types/CodegenTypes';

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
}

export interface MapViewProps extends ViewProps {
  color?: string;
  styleUrl?: StyleURL;

  showScaleBar: boolean;
  scaleBarOptions: {
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
}

export default codegenNativeComponent<NativeComponentsMapViewProps>(
  'RnMapboxToolkitView'
) as HostComponent<NativeComponentsMapViewProps>;
