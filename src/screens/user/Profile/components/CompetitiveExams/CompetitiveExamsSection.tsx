import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Divider, SectionCard, SectionTitle } from './../Common';
import { Profilestyles } from '../../Styles/ProfileStyle';
import COLORS from '../../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../../../../types/Navigation';
import CommonDialog from '../../../../../components/common/CommonDialog';
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

  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const [dialog, setDialog] = useState<{
    visible: boolean;
    title: string;
    description: string;
    onSave?: () => void | Promise<void | boolean> | boolean;
    saveText?: string;
    cancelText?: string;
    hideFooter?: boolean;
  }>({
    visible: false,
    title: '',
    description: '',
  });

  const updateExam = (id: number) => {
    navigation.navigate('EditProfile', {
      EDIT: true,
      ADD: false,
      title: 'Competitive Exams',
    });
  };

  const deleteExam = (id: number) => {
    setDialog({
      visible: true,
      title: 'Delete Competitive Exam',
      description: 'Are you sure you want to delete this competitive exam?',
      saveText: 'Delete',
      cancelText: 'Cancel',
      onSave: () => {
        setDialog(prev => ({ ...prev, visible: false }));
      },
    });
  };
  return (
    <SectionCard>
      <SectionTitle title="Competitive Exams" addbtn />
      <Divider />
      <CommonDialog
        open={dialog.visible}
        onOpenChange={visible => setDialog(prev => ({ ...prev, visible }))}
        title={dialog.title}
        description={dialog.description}
        hideFooter={dialog.hideFooter}
        onSave={dialog.onSave ?? (() => {})}
        saveText={dialog.saveText}
        cancelText={dialog.cancelText}
      />
      {exams.map((exam, i) => (
        <View key={i} style={styles.examItem}>
          <View style={styles.leftBar} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 6,
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '80%',
              }}
            >
              <Text style={Profilestyles.achieveTitle}>{exam.name}</Text>
            </View>
            <View
              style={{
                gap: 8,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  updateExam(i);
                }}
              >
                <Icon name="pencil" size={16} color={COLORS.primary} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteExam(i)}>
                <Icon name="delete" size={16} color="#f14f4fff" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              gap: 8,
              marginTop: 8,
              marginBottom: 4,
            }}
          >
            <View
              style={[
                styles.Badge,
                {
                  backgroundColor: '#f8ebfdff',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4,
                },
              ]}
            >
              <Icon name="medal" size={14} color="#c34ff1ff" />
              <Text style={[styles.badgeText, { color: '#c34ff1ff' }]}>
                {exam.badge}
              </Text>
            </View>
            <View style={[styles.Badge, { backgroundColor: COLORS.gray100 }]}>
              <Text style={[styles.badgeText, { color: COLORS.gray400 }]}>
                {exam.year}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

export default CompetitiveExamsSection;

const styles = StyleSheet.create({
  examItem: {
    marginBottom: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    position: 'relative',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  leftBar: {
    width: 3,
    borderRadius: 16,
    backgroundColor: COLORS.info,
    left: -1,
    top: 8,
    bottom: 8,
    position: 'absolute',
  },
  examContent: {
    flex: 1,
    gap: 6,
  },
  Badge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
