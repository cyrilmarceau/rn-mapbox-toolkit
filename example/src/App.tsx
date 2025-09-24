import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREENS } from './routes';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {SCREENS.map((screen) => {
          return (
            <Stack.Screen name={screen.label} component={screen.component} />
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
