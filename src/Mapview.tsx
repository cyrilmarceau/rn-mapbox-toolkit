// import { RnMapboxToolkitView } from 'rn-mapbox-toolkit';
import NativeComponentsMapView, {
  type MapViewProps,
} from './specs/NativeComponentsMapView';

const MapView: React.FC<MapViewProps> = (props) => {
  return <NativeComponentsMapView {...props} />;
};

export default MapView;
