import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../views/screens/HomeScreen';
import HistoryScreen from '../views/screens/HistoryScreen';
import InsightScreen from '../views/screens/InsightScreen';
import NotificationScreen from '../views/screens/NotificationScreen';
import SettingsScreen from '../views/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = ({ route }) => {
  const username = route?.params?.username || 'Guest';

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4EB8A0', 
        tabBarInactiveTintColor: '#999',  
        tabBarStyle: {
          backgroundColor: '#F9F9F9',   
          borderTopWidth: 0,
          elevation: 4,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'History':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'Insight':
              iconName = focused ? 'bar-chart' : 'bar-chart-outline';
              break;
            case 'Notifications':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            default:
              iconName = 'ellipse-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} initialParams={{ username }} />
      <Tab.Screen name="History" component={HistoryScreen} />
      <Tab.Screen name="Insight" component={InsightScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
