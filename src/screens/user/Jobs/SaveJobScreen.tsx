import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import COLORS from '../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/fonts';
import CommonHeader from '../../../components/common/CommonHeader';
import Button from '../../../components/common/Button';
import { JobsStackParamList } from '../../../navigation/user_navigation/JobsStackNavigator';

// ─── Types ─────────────────────────────────────────────────────────────────────
interface SavedJob {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  workMode: string;
  employmentType: string;
  postedTime: string;
  tags: string[];
  tagColors: string[];
  tagTextColors: string[];
  logoIcon: string;
  logoBg: string;
  logoIconColor: string;
  savedAt: string;
}

// ─── Sample Saved Jobs Data ────────────────────────────────────────────────────
const SAVED_JOBS_DATA: SavedJob[] = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'TechNova Solutions',
    location: 'Pune, Maharashtra',
    salary: '₹8 – 15 LPA',
    workMode: 'Remote',
    employmentType: 'Full Time',
    postedTime: '2 days ago',
    tags: ['Full Time', 'Remote', '3+ Years'],
    tagColors: ['#EFF6FF', '#F0FDF4', '#FFF7ED'],
    tagTextColors: ['#2563EB', '#16A34A', '#EA580C'],
    logoIcon: 'rocket-launch',
    logoBg: '#EFF6FF',
    logoIconColor: '#2563EB',
    savedAt: 'Saved 1 day ago',
  },
  {
    id: '2',
    title: 'Lead UI/UX Designer',
    company: 'CloudScale Inc.',
    location: 'Mumbai, Maharashtra',
    salary: '₹12 – 20 LPA',
    workMode: 'Hybrid',
    employmentType: 'Contract',
    postedTime: '5 hours ago',
    tags: ['Contract', '5+ Years'],
    tagColors: ['#F5F3FF', '#FEF9C3'],
    tagTextColors: ['#7C3AED', '#CA8A04'],
    logoIcon: 'cloud-outline',
    logoBg: '#F5F3FF',
    logoIconColor: '#7C3AED',
    savedAt: 'Saved 3 days ago',
  },
  {
    id: '3',
    title: 'Junior Data Scientist',
    company: 'Finlytic Analytics',
    location: 'Bangalore, Karnataka',
    salary: '₹6 – 10 LPA',
    workMode: 'On-site',
    employmentType: 'Full Time',
    postedTime: 'Yesterday',
    tags: ['Full Time', 'On-site'],
    tagColors: ['#EFF6FF', '#ECFDF5'],
    tagTextColors: ['#2563EB', '#059669'],
    logoIcon: 'chart-line',
    logoBg: '#ECFDF5',
    logoIconColor: '#059669',
    savedAt: 'Saved today',
  },
  {
    id: '4',
    title: 'Backend Node.js Engineer',
    company: 'Infra Systems Pvt.',
    location: 'Hyderabad, Telangana',
    salary: '₹10 – 18 LPA',
    workMode: 'Hybrid',
    employmentType: 'Full Time',
    postedTime: '3 days ago',
    tags: ['Full Time', 'Hybrid', '2+ Years'],
    tagColors: ['#EFF6FF', '#F5F3FF', '#FFF7ED'],
    tagTextColors: ['#2563EB', '#7C3AED', '#EA580C'],
    logoIcon: 'server',
    logoBg: '#FEF2F2',
    logoIconColor: '#DC2626',
    savedAt: 'Saved 5 days ago',
  },
];

