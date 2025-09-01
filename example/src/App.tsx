import { StyleSheet } from 'react-native';
import MapView from 'rn-mapbox-toolkit';

export default function App() {
  return (
    <MapView
      style={style.mapContainer}
      styleUrl="dark-v11"
      showScaleBar={true}
      scaleBarOptions={{
        isMetricUnits: true,
        position: 3,
        marginRight: 30,
      }}
      logoOptions={{
        enabled: true,
        position: 2,
      }}
      attributionOptions={{
        position: 2,
      }}
      compassOptions={{
        enabled: true,
        visibility: true,
        fadeWhenFacingNorth: false,
        position: 1,
        marginRight: 80,
      }}
      onMapIdle={(e) =>
        console.log(`onMapIdle message`, e.nativeEvent.properties)
      }
    />
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
