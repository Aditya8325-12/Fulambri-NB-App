import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import COLORS from '../../constants/colors';
import { SectionHeader } from './SectionHeader';

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

const RecentPostingCard = ({ item }: { item: (typeof RECENT_POSTINGS)[0] }) => (
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

const RecentJobs = () => {
  return (
    <View>
      <SectionHeader title="Recent Postings" />
      {RECENT_POSTINGS.map(item => (
        <RecentPostingCard key={item.id} item={item} />
      ))}
    </View>
  );
};

export default RecentJobs;

const styles = StyleSheet.create({
  recentCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    gap: 12,
  },
  recentIcon: {
    width: 44,
    height: 44,
    borderRadius: 8,
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
