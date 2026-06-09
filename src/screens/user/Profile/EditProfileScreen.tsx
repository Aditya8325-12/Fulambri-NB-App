import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerParamList } from '../../../types/Navigation';
import CommonHeader from '../../../components/common/CommonHeader';
import PersonalInfo from './components/EditPersonalInfo';

type Props = DrawerScreenProps<DrawerParamList, 'EditProfile'>;

const EditProfile = ({ route }: Props) => {
  const { EDIT, ADD, title } = route.params || {};

  React.useEffect(() => {
    console.log('EditProfile parameters:', { EDIT, ADD, title });
  }, [EDIT, ADD, title]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <CommonHeader
        BackIcon
        title={ADD ? 'Add ' + title : EDIT ? 'Edit ' + title : title}
      />
      {title === 'Personal Info' && <PersonalInfo EDIT={EDIT} ADD={ADD} />}
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
});
