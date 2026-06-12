import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
import COLORS from '../../../../constants/colors';
import { Application } from '../types/Applications';
import { STATUS_CONFIG } from '../data/SampleData';

const ApplicationCard = ({
  app,
  index,
  onViewDetails,
}: {
  app: Application;
  index: number;
  onViewDetails: (app: Application) => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const pressScale = useRef(new Animated.Value(1)).current;

  const statusCfg = STATUS_CONFIG[app.status];

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 350,
        delay: index * 60,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: index * 60,
        speed: 16,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressIn = () =>
    Animated.spring(pressScale, {
      toValue: 0.97,
      useNativeDriver: true,
      speed: 50,
      bounciness: 3,
    }).start();
  const onPressOut = () =>
    Animated.spring(pressScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 5,
    }).start();

  return (
    <Animated.View
      style={[
        styles.cardWrapper,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: pressScale }],
        },
      ]}
    >
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        android_ripple={{ color: 'rgba(8,145,178,0.04)', borderless: false }}
      >
        <View style={styles.card}>
          {/* Card Top Row */}
          <View style={styles.cardHeader}>
            {/* Logo */}
            <View
              style={[
                styles.companyLogo,
                { backgroundColor: app.logoColor + '18' },
              ]}
            >
              <Icon name="office-building" size={22} color={COLORS.gray400} />
            </View>

            {/* Title + Company */}
            <View style={styles.cardTitleBlock}>
              <Text style={styles.cardJobTitle} numberOfLines={1}>
                {app.jobTitle}
              </Text>
              <Text style={styles.cardCompany} numberOfLines={1}>
                {app.company}
              </Text>
            </View>

            {/* Status Badge */}
            <View
              style={[styles.statusBadge, { backgroundColor: statusCfg.bg }]}
            >
              <Icon name={statusCfg.icon} size={11} color={statusCfg.color} />
              <Text
                style={[styles.statusBadgeText, { color: statusCfg.color }]}
              >
                {statusCfg.label}
              </Text>
            </View>
          </View>

          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <Icon
                name="map-marker-outline"
                size={12}
                color={COLORS.gray400}
              />
              <Text style={styles.metaText} numberOfLines={1}>
                {app.location}
              </Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Icon name="briefcase-outline" size={12} color={COLORS.gray400} />
              <Text style={styles.metaText}>{app.jobType}</Text>
            </View>
            <View style={styles.metaDot} />
            <View style={styles.metaItem}>
              <Icon name="currency-inr" size={12} color={COLORS.gray400} />
              <Text style={styles.metaText}>{app.salary}</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.cardDivider} />

          {/* Footer */}
          <View style={styles.cardFooter}>
            <View style={styles.appliedDateRow}>
              <Icon name="calendar-clock" size={13} color={COLORS.gray400} />
              <Text style={styles.appliedDateText}>
                Applied {app.appliedDate}
              </Text>
            </View>

            {/* View Details Button */}
            <Pressable
              onPress={() => onViewDetails(app)}
              android_ripple={{
                color: 'rgba(8,145,178,0.1)',
                borderless: false,
              }}
            >
              <LinearGradient
                colors={COLORS.gradients.primary}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.viewDetailsBtn}
              >
                <Text style={styles.viewDetailsBtnText}>View Details</Text>
                <Icon name="chevron-right" size={14} color={COLORS.white} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

export default ApplicationCard;

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 8,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingTop: 16,
    paddingBottom: 14,
    paddingLeft: 20,
    paddingRight: 14,
    overflow: 'hidden',
    position: 'relative',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  companyLogo: {
    width: 44,
    height: 44,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTitleBlock: {
    flex: 1,
    gap: 2,
  },
  cardJobTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray800,
    letterSpacing: -0.2,
    lineHeight: 20,
  },
  cardCompany: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    flexShrink: 0,
    marginTop: 2,
  },
  statusBadgeText: {
    fontFamily: FONT_FAMILY.PMedium,
    fontSize: 10,
    letterSpacing: 0.2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginVertical: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.gray300,
  },
  cardDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appliedDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  appliedDateText: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
  },
  viewDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 6,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  viewDetailsBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.white,
    letterSpacing: 0.2,
  },
});
