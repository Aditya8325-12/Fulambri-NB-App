import React, { useState } from 'react';
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DateTimePicker, {
  type DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import Input from '../../../../../components/common/Input';
import Button from '../../../../../components/common/Button';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';

// ─── Types ──────────────────────────────────────────────────────────────────

interface ExperienceFormData {
  company: string;
  role: string;
  employmentType: string;
  from: Date | null;
  to: Date | null;
  isCurrent: boolean;
  technologies: string;
  projectUrl: string;
  description: string;
  responsibilities: string;
}

interface EditProps {
  EDIT?: boolean;
  ADD?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────

const EMPLOYMENT_TYPES = [
  'Full-time',
  'Part-time',
  'Internship',
  'Freelance',
  'Contract',
  'Self-employed',
];

const EMPTY_FORM: ExperienceFormData = {
  company: '',
  role: '',
  employmentType: 'Full-time',
  from: null,
  to: null,
  isCurrent: false,
  technologies: '',
  projectUrl: '',
  description: '',
  responsibilities: '',
};

// ─── Helper ──────────────────────────────────────────────────────────────────

const formatDate = (date: Date | null) => {
  if (!date) return '';
  return `${String(date.getDate()).padStart(2, '0')} / ${String(
    date.getMonth() + 1,
  ).padStart(2, '0')} / ${date.getFullYear()}`;
};

// ─── Date Field ──────────────────────────────────────────────────────────────

interface DateFieldProps {
  label: string;
  required?: boolean;
  value: Date | null;
  onChange: (date: Date | null) => void;
  maximumDate?: Date;
  minimumDate?: Date;
}

const DateField = ({
  label,
  required,
  value,
  onChange,
  maximumDate,
  minimumDate,
}: DateFieldProps) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleChange = (_event: DateTimePickerEvent, selected?: Date) => {
    if (Platform.OS === 'android') {
      setShowPicker(false);
    }
    if (selected) {
      onChange(selected);
    }
  };

  return (
    <View style={styles.dateWrapper}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.dateField}
        onPress={() => setShowPicker(true)}
      >
        <Ionicons
          name="calendar-outline"
          size={16}
          color={COLORS.gray500}
          style={styles.dateIcon}
        />
        <Text style={[styles.dateValue, !value && styles.datePlaceholder]}>
          {formatDate(value) || 'Select date'}
        </Text>
        <Ionicons name="chevron-down" size={14} color={COLORS.gray400} />
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ?? new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          onChange={handleChange}
        />
      )}
      {showPicker && Platform.OS === 'ios' && (
        <TouchableOpacity
          style={styles.dateConfirmBtn}
          onPress={() => setShowPicker(false)}
        >
          <Text style={styles.dateConfirmText}>Done</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ─── Employment Type Dropdown ─────────────────────────────────────────────────

interface DropdownProps {
  label: string;
  options: string[];
  value: string;
  onSelect: (val: string) => void;
}

const Dropdown = ({ label, options, value, onSelect }: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.dropdownWrapper}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.dropdownTrigger}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.dropdownValue}>{value}</Text>
        <Ionicons name="chevron-down" size={16} color={COLORS.gray500} />
      </TouchableOpacity>

      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View style={styles.dropdownMenu}>
            <Text style={styles.dropdownMenuTitle}>{label}</Text>
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
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const EditExperienceSection = ({ EDIT, ADD }: EditProps) => {
  const navigation = useNavigation();
  const [form, setForm] = useState<ExperienceFormData>(EMPTY_FORM);

  const setField = <K extends keyof ExperienceFormData>(
    key: K,
    value: ExperienceFormData[K],
  ) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.company.trim()) {
      Alert.alert('Validation', 'Company Name is required.');
      return;
    }
    if (!form.role.trim()) {
      Alert.alert('Validation', 'Role is required.');
      return;
    }
    if (!form.from) {
      Alert.alert('Validation', 'From date is required.');
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
        <Text style={styles.cardTitle}>Work Details</Text>

        {/* Row: Company + Role */}
        <View style={styles.col}>
          <Input
            label="Company Name"
            placeholder="Enter the company name"
            height={38}
            required
            type="default"
            value={form.company}
            onChange={v => setField('company', v)}
          />

          <Input
            label="Role"
            placeholder="e.g. Frontend Developer"
            height={38}
            required
            type="default"
            value={form.role}
            onChange={v => setField('role', v)}
          />
        </View>

        {/* Employment Type */}
        <Dropdown
          label="Employment Type"
          options={EMPLOYMENT_TYPES}
          value={form.employmentType}
          onSelect={v => setField('employmentType', v)}
        />

        {/* Row: From + To */}
        <View style={styles.row}>
          <View style={styles.halfCol}>
            <DateField
              label="From"
              required
              value={form.from}
              onChange={d => setField('from', d)}
              maximumDate={form.to ?? new Date()}
            />
          </View>
          <View style={styles.halfCol}>
            <DateField
              label="To"
              value={form.isCurrent ? null : form.to}
              onChange={d => setField('to', d)}
              minimumDate={form.from ?? undefined}
              maximumDate={new Date()}
            />
          </View>
        </View>

        {/* Currently working here */}
        <TouchableOpacity
          style={styles.checkRow}
          activeOpacity={0.75}
          onPress={() => setField('isCurrent', !form.isCurrent)}
        >
          <View
            style={[styles.checkbox, form.isCurrent && styles.checkboxChecked]}
          >
            {form.isCurrent && (
              <Ionicons name="checkmark" size={12} color="#fff" />
            )}
          </View>
          <Text style={styles.checkLabel}>I currently work here</Text>
        </TouchableOpacity>

        {/* Row: Technologies + Project URL */}
        <View style={styles.col}>
          <Input
            label="Technologies Used"
            placeholder="React, Node.js, MongoDB"
            height={38}
            type="default"
            value={form.technologies}
            onChange={v => setField('technologies', v)}
          />
          <Input
            label="Project URL"
            placeholder="https://example.com"
            height={38}
            type="url"
            value={form.projectUrl}
            onChange={v => setField('projectUrl', v)}
            icon={
              <Ionicons name="link-outline" size={16} color={COLORS.gray500} />
            }
          />
        </View>

        {/* Description */}
        <View style={styles.textAreaWrapper}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Brief description of your project/work"
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={form.description}
            onChangeText={v => setField('description', v)}
          />
        </View>

        {/* Responsibilities */}
        <View style={styles.textAreaWrapper}>
          <Text style={styles.fieldLabel}>Responsibilities</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Describe your responsibilities"
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={form.responsibilities}
            onChangeText={v => setField('responsibilities', v)}
          />
        </View>
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
            label={isEdit ? 'Update Experience' : 'Save Experience'}
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

export default EditExperienceSection;

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  /* Hero Banner */
  heroBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 4,
    shadowColor: '#0891B2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 10,
    elevation: 5,
  },
  heroIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 16,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: '#fff',
    marginBottom: 2,
  },
  heroSub: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.IRegular,
    color: 'rgba(255,255,255,0.82)',
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

  /* Row layout */
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  col: {
    flexDirection: 'column',
    gap: 12,
  },
  halfCol: {
    flex: 1,
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

  /* Date Field */
  dateWrapper: {
    gap: 0,
  },
  dateField: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 38,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 6,
    paddingHorizontal: 10,
  },
  dateIcon: {
    marginRight: 6,
  },
  dateValue: {
    flex: 1,
    fontSize: 13,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IMedium,
  },
  datePlaceholder: {
    color: COLORS.gray400,
    fontFamily: FONT_FAMILY.IMedium,
  },
  dateConfirmBtn: {
    alignSelf: 'flex-end',
    marginTop: 4,
    paddingHorizontal: 14,
    paddingVertical: 5,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
  },
  dateConfirmText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: FONT_FAMILY.IBold,
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

  /* Currently working checkbox */
  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: -4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: COLORS.gray300,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  checkLabel: {
    fontSize: 13,
    color: COLORS.gray600,
    fontFamily: FONT_FAMILY.IMedium,
  },

  /* TextArea */
  textAreaWrapper: {
    gap: 0,
  },
  textArea: {
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 13,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IRegular,
    minHeight: 96,
    lineHeight: 20,
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
