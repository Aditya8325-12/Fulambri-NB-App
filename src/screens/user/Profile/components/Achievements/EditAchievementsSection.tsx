import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import Input from '../../../../../components/common/Input';
import Button from '../../../../../components/common/Button';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';

// ─── Types ───────────────────────────────────────────────────────────────────
interface AchievementFormData {
  title: string;
  description: string;
}

interface EditProps {
  EDIT?: boolean;
  ADD?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const EMPTY_FORM: AchievementFormData = {
  title: '',
  description: '',
};

// ─── Main Component ───────────────────────────────────────────────────────────
const EditAchievementsSection = ({ EDIT, ADD }: EditProps) => {
  const navigation = useNavigation();
  const [form, setForm] = useState<AchievementFormData>(EMPTY_FORM);

  const setField = <K extends keyof AchievementFormData>(
    key: K,
    value: AchievementFormData[K],
  ) => setForm(prev => ({ ...prev, [key]: value }));

  const handleSave = () => {
    if (!form.title.trim()) {
      Alert.alert('Validation', 'Achievement Name is required.');
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
        <Text style={styles.cardTitle}>Achievement Details</Text>

        {/* Achievement Name */}
        <Input
          label="Achievement Name"
          placeholder="e.g. Hackathon Winner 2023"
          height={38}
          required
          type="default"
          value={form.title}
          onChange={v => setField('title', v)}
        />

        {/* Description */}
        <View style={styles.textAreaWrapper}>
          <Text style={styles.fieldLabel}>Description</Text>
          <TextInput
            style={styles.textArea}
            placeholder="A brief description about this achievement"
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
            label={isEdit ? 'Update Achievement' : 'Save Achievement'}
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

export default EditAchievementsSection;

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
