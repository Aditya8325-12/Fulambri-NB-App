import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

interface PersonalInfoProps {
  EDIT?: boolean;
  ADD?: boolean;
}

const EditPersonalInfo = ({ EDIT, ADD }: PersonalInfoProps) => {
  return (
    <View style={{ paddingHorizontal: 16 }}>
      <Text>PersonalInfo {EDIT ? 'Edit' : ADD ? 'Add' : ''}</Text>
    </View>
  );
};

export default EditPersonalInfo;

const styles = StyleSheet.create({});
