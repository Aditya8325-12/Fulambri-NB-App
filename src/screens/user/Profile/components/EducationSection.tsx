import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';

interface EducationItem {
  institution: string;
  degree: string;
  badge?: string;
  year: string;
}
const EducationSection = () => {
  const education: EducationItem[] = [
    {
      institution: 'University of Mumbai',
      degree: 'B.E. Comp Sci',
      badge: '97.8%',
      year: 'Class of 2017',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Education" addbtn />
      <Divider />
      {education.map((edu, i) => (
        <View key={i} style={Profilestyles.eduItem}>
          <Text style={Profilestyles.eduInstitution}>{edu.institution}</Text>
          <View style={Profilestyles.eduRow}>
            <Text style={Profilestyles.eduDegree}>{edu.degree}</Text>
            {edu.badge && (
              <View style={Profilestyles.badgeOrange}>
                <Text style={Profilestyles.badgeOrangeText}>{edu.badge}</Text>
              </View>
            )}
          </View>
          <Text style={Profilestyles.eduYear}>{edu.year}</Text>
        </View>
      ))}
    </SectionCard>
  );
};

export default EducationSection;

const styles = StyleSheet.create({});
