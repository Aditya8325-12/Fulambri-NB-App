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

interface EditProps {
  EDIT?: boolean;
  ADD?: boolean;
  initialSkills?: string[];
}

const SkillChip: React.FC<{ label: string; onRemove: () => void }> = ({
  label,
  onRemove,
}) => (
  <View style={styles.chip}>
    <Text style={styles.chipText}>{label}</Text>
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onRemove}
      hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
    >
      <Ionicons name="close-circle" size={16} color={COLORS.gray400} />
    </TouchableOpacity>
  </View>
);

// ─── Main Component ───────────────────────────────────────────────────────────

const SUGGESTED = [
  'React Native',
  'TypeScript',
  'Node.js',
  'MongoDB',
  'AWS',
  'GraphQL',
  'Docker',
  'Git',
];

const EditSkillsSection = ({ EDIT, ADD, initialSkills = [] }: EditProps) => {
  const navigation = useNavigation();
  const [skills, setSkills] = useState<string[]>(
    initialSkills.length > 0 ? initialSkills : ['React', 'Node.js', 'MongoDB'],
  );
  const [inputValue, setInputValue] = useState('');

  // ── Helpers ──────────────────────────────────────────────────────────────

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    if (skills.map(s => s.toLowerCase()).includes(trimmed.toLowerCase())) {
      Alert.alert('Duplicate', `"${trimmed}" is already in your skill list.`);
      return;
    }
    setSkills(prev => [...prev, trimmed]);
    setInputValue('');
  };

  const removeSkill = (index: number) =>
    setSkills(prev => prev.filter((_, i) => i !== index));

  const handleInputSubmit = () => {
    addSkill(inputValue);
  };

  const handleSave = () => {
    if (skills.length === 0) {
      Alert.alert('Validation', 'Please add at least one skill.');
      return;
    }
    // TODO: wire up to API / state
    navigation.goBack();
  };

  // Suggested chips that are not yet added
  const suggestions = SUGGESTED.filter(
    s => !skills.map(sk => sk.toLowerCase()).includes(s.toLowerCase()),
  );

  const isEdit = EDIT === true;

  return (
    <View style={styles.root}>
      {/* ── Form Card ─────────────────────────────── */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Skills</Text>

        {/* ── Input Row ── */}
        <View style={styles.inputRow}>
          <View style={styles.inputWrap}>
            <Ionicons
              name="code-slash-outline"
              size={16}
              color={COLORS.gray400}
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Add a skill (e.g. React Native)"
              placeholderTextColor={COLORS.gray400}
              value={inputValue}
              onChangeText={setInputValue}
              onSubmitEditing={handleInputSubmit}
              returnKeyType="done"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.addBtn}
            onPress={handleInputSubmit}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* ── Added Skills ── */}
        {skills.length > 0 ? (
          <View>
            <Text style={styles.sectionLabel}>Your Skills</Text>
            <View style={styles.chipRow}>
              {skills.map((skill, index) => (
                <SkillChip
                  key={`${skill}-${index}`}
                  label={skill}
                  onRemove={() => removeSkill(index)}
                />
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Icon name="tag-outline" size={32} color={COLORS.gray300} />
            <Text style={styles.emptyText}>No skills added yet</Text>
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
                  onPress={() => addSkill(s)}
                >
                  <Ionicons name="add" size={13} color={COLORS.primary} />
                  <Text style={styles.suggestionText}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* ── Skill count hint ── */}
        <Text style={styles.hint}>
          {skills.length} skill{skills.length !== 1 ? 's' : ''} added
        </Text>
      </View>

      {/* ── Save / Cancel Row ───────────────────── */}
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
            label={isEdit ? 'Update Skills' : 'Save Skills'}
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

export default EditSkillsSection;

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

  /* Section Label */
  sectionLabel: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.gray500,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },

  /* Chip Row */
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  /* Skill Chip */
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.cyan600,
    backgroundColor: '#F0FDFE',
  },
  chipText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 13,
    color: COLORS.gray700,
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
