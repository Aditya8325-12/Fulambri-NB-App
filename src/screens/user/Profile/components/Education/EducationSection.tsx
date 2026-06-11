import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Divider, SectionCard, SectionTitle } from '../Common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../../../../types/Navigation';
import CommonDialog from '../../../../../components/common/CommonDialog';

interface EducationItem {
  institution: string;
  degree: string;
  score?: string;
  startYear: string;
  endYear: string;
}

const EducationSection = () => {
  const education: EducationItem[] = [
    {
      institution: 'CSMSS Chh. Shahu College of Eng.',
      degree: 'Bachelor of Technology (CSE)',
      score: '74.60',
      startYear: '2019',
      endYear: '2023',
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

  const updateExperience = (id: number) => {
    navigation.navigate('EditProfile', {
      EDIT: true,
      ADD: false,
      title: 'Experience',
    });
  };

  const deleteExperience = (id: number) => {
    setDialog({
      visible: true,
      title: 'Delete Education',
      description: 'Are you sure you want to delete this education?',
      saveText: 'Delete',
      cancelText: 'Cancel',
      onSave: () => {
        setDialog(prev => ({ ...prev, visible: false }));
      },
    });
  };

  return (
    <SectionCard>
      <SectionTitle title="Education" addbtn />
      <Divider />{' '}
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
      {education.map((edu, i) => (
        <View key={i} style={styles.eduItem}>
          <View style={styles.leftBar} />

          <View style={styles.eduContent}>
            {/* Institution */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Text style={styles.institution} numberOfLines={1}>
                {edu.institution}
              </Text>
              <View
                style={{
                  gap: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    updateExperience(i);
                  }}
                >
                  <Icon name="pencil" size={16} color={COLORS.primary} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => deleteExperience(i)}>
                  <Icon name="delete" size={16} color="#f14f4fff" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Degree chip */}
            <View style={styles.chipRow}>
              <View style={styles.chip}>
                <Icon name="school" size={13} color={COLORS.primary} />
                <Text style={styles.chipText}>{edu.degree}</Text>
              </View>
            </View>

            {/* Score chip */}
            {edu.score && (
              <View style={styles.chipRow}>
                <View style={styles.chip}>
                  <Icon
                    name="alpha-g-circle-outline"
                    size={13}
                    color={COLORS.primary}
                  />
                  <Text style={styles.chipText}>{edu.score}</Text>
                </View>
              </View>
            )}

            {/* Year row */}
            <View style={styles.yearRow}>
              <Icon name="calendar-month-outline" size={13} color="#888" />
              <Text style={styles.yearText}>
                {edu.startYear} — {edu.endYear}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

export default EducationSection;

const styles = StyleSheet.create({
  eduItem: {
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
  eduContent: {
    flex: 1,
    gap: 6,
  },
  institution: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: '#1A1A1A',
    width: '80%',
  },
  chipRow: {
    flexDirection: 'row',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  chipText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.IMedium,
    color: COLORS.primary,
  },
  yearRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  yearText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.IRegular,
    color: '#888',
  },
});
