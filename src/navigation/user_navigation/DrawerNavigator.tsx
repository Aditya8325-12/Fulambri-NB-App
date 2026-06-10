import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawerContent from './CustomDrawerContent';
import Setting from '../../screens/user/Setting/SettingScreen';
import EditProfile from '../../screens/user/Profile/EditProfileScreen';
import { DrawerParamList } from '../../types/Navigation';
import PdfViewerScreen from '../../screens/common/PdfViewerScreen';

const Drawer = createDrawerNavigator<DrawerParamList>();

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
      <Drawer.Screen
        name="EditProfile"
        component={EditProfile}
        initialParams={{ EDIT: false, ADD: false, title: 'EditProfile' }}
        options={{
          drawerLabel: 'EditProfile',
        }}
      />
      <Drawer.Screen
        name="PdfView"
        component={PdfViewerScreen}
        options={{
          drawerLabel: 'PDF',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
