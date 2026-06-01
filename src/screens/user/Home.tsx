import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import CommonHeader from '../../components/common/CommonHeader';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.62;

// ─── Data ────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: '1', label: 'IT', icon: '💻' },
  { id: '2', label: 'Finance', icon: '💰' },
  { id: '3', label: 'Health', icon: '🏥' },
  { id: '4', label: 'Marketing', icon: '📊' },
];

const FEATURED_JOBS = [
  {
    id: '1',
    title: 'Senior Product Designer',
    company: 'TechCorp',
    location: 'Remote',
    salaryMin: '$120k',
    salaryMax: '$150k',
    type: 'Full-time',
    color: '#2563EB',
    accentColor: '#1D4ED8',
  },
  {
    id: '2',
    title: 'Marketing Manager',
    company: 'Skyline',
    location: 'New York',
    salaryMin: '$80k',
    salaryMax: '$100k',
    type: 'Part-time',
    color: '#7C3AED',
    accentColor: '#6D28D9',
  },
  {
    id: '3',
    title: 'Data Engineer',
    company: 'CloudBase',
    location: 'San Francisco',
    salaryMin: '$130k',
    salaryMax: '$160k',
    type: 'Full-time',
    color: '#0F766E',
    accentColor: '#0D6B63',
  },
];

const RECOMMENDED_JOBS = [
  {
    id: '1',
    title: 'Data Analyst',
    company: 'Swift Logistics',
    location: 'London',
    tags: ['SQL', 'Python', 'Remote Friendly'],
    tagColors: ['#EFF6FF', '#FFF7ED', '#F0FDF4'],
    tagTextColors: ['#2563EB', '#EA580C', '#16A34A'],
    highMatch: false,
  },
  {
    id: '2',
    title: 'UX Researcher',
    company: 'Nexus Hub',
    location: 'Remote',
    tags: ['Figma', 'Interviews', 'High Match'],
    tagColors: ['#F5F3FF', '#FEF9C3', '#DCFCE7'],
    tagTextColors: ['#7C3AED', '#CA8A04', '#15803D'],
    highMatch: true,
  },
];

