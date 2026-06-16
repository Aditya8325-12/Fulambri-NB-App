import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/Navigation';
import CommonHeader from '../../../components/common/CommonHeader';
import PersonalInfo from './components/PersonalInfo/EditPersonalInfo';
import { useFocusEffect } from '@react-navigation/native';
import EditProfileSummary from './components/Summary/EditProfileSummary';
import EditExperienceSection from './components/Experience/EditExperienceSection';
import EditSkillsSection from './components/Skills/EditSkillsSection';
import LanguagesSection from './components/Languages/LanguagesSection';
import EditLanguagesSection from './components/Languages/EditLanguagesSection';
import EditEducationSection from './components/Education/EditEducationSection';
import EditProjectsSection from './components/Projects/EditProjectsSection';
import EditAchievementsSection from './components/Achievements/EditAchievementsSection';
import EditCompetitiveExamsSection from './components/CompetitiveExams/EditCompetitiveExamsSection';

type Props = DrawerScreenProps<DrawerParamList, 'EditProfile'>;

const EditProfile = ({ route }: Props) => {
  const { EDIT, ADD, title } = route.params || {};

  React.useEffect(() => {
    console.log('EditProfile parameters:', { EDIT, ADD, title });
  }, [EDIT, ADD, title]);
  const ScrollViewRef = useRef<ScrollView>(null);
  useFocusEffect(
    useCallback(() => {
      ScrollViewRef.current?.scrollTo({ y: 0, animated: false });
    }, []),
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <CommonHeader
        BackIcon
        title={ADD ? 'Add ' + title : EDIT ? 'Edit ' + title : title}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          ref={ScrollViewRef}
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {title === 'Personal Info' && <PersonalInfo EDIT={EDIT} ADD={ADD} />}
          {title === 'Profile Summary' && (
            <EditProfileSummary EDIT={EDIT} ADD={ADD} />
          )}
          {title === 'Experience' && (
            <EditExperienceSection EDIT={EDIT} ADD={ADD} />
          )}
          {title === 'Skills' && <EditSkillsSection EDIT={EDIT} ADD={ADD} />}
          {title === 'Languages' && (
            <EditLanguagesSection EDIT={EDIT} ADD={ADD} />
          )}
          {title === 'Education' && (
            <EditEducationSection EDIT={EDIT} ADD={ADD} />
          )}
          {title === 'Projects' && (
            <EditProjectsSection EDIT={EDIT} ADD={ADD} />
          )}
          {title === 'Achievements' && (
            <EditAchievementsSection EDIT={EDIT} ADD={ADD} />
          )}
          {title === 'Competitive Exams' && (
            <EditCompetitiveExamsSection EDIT={EDIT} ADD={ADD} />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: { paddingHorizontal: 16, paddingBottom: 32 },
});
