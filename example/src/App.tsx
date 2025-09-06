import { StyleSheet } from 'react-native';
import { MapView } from 'rn-mapbox-toolkit';

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
    />
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
