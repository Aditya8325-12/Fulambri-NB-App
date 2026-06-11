import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider, SectionCard, SectionTitle } from '../Common';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
interface Chip {
  label: string;
}

const ChipTag: React.FC<{
  label: string;
  color?: string;
  textColor?: string;
}> = ({ label }) => (
  <View style={styles.Chip}>
    <Icon name="circle" size={5} color={COLORS.cyan600} />
    <Text style={[styles.ChipText]}>{label}</Text>
  </View>
);

const SkillsSection = () => {
  const skills: Chip[] = [
    { label: 'Mongo DB' },
    { label: 'React' },
    { label: 'Node.js' },
    { label: 'AWS Cloud' },
    { label: 'Tailwind CSS' },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Skills" editable />
      <Divider />
      <View style={styles.chipRow}>
        {skills.map((s, i) => (
          <ChipTag key={i} label={s.label} />
        ))}
      </View>
    </SectionCard>
  );
};

export default SkillsSection;

const styles = StyleSheet.create({
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipCol: {
    flexDirection: 'column',
    gap: 8,
  },
  Chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.cyan600,
  },
  ChipText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 12,
    color: COLORS.gray600,
  },
});
