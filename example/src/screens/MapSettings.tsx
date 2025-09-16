import { StyleSheet } from 'react-native';
import { MapView } from 'rn-mapbox-toolkit';

export default function MapSettings() {
  return (
    <>
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
        gestureOptions={{
          doubleTapToZoomInEnabled: true,
        }}
      />
    </>
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
