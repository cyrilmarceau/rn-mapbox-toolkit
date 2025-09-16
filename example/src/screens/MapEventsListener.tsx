import { StyleSheet } from 'react-native';
import { MapView } from 'rn-mapbox-toolkit';

export default function MapEventsListener() {
  return (
    <>
      <MapView
        style={style.mapContainer}
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
    </>
  );
}

const style = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
