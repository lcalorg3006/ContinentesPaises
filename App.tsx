// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './src/app/store'; // Asegúrate de que la ruta sea correcta
import ContinentsScreen from './src/screen.tsx/ContinentsScreen';
import CountriesScreen from './src/screen.tsx/ContriesScreen';
import CountryDetailsScreen from './src/screen.tsx/CountryDetailsScreen';

const Stack = createStackNavigator();
const App = () => {
  return (<Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Continents">
        <Stack.Screen name="Continents" component={ContinentsScreen} />
        <Stack.Screen name="Countries" component={CountriesScreen} />
        <Stack.Screen name="CountryDetails" component={CountryDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>);
};

export default App;