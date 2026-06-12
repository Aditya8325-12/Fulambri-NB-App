import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
import { FILTER_TABS } from '../data/SampleData';

const FilterChip = ({
  tab,
  isActive,
  count,
  onPress,
}: {
  tab: (typeof FILTER_TABS)[number];
  isActive: boolean;
  count: number;
  onPress: () => void;
}) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(scaleAnim, {
      toValue: 0.93,
      useNativeDriver: true,
      speed: 50,
      bounciness: 3,
    }).start();
  const onPressOut = () =>
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();

  return (
    <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
      <Animated.View
        style={[
          styles.filterChip,
          isActive ? styles.filterChipActive : styles.filterChipInactive,
          { transform: [{ scale: scaleAnim }] },
        ]}
      >
        {isActive && (
          <LinearGradient
            colors={COLORS.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        )}
        <Icon
          name={tab.icon}
          size={12}
          color={isActive ? COLORS.white : COLORS.gray500}
        />
        <Text
          style={[
            styles.filterChipLabel,
            isActive
              ? styles.filterChipLabelActive
              : styles.filterChipLabelInactive,
          ]}
        >
          {tab.label}
        </Text>
        {count > 0 && (
          <View
            style={[
              styles.filterBadge,
              isActive ? styles.filterBadgeActive : styles.filterBadgeInactive,
            ]}
          >
            <Text
              style={[
                styles.filterBadgeText,
                isActive && styles.filterBadgeTextActive,
              ]}
            >
              {count}
            </Text>
          </View>
        )}
      </Animated.View>
    </Pressable>
  );
};

export default FilterChip;

const styles = StyleSheet.create({
  filtersWrapper: {
    marginHorizontal: -16,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
  },
  filterChipActive: {
    borderWidth: 0,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  filterChipInactive: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterChipLabel: {
    fontFamily: FONT_FAMILY.PMedium,
    fontSize: FONT_SIZE.sm,
  },
  filterChipLabelActive: {
    color: COLORS.white,
  },
  filterChipLabelInactive: {
    color: COLORS.gray500,
  },
  filterBadge: {
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  filterBadgeInactive: {
    backgroundColor: COLORS.gray200,
  },
  filterBadgeText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: 8,
    color: COLORS.gray500,
    lineHeight: 12,
  },
  filterBadgeTextActive: {
    color: COLORS.white,
  },
});
