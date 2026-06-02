import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import { SectionHeader } from './SectionHeader';

const CARD_WIDTH = Dimensions.get('window').width * 0.62;

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

const FeaturedCard = ({ item }: { item: (typeof FEATURED_JOBS)[0] }) => (
  <TouchableOpacity
    activeOpacity={0.9}
    style={[styles.featuredCard, { backgroundColor: item.color }]}
  >
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

const FeaturedJobs = () => {
  return (
    <View>
      <SectionHeader title="Featured Jobs" />
      <FlatList
        data={FEATURED_JOBS}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.featuredList}
        renderItem={({ item }) => <FeaturedCard item={item} />}
      />
    </View>
  );
};

export default FeaturedJobs;

const styles = StyleSheet.create({
  featuredList: {
    paddingBottom: 20,
    gap: 14,
  },
  featuredCard: {
    width: CARD_WIDTH,
    borderRadius: 12,
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
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 16,
    right: 16,
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
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
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
    borderRadius: 6,
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
});
