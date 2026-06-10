import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/Navigation';
import CommonHeader from '../../../components/common/CommonHeader';
import PersonalInfo from './components/EditPersonalInfo';
import { useFocusEffect } from '@react-navigation/native';
import ProfileSummary from './components/ProfileSummary';
import EditProfileSummary from './components/EditProfileSummary';

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
      </ScrollView>
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
