import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';
import CustomDrawerContent from './CustomDrawerContent';
import Setting from '../../screens/user/Setting/SettingScreen';
import EditProfile from '../../screens/user/Profile/EditProfileScreen';
import { DrawerParamList } from '../../types/Navigation';
import PdfViewerScreen from '../../screens/common/PdfViewerScreen';
import Notification from '../../screens/user/Notification/NotificationScreen';
import ApplicationDetails from '../../screens/user/Applications/ApplicationDetails';
import JobDetailsScreen from '../../screens/user/Jobs/JobDetailsScreen';

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
      <Drawer.Screen
        name="Alert"
        component={Notification}
        options={{
          drawerLabel: 'Alert',
        }}
      />

      {/* Application  */}
      <Drawer.Screen
        name="ApplicationDetails"
        component={ApplicationDetails}
        options={{
          drawerLabel: 'Alert',
        }}
      />
      {/* Job Details  */}
      <Drawer.Screen
        name="JobDetailsScreen"
        component={JobDetailsScreen}
        options={{
          drawerLabel: 'Alert',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
