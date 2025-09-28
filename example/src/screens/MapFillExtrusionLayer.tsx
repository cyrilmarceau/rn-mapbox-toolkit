import React from 'react';
import { Button, StyleSheet } from 'react-native';

import {
  Camera,
  FillExtrusionLayer,
  MapView,
  type CameraRef,
} from 'rn-mapbox-toolkit';

export default function MapFillExtrusionLayer() {
  const cameraRef = React.useRef<CameraRef | null>(null);

  const handleFlyTo = async () => {
    try {
      await cameraRef.current?.flyTo({
        center: { longitude: 2.333333, latitude: 48.866667 },
        zoom: 18,
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

        <FillExtrusionLayer
          layerID="3d-buildings"
          sourceID="composite"
          minZoom={15}
          layerStyle={{
            'fill-extrusion-color': '#aaa',
            'fill-extrusion-height': ['get', 'height'],
            'fill-extrusion-base': ['get', 'min_height'],
            'fill-extrusion-opacity': 0.6,
            'fill-extrusion-edge-radius': 0.3,
            'fill-extrusion-ambient-occlusion-intensity': 0.2,
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
