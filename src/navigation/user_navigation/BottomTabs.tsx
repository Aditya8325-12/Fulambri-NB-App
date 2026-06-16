import React from 'react';
import { View, StyleSheet, Pressable, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../../screens/user/Home/HomeScreen';
import Jobs from '../../screens/user/Jobs/JobsScreen';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import COLORS from '../../constants/colors';
import Profile from '../../screens/user/Profile/ProfileScreen';
import Applications from '../../screens/user/Applications/ApplicationsScreen';

export type BottomTabParamList = {
  Home: undefined;
  Jobs: {
    keyword?: string;
  };
  Applications: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

type TabButtonProps = {
  iconName: string;
  iconNameActive: string;
  label: string;
  focused: boolean;
};

const TabButton = ({
  iconName,
  iconNameActive,
  label,
  focused,
}: TabButtonProps) => (
  <View style={styles.tabButtonContainer}>
    <View style={[styles.iconPill]}>
      <Icon
        name={focused ? iconNameActive : iconName}
        size={22}
        color={focused ? COLORS.primary : COLORS.Icon_Inactive}
      />
    </View>
    <Text
      style={[
        styles.tabLabel,
        focused ? styles.tabLabelActive : styles.tabLabelInactive,
      ]}
      numberOfLines={1}
    >
      {label}
    </Text>
  </View>
);

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.Icon_Inactive,
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
            <TabButton
              iconName="home-outline"
              iconNameActive="home"
              label="Home"
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
            <TabButton
              iconName="briefcase-outline"
              iconNameActive="briefcase"
              label="Jobs"
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Applications"
        component={Applications}
        options={{
          tabBarIcon: ({ focused }) => (
            <TabButton
              iconName="file-document-outline"
              iconNameActive="file-document"
              label="Applied"
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
            <TabButton
              iconName="account-outline"
              iconNameActive="account"
              label="Profile"
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
    borderTopWidth: 0,
    height: Platform.OS === 'ios' ? 88 : 80,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 10,
    paddingHorizontal: 8,
    // Premium shadow
    elevation: 20,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    // Top separator with gradient feel
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  tabButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    minWidth: 60,
  },
  iconPill: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconPillActive: {
    backgroundColor: COLORS.cyan100,
  },
  tabLabel: {
    fontSize: FONT_SIZE.xs,
    letterSpacing: 0.2,
  },
  tabLabelActive: {
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.primary,
  },
  tabLabelInactive: {
    fontFamily: FONT_FAMILY.PRegular,
    color: COLORS.Icon_Inactive,
  },
});

export default BottomTabs;
