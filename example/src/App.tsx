import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenList from './GroupScreen';
import MapCamera from './screens/MapCamera';
import MapCircleLayer from './screens/MapCircleLayer';
import MapEventsListener from './screens/MapEventsListener';
import MapLineLayer from './screens/MapLineLayer';
import MapSettings from './screens/MapSettings';
import MapFillLayer from './screens/MapFillLayer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={ScreenList} />
          <Stack.Screen name="MapSettings" component={MapSettings} />
          <Stack.Screen
            name="MapEventsListener"
            component={MapEventsListener}
          />
          <Stack.Screen name="MapCamera" component={MapCamera} />
          <Stack.Screen name="MapLineLayer" component={MapLineLayer} />
          <Stack.Screen name="MapCircleLayer" component={MapCircleLayer} />
          <Stack.Screen name="MapFillLayer" component={MapFillLayer} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
