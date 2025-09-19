import ScreenList from '../GroupScreen';
import MapCamera from '../screens/MapCamera';
import MapCircleLayer from '../screens/MapCircleLayer';
import MapEventsListener from '../screens/MapEventsListener';
import MapCluster from '../screens/MapCluster';
import MapFillLayer from '../screens/MapFillLayer';
import MapLineLayer from '../screens/MapLineLayer';
import MapSettings from '../screens/MapSettings';

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
];

export { SCREENS };
