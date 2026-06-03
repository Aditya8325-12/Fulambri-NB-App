import React, { useRef, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.88;

// ─── Category Data ────────────────────────────────────────────────────────────
interface CategoryGroup {
  id: string;
  title: string;
  icon: string;
  color: string;
  bgColor: string;
  roles: string[];
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'it',
    title: 'Information Technology (IT) & Software',
    icon: 'laptop',
    color: '#2563EB',
    bgColor: '#EFF6FF',
    roles: [
      'Frontend Developer',
      'Backend Developer',
      'Full Stack Developer',
      'Mobile App Developer',
      'QA Engineer',
    ],
  },
  {
    id: 'engineering',
    title: 'Engineering',
    icon: 'cog-outline',
    color: '#7C3AED',
    bgColor: '#F5F3FF',
    roles: [
      'Mechanical Engineer',
      'Electrical Engineer',
      'Civil Engineer',
      'Production Engineer',
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medical',
    icon: 'hospital-box-outline',
    color: '#059669',
    bgColor: '#ECFDF5',
    roles: ['Doctor', 'Nurse', 'Pharmacist', 'Lab Technician'],
  },
  {
    id: 'education',
    title: 'Education & Training',
    icon: 'school-outline',
    color: '#D97706',
    bgColor: '#FFFBEB',
    roles: ['Teacher', 'Lecturer', 'Trainer', 'Professor'],
  },
  {
    id: 'sales',
    title: 'Sales & Business Development',
    icon: 'chart-line',
    color: '#DC2626',
    bgColor: '#FEF2F2',
    roles: [
      'Sales Executive',
      'Business Development Manager',
      'Territory Sales Officer',
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing & Advertising',
    icon: 'bullhorn-outline',
    color: '#DB2777',
    bgColor: '#FDF2F8',
    roles: [
      'Digital Marketing',
      'SEO Specialist',
      'Social Media Manager',
      'Content Marketing',
    ],
  },
  {
    id: 'finance',
    title: 'Finance & Accounting',
    icon: 'cash-multiple',
    color: '#0891B2',
    bgColor: '#ECFEFF',
    roles: ['Accountant', 'Financial Analyst', 'Auditor', 'Tax Consultant'],
  },
  {
    id: 'hr',
    title: 'Human Resources (HR)',
    icon: 'account-group-outline',
    color: '#9333EA',
    bgColor: '#FAF5FF',
    roles: ['HR Executive', 'Recruiter', 'Talent Acquisition'],
  },
  {
    id: 'customer',
    title: 'Customer Support & BPO',
    icon: 'headset',
    color: '#16A34A',
    bgColor: '#F0FDF4',
    roles: [
      'Customer Care Executive',
      'Technical Support',
      'Call Center Agent',
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Production',
    icon: 'factory',
    color: '#EA580C',
    bgColor: '#FFF7ED',
    roles: ['Machine Operator', 'Production Supervisor', 'Quality Inspector'],
  },
  {
    id: 'logistics',
    title: 'Logistics & Supply Chain',
    icon: 'truck-outline',
    color: '#65A30D',
    bgColor: '#F7FEE7',
    roles: [
      'Warehouse Executive',
      'Procurement Officer',
      'Supply Chain Manager',
    ],
  },
];

// ─── Props ────────────────────────────────────────────────────────────────────
interface CategoryModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectRole?: (role: string, category: string) => void;
}

// ─── CategoryGroupCard ────────────────────────────────────────────────────────
const CategoryGroupCard = ({
  group,
  onSelectRole,
}: {
  group: CategoryGroup;
  onSelectRole?: (role: string, category: string) => void;
}) => (
  <View style={styles.groupCard}>
    {/* Group Header */}
    <View style={styles.groupHeader}>
      <View style={styles.groupIconWrap}>
        <Icon name={group.icon} size={20} color={group.color} />
      </View>
      <Text style={styles.groupTitle}>{group.title}</Text>
    </View>

    {/* Role Chips */}
    <View style={styles.rolesWrap}>
      {group.roles.map(role => (
        <TouchableOpacity
          key={role}
          style={[styles.roleChip, { borderColor: group.color + '30' }]}
          activeOpacity={0.75}
          onPress={() => onSelectRole?.(role, group.title)}
        >
          <Text style={[styles.roleText]}>{role}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </View>
);

// ─── CategoryModal ────────────────────────────────────────────────────────────
const CategoryModal = ({
  visible,
  onClose,
  onSelectRole,
}: CategoryModalProps) => {
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  useEffect(() => {
    if (visible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 65,
        friction: 11,
      }).start();
    } else {
      Animated.timing(translateY, {
        toValue: MODAL_HEIGHT,
        duration: 260,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet */}
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        {/* Handle Bar */}
        <View style={styles.handleBar} />

        {/* Sheet Header */}
        <View style={styles.sheetHeader}>
          <View style={styles.sheetTitleRow}>
            <Icon name="layers-outline" size={24} color={COLORS.primary} />
            <Text style={styles.sheetTitle}>All Categories</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={18} color={COLORS.gray500} />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContent}
        >
          {CATEGORY_GROUPS.map(group => (
            <CategoryGroupCard
              key={group.id}
              group={group}
              onSelectRole={onSelectRole}
            />
          ))}
          <View style={{ height: 30 }} />
        </ScrollView>
      </Animated.View>
    </Modal>
  );
};

export default CategoryModal;

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
  },
  sheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: MODAL_HEIGHT,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 24,
  },

  // Handle
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray300,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 4,
  },

  // Header
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  sheetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: COLORS.miniPrimary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray800,
  },
  sheetSubtitle: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    marginTop: 1,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Scroll
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  // Group Card
  groupCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  groupIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  groupTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray800,
    flex: 1,
    lineHeight: 18,
  },

  // Role Chips
  rolesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  roleChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: COLORS.background,
  },
  roleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  roleText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.xs,
  },
});
