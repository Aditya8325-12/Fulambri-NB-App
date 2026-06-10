import React, { useCallback, useRef } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../../components/common/CommonHeader';
import { useFocusEffect } from '@react-navigation/native';

import PersonalInfo from './components/PersonalInfo';
import ResumeSection from './components/ResumeSection';
import ProfileSummary from './components/ProfileSummary';
import ExperienceSection from './components/ExperienceSection';
import SkillsSection from './components/SkillsSection';
import LanguagesSection from './components/LanguagesSection';
import EducationSection from './components/EducationSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import CompetitiveExamsSection from './components/CompetitiveExamsSection';

const ProfileScreen: React.FC = () => {
  const ScrollViewRef = useRef<ScrollView>(null);
  useFocusEffect(
    useCallback(() => {
      ScrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, []),
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <CommonHeader title="Profile" DrawerIcon BellIcon />
      <ScrollView
        style={styles.scroll}
        ref={ScrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <PersonalInfo />
        <ResumeSection />
        <ProfileSummary />
        <ExperienceSection />
        <SkillsSection />
        <LanguagesSection />
        <EducationSection />
        <ProjectsSection />
        <AchievementsSection />
        <CompetitiveExamsSection />
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// ---------- Styles ----------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
