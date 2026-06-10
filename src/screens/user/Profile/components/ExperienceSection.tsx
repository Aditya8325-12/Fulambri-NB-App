import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';
interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  workType: string;
}
const ExperienceSection = () => {
  const experiences: ExperienceItem[] = [
    {
      company: 'Tech Innovators Corp',
      role: 'SENIOR ENGINEER',
      period: 'Jan 2021 - Present',
      workType: 'Remote',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Experience" addbtn />
      <Divider />
      {experiences.map((exp, i) => (
        <View key={i} style={Profilestyles.expItem}>
          <View style={Profilestyles.expIconBox}>
            <Text style={Profilestyles.expIconText}>🏢</Text>
          </View>
          <View style={Profilestyles.expContent}>
            <Text style={Profilestyles.expCompany}>{exp.company}</Text>
            <View style={Profilestyles.expRoleBadge}>
              <Text style={Profilestyles.expRoleText}>{exp.role}</Text>
            </View>
            <Text style={Profilestyles.expMeta}>📅 {exp.period}</Text>
            <Text style={Profilestyles.expMeta}>📍 {exp.workType}</Text>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

export default ExperienceSection;
