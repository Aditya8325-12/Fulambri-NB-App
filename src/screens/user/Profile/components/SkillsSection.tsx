import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChipTag, Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';
interface Chip {
  label: string;
}
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
      <SectionTitle title="Skills" addbtn />
      <Divider />
      <View style={Profilestyles.chipRow}>
        {skills.map((s, i) => (
          <ChipTag key={i} label={s.label} />
        ))}
      </View>
    </SectionCard>
  );
};

export default SkillsSection;

const styles = StyleSheet.create({});
