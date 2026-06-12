import React, { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Input from '../../../../../components/common/Input';
import Button from '../../../../../components/common/Button';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';

// ─── Types ──────────────────────────────────────────────────────────────────

interface CompetitiveExamFormData {
  exam: string;
  rank: string;
  year: string;
}

interface EditProps {
  EDIT?: boolean;
  ADD?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EXAM_OPTIONS = [
  'JEE',
  'NEET',
  'GATE',
  'CAT',
  'UPSC',
  'MPSC',
  'Other',
];

const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) =>
  String(CURRENT_YEAR - i),
);

const EMPTY_FORM: CompetitiveExamFormData = {
  exam: '',
  rank: '',
  year: '',
};

// ─── Dropdown ────────────────────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  options: string[];
  value: string;
  onSelect: (val: string) => void;
}

const Dropdown = ({
  label,
  required,
  placeholder = 'Select',
  options,
  value,
  onSelect,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.dropdownTrigger}
        onPress={() => setOpen(true)}
      >
        <Text
          style={[
            styles.dropdownValue,
            !value && styles.dropdownPlaceholder,
          ]}
        >
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={16} color={COLORS.gray500} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.dropdownMenu}>
            <Text style={styles.dropdownMenuTitle}>SELECT {label.toUpperCase()}</Text>
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
              {options.map(opt => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.dropdownOption,
                    opt === value && styles.dropdownOptionSelected,
                  ]}
                  onPress={() => {
                    onSelect(opt);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      styles.dropdownOptionText,
                      opt === value && styles.dropdownOptionTextSelected,
                    ]}
                  >
                    {opt}
                  </Text>
                  {opt === value && (
                    <Ionicons
                      name="checkmark-circle"
                      size={18}
                      color={COLORS.primary}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const EditCompetitiveExamsSection = ({ EDIT, ADD }: EditProps) => {
  const navigation = useNavigation();
  const [form, setForm] = useState<CompetitiveExamFormData>(EMPTY_FORM);

  const setField = <K extends keyof CompetitiveExamFormData>(
    key: K,
    value: CompetitiveExamFormData[K],
  ) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.exam) {
      Alert.alert('Validation', 'Please select an exam.');
      return;
    }
    if (!form.rank.trim()) {
      Alert.alert('Validation', 'Rank is required.');
      return;
    }
    if (!form.year) {
      Alert.alert('Validation', 'Please select a year.');
      return;
    }
    // TODO: wire up to API / state
    navigation.goBack();
  };

  const isEdit = EDIT === true;

  return (
    <View style={styles.root}>
      {/* ── Form Card ───────────────────────────── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exam Details</Text>

        {/* Exam Dropdown */}
        <Dropdown
          label="Exam"
          required
          placeholder="Select Exam"
          options={EXAM_OPTIONS}
          value={form.exam}
          onSelect={v => setField('exam', v)}
        />

        {/* Rank */}
        <Input
          label="Rank"
          placeholder="e.g. 452"
          height={38}
          required
          type="default"
          value={form.rank}
          onChange={v => setField('rank', v)}
        />

        {/* Year Dropdown */}
        <Dropdown
          label="Year"
          required
          placeholder="Select Year"
          options={YEAR_OPTIONS}
          value={form.year}
          onSelect={v => setField('year', v)}
        />
      </View>

      {/* ── Save Button ─────────────────────────── */}
      <View style={styles.saveRow}>
        <Button
          variant="outline"
          label="Cancel"
          size="lg"
          width={120}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flex: 1 }}>
          <Button
            variant="gradient"
            label={isEdit ? 'Update Exam' : 'Save Exam'}
            size="lg"
            icon={<Icon name="check" size={18} color={COLORS.white} />}
            iconPosition="start"
            onPress={handleSave}
          />
        </View>
      </View>
    </View>
  );
};

export default EditCompetitiveExamsSection;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  /* Card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginVertical: 16,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.gray800,
    marginBottom: 2,
    letterSpacing: 0.2,
  },

  /* Field label */
  fieldLabel: {
    fontSize: 13,
    color: COLORS.textNormal,
    fontFamily: FONT_FAMILY.IMedium,
    marginBottom: 6,
  },
  requiredStar: {
    color: COLORS.danger,
    fontWeight: '700',
  },

  /* Dropdown */
  dropdownWrapper: {
    gap: 0,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 6,
    paddingHorizontal: 12,
  },
  dropdownValue: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IMedium,
  },
  dropdownPlaceholder: {
    color: COLORS.gray400,
  },

  /* Modal Dropdown */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  dropdownMenu: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 8,
    maxHeight: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 10,
  },
  dropdownMenuTitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.gray500,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    marginBottom: 4,
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 16,
  },
  dropdownOptionSelected: {
    backgroundColor: COLORS.cyan50,
  },
  dropdownOptionText: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray700,
    fontFamily: FONT_FAMILY.IMedium,
  },
  dropdownOptionTextSelected: {
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.ISemiBold,
  },

  /* Save Row */
  saveRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 2,
  },
});
