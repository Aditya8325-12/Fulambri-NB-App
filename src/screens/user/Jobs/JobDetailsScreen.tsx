import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/fonts';
import { useNavigation } from '@react-navigation/native';

// ─── Types ───────────────────────────────────────────────────────────────────
interface JobDetail {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  ctc: string;
  employmentType: string;
  experience: string;
  applyBy: string;
  workMode: 'Remote' | 'Hybrid' | 'On-site';
  department: string;
  description: string;
  responsibilities: string[];
  eligibilityCriteria: string;
  benefits: string[];
  additionalInfo: string;
  skillsRequired: string[];
  jobLocations: string[];
  pinCode: string;
}

// ─── Sample Job Data ──────────────────────────────────────────────────────────
const JOB_DETAIL: JobDetail = {
  id: '1',
  title: 'Senior React Native Developer',
  company: 'GreenLeaf Industries',
  location: 'Pune, Maharashtra · Bangalore, Karnataka · Mumbai',
  ctc: '₹8L – ₹15L',
  employmentType: 'Full Time',
  experience: '2 Years 6 Months',
  applyBy: '26 Jun 2026',
  workMode: 'Hybrid',
  department: 'Engineering & Technology',
  description:
    'We are looking for an experienced React Native developer to build and scale our mobile applications. You will collaborate with cross-functional teams including design, backend, and QA to deliver high-quality features that serve millions of users.',
  responsibilities: [
    'Design and implement high-quality React Native mobile applications.',
    'Collaborate with product and design teams to deliver pixel-perfect UIs.',
    'Optimize performance, memory usage, and overall app stability.',
    'Write clean, maintainable, and well-documented code.',
    'Participate in code reviews and mentor junior developers.',
  ],
  eligibilityCriteria:
    'Bachelors or Masters degree in Computer Science, Engineering, or a related field. Minimum 2.5 years of hands-on React Native development experience. Strong proficiency in JavaScript/TypeScript, REST APIs, and state management (Redux/Context).',
  benefits: [
    'Health & Wellness Insurance (Family Coverage)',
    'Flexible Work-from-Home Policy',
    'Annual Performance Bonus up to 20%',
    'Learning & Development Budget ₹50,000/year',
    'Paid Parental Leave – 6 months',
  ],
  additionalInfo:
    'Our team operates on a quarterly sprint cadence. You will be expected to attend bi-weekly all-hands meetings and contribute to our internal open-source initiatives. The role involves occasional travel to client sites.',
  skillsRequired: [
    'React Native',
    'TypeScript',
    'Redux',
    'REST API',
    'Git',
    'Figma',
  ],
  jobLocations: [
    'Pune, Maharashtra',
    'Bangalore, Karnataka',
    'Mumbai, Maharashtra',
  ],
  pinCode: '411001',
};

// ─── Work Mode Badge ──────────────────────────────────────────────────────────
const WorkModeBadge = ({ mode }: { mode: string }) => {
  const config = {
    Remote: { bg: '#F0FDF4', text: '#16A34A', dot: '#16A34A' },
    Hybrid: { bg: '#EFF6FF', text: '#2563EB', dot: '#2563EB' },
    'On-site': { bg: '#FFF7ED', text: '#EA580C', dot: '#EA580C' },
  }[mode] ?? { bg: '#F1F5F9', text: '#475569', dot: '#475569' };

  return (
    <View style={[styles.workModeBadge, { backgroundColor: config.bg }]}>
      <View style={[styles.workModeDot, { backgroundColor: config.dot }]} />
      <Text style={[styles.workModeText, { color: config.text }]}>{mode}</Text>
    </View>
  );
};

// ─── Quick Stat Chip ──────────────────────────────────────────────────────────
const StatChip = ({
  icon,
  label,
  value,
  iconColor,
}: {
  icon: string;
  label: string;
  value: string;
  iconColor: string;
}) => (
  <View style={styles.statChip}>
    <Icon name={icon} size={15} color={iconColor} />
    <View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue} numberOfLines={1}>
        {value}
      </Text>
    </View>
  </View>
);

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ icon, title }: { icon: string; title: string }) => (
  <View style={styles.sectionHeaderRow}>
    <View style={styles.sectionIconWrap}>
      <Icon name={icon} size={16} color={COLORS.primary} />
    </View>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// ─── Bullet Item ──────────────────────────────────────────────────────────────
const BulletItem = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletDot} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

// ─── Benefit Card ─────────────────────────────────────────────────────────────
const BenefitCard = ({ text }: { text: string }) => (
  <View style={styles.benefitCard}>
    <View style={styles.benefitIconWrap}>
      <Icon name="gift-outline" size={14} color={COLORS.warning} />
    </View>
    <Text style={styles.benefitText}>{text}</Text>
  </View>
);

