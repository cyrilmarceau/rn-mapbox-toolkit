import ScreenList from '../GroupScreen';
import MapBackgroundLayer from '../screens/MapBackgroundLayer';
import MapCamera from '../screens/MapCamera';
import MapCircleLayer from '../screens/MapCircleLayer';
import MapCluster from '../screens/MapCluster';
import MapClusterChildren from '../screens/MapClusterChildren';
import MapClusterZoom from '../screens/MapClusterZoom';
import MapEventsListener from '../screens/MapEventsListener';
import MapFillLayer from '../screens/MapFillLayer';
import MapLineLayer from '../screens/MapLineLayer';
import MapSettings from '../screens/MapSettings';
import MapSkyLayer from '../screens/MapSkyLayer';
import MapFillExtrusionLayer from '../screens/MapFillExtrusionLayer';
export interface ScreenConfig {
  label: string;
  route: string;
  component: React.ComponentType;
}

const SCREENS: ScreenConfig[] = [
  {
    label: 'Home',
    route: 'Home',
    component: ScreenList,
  },
  {
    label: 'MapSettings',
    route: 'MapSettings',
    component: MapSettings,
  },
  {
    label: 'MapEventsListener',
    route: 'MapEventsListener',
    component: MapEventsListener,
  },
  {
    label: 'MapCamera',
    route: 'MapCamera',
    component: MapCamera,
  },
  {
    label: 'MapLineLayer',
    route: 'MapLineLayer',
    component: MapLineLayer,
  },
  {
    label: 'MapFillLayer',
    route: 'MapFillLayer',
    component: MapFillLayer,
  },
  {
    label: 'MapCircleLayer',
    route: 'MapCircleLayer',
    component: MapCircleLayer,
  },
  {
    label: 'MapCluster',
    route: 'MapCluster',
    component: MapCluster,
  },
  {
    label: 'MapClusterZoom',
    route: 'MapClusterZoom',
    component: MapClusterZoom,
  },
  {
    label: 'MapClusterChildren',
    route: 'MapClusterChildren',
    component: MapClusterChildren,
  },
  {
    label: 'MapSkyLayer',
    route: 'MapSkyLayer',
    component: MapSkyLayer,
  },
  {
    label: 'MapBackgroundLayer',
    route: 'MapBackgroundLayer',
    component: MapBackgroundLayer,
  },
  {
    label: 'MapFillExtrusionLayer',
    route: 'MapFillExtrusionLayer',
    component: MapFillExtrusionLayer,
  },
];

export { SCREENS };
