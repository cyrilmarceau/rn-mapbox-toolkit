import type { HostComponent, ViewProps } from 'react-native';
import type {
  DirectEventHandler,
  Double,
  Float,
  WithDefault,
} from 'react-native/Libraries/Types/CodegenTypesNamespace';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

export type OnMapIdleEventHandler = DirectEventHandler<
  Readonly<{
    properties: {
      pitch: Double;
      bearing: Double;
      zoom: Double;
      coordinate: {
        latitude: Double;
        longitude: Double;
      };
    };
  }>
>;

export type OnMapLoadingErrorHandler = DirectEventHandler<
  Readonly<{
    properties: {
      type: 'Style' | 'Sprite' | 'Sources' | 'Glyphs' | 'Tile';
      message: string;
      sourceId?: string;
      tileId?: string;
    };
  }>
>;

export type OnStyleDataLoadedEventHandler = DirectEventHandler<
  Readonly<{ properties: { type: 'Style' | 'Sprite' | 'Sources' } }>
>;

export type OnSourceAddedEventHandler = DirectEventHandler<
  Readonly<{ properties: { sourceId: string } }>
>;

export type OnStyleImageMissingEventHandler = DirectEventHandler<
  Readonly<{ properties: { imageId: string } }>
>;

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
  onMapIdle?: OnMapIdleEventHandler;
  onMapLoaded?: DirectEventHandler<null>;
  onStyleDataLoaded?: OnStyleDataLoadedEventHandler;
  onStyleLoaded?: DirectEventHandler<null>;
  onMapLoadingError?: OnMapLoadingErrorHandler;

  onSourceAdded?: OnSourceAddedEventHandler;
  onStyleImageMissing?: OnStyleImageMissingEventHandler;
  onRenderFrameStarted?: DirectEventHandler<null>;
  onRenderFrameFinished?: DirectEventHandler<null>;
}

export default codegenNativeComponent<NativeComponentsMapViewProps>(
  'RnMapboxToolkitView'
) as HostComponent<NativeComponentsMapViewProps>;
