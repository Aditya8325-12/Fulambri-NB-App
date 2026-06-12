import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Application } from '../types/Applications';

const StatsStrip = ({ apps }: { apps: Application[] }) => {
  const total = apps.length;
  const interviews = apps.filter(
    a => a.status === 'Interview Scheduled',
  ).length;
  const offers = apps.filter(a => a.status === 'Offer Received').length;

  return (
    <View style={styles.statsRow}>
      {[
        {
          label: 'Applied',
          value: String(total),
          icon: 'send',
          color: '#0891B2',
        },
        {
          label: 'Interviews',
          value: String(interviews),
          icon: 'calendar-check',
          color: '#7C3AED',
        },
        {
          label: 'Offers',
          value: String(offers),
          icon: 'gift',
          color: '#059669',
        },
      ].map((s, i) => (
        <View key={i} style={styles.statCard}>
          <View style={[styles.statIcon, { backgroundColor: s.color + '18' }]}>
            <Icon name={s.icon} size={16} color={s.color} />
          </View>
          <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
          <Text style={styles.statLabel}>{s.label}</Text>
        </View>
      ))}
    </View>
  );
};

export default StatsStrip;

const styles = StyleSheet.create({
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
    gap: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  statValue: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xl,
    lineHeight: 26,
  },
  statLabel: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
    letterSpacing: 0.2,
  },
});
