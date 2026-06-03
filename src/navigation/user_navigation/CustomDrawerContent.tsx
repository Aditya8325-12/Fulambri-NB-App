import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY } from '../../constants/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/hook';
import { setLoggedIn } from '../../redux/fetatures/auth/authSlice';
const MENU_ITEMS = [
  {
    id: 'recommended_jobs',
    label: 'Recommended Jobs',
    icon: 'briefcase-search',
    iconOutline: 'briefcase-search-outline',
  },
  {
    id: 'saved_jobs',
    label: 'Saved Jobs',
    icon: 'bookmark',
    iconOutline: 'bookmark-outline',
  },
  {
    id: 'applied_jobs',
    label: 'Applied Jobs',
    icon: 'file-document',
    iconOutline: 'file-document-outline',
  },
  {
    id: 'companies',
    label: 'Companies',
    icon: 'office-building',
    iconOutline: 'office-building-outline',
  },
  {
    id: 'resume_builder',
    label: 'Resume Builder',
    icon: 'file-account',
    iconOutline: 'file-account-outline',
  },
  {
    id: 'job_alerts',
    label: 'Job Alerts',
    icon: 'bell-badge',
    iconOutline: 'bell-badge-outline',
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'cog',
    iconOutline: 'cog-outline',
  },
  {
    id: 'help_support',
    label: 'Help & Support',
    icon: 'help-circle',
    iconOutline: 'help-circle-outline',
  },
];

const CustomDrawerContent = (props: any) => {
  const [activeItem, setActiveItem] = useState('recommended_jobs');
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const handleItemPress = (itemId: string) => {
    setActiveItem(itemId);
    props.navigation.closeDrawer();
    if (itemId === 'my_files') {
      props.navigation.navigate('MainTabs');
    }
  };

  const handleEditProfile = () => {
    props.navigation.closeDrawer();
    // Navigate to profile edit screen
    // props.navigation.navigate('EditProfile');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            dispatch(setLoggedIn(false));
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        {/* Header Profile Section */}
        <View style={styles.header}>
          {/* Avatar with Edit Icon */}
          <View style={styles.profileContainer}>
            <View style={styles.avatarRing}>
              <Image
                source={require('../../assets/avatar_sandra.png')}
                style={styles.avatar}
              />
            </View>
            {/* Profile Complete Badge */}
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>100%</Text>
            </View>
            {/* Edit Icon */}
            <TouchableOpacity
              style={styles.editIconButton}
              onPress={handleEditProfile}
              activeOpacity={0.8}
            >
              <Icon name="pencil" size={11} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Name & Email */}
          <View style={styles.nameContainer}>
            <View style={styles.nameRow}>
              <Text style={styles.nameText}>Sandra Adams</Text>
            </View>
            <TouchableOpacity style={styles.emailRow} activeOpacity={0.7}>
              <Text style={styles.emailText} numberOfLines={1}>
                sandra_a88@gmail.com
              </Text>
            </TouchableOpacity>
            {/* View Profile Link */}
            <TouchableOpacity
              style={styles.viewProfileBtn}
              onPress={handleEditProfile}
              activeOpacity={0.7}
            >
              <Text style={styles.viewProfileText}>View Profile</Text>
              <Icon name="chevron-right" size={13} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Separator Line */}
        <View style={styles.separator} />

        {/* Drawer Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.menuItem]}
                onPress={() => handleItemPress(item.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.iconWrapper]}>
                  <Icon
                    name={item.iconOutline}
                    size={20}
                    color={COLORS.textNormal}
                  />
                </View>
                <Text style={[styles.menuLabel]}>{item.label}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <View style={styles.bottomSeparator} />

          {/* Logout Button */}
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.75}
          >
            <View style={styles.logoutIconWrapper}>
              <Icon name="logout" size={20} color="#E53935" />
            </View>
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
    paddingBottom: 16,
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 2.5,
    borderColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0',
  },
  badgeContainer: {
    position: 'absolute',
    bottom: -8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
  },
  badgeText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 9,
    color: '#4CAF50',
  },
  // ─── Edit Icon Button ───────────────────────────────────────
  editIconButton: {
    position: 'absolute',
    top: 0,
    right: -2,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  // ─── Name & Email ────────────────────────────────────────────
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  nameText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 15,
    color: '#1C1B1F',
    letterSpacing: 0.1,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: 12,
    color: '#6B6875',
  },
  viewProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 1,
  },
  viewProfileText: {
    fontFamily: FONT_FAMILY.PMedium,
    fontSize: 12,
    color: COLORS.primary,
  },
  // ─── Separator ───────────────────────────────────────────────
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 16,
    marginVertical: 4,
  },
  // ─── Menu ────────────────────────────────────────────────────
  menuContainer: {
    marginVertical: 14,
    paddingHorizontal: 12,
    paddingTop: 8,
    gap: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginVertical: 1,
    position: 'relative',
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconWrapperActive: {
    backgroundColor: '#E8F5E9',
  },
  menuLabel: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: FONT_FAMILY.PMedium,
    color: COLORS.textNormal,
    flex: 1,
  },

  activeIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    backgroundColor: '#4CAF50',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  // ─── Bottom / Logout ─────────────────────────────────────────
  bottomSection: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 8,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  bottomSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 4,
    marginBottom: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingHorizontal: 12,
  },
  logoutIconWrapper: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: '#E53935',
  },
});
