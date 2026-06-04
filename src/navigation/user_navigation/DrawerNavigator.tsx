import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawerContent from './CustomDrawerContent';
import Setting from '../../screens/user/Setting';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: 310,
          backgroundColor: '#FFFFFF',
        },
      }}
    >
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabs}
        options={{
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerLabel: 'Settings',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
