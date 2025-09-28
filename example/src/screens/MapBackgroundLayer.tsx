import React from 'react';
import { Button, StyleSheet } from 'react-native';

import {
  BackgroundLayer,
  Camera,
  MapView,
  type CameraRef,
} from 'rn-mapbox-toolkit';

export default function MapBackgroundLayer() {
  const cameraRef = React.useRef<CameraRef | null>(null);

  const handleFlyTo = async () => {
    try {
      await cameraRef.current?.flyTo({
        center: { longitude: 2.333333, latitude: 48.866667 },
      });
    } catch (error) {
      console.error('An error occured', error);
    }
  };

  React.useEffect(() => {
    if (cameraRef?.current) {
      handleFlyTo();
    }
  }, []);

  return (
    <>
      <MapView
        style={style.mapContainer}
        styleUrl="dark-v11"
        showScaleBar={true}
      >
        <Camera ref={cameraRef} />

        <BackgroundLayer
          layerID="test-4"
          layerStyle={{
            'background-color': '#ececec',
            'background-opacity': 0.3,
          }}
        />
      </MapView>
      <Button title="FlyTo" onPress={handleFlyTo} />
    </>
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
