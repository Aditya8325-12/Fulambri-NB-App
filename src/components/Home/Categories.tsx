import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import CategoryModal from '../modals/CategoryModal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

import type { RootStackParamList } from '../../types/Navigation';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
const CATEGORIES = [
  { id: '1', label: 'IT', icon: 'laptop' },
  { id: '2', label: 'Finance', icon: 'cash-multiple' },
  { id: '3', label: 'Health', icon: 'hospital-box' },
  { id: '4', label: 'Marketing', icon: 'bullhorn' },
  { id: '5', label: 'Education', icon: 'school' },
  { id: '6', label: 'Engineering', icon: 'cog-outline' },
  { id: '7', label: 'Sales', icon: 'handshake' },
  { id: '8', label: 'HR', icon: 'account-group' },
  { id: '9', label: 'Design', icon: 'palette' },
  { id: '10', label: 'Legal', icon: 'scale-balance' },
  { id: '11', label: 'Retail', icon: 'store' },
  { id: '12', label: 'Logistics', icon: 'truck-delivery' },
  { id: '13', label: 'Hospitality', icon: 'silverware-fork-knife' },
  { id: '14', label: 'Construction', icon: 'hammer-wrench' },
  { id: '15', label: 'Government', icon: 'office-building' },
];

type JobsScreenNavgationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const CategoryChip = ({ label, icon }: { label: string; icon: string }) => {
  const navigation = useNavigation<JobsScreenNavgationProp>();

  return (
    <TouchableOpacity
      style={styles.categoryChip}
      activeOpacity={0.75}
      onPress={() => {
        Toast.show({
          type: 'success',
          text1: 'test',
          text2: label,
        });
        navigation.navigate('Jobs', {
          keyword: label,
        });
      }}
    >
      <Icon name={icon} size={16} color={COLORS.primary} />
      <Text style={styles.categoryLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const Categories = () => {
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleViewAll = () => {
    setShowCategoryModal(true);
  };

  return (
    <View>
      <SectionHeader
        title="Categories"
        actionLabel="View All"
        onPress={handleViewAll}
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesRow}
      >
        {CATEGORIES.map(cat => (
          <CategoryChip key={cat.id} label={cat.label} icon={cat.icon} />
        ))}
      </ScrollView>

      <CategoryModal
        visible={showCategoryModal}
        onClose={() => setShowCategoryModal(false)}
      />
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
  categoryLabel: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 14,
    color: '#334155',
  },
});
