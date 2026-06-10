import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ChipTag, Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';
interface Chip {
  label: string;
}
const LanguagesSection = () => {
  const languages: Chip[] = [
    { label: 'English - Fluent' },
    { label: 'Hindi - Read, Write, Speak' },
    { label: 'Marathi - Native' },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Languages" addbtn />
      <Divider />
      <View style={Profilestyles.chipRow}>
        {languages.map((l, i) => (
          <ChipTag key={i} label={l.label} />
        ))}
      </View>
    </SectionCard>
  );
};

export default LanguagesSection;

const styles = StyleSheet.create({});