// ─── Skill Chip ───────────────────────────────────────────────────────────────
const SkillChip = ({ skill }: { skill: string }) => (
  <View style={styles.skillChip}>
    <Text style={styles.skillChipText}>{skill}</Text>
  </View>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────
const JobDetailsScreen = () => {
  const navigation = useNavigation();
  const [saved, setSaved] = useState(false);
  const saveScale = useRef(new Animated.Value(1)).current;
  const job = JOB_DETAIL;

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

  const handleShare = async () => {
    await Share.share({
      message: `Check out this job: ${job.title} at ${job.company}\nApply by ${job.applyBy}`,
      title: job.title,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      {/* ── Top Navigation Bar ── */}
      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.navBackBtn}
          activeOpacity={0.7}
        >
          <Icon name="arrow-left" size={22} color={COLORS.gray800} />
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          Job Details
        </Text>
        <Animated.View style={{ transform: [{ scale: saveScale }] }}>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.navActionBtn}
            activeOpacity={0.7}
          >
            <Icon
              name={saved ? 'bookmark' : 'bookmark-outline'}
              size={22}
              color={saved ? COLORS.primary : COLORS.gray500}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Hero Card ─────────────────────────────────────────── */}
        <View style={styles.heroCard}>
          <View style={styles.heroTop}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text style={styles.companyName}>{job.company}</Text>
                <WorkModeBadge mode={job.workMode} />
              </View>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <View style={styles.locationRow}>
                <Icon
                  name="map-marker-outline"
                  size={13}
                  color={COLORS.gray500}
                />
                <Text style={styles.locationText} numberOfLines={1}>
                  {job.location}
                </Text>
              </View>
            </View>
          </View>

          {/* ── Quick Stats ── */}
          <View style={styles.statsGrid}>
            <StatChip
              icon="currency-inr"
              label="CTC"
              value={job.ctc}
              iconColor={COLORS.success}
            />
            <StatChip
              icon="briefcase-outline"
              label="Employment"
              value={job.employmentType}
              iconColor={COLORS.info}
            />
            <StatChip
              icon="clock-outline"
              label="Experience"
              value={job.experience}
              iconColor={COLORS.warning}
            />
            <StatChip
              icon="calendar-outline"
              label="Apply By"
              value={job.applyBy}
              iconColor={COLORS.danger}
            />
          </View>
        </View>

        {/* ── Apply / Share / Save Row ───────────────────────── */}
        <View style={styles.actionsCard}>
          {/* Company Logo Placeholder */}
          <View style={styles.companyLogoWrap}>
            <LinearGradient
              colors={['#0F172A', '#1E293B']}
              style={styles.companyLogo}
            >
              <Icon name="leaf" size={28} color={COLORS.primary} />
            </LinearGradient>
            <Text style={styles.companyLogoLabel}>{job.company}</Text>
          </View>

          {/* Apply Now Button */}
          <TouchableOpacity
            style={styles.applyBtnContainer}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={COLORS.gradients.primary}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.applyGradient}
            >
              <Text style={styles.applyBtnText}>Apply Now</Text>
              <Icon name="arrow-right" size={18} color={COLORS.white} />
            </LinearGradient>
          </TouchableOpacity>

          {/* Share & Save */}
          <View style={styles.secondaryActions}>
            <TouchableOpacity
              onPress={handleShare}
              style={styles.secondaryBtn}
              activeOpacity={0.75}
            >
              <Icon
                name="share-variant-outline"
                size={17}
                color={COLORS.gray600}
              />
              <Text style={styles.secondaryBtnText}>Share</Text>
            </TouchableOpacity>
            <View style={styles.secondaryDivider} />
            <Animated.View style={{ transform: [{ scale: saveScale }] }}>
              <TouchableOpacity
                onPress={handleSave}
                style={styles.secondaryBtn}
                activeOpacity={0.75}
              >
                <Icon
                  name={saved ? 'bookmark' : 'bookmark-outline'}
                  size={17}
                  color={saved ? COLORS.primary : COLORS.gray600}
                />
                <Text
                  style={[
                    styles.secondaryBtnText,
                    saved && { color: COLORS.primary },
                  ]}
                >
                  {saved ? 'Saved' : 'Save'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </View>

        {/* ── Job Description ───────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="text-box-outline" title="Job Description" />
          <Text style={styles.bodyText}>{job.description}</Text>
        </View>

        {/* ── Responsibilities ─────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="format-list-bulleted" title="Responsibilities" />
          {job.responsibilities.map((item, idx) => (
            <BulletItem key={idx} text={item} />
          ))}
        </View>

        {/* ── Eligibility Criteria ──────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="school-outline" title="Eligibility Criteria" />
          <Text style={styles.bodyText}>{job.eligibilityCriteria}</Text>
        </View>

        {/* ── Benefits & Perks ─────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="gift-outline" title="Benefits &amp; Perks" />
          <View style={styles.benefitsList}>
            {job.benefits.map((b, idx) => (
              <BenefitCard key={idx} text={b} />
            ))}
          </View>
        </View>

        {/* ── Additional Information ────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader
            icon="information-outline"
            title="Additional Information"
          />
          <Text style={styles.bodyText}>{job.additionalInfo}</Text>
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

        {/* ── Job Location ─────────────────────────────────────── */}
        <View style={styles.section}>
          <SectionHeader icon="map-marker-outline" title="Job Location" />
          {job.jobLocations.map((loc, idx) => (
            <BulletItem key={idx} text={loc} />
          ))}
          <View style={styles.pinCodeRow}>
            <Icon name="pin-outline" size={13} color={COLORS.gray400} />
            <Text style={styles.pinCodeText}>Pin Code: {job.pinCode}</Text>
          </View>
        </View>

        {/* ── Job Overview ─────────────────────────────────────── */}
        <View style={[styles.section, { marginBottom: 24 }]}>
          <SectionHeader icon="office-building-outline" title="Job Overview" />
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>Department</Text>
            <Text style={styles.overviewValue}>{job.department}</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>Work Mode</Text>
            <Text style={[styles.overviewValue, { color: COLORS.info }]}>
              {job.workMode}
            </Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>Employment</Text>
            <Text style={styles.overviewValue}>{job.employmentType}</Text>
          </View>
          <View style={styles.overviewDivider} />
          <View style={styles.overviewRow}>
            <Text style={styles.overviewLabel}>Experience</Text>
            <Text style={styles.overviewValue}>{job.experience}</Text>
          </View>
        </View>

        {/* ── Bottom Spacer ── */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* ── Sticky Bottom Apply Bar ─────────────────────────────── */}
      <View style={styles.stickyBar}>
        <View>
          <Text style={styles.stickyCtc}>{job.ctc}</Text>
          <Text style={styles.stickyDeadline}>Apply by {job.applyBy}</Text>
        </View>
        <TouchableOpacity style={styles.stickyApplyBtn} activeOpacity={0.85}>
          <LinearGradient
            colors={COLORS.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.stickyGradient}
          >
            <Text style={styles.stickyApplyText}>Apply Now</Text>
            <Icon name="arrow-right" size={18} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JobDetailsScreen;

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Nav Bar
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  navBackBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
  },
  navTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray800,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },
  navActionBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  // Hero Card
  heroCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  companyName: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginBottom: 3,
  },
  jobTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.gray800,
    marginBottom: 6,
    lineHeight: 26,
    flexShrink: 1,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    flex: 1,
  },

  // Work Mode Badge
  workModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexShrink: 0,
  },
  workModeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  workModeText: {
    fontFamily: FONT_FAMILY.ISemiBold,
    fontSize: FONT_SIZE.xs,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 14,
  },
  statChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    width: '47%',
  },
  statLabel: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: 10,
    color: COLORS.gray400,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  statValue: {
    fontFamily: FONT_FAMILY.ISemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray800,
  },

  // Actions Card
  actionsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  companyLogoWrap: {
    alignItems: 'center',
    marginBottom: 14,
  },
  companyLogo: {
    width: 60,
    height: 60,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  companyLogoLabel: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray700,
  },

  // Apply Button
  applyBtnContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  applyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    gap: 8,
  },
  applyBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
  },

  // Secondary Actions
  secondaryActions: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  secondaryBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  secondaryBtnText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  secondaryDivider: {
    width: 10,
  },

  // Section
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionIconWrap: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: COLORS.miniPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray800,
  },

  // Body
  bodyText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    lineHeight: 20,
  },

  // Bullet
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 8,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: COLORS.primary,
    marginTop: 6,
    flexShrink: 0,
  },
  bulletText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    lineHeight: 20,
    flex: 1,
  },

  // Benefits
  benefitsList: {
    gap: 8,
  },
  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFBEB',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  benefitIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FEF9C3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  benefitText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray700,
    flex: 1,
  },

  // Skills
  skillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    backgroundColor: COLORS.miniPrimary,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: COLORS.cyan100,
  },
  skillChipText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.cyan700,
  },

  // Pin Code
  pinCodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  pinCodeText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray400,
  },

  // Job Overview
  overviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
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
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },

  // Sticky Bar
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 12,
  },
  stickyCtc: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray800,
  },
  stickyDeadline: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 2,
  },
  stickyApplyBtn: {
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  stickyGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    gap: 8,
  },
  stickyApplyText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
  },
});
