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

import Button from '../../../../../components/common/Button';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LanguageEntry {
  label: string;
  proficiency: string[];
}

interface EditProps {
  /** Pass EDIT=true + initialLanguage to edit a single existing language */
  EDIT?: boolean;
  /** Pass ADD=true to add a brand-new language */
  ADD?: boolean;
  /** The single language to edit (used only in EDIT mode) */
  initialLanguage?: LanguageEntry;
  /** All existing languages (used in ADD mode to prevent duplicates) */
  existingLanguages?: LanguageEntry[];
  /** Called with the new / updated language entry on save */
  onSave?: (entry: LanguageEntry) => void;
}

const PROFICIENCY_OPTIONS = ['Read', 'Write', 'Speak'];

const SUGGESTED_LANGUAGES = [
  'English',
  'Hindi',
  'Marathi',
  'Tamil',
  'Telugu',
  'Kannada',
  'Bengali',
  'Gujarati',
];

// ─── Proficiency Toggle Row ───────────────────────────────────────────────────

const ProficiencyRow: React.FC<{
  proficiency: string[];
  onToggle: (prof: string) => void;
}> = ({ proficiency, onToggle }) => (
  <View style={styles.proficiencyRow}>
    {PROFICIENCY_OPTIONS.map(opt => {
      const active = proficiency.includes(opt);
      return (
        <TouchableOpacity
          key={opt}
          activeOpacity={0.75}
          style={[styles.profChip, active && styles.profChipActive]}
          onPress={() => onToggle(opt)}
        >
          {active && (
            <Ionicons name="checkmark" size={11} color={COLORS.primary} />
          )}
          <Text
            style={[styles.profChipText, active && styles.profChipTextActive]}
          >
            {opt}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const EditLanguagesSection = ({
  EDIT,
  ADD,
  initialLanguage,
  existingLanguages = [],
  onSave,
}: EditProps) => {
  const navigation = useNavigation();

  // ── ADD mode state ──────────────────────────────────────────────────────
  const [inputValue, setInputValue] = useState('');
  const [newProficiency, setNewProficiency] = useState<string[]>([
    'Read',
    'Write',
    'Speak',
  ]);
  const [pendingLanguage, setPendingLanguage] = useState<string>('');

  // ── EDIT mode state ─────────────────────────────────────────────────────
  const [editProficiency, setEditProficiency] = useState<string[]>(
    initialLanguage?.proficiency ?? ['Read', 'Write', 'Speak'],
  );

  // ── Helpers ──────────────────────────────────────────────────────────────

  /** ADD mode: pick a language name and show its proficiency selector */
  const pickLanguage = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const alreadyExists = existingLanguages
      .map(l => l.label.toLowerCase())
      .includes(trimmed.toLowerCase());
    if (alreadyExists) {
      Alert.alert('Duplicate', `"${trimmed}" is already in your list.`);
      return;
    }
    setPendingLanguage(trimmed);
    setInputValue('');
  };

  const toggleNewProficiency = (prof: string) => {
    setNewProficiency(prev =>
      prev.includes(prof) ? prev.filter(p => p !== prof) : [...prev, prof],
    );
  };

  /** EDIT mode: toggle proficiency for the existing language */
  const toggleEditProficiency = (prof: string) => {
    setEditProficiency(prev =>
      prev.includes(prof) ? prev.filter(p => p !== prof) : [...prev, prof],
    );
  };

  // ── Save handlers ─────────────────────────────────────────────────────────

  const handleAddSave = () => {
    if (!pendingLanguage) {
      Alert.alert('Validation', 'Please select a language first.');
      return;
    }
    if (newProficiency.length === 0) {
      Alert.alert('Validation', 'Please select at least one proficiency.');
      return;
    }
    onSave?.({ label: pendingLanguage, proficiency: newProficiency });
    navigation.goBack();
  };

  const handleEditSave = () => {
    if (!initialLanguage) return;
    if (editProficiency.length === 0) {
      Alert.alert('Validation', 'Please select at least one proficiency.');
      return;
    }
    onSave?.({ label: initialLanguage.label, proficiency: editProficiency });
    navigation.goBack();
  };

  // ── Suggestions (exclude already existing + the pending one) ──────────────
  const suggestions = SUGGESTED_LANGUAGES.filter(
    s =>
      !existingLanguages
        .map(l => l.label.toLowerCase())
        .includes(s.toLowerCase()) &&
      s.toLowerCase() !== pendingLanguage.toLowerCase(),
  );

  // ─────────────────────────────────────────────────────────────────────────
  // EDIT MODE UI
  // ─────────────────────────────────────────────────────────────────────────
  if (EDIT && initialLanguage) {
    return (
      <View style={styles.root}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Edit Language</Text>

          {/* Language name (read-only) */}
          <View style={styles.languageNameRow}>
            <Icon name="translate" size={16} color={COLORS.cyan600} />
            <Text style={styles.languageNameText}>{initialLanguage.label}</Text>
          </View>

          {/* Proficiency selector */}
          <View>
            <Text style={styles.sectionLabel}>Proficiency</Text>
            <ProficiencyRow
              proficiency={editProficiency}
              onToggle={toggleEditProficiency}
            />
          </View>

          <Text style={styles.hint}>
            {editProficiency.length} proficienc
            {editProficiency.length !== 1 ? 'ies' : 'y'} selected
          </Text>
        </View>

        {/* Save / Cancel */}
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
              label="Update Language"
              size="lg"
              icon={<Icon name="check" size={18} color={COLORS.white} />}
              iconPosition="start"
              onPress={handleEditSave}
            />
          </View>
        </View>
      </View>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────
  // ADD MODE UI
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <View style={styles.root}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Add Language</Text>

        {/* ── Input Row ── */}
        <View style={styles.inputRow}>
          <View style={styles.inputWrap}>
            <Icon
              name="translate"
              size={16}
              color={COLORS.gray400}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Type a language (e.g. Marathi)"
              placeholderTextColor={COLORS.gray400}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={() => pickLanguage(inputValue)}
              returnKeyType="done"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addBtn}
            onPress={() => pickLanguage(inputValue)}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ── Pending language + proficiency picker ── */}
        {pendingLanguage ? (
          <View style={styles.pendingCard}>
            <View style={styles.pendingHeader}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Icon name="translate" size={14} color={COLORS.cyan600} />
                <Text style={styles.languageLabel}>{pendingLanguage}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPendingLanguage('')}
                hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              >
                <Ionicons name="close-circle" size={18} color={COLORS.gray400} />
              </TouchableOpacity>
            </View>

            <Text style={styles.sectionLabel}>Proficiency</Text>
            <ProficiencyRow
              proficiency={newProficiency}
              onToggle={toggleNewProficiency}
            />
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="translate" size={32} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No language selected</Text>
            <Text style={styles.emptySubText}>
              Type above or pick from suggestions below
            </Text>
          </View>
        )}

        {/* ── Suggestions ── */}
        {suggestions.length > 0 && (
          <View>
            <Text style={styles.sectionLabel}>Suggestions</Text>
            <View style={styles.chipRow}>
              {suggestions.map(s => (
                <TouchableOpacity
                  key={s}
                  activeOpacity={0.75}
                  style={styles.suggestionChip}
                  onPress={() => pickLanguage(s)}
                >
                  <Ionicons name="add" size={13} color={COLORS.primary} />
                  <Text style={styles.suggestionText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}
      </View>

      {/* ── Save / Cancel Row ── */}
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
            label="Add Language"
            size="lg"
            icon={<Icon name="check" size={18} color={COLORS.white} />}
            iconPosition="start"
            onPress={handleAddSave}
          />
        </View>
      </View>
    </View>
  );
};

export default EditLanguagesSection;

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

  /* Language name display (Edit mode) */
  languageNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0F9FF',
    borderWidth: 1,
    borderColor: COLORS.cyan600 + '40',
    borderRadius: 8,
    padding: 12,
  },
  languageNameText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 15,
    color: COLORS.gray800,
  },

  /* Input Row */
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  inputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IRegular,
    paddingVertical: 0,
  },
  addBtn: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Pending card (Add mode - selected language + proficiency) */
  pendingCard: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#FAFAFA',
    gap: 10,
  },
  pendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  languageLabel: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 14,
    color: COLORS.gray800,
  },

  /* Section Label */
  sectionLabel: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },

  /* Proficiency */
  proficiencyRow: {
    flexDirection: 'row',
    gap: 8,
  },
  profChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    backgroundColor: '#F8FAFC',
  },
  profChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: '#EEF6FF',
  },
  profChipText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: 12,
    color: COLORS.gray500,
  },
  profChipTextActive: {
    fontFamily: FONT_FAMILY.IMedium,
    color: COLORS.primary,
  },

  /* Chip Row (suggestions) */
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  /* Suggestion Chip */
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    backgroundColor: '#F8FAFC',
  },
  suggestionText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: 13,
    color: COLORS.gray600,
  },

  /* Empty State */
  emptyState: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 6,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.IMedium,
    color: COLORS.gray500,
  },
  emptySubText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.IRegular,
    color: COLORS.gray400,
    textAlign: 'center',
  },

  /* Hint */
  hint: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.IRegular,
    color: COLORS.gray400,
    textAlign: 'right',
    marginTop: -4,
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