const RECENT_POSTINGS = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'Vivid Solutions',
    time: '2h ago',
    salary: '$90k - $110k',
    type: 'Full-time',
    typeColor: '#EFF6FF',
    typeTextColor: '#2563EB',
    icon: '</>',
    iconBg: '#EFF6FF',
    iconColor: '#2563EB',
  },
  {
    id: '2',
    title: 'Growth Lead',
    company: 'Scale Labs',
    time: '6h ago',
    salary: '$130k - $160k',
    type: 'Equity + Salary',
    typeColor: '#FFF7ED',
    typeTextColor: '#EA580C',
    icon: '📈',
    iconBg: '#FFF7ED',
    iconColor: '#EA580C',
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

const SectionHeader = ({
  title,
  actionLabel,
}: {
  title: string;
  actionLabel?: string;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionLabel && (
      <TouchableOpacity>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const CategoryChip = ({ label, icon }: { label: string; icon: string }) => (
  <TouchableOpacity style={styles.categoryChip} activeOpacity={0.75}>
    <Text style={styles.categoryIcon}>{icon}</Text>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const FeaturedCard = ({
  item,
}: {
  item: (typeof FEATURED_JOBS)[0];
}) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[styles.featuredCard, { backgroundColor: item.color }]}>
    {/* Type Badge */}
    <View style={styles.featuredBadge}>
      <Text style={styles.featuredBadgeText}>{item.type}</Text>
    </View>

    {/* Logo placeholder */}
    <View style={[styles.featuredLogo, { backgroundColor: item.accentColor }]}>
      <Text style={styles.featuredLogoText}>
        {item.company.charAt(0).toUpperCase()}
      </Text>
    </View>

    <Text style={styles.featuredJobTitle} numberOfLines={2}>
      {item.title}
    </Text>
    <Text style={styles.featuredCompany}>
      {item.company} • {item.location}
    </Text>

    <View style={styles.featuredBottom}>
      <Text style={styles.featuredSalary}>
        {item.salaryMin} - {item.salaryMax}
      </Text>
      <TouchableOpacity style={styles.applyBtn}>
        <Text style={styles.applyBtnText}>Apply Now</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const GovtJobsBanner = () => (
  <View style={styles.govtBanner}>
    <View style={styles.govtBadge}>
      <Text style={styles.govtBadgeIcon}>🏛</Text>
      <Text style={styles.govtBadgeText}>Official Opportunities</Text>
    </View>
    <Text style={styles.govtTitle}>Government Jobs 2024</Text>
    <Text style={styles.govtDescription}>
      Access verified public sector careers with exclusive benefits and
      long-term security. Apply today through CareerSync.
    </Text>
    <TouchableOpacity style={styles.browsBtn} activeOpacity={0.85}>
      <Text style={styles.browsBtnText}>Browse Portal</Text>
    </TouchableOpacity>

    {/* Shield icon */}
    <View style={styles.shieldContainer}>
      <View style={styles.shieldIcon}>
        <Text style={styles.shieldText}>🛡</Text>
      </View>
    </View>
  </View>
);

const RecommendedCard = ({ item }: { item: (typeof RECOMMENDED_JOBS)[0] }) => (
  <TouchableOpacity style={styles.recommendCard} activeOpacity={0.8}>
    <View style={styles.recommendLeft}>
      <View style={styles.recommendLogo}>
        <Text style={styles.recommendLogoText}>
          {item.title.charAt(0)}
        </Text>
      </View>
      <View style={styles.recommendInfo}>
        <Text style={styles.recommendTitle}>{item.title}</Text>
        <Text style={styles.recommendCompany}>
          {item.company} • {item.location}
        </Text>
        <View style={styles.tagRow}>
          {item.tags.map((tag, idx) => (
            <View
              key={idx}
              style={[styles.tag, { backgroundColor: item.tagColors[idx] }]}>
              <Text style={[styles.tagText, { color: item.tagTextColors[idx] }]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    <TouchableOpacity style={styles.bookmarkBtn}>
      <Text style={styles.bookmarkIcon}>🔖</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const RecentPostingCard = ({
  item,
}: {
  item: (typeof RECENT_POSTINGS)[0];
}) => (
  <TouchableOpacity style={styles.recentCard} activeOpacity={0.8}>
    <View style={[styles.recentIcon, { backgroundColor: item.iconBg }]}>
      <Text style={styles.recentIconText}>{item.icon}</Text>
    </View>
    <View style={styles.recentInfo}>
      <Text style={styles.recentTitle}>{item.title}</Text>
      <Text style={styles.recentCompany}>
        {item.company} • {item.time}
      </Text>
    </View>
    <View style={styles.recentRight}>
      <Text style={styles.recentSalary}>{item.salary}</Text>
      <View style={[styles.recentType, { backgroundColor: item.typeColor }]}>
        <Text style={[styles.recentTypeText, { color: item.typeTextColor }]}>
          {item.type}
        </Text>
      </View>
    </View>
  </TouchableOpacity>
);

// ─── Main Screen ─────────────────────────────────────────────────────────────

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>

      <View style={styles.safeArea}>
        <CommonHeader />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>

          {/* Categories */}
          <SectionHeader title="Categories" actionLabel="View All" />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesRow}>
            {CATEGORIES.map(cat => (
              <CategoryChip key={cat.id} label={cat.label} icon={cat.icon} />
            ))}
          </ScrollView>

          {/* Featured Jobs */}
          <SectionHeader title="Featured Jobs" />
          <FlatList
            data={FEATURED_JOBS}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
            renderItem={({ item }) => <FeaturedCard item={item} />}
          />

          {/* Government Jobs Banner */}
          <GovtJobsBanner />

          {/* Recommended for You */}
          <SectionHeader title="Recommended for You" actionLabel="Customize" />
          {RECOMMENDED_JOBS.map(item => (
            <RecommendedCard key={item.id} item={item} />
          ))}

          {/* Recent Postings */}
          <SectionHeader title="Recent Postings" />
          {RECENT_POSTINGS.map(item => (
            <RecentPostingCard key={item.id} item={item} />
          ))}

          <View style={{ height: 32 }} />
        </ScrollView>
      </View>
    </SafeAreaView>

  );
};

export default Home;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
    margin: 0,
    padding: 0
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  // Search
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  searchPlaceholder: {
    flex: 1,
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.md,
    color: COLORS.textMuted,
  },
  filterBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIcon: {
    fontSize: 16,
    color: COLORS.secondary,
  },

  // Section Header
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.lg,
    color: '#1E293B',
  },
  sectionAction: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.secondary,
  },

  // Categories
  categoriesRow: {
    paddingBottom: 16,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryLabel: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.md,
    color: '#334155',
  },

  // Featured Jobs
  featuredList: {
    paddingBottom: 20,
    gap: 14,
  },
  featuredCard: {
    width: CARD_WIDTH,
    borderRadius: 20,
    padding: 18,
    minHeight: 200,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  featuredBadge: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  featuredBadgeText: {
    fontFamily: FONT_FAMILY.ISemiBold,
    fontSize: FONT_SIZE.xs,
    color: '#fff',
    letterSpacing: 0.4,
  },
  featuredLogo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  featuredLogoText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xl,
    color: '#fff',
  },
  featuredJobTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.lg,
    color: '#fff',
    lineHeight: 24,
    marginBottom: 4,
  },
  featuredCompany: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 14,
  },
  featuredBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  featuredSalary: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#fff',
  },
  applyBtn: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  applyBtnText: {
    fontFamily: FONT_FAMILY.ISemiBold,
    fontSize: FONT_SIZE.xs,
    color: '#fff',
  },

  // Government Jobs Banner
  govtBanner: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 22,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  govtBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(45,212,191,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.3)',
  },
  govtBadgeIcon: {
    fontSize: 14,
  },
  govtBadgeText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  govtTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xxl,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  govtDescription: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.md,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
  browsBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 13,
    paddingHorizontal: 32,
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  browsBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#fff',
  },
  shieldContainer: {
    alignItems: 'center',
    marginTop: 18,
  },
  shieldIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(45,212,191,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(45,212,191,0.25)',
  },
  shieldText: {
    fontSize: 26,
  },

  // Recommended
  recommendCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  recommendLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: 12,
  },
  recommendLogo: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recommendLogoText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.secondary,
  },
  recommendInfo: {
    flex: 1,
  },
  recommendTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
    marginBottom: 2,
  },
  recommendCompany: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginBottom: 8,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  tagText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 11,
  },
  bookmarkBtn: {
    padding: 4,
    marginLeft: 8,
  },
  bookmarkIcon: {
    fontSize: 18,
  },

  // Recent Postings
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: 12,
  },
  recentIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recentIconText: {
    fontSize: 18,
  },
  recentInfo: {
    flex: 1,
  },
  recentTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
    marginBottom: 2,
  },
  recentCompany: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  recentRight: {
    alignItems: 'flex-end',
    gap: 6,
  },
  recentSalary: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.sm,
    color: '#1E293B',
  },
  recentType: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  recentTypeText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 11,
  },
});
