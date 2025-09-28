import React from 'react';
import { Button, StyleSheet } from 'react-native';

import { Camera, MapView, SkyLayer, type CameraRef } from 'rn-mapbox-toolkit';

export default function MapSkyLayer() {
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

        <SkyLayer
          layerID="test-3"
          layerStyle={{
            'sky-type': 'atmosphere',
            'sky-atmosphere-color': 'rgba(200, 220, 255, 0.8)',
            'sky-atmosphere-halo-color': 'rgba(255, 180, 120, 0.9)',
            'sky-atmosphere-sun': [220, 80],
            'sky-atmosphere-sun-intensity': 25,
            'sky-opacity': 1,
            'visibility': 'visible',
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
