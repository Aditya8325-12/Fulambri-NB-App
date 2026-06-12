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

type AppStatus =
  | 'Applied'
  | 'Under Review'
  | 'Interview Scheduled'
  | 'Rejected'
  | 'Offer Received';

type FilterTab = 'All' | AppStatus;

const EmptyState = ({
  query,
  activeFilter,
  onCta,
}: {
  query: string;
  activeFilter: FilterTab;
  onCta: () => void;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;
  const ctaScale = useRef(new Animated.Value(1)).current;

  const isSearch = query.length > 0;
  const icon = isSearch ? 'file-search-outline' : 'send-outline';
  const title = isSearch
    ? 'No results found'
    : activeFilter === 'All'
    ? 'No applications yet'
    : `No "${activeFilter}" applications`;
  const subtitle = isSearch
    ? `We couldn't find any applications matching "${query}". Try a different search.`
    : 'Apply to roles that excite you and track every step of your journey right here.';
  const ctaLabel = isSearch ? 'Clear Search' : 'Browse Jobs';

  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(20);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 380,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        speed: 18,
        bounciness: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, [query, activeFilter, fadeAnim, slideAnim]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [floatAnim]);

  const onCtaPressIn = () =>
    Animated.spring(ctaScale, {
      toValue: 0.95,
      useNativeDriver: true,
      speed: 50,
      bounciness: 3,
    }).start();
  const onCtaPressOut = () =>
    Animated.spring(ctaScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();

  return (
    <Animated.View
      style={[
        styles.emptyCard,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
      ]}
    >
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptySubtitle}>{subtitle}</Text>

      <View style={styles.emptyDivider} />

      <Pressable
        onPress={onCta}
        onPressIn={onCtaPressIn}
        onPressOut={onCtaPressOut}
      >
        <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
          <LinearGradient
            colors={COLORS.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.ctaBtn}
          >
            <Text style={styles.ctaBtnText}>{ctaLabel}</Text>
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
};
export default EmptyState;

const styles = StyleSheet.create({
  emptyCard: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 28,
    overflow: 'hidden',
    position: 'relative',
  },

  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
    borderColor: '#0891B244',
    backgroundColor: '#0891B212',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusChipText: {
    fontFamily: FONT_FAMILY.PMedium,
    fontSize: FONT_SIZE.xs,
    color: '#0891B2',
    letterSpacing: 0.4,
  },
  emptyTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray800,
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  emptySubtitle: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray400,
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 272,
  },
  emptyDivider: {
    width: 48,
    height: 2,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginVertical: 16,
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 11,
    borderRadius: 6,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
    letterSpacing: 0.3,
  },
  ctaArrow: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
