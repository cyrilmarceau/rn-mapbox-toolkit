import * as turf from '@turf/turf';
import type { Feature } from 'geojson';
import React from 'react';
import { Button, StyleSheet } from 'react-native';
import {
  Camera,
  CircleLayer,
  MapView,
  ShapeSource,
  type CameraRef,
  type ShapeSourceRef,
} from 'rn-mapbox-toolkit';

export default function MapCluster() {
  const cameraRef = React.useRef<CameraRef | null>(null);
  const shapeSourceRef = React.useRef<ShapeSourceRef | null>(null);

  const handleFlyTo = async () => {
    try {
      await cameraRef.current?.flyTo({
        center: { longitude: 2.333333, latitude: 48.866667 },
        zoom: 12,
      });
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const onPress = async (e: Feature[]) => {
    const feature = e[0];
    if (feature === undefined) return;

    try {
      if (feature.properties?.cluster) {
        const params = {
          feature: feature,
          limit: 100,
          offset: 0,
        };
        const clusterLeaves =
          await shapeSourceRef.current?.getGeoJsonClusterLeaves(params);

        if (clusterLeaves !== undefined) {
          console.log(turf.bbox(clusterLeaves));
        }
      }
    } catch (error) {
      console.warn('MapCluster() >> onPress() >> error', error);
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
        <ShapeSource
          ref={shapeSourceRef}
          url="https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          // shape={shapes as GeoJSON.FeatureCollection}
          sourceID="source-paris"
          onPress={onPress}
          cluster={true}
          // hitSlopArea={{
          //   width: 100,
          //   height: 100,
          // }}
        >
          <CircleLayer
            layerID="points"
            sourceID="source-paris"
            filter={['has', 'point_count']}
            layerStyle={{
              'circle-color': [
                'step',
                ['get', 'point_count'],
                '#51bbd6',
                100,
                '#f1f075',
                750,
                '#f28cb1',
              ],
              'circle-radius': [
                'step',
                ['get', 'point_count'],
                20,
                100,
                30,
                750,
                40,
              ],
            }}
          />

          <CircleLayer
            layerID="points-1"
            sourceID="source-paris"
            filter={['!', ['has', 'point_count']]}
            onLayerStyleError={(e) => console.log(e.nativeEvent.properties)}
            layerStyle={{
              'circle-color': '#ffffff',
              'circle-radius': 6,
              'circle-stroke-width': 2,
              'circle-stroke-color': '#000000',
            }}
          />
        </ShapeSource>
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
