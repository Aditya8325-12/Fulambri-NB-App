import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, StackActions } from '@react-navigation/native';

import COLORS from '../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/fonts';
import Button from '../../../components/common/Button';

// ─── Main Screen ──────────────────────────────────────────────────────────────
const ApplicationSubmitScreen = () => {
  const navigation = useNavigation<any>();

  // Animations
  const checkScale = useRef(new Animated.Value(0)).current;
  const checkOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.spring(checkScale, {
        toValue: 1,
        tension: 60,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(checkOpacity, {
        toValue: 1,
        duration: 350,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleViewApplications = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('MainTabs', {
      screen: 'Applications',
    });
  };

  const handleBrowseJobs = () => {
    navigation.dispatch(StackActions.popToTop());
    navigation.navigate('MainTabs', {
      screen: 'Jobs',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Success Hero ──────────────────────────────────────────── */}
        <Animated.View
          style={[
            styles.heroSection,
            {
              opacity: checkOpacity,
              transform: [{ scale: checkScale }],
            },
          ]}
        >
          {/* Outer glow ring */}
          <View style={styles.glowRingOuter}>
            <View style={styles.glowRingInner}>
              <LinearGradient
                colors={['#0891B2', '#0E7490']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.successCircle}
              >
                <Icon name="check-bold" size={38} color={COLORS.white} />
              </LinearGradient>
            </View>
          </View>

          <Text style={styles.successTitle}>Application Submitted!</Text>
          <Text style={styles.successSubtitle}>
            Your application has been successfully sent to the hiring team.
            We'll notify you when there's an update.
          </Text>
        </Animated.View>

        <View style={styles.stickyBar}>
          <Button
            variant="outline"
            label="Browse More Jobs"
            size="md"
            width={'44%'}
            onPress={handleBrowseJobs}
          />
          <Button
            variant="gradient"
            label="My Applications"
            size="md"
            icon={<Icon name="arrow-right" size={18} color={COLORS.white} />}
            iconPosition="end"
            width={'52%'}
            onPress={handleViewApplications}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ApplicationSubmitScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Hero Section ────────────────────────────────────────────────────────────
  heroSection: {
    alignItems: 'center',
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  glowRingOuter: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(8, 145, 178, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  glowRingInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(8, 145, 178, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCircle: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xl + 2,
    color: COLORS.gray800,
    marginBottom: 10,
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: 22,
  },

  // ── Sticky Bottom Bar ────────────────────────────────────────────────────────
  stickyBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
  },
});
