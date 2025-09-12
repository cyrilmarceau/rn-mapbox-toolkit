import React from 'react';
import { Button, StyleSheet } from 'react-native';
import {
  Camera,
  type CameraRef,
  MapView,
  type MapViewRef,
} from 'rn-mapbox-toolkit';

export default function App() {
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
      <MapView
        ref={mapRef}
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
        onMapIdle={(e) =>
          console.log(
            'onMapIdle',
            JSON.stringify(e.nativeEvent.properties, null, 2)
          )
        }
        onMapLoaded={() => console.log('onMapLoaded trigger')}
        onStyleDataLoaded={(e) => console.log(e.nativeEvent.properties.type)}
        onStyleLoaded={() => console.log('onStyleLoaded trigger')}
        onMapLoadingError={(e) =>
          console.log('onMapLoadingError', e.nativeEvent.properties.type)
        }
        onSourceAdded={(e) =>
          console.log('onSourceAdded', e.nativeEvent.properties.sourceId)
        }
        onStyleImageMissing={(e) =>
          console.log('onStyleImageMissing', e.nativeEvent.properties.imageId)
        }
        // onRenderFrameStarted={() => console.log('onRenderFrameStarted')}
        // onRenderFrameFinished={() => console.log('onRenderFrameFinished')}
        onSourceRemoved={(e) =>
          console.log('onSourceRemoved', e.nativeEvent.properties.sourceId)
        }
        onMapClick={(e) => console.log('onMapClick', e.nativeEvent.properties)}
        onMapLongClick={(e) =>
          console.log('onMapLongClick', e.nativeEvent.properties)
        }
      >
        <Camera ref={cameraRef} />
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
