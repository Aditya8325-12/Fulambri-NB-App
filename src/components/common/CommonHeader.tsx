import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import {
  useNavigation,
  DrawerActions,
  NavigationProp,
} from '@react-navigation/native';
import { DrawerParamList } from '../../types/Navigation';

// ─── Types ──────────────────────────────────────────────────────────────────

interface CommonHeaderProps {
  /** Screen title shown in title mode */
  title?: string;
  /** Callback when search bar is pressed */
  onSearch?: () => void;
  /** Callback when notification bell is pressed */
  onNotification?: () => void;
  /** Whether notification badge is visible */
  hasNotification?: boolean;
  /** Number of unread notifications (shows count if > 0) */
  notificationCount?: number;
  /** Show message/chat icon */
  MessageIcon?: boolean;
  /** Callback when message icon is pressed */
  onMessage?: () => void;
  /** Number of unread messages (shows count badge if > 0) */
  messageCount?: number;
  /** Show back arrow instead of drawer */
  BackIcon?: boolean;
  /** Callback when back icon is pressed */
  onBackPress?: () => void;
  /** Show hamburger/drawer icon */
  DrawerIcon?: boolean;
  /** Show notification bell */
  BellIcon?: boolean;
  /** Show search bar */
  SearchBar?: boolean;
  /** Location string shown in search bar */
  Location?: string;
  /** Keyword/job-role string shown in search bar */
  Keyword?: string;
  /** Override header background color (supports scroll effects) */
  backgroundColor?: string;
  /** Show bottom shadow (default: true) */
  showShadow?: boolean;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

/** Animated icon button with press ripple feedback */
const IconButton = ({
  name,
  size = 24,
  color = COLORS.gray700,
  onPress,
  style,
}: {
  name: string;
  size?: number;
  color?: string;
  onPress?: () => void;
  style?: object;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={{
        color: 'rgba(8, 145, 178, 0.10)',
        borderless: true,
        radius: 22,
      }}
      style={({ pressed }) => [
        styles.iconBtn,
        style,
        Platform.OS === 'ios' && pressed && { opacity: 0.7 },
      ]}
    >
      <Animated.View style={{ transform: [{ scale }] }}>
        <Icon name={name} size={size} color={color} />
      </Animated.View>
    </Pressable>
  );
};

/** Notification bell with badge overlay */
const NotificationButton = ({
  onPress,
  count = 0,
  hasNotification = false,
}: {
  onPress?: () => void;
  count?: number;
  hasNotification?: boolean;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();

  const handlePressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();

  const showBadge = hasNotification || count > 0;
  const badgeLabel = count > 0 ? (count > 99 ? '99+' : String(count)) : '';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={{
        color: 'rgba(8, 145, 178, 0.10)',
        borderless: true,
        radius: 22,
      }}
      style={({ pressed }) => [
        styles.notifBtn,
        Platform.OS === 'ios' && pressed && { opacity: 0.7 },
      ]}
    >
      <Animated.View style={[styles.notifInner, { transform: [{ scale }] }]}>
        <Icon name="bell-outline" size={22} color={COLORS.gray700} />
        {showBadge && (
          <View
            style={[
              styles.badge,
              badgeLabel ? styles.badgeWithCount : styles.badgeDot,
            ]}
          >
            {badgeLabel ? (
              <Text style={styles.badgeText}>{badgeLabel}</Text>
            ) : null}
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

/** Message / chat icon with optional unread badge */
const MessageButton = ({
  onPress,
  count = 0,
}: {
  onPress?: () => void;
  count?: number;
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () =>
    Animated.spring(scale, {
      toValue: 0.88,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();

  const handlePressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
      bounciness: 8,
    }).start();

  const showBadge = count > 0;
  const badgeLabel = count > 99 ? '99+' : String(count);

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={{
        color: 'rgba(8, 145, 178, 0.10)',
        borderless: true,
        radius: 22,
      }}
      style={({ pressed }) => [
        styles.notifBtn,
        Platform.OS === 'ios' && pressed && { opacity: 0.7 },
      ]}
    >
      <Animated.View style={[styles.notifInner, { transform: [{ scale }] }]}>
        <Icon name="message-outline" size={21} color={COLORS.gray700} />
        {showBadge && (
          <View style={[styles.badge, styles.badgeWithCount]}>
            <Text style={styles.badgeText}>{badgeLabel}</Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

/** Rounded search bar pill */
const SearchBar = ({
  keyword,
  location,
  onPress,
}: {
  keyword?: string;
  location?: string;
  onPress?: () => void;
}) => {
  const hasValue =
    (keyword && keyword.trim() !== '') || (location && location.trim() !== '');
  const displayText = hasValue
    ? [keyword, location].filter(Boolean).join('  ·  ')
    : undefined;

  const scale = useRef(new Animated.Value(1)).current;
  const handlePressIn = () =>
    Animated.spring(scale, {
      toValue: 0.985,
      useNativeDriver: true,
      speed: 40,
    }).start();
  const handlePressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 30,
    }).start();

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={{ flex: 1 }}
    >
      <Animated.View style={[styles.searchPill, { transform: [{ scale }] }]}>
        {/* Left: search icon */}
        <View style={styles.searchIconLeft}>
          <Icon name="magnify" size={18} color={COLORS.primary} />
        </View>

        {/* Center: text */}
        <View style={styles.searchTextWrapper}>
          {displayText ? (
            <Text style={styles.searchValueText} numberOfLines={1}>
              {displayText}
            </Text>
          ) : (
            <Text style={styles.searchPlaceholderText} numberOfLines={1}>
              Search jobs, companies…
            </Text>
          )}
        </View>

        {/* Separator */}
        <View style={styles.searchDivider} />

        {/* Right: mic icon */}
        <View style={styles.searchIconRight}>
          <Icon name="microphone-outline" size={17} color={COLORS.gray500} />
        </View>
      </Animated.View>
    </Pressable>
  );
};

// ─── Main Component ──────────────────────────────────────────────────────────

const CommonHeader = ({
  title,
  onSearch,
  onNotification,
  hasNotification = true,
  notificationCount = 0,
  MessageIcon: showMessageIcon,
  onMessage,
  messageCount = 0,
  BackIcon,
  onBackPress,
  DrawerIcon,
  BellIcon,
  SearchBar: showSearchBar,
  Location,
  Keyword,
  backgroundColor,
  showShadow = true,
}: CommonHeaderProps) => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  const handleAlert = () => {
    if (onNotification) {
      onNotification();
    } else {
      navigation.navigate('Alert');
    }
  };

  const bgColor = backgroundColor ?? COLORS.white;

  return (
    <View style={[styles.outerWrapper, showShadow && styles.shadow]}>
      {/* ── Row ── */}
      <View style={styles.row}>
        {/* Left zone: Drawer or Back */}
        <View style={styles.leftZone}>
          {DrawerIcon && (
            <IconButton
              name="menu"
              size={26}
              color={COLORS.gray700}
              onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
            />
          )}
          {BackIcon && !DrawerIcon && (
            <IconButton
              name="arrow-left"
              size={26}
              color={COLORS.gray700}
              onPress={onBackPress ? onBackPress : () => navigation.goBack()}
            />
          )}
        </View>

        {/* Center zone: Search bar OR Title */}
        <View style={styles.centerZone}>
          {showSearchBar ? (
            <SearchBar
              keyword={Keyword}
              location={Location}
              onPress={onSearch}
            />
          ) : (
            title != null &&
            title !== '' && (
              <Text style={styles.titleText} numberOfLines={1}>
                {title}
              </Text>
            )
          )}
        </View>

        {/* Right zone: Message + Bell */}
        <View
          style={[
            styles.rightZone,
            showMessageIcon && BellIcon && styles.rightZoneDouble,
          ]}
        >
          {showMessageIcon && (
            <MessageButton onPress={onMessage} count={messageCount} />
          )}
          {BellIcon && (
            <NotificationButton
              onPress={handleAlert}
              hasNotification={hasNotification}
              count={notificationCount}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default CommonHeader;

// ─── Styles ─────────────────────────────────────────────────────────────────

const HEADER_VERTICAL_PADDING = Platform.OS === 'ios' ? 12 : 10;

const styles = StyleSheet.create({
  /* ── Outer shell ── */
  outerWrapper: {
    backgroundColor: COLORS.background,
    paddingTop: HEADER_VERTICAL_PADDING,
    paddingBottom: HEADER_VERTICAL_PADDING,
    paddingHorizontal: 8,
  },
  shadow: {
    // iOS
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    // Android
    elevation: 1,
  },

  /* ── Row layout ── */
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 40,
  },

  /* ── Left / Center / Right zones ── */
  leftZone: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  centerZone: {
    flex: 1,
    // marginHorizontal: 6,
    justifyContent: 'center',
  },
  rightZone: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  rightZoneDouble: {
    width: 92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 2,
  },

  /* ── Icon buttons ── */
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Title ── */
  titleText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray800,
    // letterSpacing: -0.3,
  },

  /* ── Search pill ── */
  searchPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 30,
    borderWidth: 1.2,
    borderColor: COLORS.border,
    height: 40,
    paddingHorizontal: 4,
    // iOS shadow
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    // Android
    elevation: 2,
  },
  searchIconLeft: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
  searchPlaceholderText: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
    letterSpacing: 0.1,
  },
  searchValueText: {
    fontFamily: FONT_FAMILY.PMedium,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray700,
    letterSpacing: 0.1,
  },
  searchDivider: {
    width: 1,
    height: 20,
    backgroundColor: COLORS.border,
    marginHorizontal: 4,
  },
  searchIconRight: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* ── Notification button ── */
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notifInner: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    // iOS shadow
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    // Android
    elevation: 2,
  },

  /* ── Badge ── */
  badge: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.white,
    backgroundColor: COLORS.danger,
  },
  badgeDot: {
    top: 5,
    right: 5,
    width: 9,
    height: 9,
    borderRadius: 5,
  },
  badgeWithCount: {
    top: 2,
    right: 2,
    minWidth: 17,
    height: 17,
    borderRadius: 9,
    paddingHorizontal: 3,
  },
  badgeText: {
    fontSize: 9,
    fontFamily: FONT_FAMILY.PBold,
    color: COLORS.white,
    lineHeight: 13,
  },
});
