import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../screens/user/Home';
import Jobs from '../../screens/user/Jobs';
import Notification from '../../screens/user/Notification';
import { FONT_FAMILY } from '../../constants/fonts';
import COLORS from '../../constants/colors';
import Profile from '../../screens/user/Profile';
export type BottomTabParamList = {
  Home: undefined;
  Jobs: {
    keyword?: string;
  };
  Alerts: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type TabIconProps = {
  iconName: string;
  focused: boolean;
};

const TabIcon = ({ iconName, focused }: TabIconProps) => (
  <View style={[styles.iconWrapper, focused && styles.iconWrapperActive]}>
    <Icon
      name={iconName}
      size={24}
      color={focused ? COLORS.primary : COLORS.Icon_Inactive}
    />
  </View>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: COLORS.textNormal,
        tabBarInactiveTintColor: COLORS.Icon_Inactive,
        tabBarIconStyle: { marginBottom: -2 },
        headerShown: false,
        tabBarButton: ({ ref, ...props }) => (
          <Pressable {...props} ref={ref as any} android_ripple={null} />
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'home' : 'home-outline'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'briefcase' : 'briefcase-outline'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Alerts"
        component={Notification}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'bell' : 'bell-outline'}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon
              iconName={focused ? 'account-circle' : 'account-circle-outline'}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E8E8E8',
    height: 90,
    paddingBottom: 8,
    paddingTop: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 2,
    fontFamily: FONT_FAMILY.PMedium,
    // color: '#49454F'
  },
  iconWrapper: {
    width: 48,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapperActive: {
    width: 56,
    borderRadius: 6,
  },
});

export default BottomTabs;
