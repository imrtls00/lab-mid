import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import SearchScreen from './src/screens/SearchScreen';
import AnotherSearchScreen from './src/screens/AnotherSearchScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="AnotherSearchScreen" component={AnotherSearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}