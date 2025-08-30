import { StyleSheet } from 'react-native';
import MapView from 'rn-mapbox-toolkit';

export default function App() {
  return (
    <MapView
      style={style.mapContainer}
      styleUrl="streets-v12"
      showScaleBar={true}
      scaleBarOptions={{
        marginLeft: 200,
        isMetricUnits: true,
      }}
    />
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
