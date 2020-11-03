import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './containers/Home';
import DetailsScreen from './containers/Details';
import SearchScreen from './containers/Search';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};


export default App;
