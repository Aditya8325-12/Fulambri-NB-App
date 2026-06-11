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

// ─── Types ──────────────────────────────────────────────────────────────────
interface EducationFormData {
  institute: string;
  degree: string;
  startYear: string;
  endYear: string;
  boardUniversity: string;
  mediumOfStudy: string;
  percentage: string;
  passingYear: string;
  description: string;
  isCurrentlyStudying: boolean;
}

interface EditProps {
  EDIT?: boolean;
  ADD?: boolean;
}

// ─── Constants ───────────────────────────────────────────────────────────────
const EMPTY_FORM: EducationFormData = {
  institute: '',
  degree: '',
  startYear: '',
  endYear: '',
  boardUniversity: '',
  mediumOfStudy: '',
  percentage: '',
  passingYear: '',
  description: '',
  isCurrentlyStudying: false,
};

// ─── Year Input Field ─────────────────────────────────────────────────────────
interface YearFieldProps {
  label: string;
  required?: boolean;
  value: string;
  placeholder?: string;
  onChange: (val: string) => void;
}

const YearField = ({
  label,
  required,
  value,
  placeholder = 'YYYY',
  onChange,
}: YearFieldProps) => {
  return (
    <View style={styles.yearWrapper}>
      <Text style={styles.fieldLabel}>
        {label}
        {required && <Text style={styles.requiredStar}> *</Text>}
      </Text>
      <TextInput
        style={styles.yearInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray400}
        keyboardType="number-pad"
        maxLength={4}
        value={value}
        onChangeText={onChange}
      />
    </View>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const EditEducationSection = ({ EDIT, ADD }: EditProps) => {
  const navigation = useNavigation();
  const [form, setForm] = useState<EducationFormData>(EMPTY_FORM);

  const setField = <K extends keyof EducationFormData>(
    key: K,
    value: EducationFormData[K],
  ) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.institute.trim()) {
      Alert.alert('Validation', 'Institute name is required.');
      return;
    }
    if (!form.degree.trim()) {
      Alert.alert('Validation', 'Degree is required.');
      return;
    }
    if (!form.startYear.trim()) {
      Alert.alert('Validation', 'Start year is required.');
      return;
    }
    if (
      form.startYear.length !== 4 ||
      isNaN(Number(form.startYear))
    ) {
      Alert.alert('Validation', 'Please enter a valid 4-digit start year.');
      return;
    }
    if (
      form.endYear &&
      (form.endYear.length !== 4 || isNaN(Number(form.endYear)))
    ) {
      Alert.alert('Validation', 'Please enter a valid 4-digit end year.');
      return;
    }
    if (
      form.passingYear &&
      (form.passingYear.length !== 4 || isNaN(Number(form.passingYear)))
    ) {
      Alert.alert('Validation', 'Please enter a valid 4-digit passing year.');
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
        <Text style={styles.cardTitle}>Education Details</Text>

        {/* Institute */}
        <Input
          label="Institute"
          placeholder="e.g. Harvard University"
          height={38}
          required
          type="default"
          value={form.institute}
          onChange={v => setField('institute', v)}
        />

        {/* Degree */}
        <Input
          label="Degree"
          placeholder="e.g. Bachelor of Science"
          height={38}
          required
          type="default"
          value={form.degree}
          onChange={v => setField('degree', v)}
        />

        {/* Row: Start Year + End Year */}
        <View style={styles.row}>
          <View style={styles.halfCol}>
            <YearField
              label="Start Year"
              required
              value={form.startYear}
              onChange={v => setField('startYear', v)}
            />
          </View>
          <View style={styles.halfCol}>
            <YearField
              label="End Year"
              value={form.endYear}
              onChange={v => setField('endYear', v)}
            />
          </View>
        </View>

        {/* Currently Studying */}
        <TouchableOpacity
          style={styles.checkRow}
          activeOpacity={0.75}
          onPress={() =>
            setField('isCurrentlyStudying', !form.isCurrentlyStudying)
          }
        >
          <View
            style={[
              styles.checkbox,
              form.isCurrentlyStudying && styles.checkboxChecked,
            ]}
          >
            {form.isCurrentlyStudying && (
              <Ionicons name="checkmark" size={12} color="#fff" />
            )}
          </View>
          <Text style={styles.checkLabel}>I am currently studying here</Text>
        </TouchableOpacity>

        {/* Board / University */}
        <Input
          label="Board / University"
          placeholder="Enter board or university"
          height={38}
          type="default"
          value={form.boardUniversity}
          onChange={v => setField('boardUniversity', v)}
        />

        {/* Medium of Study */}
        <Input
          label="Medium of Study"
          placeholder="Enter medium"
          height={38}
          type="default"
          value={form.mediumOfStudy}
          onChange={v => setField('mediumOfStudy', v)}
        />

        {/* Row: Percentage + Passing Year */}
        <View style={styles.row}>
          <View style={styles.halfCol}>
            <YearField
              label="Percentage"
              placeholder="Enter percentage"
              value={form.percentage}
              onChange={v => setField('percentage', v)}
            />
          </View>
          <View style={styles.halfCol}>
            <YearField
              label="Passing Year"
              placeholder="Enter passing year"
              value={form.passingYear}
              onChange={v => setField('passingYear', v)}
            />
          </View>
        </View>

        {/* Description */}
        <View style={styles.textAreaWrapper}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Brief description about your education"
            placeholderTextColor={COLORS.gray400}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={form.description}
            onChangeText={v => setField('description', v)}
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
            label={isEdit ? 'Update Education' : 'Save Education'}
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

export default EditEducationSection;

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

  /* Year / plain text field */
  yearWrapper: {
    gap: 0,
  },
  yearInput: {
    height: 38,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IMedium,
  },

  /* Currently studying checkbox */
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
