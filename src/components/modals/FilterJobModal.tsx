import React, { useState, useRef, useEffect } from 'react';
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
import Button from '../common/Button';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MODAL_HEIGHT = SCREEN_HEIGHT * 0.82;

// ─── Types ────────────────────────────────────────────────────────────────────
export interface FilterState {
  experience: string[];
  salary: string[];
  location: string[];
  companyType: string[];
  workMode: string[];
}

interface FilterJobModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
  initialFilters?: FilterState;
}

// ─── Filter Data ──────────────────────────────────────────────────────────────
const EXPERIENCE_OPTIONS = [
  'Fresher / Any',
  '1-3 Years',
  '3-6 Years',
  '6-10 Years',
  '10+ Years',
];

const SALARY_OPTIONS = [
  '0-3 Lakhs',
  '3-6 Lakhs',
  '6-10 Lakhs',
  '10-15 Lakhs',
  '15+ Lakhs',
];

const LOCATION_OPTIONS = [
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Delhi / NCR',
  'Mumbai',
  'Chennai',
];

const COMPANY_TYPE_OPTIONS = [
  'Foreign MNC',
  'Indian MNC',
  'Corporate',
  'Startup',
  'Government',
];

const WORK_MODE_OPTIONS = ['Work from office', 'Hybrid', 'Remote'];

const DEFAULT_FILTERS: FilterState = {
  experience: [],
  salary: [],
  location: [],
  companyType: [],
  workMode: [],
};

// ─── CheckboxItem ─────────────────────────────────────────────────────────────
const CheckboxItem = ({
  label,
  selected,
  onToggle,
}: {
  label: string;
  selected: boolean;
  onToggle: () => void;
}) => (
  <TouchableOpacity
    style={styles.checkboxRow}
    onPress={onToggle}
    activeOpacity={0.7}
  >
    <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
      {selected && <Icon name="check" size={12} color={COLORS.white} />}
    </View>
    <Text
      style={[styles.checkboxLabel, selected && styles.checkboxLabelSelected]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

// ─── FilterSection ────────────────────────────────────────────────────────────
const FilterSection = ({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={() => setExpanded(prev => !prev)}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Icon
          name={expanded ? 'chevron-up' : 'chevron-down'}
          size={18}
          color={COLORS.gray500}
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.sectionContent}>
          {options.map(opt => (
            <CheckboxItem
              key={opt}
              label={opt}
              selected={selected.includes(opt)}
              onToggle={() => onToggle(opt)}
            />
          ))}
        </View>
      )}

      <View style={styles.divider} />
    </View>
  );
};

// ─── FilterJobModal ───────────────────────────────────────────────────────────
const FilterJobModal = ({
  visible,
  onClose,
  onApply,
  initialFilters = DEFAULT_FILTERS,
}: FilterJobModalProps) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const translateY = useRef(new Animated.Value(MODAL_HEIGHT)).current;

  const totalApplied = Object.values(filters).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  useEffect(() => {
    if (visible) {
      setFilters(initialFilters);
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

  const toggleFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const handleReset = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

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
        {/* Handle bar */}
        <View style={styles.handleBar} />

        {/* Sheet Header */}
        <View style={styles.sheetHeader}>
          <View style={styles.sheetTitleRow}>
            <Icon name="tune-variant" size={20} color={COLORS.primary} />
            <Text style={styles.sheetTitle}>All Filters</Text>
            {totalApplied > 0 && (
              <View style={styles.appliedBadge}>
                <Text style={styles.appliedBadgeText}>
                  Applied ({totalApplied})
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Icon name="close" size={20} color={COLORS.gray500} />
          </TouchableOpacity>
        </View>

        {/* Filter Content */}
        <ScrollView
          style={styles.scrollArea}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <FilterSection
            title="Experience"
            options={EXPERIENCE_OPTIONS}
            selected={filters.experience}
            onToggle={v => toggleFilter('experience', v)}
          />
          <FilterSection
            title="Salary"
            options={SALARY_OPTIONS}
            selected={filters.salary}
            onToggle={v => toggleFilter('salary', v)}
          />
          <FilterSection
            title="Location"
            options={LOCATION_OPTIONS}
            selected={filters.location}
            onToggle={v => toggleFilter('location', v)}
          />
          <FilterSection
            title="Company Type"
            options={COMPANY_TYPE_OPTIONS}
            selected={filters.companyType}
            onToggle={v => toggleFilter('companyType', v)}
          />
          <FilterSection
            title="Work Mode"
            options={WORK_MODE_OPTIONS}
            selected={filters.workMode}
            onToggle={v => toggleFilter('workMode', v)}
          />
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.clearAllBtn}
            onPress={handleReset}
            activeOpacity={0.7}
          >
            <Text style={styles.clearAllText}>Reset</Text>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Button
              variant="gradient"
              label={`Apply Filters ${
                totalApplied > 0 ? `(${totalApplied})` : ''
              }`}
              size="lg"
              onPress={handleApply}
            />
          </View>
        </View>
      </Animated.View>
    </Modal>
  );
};

export default FilterJobModal;

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
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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
    gap: 8,
  },
  sheetTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray800,
  },
  appliedBadge: {
    backgroundColor: COLORS.miniPrimary,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  appliedBadgeText: {
    fontFamily: FONT_FAMILY.ISemiBold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.primary,
  },
  closeBtn: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
  },

  // Scroll
  scrollArea: {
    flex: 1,
    paddingHorizontal: 20,
  },

  // Section
  section: {
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.base,
    color: COLORS.gray800,
  },
  sectionContent: {
    gap: 10,
    marginBottom: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginTop: 16,
  },

  // Checkbox
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  checkboxSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkboxLabel: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray600,
  },
  checkboxLabelSelected: {
    fontFamily: FONT_FAMILY.ISemiBold,
    color: COLORS.primary,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  resetBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 13,
    backgroundColor: COLORS.backgroundSecondary,
  },
  resetBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.secondary,
  },
  applyBtn: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: COLORS.secondary,
    borderRadius: 12,
    paddingVertical: 13,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  applyBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.white,
  },

  clearAllBtn: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  clearAllText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
});
