import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MD3DarkTheme, PaperProvider } from 'react-native-paper';
import MainScreen from './pages/MainScreen';
import ItemDetails from './pages/ItemDetails';

export default function App() {

  const Stack = createNativeStackNavigator();
  
  const theme = {
    ...MD3DarkTheme,
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
      primary: '#3498db',
      secondary: '#f1c40f',
      tertiary: '#a1b2c3',
    },
  };
  
  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator>
          <Stack.Screen name="Inicio" component={MainScreen} />
          <Stack.Screen name="Detalles" component={ItemDetails} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>

);
}

