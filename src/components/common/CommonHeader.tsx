import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY } from '../../constants/fonts';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const CommonHeader = ({
  title,
  onSearch,
  onNotification,
  hasNotification = true,
  leftIcon,
  BellIcon,
  SearchBar,
  Location,
  Keyword,
}: any) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Left Icon */}

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {leftIcon == true && (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            style={styles.iconButton}
          >
            <Icon name="menu" size={28} color={COLORS.gray800} />
          </TouchableOpacity>
        )}
        {title != '' && (
          <View>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
        )}
      </View>

      {/* Search Bar */}
      {SearchBar == true && (
        <TouchableOpacity
          style={styles.searchContainer}
          onPress={onSearch}
          activeOpacity={0.8}
        >
          <Icon name="magnify" size={18} color="#999" />
          <Text style={styles.searchText}>
            {(Location && Location !== '') || (Keyword && Keyword !== '')
              ? Keyword + ' , ' + Location
              : 'Search jobs...'}{' '}
          </Text>
          <Icon
            name="microphone-outline"
            size={18}
            color="#bbb"
            style={styles.micIcon}
          />
        </TouchableOpacity>
      )}

      {/* Notification */}
      {BellIcon == true && (
        <TouchableOpacity
          onPress={onNotification}
          activeOpacity={0.6}
          style={styles.iconButton}
        >
          <View style={styles.notifWrapper}>
            <Icon name="bell-outline" size={24} color={COLORS.gray800} />
            {hasNotification && <View style={styles.badge} />}
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CommonHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  iconButton: {
    padding: 6,
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.gray800,
    marginLeft: 8,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    height: 42,
    borderRadius: 26,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 1,
  },
  searchText: {
    flex: 1,
    fontFamily: FONT_FAMILY.PRegular,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.gray600,
  },
  micIcon: {
    marginLeft: 4,
  },
  notifWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1.5,
    borderColor: '#fff',
  },
});
