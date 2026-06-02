import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import COLORS from '../../constants/colors';
import { SectionHeader } from './SectionHeader';
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

const RecommendedCard = ({ item }: { item: (typeof RECOMMENDED_JOBS)[0] }) => (
  <TouchableOpacity style={styles.recommendCard} activeOpacity={0.8}>
    <View style={styles.recommendLeft}>
      <View style={styles.recommendLogo}>
        <Text style={styles.recommendLogoText}>{item.title.charAt(0)}</Text>
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
              style={[styles.tag, { backgroundColor: item.tagColors[idx] }]}
            >
              <Text
                style={[styles.tagText, { color: item.tagTextColors[idx] }]}
              >
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
    <TouchableOpacity style={styles.bookmarkBtn}>
      <Text style={styles.bookmarkIcon}>Apply</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const RecommendedJobs = () => {
  return (
    <View>
      <SectionHeader title="Recommended for You" actionLabel="Customize" />
      {RECOMMENDED_JOBS.map(item => (
        <RecommendedCard key={item.id} item={item} />
      ))}
    </View>
  );
};

export default RecommendedJobs;

const styles = StyleSheet.create({
  recommendCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: COLORS.card,
    borderRadius: 8,
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
    borderRadius: 6,
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
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#EFF6FF',
  },
  bookmarkIcon: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.PMedium,
    color: COLORS.secondary,
  },
});
