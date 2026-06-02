import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import CommonHeader from '../../components/common/CommonHeader';
import JobCard from '../../components/Jobs/JobCard';
import Button from '../../components/common/Button';

const { width } = Dimensions.get('window');

// ─── Data ────────────────────────────────────────────────────────────────────

const QUICK_CATEGORIES = [
  { id: '1', label: 'Software Engineer', active: true },
  { id: '2', label: 'Data Analyst', active: false },
  { id: '3', label: 'Product Manager', active: false },
  { id: '4', label: 'UI/UX Designer', active: false },
  { id: '5', label: 'DevOps Engineer', active: false },
];

const FILTER_CHIPS = [
  { id: '1', icon: 'briefcase-outline', label: 'Experience' },
  { id: '2', icon: 'currency-inr', label: 'Salary' },
  { id: '3', icon: 'map-marker-outline', label: 'Location' },
];

const SORT_OPTIONS = ['Relevance', 'Latest', 'Salary'];

export const JOB_LISTINGS = [
  {
    id: '1',
    title: 'Senior React Native Developer',
    company: 'TechNova Solutions',
    companyColor: '#0F766E',
    location: 'Pune, Maharashtra',
    tags: ['Full Time', 'Remote', '3+ Years'],
    tagColors: ['#EFF6FF', '#F0FDF4', '#FFF7ED'],
    tagTextColors: ['#2563EB', '#16A34A', '#EA580C'],
    description:
      'Looking for an experienced React Native developer to build scalable mobile...',
    salary: '₹8 - ₹15 LPA',
    postedTime: 'Posted 2 Days Ago',
    logoIcon: 'rocket-launch',
    logoBg: '#EFF6FF',
    logoIconColor: '#2563EB',
  },
  {
    id: '2',
    title: 'Lead UI/UX Designer',
    company: 'CloudScale Inc.',
    companyColor: '#7C3AED',
    location: 'Mumbai, Maharashtra',
    tags: ['Contract', '5+ Years'],
    tagColors: ['#F5F3FF', '#FEF9C3'],
    tagTextColors: ['#7C3AED', '#CA8A04'],
    description:
      'We are seeking a visionary UI/UX Designer to lead our product design team...',
    salary: '₹12 - ₹20 LPA',
    postedTime: 'Posted 5 Hours Ago',
    logoIcon: 'cloud-outline',
    logoBg: '#F5F3FF',
    logoIconColor: '#7C3AED',
  },
  {
    id: '3',
    title: 'Junior Data Scientist',
    company: 'Finlytic Analytics',
    companyColor: '#0F766E',
    location: 'Bangalore, Karnataka',
    tags: ['Full Time', 'On-site'],
    tagColors: ['#EFF6FF', '#ECFDF5'],
    tagTextColors: ['#2563EB', '#059669'],
    description:
      'Join our data science team and work on real-world financial analytics problems...',
    salary: '₹6 - ₹10 LPA',
    postedTime: 'Posted Yesterday',
    logoIcon: 'chart-line',
    logoBg: '#ECFDF5',
    logoIconColor: '#059669',
  },
  {
    id: '4',
    title: 'Backend Node.js Engineer',
    company: 'Infra Systems Pvt.',
    companyColor: '#DC2626',
    location: 'Hyderabad, Telangana',
    tags: ['Full Time', 'Hybrid', '2+ Years'],
    tagColors: ['#EFF6FF', '#F5F3FF', '#FFF7ED'],
    tagTextColors: ['#2563EB', '#7C3AED', '#EA580C'],
    description:
      'Build and maintain high-performance APIs and microservices for our SaaS platform...',
    salary: '₹10 - ₹18 LPA',
    postedTime: 'Posted 3 Days Ago',
    logoIcon: 'server',
    logoBg: '#FEF2F2',
    logoIconColor: '#DC2626',
  },
];

// ─── Main Screen ─────────────────────────────────────────────────────────────

