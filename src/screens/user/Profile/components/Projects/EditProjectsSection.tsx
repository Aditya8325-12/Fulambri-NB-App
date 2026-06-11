import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
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

// ─── Types ───────────────────────────────────────────────────────────────────
interface ProjectFormData {
  projectName: string;
  startDate: string;
  endDate: string;
  keySkills: string;
  projectUrl: string;
  description: string;
  isOngoing: boolean;
}

interface EditProps {
  EDIT?: boolean;
  ADD?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const EMPTY_FORM: ProjectFormData = {
  projectName: '',
  startDate: '',
  endDate: '',
  keySkills: '',
  projectUrl: '',
  description: '',
  isOngoing: false,
};

// ─── Date Input Field ─────────────────────────────────────────────────────────
interface DateFieldProps {
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

const DateField = ({
  label,
  required,
  value,
  placeholder = 'e.g. January 01, 2024',
  onChange,
}: DateFieldProps) => {
  return (
    <View style={styles.dateWrapper}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      <View style={styles.dateInputRow}>
        <TextInput
          style={styles.dateInput}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray400}
          value={value}
          onChangeText={onChange}
        />
        <Icon name="calendar-month-outline" size={18} color={COLORS.gray500} style={styles.calIcon} />
      </View>
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const EditProjectsSection = ({ EDIT, ADD }: EditProps) => {
  const navigation = useNavigation();
  const [form, setForm] = useState<ProjectFormData>(EMPTY_FORM);

  const setField = <K extends keyof ProjectFormData>(
    key: K,
    value: ProjectFormData[K],
  ) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.projectName.trim()) {
      Alert.alert('Validation', 'Project Name is required.');
      return;
    }
    if (!form.startDate.trim()) {
      Alert.alert('Validation', 'Start Date is required.');
      return;
    }
    if (!form.endDate.trim() && !form.isOngoing) {
      Alert.alert('Validation', 'End Date is required or mark as ongoing.');
      return;
    }
    // TODO: wire up to API / state
    navigation.goBack();
  };

  const isEdit = EDIT === true;

  return (
    <View style={styles.root}>
      {/* ── Form Card ───────────────────────────────────────────── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Project Details</Text>

        {/* Project Name */}
        <Input
          label="Project Name"
          placeholder="e.g. Job Portal Web Application"
          height={38}
          required
          type="default"
          value={form.projectName}
          onChange={v => setField('projectName', v)}
        />

        {/* Row: Start Date + End Date */}
        <View style={styles.row}>
          <View style={styles.halfCol}>
            <DateField
              label="Start Date"
              required
              value={form.startDate}
              placeholder="January 01, 2024"
              onChange={v => setField('startDate', v)}
            />
          </View>
          <View style={styles.halfCol}>
            <DateField
              label="End Date"
              required
              value={form.endDate}
              placeholder="June 30, 2024"
              onChange={v => setField('endDate', v)}
            />
          </View>
        </View>

        {/* Ongoing checkbox */}
        <TouchableOpacity
          style={styles.checkRow}
          activeOpacity={0.75}
          onPress={() => setField('isOngoing', !form.isOngoing)}
        >
          <View
            style={[
              styles.checkbox,
              form.isOngoing && styles.checkboxChecked,
            ]}
          >
            {form.isOngoing && (
              <Ionicons name="checkmark" size={12} color="#fff" />
            )}
          </View>
          <Text style={styles.checkLabel}>This is an ongoing project</Text>
        </TouchableOpacity>

        {/* Key Skills */}
        <Input
          label="Key Skills"
          placeholder="e.g. React, Next.js, Node.js, PostgreSQL, Prisma"
          height={38}
          type="default"
          value={form.keySkills}
          onChange={v => setField('keySkills', v)}
        />

        {/* Project URL */}
        <Input
          label="Project URL"
          placeholder="https://github.com/username/project"
          height={38}
          type="default"
          value={form.projectUrl}
          onChange={v => setField('projectUrl', v)}
        />

        {/* Description */}
        <View style={styles.textAreaWrapper}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="A brief description about this project"
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={form.description}
            onChangeText={v => setField('description', v)}
          />
        </View>
      </View>

      {/* ── Save Button ──────────────────────────────────────────── */}
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
            label={isEdit ? 'Update Project' : 'Save Project'}
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

export default EditProjectsSection;

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

  /* Row layout */
  row: {
    flexDirection: 'row',
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

  /* Date field */
  dateWrapper: {
    gap: 0,
  },
  dateInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 6,
    height: 38,
    paddingHorizontal: 10,
  },
  dateInput: {
    flex: 1,
    fontSize: 12,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IMedium,
    padding: 0,
  },
  calIcon: {
    marginLeft: 4,
  },

  /* Ongoing checkbox */
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
