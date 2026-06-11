import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';

import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';
import Button from '../../../../../components/common/Button';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const MAX_CHARS = 500;

interface EditProps {
  EDIT?: boolean;
  ADD?: boolean;
}

const EditProfileSummary = ({ EDIT, ADD }: EditProps) => {
  const [summary, setSummary] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.root}>
      {/* ── Scrollable content ───────────────────── */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Form Card ─────────────────────────── */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile Summary</Text>
          <Text style={styles.cardSubtitle}>
            Write a short bio that highlights your skills, experience, and what
            makes you a great candidate.
          </Text>

          {/* Summary TextBox */}
          <View style={styles.textAreaWrapper}>
            <TextInput
              style={styles.textArea}
              placeholder="e.g. Passionate software developer with 3+ years of experience in building scalable mobile apps..."
              placeholderTextColor={COLORS.gray400}
              value={summary}
              onChangeText={text =>
                text.length <= MAX_CHARS && setSummary(text)
              }
              multiline
              textAlignVertical="top"
              maxLength={MAX_CHARS}
            />
            <Text style={styles.charCount}>
              {summary.length}/{MAX_CHARS}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* ── Save Button — fixed at bottom ────────── */}
      <View style={styles.saveWrapper}>
        <Button
          variant="gradient"
          label="Save Changes"
          size="lg"
          icon={<Icon name="check" size={18} color={COLORS.white} />}
          iconPosition="start"
          onPress={handleSave}
        />
      </View>
    </View>
  );
};

export default EditProfileSummary;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },

  /* Form Card */
  card: {
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 20,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    marginTop: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.gray800,
    letterSpacing: 0.2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.gray500,
    fontFamily: FONT_FAMILY.IMedium,
    lineHeight: 20,
  },

  /* Text Area */
  textAreaWrapper: {
    borderWidth: 1.5,
    borderColor: COLORS.gray200,
    borderRadius: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 8,
  },
  textArea: {
    fontSize: 14,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IMedium,
    minHeight: 160,
    lineHeight: 22,
  },
  charCount: {
    alignSelf: 'flex-end',
    fontSize: 12,
    color: COLORS.gray400,
    marginTop: 6,
    fontFamily: FONT_FAMILY.IMedium,
  },

  /* Save Button */
  saveWrapper: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray100,
  },
});