const Jobs = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [activeCategory, setActiveCategory] = useState('1');
  const [sortLabel, setSortLabel] = useState('Relevance');
  const [sortIndex, setSortIndex] = useState(0);
  const [showCustomHeader, setShowCustomHeader] = useState(true);

  const cycleSort = () => {
    const next = (sortIndex + 1) % SORT_OPTIONS.length;
    setSortIndex(next);
    setSortLabel(SORT_OPTIONS[next]);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 10) {
      if (showCustomHeader) {
        setShowCustomHeader(false);
      }
    } else {
      if (!showCustomHeader) {
        setShowCustomHeader(true);
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.safeArea}>
        {/* ── Header ── */}
        {showCustomHeader ? (
          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Find Your Dream Job</Text>
              <Text style={styles.headerSubtitle}>
                Discover opportunities that match your skills
              </Text>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerIcon}>
                <Icon name="bell-outline" size={22} color={COLORS.gray700} />
                <View style={styles.notifDot} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <CommonHeader leftIcon SearchBar BellIcon />
        )}

        <ScrollView
          // style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {/* ── Search Inputs ── */}
          <View style={styles.searchCard}>
            <View style={styles.searchInput}>
              <Icon name="magnify" size={18} color={COLORS.gray400} />
              <TextInput
                style={styles.searchTextInput}
                placeholder="Job title, keyword..."
                placeholderTextColor={COLORS.textMuted}
                value={jobTitle}
                onChangeText={setJobTitle}
              />
            </View>
            <View style={styles.searchDivider} />
            <View style={styles.searchInput}>
              <Icon
                name="map-marker-outline"
                size={18}
                color={COLORS.gray400}
              />
              <TextInput
                style={styles.searchTextInput}
                placeholder="City, state or remote"
                placeholderTextColor={COLORS.textMuted}
                value={location}
                onChangeText={setLocation}
              />
            </View>
            <View style={{ marginTop: 6 }}>
              <Button variant="gradient" label="Search Jobs" size="md" />
            </View>
          </View>

          {/* ── Quick Categories ── */}
          <Text style={styles.quickCatLabel}>QUICK CATEGORIES</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickCatRow}
          >
            {QUICK_CATEGORIES.map(cat => {
              return (
                <TouchableOpacity
                  key={cat.id}
                  onPress={() => setActiveCategory(cat.id)}
                  activeOpacity={0.8}
                  style={[styles.quickCatChip]}
                >
                  <Text style={[styles.quickCatText]}>{cat.label}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* ── Filter Chips ── */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {FILTER_CHIPS.map(chip => (
              <TouchableOpacity
                key={chip.id}
                style={styles.filterChip}
                activeOpacity={0.8}
              >
                <Icon name={chip.icon} size={14} color={COLORS.gray600} />
                <Text style={styles.filterChipText}>{chip.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* ── Results Header ── */}
          <View style={styles.resultsRow}>
            <Text style={styles.resultsCount}>1,245 Jobs Found</Text>
            <TouchableOpacity
              onPress={cycleSort}
              style={styles.sortBtn}
              activeOpacity={0.8}
            >
              <Text style={styles.sortLabel}>
                Sort by: <Text style={styles.sortValue}>{sortLabel}</Text>
              </Text>
              <Icon name="chevron-down" size={16} color={COLORS.secondary} />
            </TouchableOpacity>
          </View>

          {/* ── Job Listings ── */}
          {JOB_LISTINGS.map(item => (
            <JobCard key={item.id} item={item} />
          ))}

          <View style={{ height: 80 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Jobs;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 10,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.lg,
    color: '#1E293B',
  },
  headerSubtitle: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    position: 'relative',
    padding: 4,
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 2,
    right: 2,
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
  avatarBtn: {},
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.md,
    color: '#fff',
  },

  // Scroll
  // scroll: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
  },

  // Search Card
  searchCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    gap: 3,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  searchTextInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
    padding: 0,
  },
  searchDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 2,
  },
  searchBtn: {
    marginTop: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  searchBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#fff',
    letterSpacing: 0.3,
  },

  // Quick Categories
  quickCatLabel: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  quickCatRow: {
    gap: 8,
    paddingBottom: 14,
  },
  quickCatChip: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  quickCatText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: '#334155',
  },

  // Filter Chips
  filterRow: {
    gap: 8,
    paddingBottom: 14,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  filterChipText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray700,
  },

  // Results Row
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  resultsCount: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sortLabel: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  sortValue: {
    fontFamily: FONT_FAMILY.ISemiBold,
    color: COLORS.secondary,
  },

  // FAB
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 16,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
});
