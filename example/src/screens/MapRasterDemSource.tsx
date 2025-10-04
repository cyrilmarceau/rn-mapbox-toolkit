import React from 'react';
import { Button, StyleSheet } from 'react-native';
import {
  Camera,
  MapView,
  RasterDemSource,
  Terrain,
  type CameraRef,
} from 'rn-mapbox-toolkit';

export default function MapRasterDemSource() {
  const cameraRef = React.useRef<CameraRef | null>(null);

  const handleFlyTo = async () => {
    try {
      await cameraRef.current?.flyTo({
        center: { longitude: 3.4855662674819943, latitude: 44.33327254316654 },
        zoom: 14,
        pitch: 45,
      });
    } catch (error) {
      console.error('An error occurred', error);
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
        styleUrl="outdoors-v12"
        showScaleBar={true}
      >
        <Camera ref={cameraRef} />

        <RasterDemSource
          sourceID="raster-dem-source"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
        >
          <Terrain sourceID="raster-dem-source" exaggeration={2.0} />
        </RasterDemSource>
      </MapView>
      <Button title="Fly to Paris" onPress={handleFlyTo} />
    </>
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
