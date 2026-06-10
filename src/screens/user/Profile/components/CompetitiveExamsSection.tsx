import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';
interface ExamItem {
  name: string;
  rank: string;
  badge: string;
  year: string;
}
const CompetitiveExamsSection = () => {
  const exams: ExamItem[] = [
    {
      name: 'GATE (CSE)',
      rank: 'Rank: 452',
      badge: '99.1 Percentile',
      year: '2017',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Competitive Exams" addbtn />
      <Divider />
      {exams.map((exam, i) => (
        <View key={i} style={Profilestyles.examItem}>
          <View style={Profilestyles.examLeft}>
            <Text style={Profilestyles.examName}>{exam.name}</Text>
            <Text style={Profilestyles.examRank}>{exam.rank}</Text>
          </View>
          <View style={Profilestyles.examRight}>
            <View style={Profilestyles.badgeOrange}>
              <Text style={Profilestyles.badgeOrangeText}>{exam.badge}</Text>
            </View>
            <Text style={Profilestyles.examYear}>{exam.year}</Text>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

export default CompetitiveExamsSection;

const styles = StyleSheet.create({});
