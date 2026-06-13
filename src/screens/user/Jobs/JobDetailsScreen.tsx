import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/fonts';
import CommonHeader from '../../../components/common/CommonHeader';
import Button from '../../../components/common/Button';
import { JOB_DETAIL } from './SampleData/Data';
import {
  BulletItem,
  InfoGrid,
  SectionHeader,
  SkillChip,
} from './components/JobDetails';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { JobsStackParamList } from '../../../navigation/user_navigation/JobsStackNavigator';

// ─── Main Screen ──────────────────────────────────────────────────────────────
const JobDetailsScreen = () => {
  const [saved, setSaved] = useState(false);
  const saveScale = useRef(new Animated.Value(1)).current;
  const job = JOB_DETAIL;
  const navigation = useNavigation<NavigationProp<JobsStackParamList>>();

  const handleSave = () => {
    Animated.sequence([
      Animated.timing(saveScale, {
        toValue: 1.3,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(saveScale, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start();
    setSaved(prev => !prev);
  };

  const handleApplyBtn = () => {
    navigation.navigate('ApplyJob', { job });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      <CommonHeader BackIcon BellIcon MessageIcon title="Job details" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero ──────────────────────────────────────────────── */}
        <View style={styles.heroContainer}>
          <View style={styles.heroTopRow}>
            <View style={styles.jobLogo}>
              <Icon name="office-building" size={32} color={COLORS.primary} />
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>
              <Text style={styles.jobTitle} numberOfLines={2}>
                {job.title}
              </Text>
              <Text style={styles.companyName}>{job.company}</Text>
            </View>
          </View>

          <View style={styles.locationRow}>
            <Icon name="map-marker-outline" size={16} color={COLORS.gray500} />
            <Text style={styles.locationText} numberOfLines={2}>
              {job.location}
            </Text>
          </View>

          <InfoGrid job={job} />
        </View>

        {/* ── Job Description ───────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="text-box-outline" title="Job Description" />
          <Text style={styles.bodyText}>{job.description}</Text>
        </View>

        {/* ── Responsibilities ──────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="check-circle-outline" title="Responsibilities" />
          <View style={{ marginTop: 4 }}>
            {job.responsibilities.map((item, idx) => (
              <BulletItem key={idx} text={item} />
            ))}
          </View>
        </View>

        {/* ── Skills Required ───────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="lightbulb-outline" title="Skills Required" />
          <View style={styles.skillsWrap}>
            {job.skillsRequired.map((skill, idx) => (
              <SkillChip key={idx} skill={skill} />
            ))}
          </View>
        </View>

        {/* ── Benefits & Perks ──────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="gift-outline" title="Benefits & Perks" />
          <View style={styles.premiumBenefitCard}>
            <View style={styles.benefitIconWrap}>
              <Icon name="crown-outline" size={18} color="#D97706" />
            </View>
            <View style={styles.premiumBenefitContent}>
              <Text style={styles.premiumBenefitTitle}>
                {job.benefitsTitle}
              </Text>
              <Text style={styles.premiumBenefitText}>{job.benefits[0]}</Text>
            </View>
          </View>
        </View>

        {/* ── Job Overview ──────────────────────────────────────── */}
        <View style={[styles.section, { marginBottom: 24 }]}>
          <SectionHeader icon="office-building-outline" title="Job Overview" />
          <View style={styles.overviewCard}>
            <View style={styles.overviewRow}>
              <View style={styles.overviewRowLeft}>
                <View style={styles.overviewIconWrap}>
                  <Icon
                    name="briefcase-outline"
                    size={16}
                    color={COLORS.primary}
                  />
                </View>
                <Text style={styles.overviewLabel}>Department</Text>
              </View>
              <Text style={styles.overviewValue}>{job.department}</Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewRow}>
              <View style={styles.overviewRowLeft}>
                <View style={styles.overviewIconWrap}>
                  <Icon name="laptop" size={16} color={COLORS.primary} />
                </View>
                <Text style={styles.overviewLabel}>Work Mode</Text>
              </View>
              <Text style={[styles.overviewValue, { color: COLORS.primary }]}>
                {job.workMode}
              </Text>
            </View>
            <View style={styles.overviewDivider} />
            <View style={styles.overviewRow}>
              <View style={styles.overviewRowLeft}>
                <View style={styles.overviewIconWrap}>
                  <Icon name="clock-outline" size={16} color={COLORS.primary} />
                </View>
                <Text style={styles.overviewLabel}>Employment</Text>
              </View>
              <Text style={styles.overviewValue}>{job.employmentType}</Text>
            </View>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Sticky Bottom Bar ─────────────────────────────────── */}
      <View style={styles.stickyBar}>
        <View style={styles.stickyLeftIcons}>
          <Animated.View style={{ transform: [{ scale: saveScale }] }}>
            <TouchableOpacity
              onPress={handleSave}
              style={[
                styles.stickyIconBtn,
                saved && {
                  borderColor: COLORS.primary,
                  backgroundColor: 'rgba(8, 145, 178, 0.05)',
                },
              ]}
              activeOpacity={0.75}
            >
              <Icon
                name={saved ? 'bookmark' : 'bookmark-outline'}
                size={24}
                color={saved ? COLORS.primary : COLORS.gray500}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Button
          variant="gradient"
          label="Apply Now"
          size="md"
          icon={<Icon name="arrow-right" size={18} color={COLORS.white} />}
          iconPosition="end"
          width={'80%'}
          onPress={handleApplyBtn}
        />
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Scroll ──────────────────────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // ── Hero Container ──────────────────────────────────────────────────────────
  heroContainer: {
    marginBottom: 8,
    paddingTop: 12,
  },
  heroTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 16,
  },
  jobLogo: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.15)',
    flexShrink: 0,
  },
  jobTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.gray800,
    marginBottom: 4,
    lineHeight: 26,
  },
  companyName: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
    letterSpacing: 0.2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 8,
    paddingHorizontal: 2,
  },
  locationText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    lineHeight: 18,
    flex: 1,
  },

  // ── Section ─────────────────────────────────────────────────────────────────
  section: {
    marginTop: 24,
  },

  // ── Body Text ───────────────────────────────────────────────────────────────
  bodyText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    lineHeight: 22,
  },

  // ── Benefits Card ───────────────────────────────────────────────────────────
  premiumBenefitCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.15)',
    borderLeftWidth: 2,
    borderLeftColor: '#F59E0B',
    borderRadius: 8,
    padding: 16,
    gap: 12,
  },
  benefitIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  premiumBenefitContent: {
    flex: 1,
  },
  premiumBenefitTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#B45309',
    marginBottom: 4,
  },
  premiumBenefitText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    lineHeight: 18,
  },

  // ── Skills ──────────────────────────────────────────────────────────────────
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    paddingHorizontal: 2,
  },

  // ── Job Overview ────────────────────────────────────────────────────────────
  overviewCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: 'hidden',
  },
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  overviewRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  overviewIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 6,
    backgroundColor: 'rgba(8, 145, 178, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overviewDivider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
  },
  overviewLabel: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  overviewValue: {
    fontFamily: FONT_FAMILY.ISemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray800,
  },

  // ── Sticky Bottom Bar ───────────────────────────────────────────────────────
  stickyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: Platform.OS === 'ios' ? 34 : 30,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 10,
  },
  stickyLeftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stickyIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyApplyBtn: {
    borderRadius: 12,
    overflow: 'hidden',
    flex: 1,
    marginLeft: 16,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  stickyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  stickyApplyText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.base,
    color: COLORS.white,
  },
});
