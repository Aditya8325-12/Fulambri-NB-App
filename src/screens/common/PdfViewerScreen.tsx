import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Pdf from 'react-native-pdf';
import { DrawerParamList } from '../../types/Navigation';
import { RouteProp } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../components/common/CommonHeader';

const PdfViewerScreen = ({
  route,
}: {
  route: RouteProp<DrawerParamList, 'PdfView'>;
}) => {
  const { uri, name } = route.params;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CommonHeader BackIcon title={name} />
      <Pdf source={{ uri: uri }} style={{ flex: 1 }} />;
    </SafeAreaView>
  );
};

export default PdfViewerScreen;

const styles = StyleSheet.create({});
