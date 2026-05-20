import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../screens/user/Home';
import Jobs from '../../screens/user/Jobs';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Jobs" component={Jobs} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
