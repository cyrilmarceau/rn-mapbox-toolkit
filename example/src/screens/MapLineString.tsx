import { Button, StyleSheet } from 'react-native';
import {
  Camera,
  CircleLayer,
  LineLayer,
  MapView,
  ShapeSource,
  type CameraRef,
} from 'rn-mapbox-toolkit';
import type { FeatureCollection, Geometry } from 'geojson';
import React from 'react';

const shape: FeatureCollection<Geometry> = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [2.2241, 48.8156],
            [2.4699, 48.8156],
            [2.4699, 48.9021],
            [2.2241, 48.9021],
            [2.2241, 48.8156],
          ],
        ],
      },
    },
  ],
};

export default function MapLineString() {
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
        <ShapeSource shape={shape} sourceID="source-paris">
          <CircleLayer
            layerID="test-1"
            sourceID="source-paris"
            layerStyle={{
              'circle-color': '#fefefe',
              'circle-radius': 1,
            }}
          />
          <LineLayer
            layerID="test-2"
            sourceID="source-paris"
            layerStyle={{
              'line-color': '#3a27caff',
              'line-width': 3.0,
            }}
          />
        </ShapeSource>
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
