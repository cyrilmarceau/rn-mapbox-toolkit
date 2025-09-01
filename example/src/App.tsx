import { StyleSheet } from 'react-native';
import MapView from 'rn-mapbox-toolkit';

export default function App() {
  return (
    <MapView
      style={style.mapContainer}
      styleUrl="dark-v11"
      showScaleBar={true}
      scaleBarOptions={{
        marginLeft: 200,
        isMetricUnits: true,
      }}
      logoOptions={{
        enabled: true,
        marginLeft: 90,
        position: 3,
      }}
      compassOptions={{
        enabled: true,
        visibility: true,
        fadeWhenFacingNorth: false,
        position: 1,
        marginRight: 80,
      }}
    />
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
