import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../views/screens/SplashScreen';
import NameScreen from '../views/screens/NameScreen';
import BottomTabs from './BottomTabs';
import HelpScreen from '../views/screens/HelpScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="NameScreen" component={NameScreen} />
      <Stack.Screen name="MainTabs" component={BottomTabs} />

      <Stack.Screen 
        name="Help" 
        component={HelpScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;