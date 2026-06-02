import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { SectionHeader } from './SectionHeader';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';

const CATEGORIES = [
  { id: '1', label: 'IT', icon: '💻' },
  { id: '2', label: 'Finance', icon: '💰' },
  { id: '3', label: 'Health', icon: '🏥' },
  { id: '4', label: 'Marketing', icon: '📊' },
];

const CategoryChip = ({ label, icon }: { label: string; icon: string }) => (
  <TouchableOpacity style={styles.categoryChip} activeOpacity={0.75}>
    <Text style={styles.categoryIcon}>{icon}</Text>
    <Text style={styles.categoryLabel}>{label}</Text>
  </TouchableOpacity>
);

const Categories = () => {
  return (
    <View>
      <SectionHeader title="Categories" actionLabel="View All" />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
      >
        {CATEGORIES.map(cat => (
          <CategoryChip key={cat.id} label={cat.label} icon={cat.icon} />
        ))}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  categoriesRow: {
    paddingBottom: 16,
    gap: 10,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 0.5,
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
});