// ─── Saved Job Card ────────────────────────────────────────────────────────────
const SavedJobCard = ({
  job,
  onRemove,
  onApply,
}: {
  job: SavedJob;
  onRemove: (id: string) => void;
  onApply: (job: SavedJob) => void;
}) => {
  const removeScale = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleRemove = () => {
    // Animate out before removal
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(removeScale, {
        toValue: 0.92,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onRemove(job.id);
    });
  };

  return (
    <Animated.View
      style={[
        styles.jobCard,
        { opacity: fadeAnim, transform: [{ scale: removeScale }] },
      ]}
    >
      {/* ── Card Header ── */}
      <View style={styles.cardHeader}>
        {/* Logo */}
        <View style={[styles.jobLogo, { backgroundColor: '#EFF6FF' }]}>
          <Icon name="office-building" size={22} color={COLORS.gray400} />
        </View>
        {/* Title & Company */}
        <View style={styles.cardHeaderInfo}>
          <Text style={styles.jobTitleText} numberOfLines={2}>
            {job.title}
          </Text>
          <Text style={styles.companyText}>{job.company}</Text>
        </View>

        {/* Remove / Unsave button */}
        <TouchableOpacity
          style={styles.unsaveBtn}
          onPress={handleRemove}
          activeOpacity={0.7}
        >
          <Icon name="bookmark" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* ── Location & Meta Row ── */}
      <View style={styles.metaRow}>
        <View style={styles.metaItem}>
          <Icon name="map-marker-outline" size={13} color={COLORS.gray400} />
          <Text style={styles.metaText} numberOfLines={1}>
            {job.location}
          </Text>
        </View>
        <View style={styles.metaDot} />
        <View style={styles.metaItem}>
          <Icon name="currency-inr" size={13} color={COLORS.gray400} />
          <Text style={styles.metaText}>{job.salary}</Text>
        </View>
      </View>

      {/* ── Work Mode & Employment Badges ── */}
      <View style={styles.badgeRow}>
        {/* Work Mode */}
        <View
          style={[
            styles.workModeBadge,
            job.workMode === 'Remote' && styles.workModeBadgeRemote,
            job.workMode === 'On-site' && styles.workModeBadgeOnsite,
          ]}
        >
          <View
            style={[
              styles.badgeDot,
              job.workMode === 'Remote' && { backgroundColor: COLORS.success },
              job.workMode === 'On-site' && {
                backgroundColor: COLORS.warning,
              },
              job.workMode === 'Hybrid' && {
                backgroundColor: COLORS.primary,
              },
            ]}
          />
          <Text
            style={[
              styles.workModeText,
              job.workMode === 'Remote' && { color: COLORS.success },
              job.workMode === 'On-site' && { color: COLORS.warning },
              job.workMode === 'Hybrid' && { color: COLORS.primary },
            ]}
          >
            {job.workMode}
          </Text>
        </View>

        {/* Tags */}
        {job.tags.slice(0, 2).map((tag, idx) => (
          <View
            key={idx}
            style={[styles.tagChip, { backgroundColor: job.tagColors[idx] }]}
          >
            <Text style={[styles.tagText, { color: job.tagTextColors[idx] }]}>
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* ── Footer: Posted time, saved time & Apply ── */}
      <View style={styles.cardFooter}>
        <View style={styles.footerLeft}>
          <Icon name="clock-outline" size={12} color={COLORS.gray400} />
          <Text style={styles.postedText}>{job.postedTime}</Text>
          <Text style={styles.footerSeparator}>•</Text>
          <Icon
            name="bookmark-check-outline"
            size={12}
            color={COLORS.primary}
          />
          <Text style={styles.savedAtText}>{job.savedAt}</Text>
        </View>

        {/* <TouchableOpacity
          style={styles.applyBtn}
          onPress={() => onApply(job)}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#0891B2', '#0E7490']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.applyBtnGradient}
          >
            <Text style={styles.applyBtnText}>Apply</Text>
            <Icon name="arrow-right" size={13} color={COLORS.white} />
          </LinearGradient>
        </TouchableOpacity> */}
        <TouchableOpacity
          onPress={() => onApply(job)}
          style={styles.applyBtnContainer}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={COLORS.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.applyBtnGradient}
          >
            <Text style={styles.applyBtnText}>Apply Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// ─── Empty State ───────────────────────────────────────────────────────────────
const EmptyState = ({ onBrowse }: { onBrowse: () => void }) => {
  const scaleAnim = useRef(new Animated.Value(0.85)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 60,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.emptyStateContainer,
        { opacity: opacityAnim, transform: [{ scale: scaleAnim }] },
      ]}
    >
      {/* Illustration Ring */}
      <View style={styles.emptyRingOuter}>
        <View style={styles.emptyRingInner}>
          <View style={styles.emptyIconCircle}>
            <Icon
              name="bookmark-off-outline"
              size={36}
              color={COLORS.gray300}
            />
          </View>
        </View>
      </View>

      <Text style={styles.emptyTitle}>No Saved Jobs Yet</Text>
      <Text style={styles.emptySubtitle}>
        Jobs you bookmark will appear here. Start exploring and save roles that
        interest you for later.
      </Text>

      <View style={{ width: '50%' }}>
        <Button
          variant="gradient"
          label="Browse Jobs"
          size="md"
          icon={<Icon name="arrow-right" size={18} color={COLORS.white} />}
          iconPosition="end"
          onPress={onBrowse}
        />
      </View>
    </Animated.View>
  );
};

// ─── Main Screen ───────────────────────────────────────────────────────────────
const SaveJobScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>(SAVED_JOBS_DATA);

  const handleRemove = (id: string) => {
    setSavedJobs(prev => prev.filter(j => j.id !== id));
    Toast.show({
      type: 'info',
      text1: 'Job Removed',
      text2: 'The job has been removed from your saved list.',
    });
  };

  const handleApply = (job: SavedJob) => {
    navigation.navigate('ApplyJob', { job });
  };

  const handleClearAll = () => {
    setSavedJobs([]);
    Toast.show({
      type: 'info',
      text1: 'All Jobs Cleared',
      text2: 'Your saved jobs list has been cleared.',
    });
  };

  const handleBrowse = () => {
    navigation.navigate('MainTabs', { screen: 'Jobs' });
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <CommonHeader
        BackIcon
        onBackPress={() => navigation.navigate('MainTabs', { screen: 'Jobs' })}
        title="Saved Jobs"
      />

      {savedJobs.length > 0 && (
        /* ── Summary Banner ── */
        <View style={styles.summaryBanner}>
          <View style={styles.summaryLeft}>
            <View style={styles.summaryCountBadge}>
              <Text style={styles.summaryCountText}>{savedJobs.length}</Text>
            </View>
            <Text style={styles.summaryLabel}>
              {savedJobs.length === 1 ? 'Job Saved' : 'Jobs Saved'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.clearAllBtn}
            onPress={handleClearAll}
            activeOpacity={0.7}
          >
            <Icon name="trash-can-outline" size={14} color={COLORS.danger} />
            <Text style={styles.clearAllText}>Clear All</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          savedJobs.length === 0 && styles.scrollContentCentered,
        ]}
        showsVerticalScrollIndicator={false}
      >
        {savedJobs.length === 0 ? (
          <EmptyState onBrowse={handleBrowse} />
        ) : (
          <>
            {/* ── Info Alert ── */}
            <View style={styles.alertBanner}>
              <Icon
                name="information-outline"
                size={16}
                color={COLORS.primary}
              />
              <Text style={styles.alertText}>
                Tap the <Text style={styles.alertBold}>bookmark icon</Text> on a
                card to unsave a job.
              </Text>
            </View>

            {/* ── Job Cards ── */}
            {savedJobs.map(job => (
              <SavedJobCard
                key={job.id}
                job={job}
                onRemove={handleRemove}
                onApply={handleApply}
              />
            ))}

            <View style={{ height: 32 }} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SaveJobScreen;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // ── Summary Banner ───────────────────────────────────────────────────────────
  summaryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  summaryCountBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(8, 145, 178, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryCountText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: 12,
    color: COLORS.primary,
  },
  summaryLabel: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  clearAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: 'rgba(239, 68, 68, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.15)',
  },
  clearAllText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 12,
    color: COLORS.danger,
  },

  // ── Scroll ───────────────────────────────────────────────────────────────────
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  scrollContentCentered: {
    // flex: 1,
    paddingTop: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Alert Banner ─────────────────────────────────────────────────────────────
  alertBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
    borderColor: 'rgba(8, 145, 178, 0.12)',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
    marginBottom: 16,
  },
  alertText: {
    flex: 1,
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm - 0.5,
    color: COLORS.cyan800,
    lineHeight: 18,
  },
  alertBold: {
    fontFamily: FONT_FAMILY.ISemiBold,
    color: COLORS.primary,
  },

  // ── Job Card ─────────────────────────────────────────────────────────────────
  jobCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  jobLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    flexShrink: 0,
  },
  cardHeaderInfo: {
    flex: 1,
    marginRight: 8,
  },
  jobTitleText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray800,
    lineHeight: 22,
    marginBottom: 2,
  },
  companyText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  unsaveBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Meta Row
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm - 0.5,
    color: COLORS.gray500,
    maxWidth: 130,
  },
  metaDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: COLORS.gray300,
  },

  // Badge Row
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 6,
    marginBottom: 14,
  },
  workModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    borderColor: 'rgba(8, 145, 178, 0.2)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    gap: 4,
  },
  workModeBadgeRemote: {
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
  },
  workModeBadgeOnsite: {
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.primary,
  },
  workModeText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 10,
    color: COLORS.primary,
  },
  tagChip: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 10,
  },

  // Card Footer
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    paddingTop: 12,
  },
  footerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  postedText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: 11,
    color: COLORS.gray400,
  },
  footerSeparator: {
    fontSize: 10,
    color: COLORS.gray300,
    marginHorizontal: 2,
  },
  savedAtText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 11,
    color: COLORS.primary,
  },
  applyBtn: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  applyBtnContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  applyBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  applyBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 12,
    color: COLORS.white,
  },

  // ── Empty State ───────────────────────────────────────────────────────────────
  emptyStateContainer: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  emptyRingOuter: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  emptyRingInner: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(8, 145, 178, 0.07)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyIconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  emptyTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.gray800,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  browseBtnWrapper: {
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  browseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 13,
  },
  browseBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.base,
    color: COLORS.white,
  },
});
