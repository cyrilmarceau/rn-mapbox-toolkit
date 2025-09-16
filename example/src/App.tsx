import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ScreenList from './GroupScreen';
import MapSettings from './screens/MapSettings';
import MapCamera from './screens/MapCamera';
import MapEventsListener from './screens/MapEventsListener';
import MapLineString from './screens/MapLineString';

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
          <Stack.Screen name="MapLineString" component={MapLineString} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
