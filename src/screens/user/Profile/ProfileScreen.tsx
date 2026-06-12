import React, { useCallback, useRef } from 'react';
import { View, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../../components/common/CommonHeader';
import { useFocusEffect } from '@react-navigation/native';

import PersonalInfo from './components/PersonalInfo/PersonalInfo';
import ResumeSection from './components/Resume/ResumeSection';
import ProfileSummary from './components/Summary/ProfileSummary';
import ExperienceSection from './components/Experience/ExperienceSection';
import SkillsSection from './components/Skills/SkillsSection';
import LanguagesSection from './components/Languages/LanguagesSection';
import EducationSection from './components/Education/EducationSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import AchievementsSection from './components/Achievements/AchievementsSection';
import CompetitiveExamsSection from './components/CompetitiveExams/CompetitiveExamsSection';

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
      <CommonHeader title="Profile" DrawerIcon BellIcon MessageIcon />
      <ScrollView
        ref={ScrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
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
        <View style={{ height: 48 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// ---------- Styles ----------

const styles = StyleSheet.create({
  safeArea: {
    // flex: 1,
    backgroundColor: '#F4F6F8',
  },
  // scroll: {
  //   flex: 1,
  //   backgroundColor: '#0bc71bff',
  // },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 4,
  },
});
