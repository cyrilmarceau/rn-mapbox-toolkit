import React from 'react';
import { Button, StyleSheet } from 'react-native';
import {
  Camera,
  type CameraRef,
  MapView,
  type MapViewRef,
} from 'rn-mapbox-toolkit';

export default function MapCamera() {
  const mapRef = React.useRef<MapViewRef | null>(null);
  const cameraRef = React.useRef<CameraRef | null>(null);

  const handleCameraZoom = async () => {
    try {
      const zoom = await cameraRef.current?.getZoomLevel();
      console.log(zoom);
    } catch (error) {
      console.error('An error occured', error);
    }
  };

  const handleGetZoom = async () => {
    try {
      const zoomLevel = await mapRef.current?.getZoomLevel();
      console.log(zoomLevel);
    } catch (error) {
      console.error('An error occured', error);
    }
  };

  const handleFlyTo = async () => {
    try {
      await cameraRef.current?.flyTo(
        {
          center: { longitude: 2.333333, latitude: 48.866667 },
        },
        {
          duration: 5000,
          startDelay: 2000,
        }
      );
    } catch (error) {
      console.error('An error occured', error);
    }
  };

  return (
    <>
      <MapView ref={mapRef} style={style.mapContainer} styleUrl="dark-v11">
        <Camera ref={cameraRef} minZoom={5} maxZoom={16} minPitch={120} />
      </MapView>

      <Button title="FlyTo" onPress={handleFlyTo} />
      <Button title="Retrieve zoom" onPress={handleGetZoom} />
      <Button title="Retrieve camera zoom" onPress={handleCameraZoom} />
    </>
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
