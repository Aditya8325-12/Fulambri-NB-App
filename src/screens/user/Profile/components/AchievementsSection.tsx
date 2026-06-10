import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';
interface AchievementItem {
  icon: string;
  title: string;
  description: string;
}
const AchievementsSection = () => {
  const achievements: AchievementItem[] = [
    {
      icon: '🏆',
      title: 'Hackathon Winner 2023',
      description:
        'Awarded 1st place among 50 teams for AI-driven hiring solution.',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Achievements" addbtn />
      <Divider />
      {achievements.map((a, i) => (
        <View key={i} style={Profilestyles.achieveItem}>
          <Text style={Profilestyles.achieveIcon}>{a.icon}</Text>
          <View style={Profilestyles.achieveContent}>
            <Text style={Profilestyles.achieveTitle}>{a.title}</Text>
            <Text style={Profilestyles.achieveDesc}>{a.description}</Text>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

export default AchievementsSection;

const styles = StyleSheet.create({});
