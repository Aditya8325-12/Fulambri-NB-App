import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Divider, SectionCard, SectionTitle } from '../Common';
import { Profilestyles } from '../../Styles/ProfileStyle';
import COLORS from '../../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../../../../types/Navigation';
import CommonDialog from '../../../../../components/common/CommonDialog';
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

  const updateAchievements = (id: number) => {
    navigation.navigate('EditProfile', {
      EDIT: true,
      ADD: false,
      title: 'Achievements',
    });
  };

  const deleteAchievements = (id: number) => {
    setDialog({
      visible: true,
      title: 'Delete Achievements',
      description: 'Are you sure you want to delete this Achievements?',
      saveText: 'Delete',
      cancelText: 'Cancel',
      onSave: () => {
        setDialog(prev => ({ ...prev, visible: false }));
      },
    });
  };
  return (
    <SectionCard>
      <SectionTitle title="Achievements" addbtn />
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
      {achievements.map((a, i) => (
        <View key={i} style={styles.achieveItem}>
          <View style={styles.leftBar} />

          <View style={styles.achieveContent}>
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
                <Icon name="trophy" size={16} color={'#fcce52ff'} />
                <Text style={Profilestyles.achieveTitle}>{a.title}</Text>
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
                    updateAchievements(i);
                  }}
                >
                  <Icon name="pencil" size={16} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteAchievements(i)}>
                  <Icon name="delete" size={16} color="#f14f4fff" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={Profilestyles.achieveContent}>
              <Text style={Profilestyles.achieveDesc}>{a.description}</Text>
            </View>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

export default AchievementsSection;

const styles = StyleSheet.create({
  achieveItem: {
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
    backgroundColor: '#f1ce5bff',
    left: -1,
    top: 8,
    bottom: 8,
    position: 'absolute',
  },
  achieveContent: {
    flex: 1,
    gap: 6,
  },
});
