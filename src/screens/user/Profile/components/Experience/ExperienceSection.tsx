import React, { useState } from 'react';
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';
import { Divider, SectionCard, SectionTitle } from '../Common';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../../../../types/Navigation';
import CommonDialog from '../../../../../components/common/CommonDialog';

interface ExperienceItem {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  duration: string;
  website?: string;
  description?: string;
  responsibilities?: string;
}

const TEAL = '#00B5B5';
const TEAL_LIGHT = '#E6F7F7';
const TEXT_PRIMARY = '#1A1A1A';
const TEXT_SECONDARY = '#555';
const LEFT_BAR = '#00B5B5';

const ExperienceSection = () => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const experiences: ExperienceItem[] = [
    {
      company: 'InnovateTech Solutions',
      role: 'Software Engineer',
      startDate: 'Aug 2022',
      endDate: 'Jul 2024',
      duration: '1 year 11 months',
      website: 'https://www.innovatetech.com/projects',
      description:
        'Worked on enterprise-level applications with a focus on clean architecture, performance optimization, and secure authentication systems.',
      responsibilities:
        'Developed and maintained web applications, collaborated with cross-functional teams, optimized APIs, and ensured application performance and scalability.',
    },
    {
      company: 'NextGen Digital Labs',
      role: 'Frontend Developer',
      startDate: 'Jun 2021',
      endDate: 'Jul 2022',
      duration: '1 year 2 months',
      website: 'https://www.nextgendigitallabs.com',
      description:
        'Developed responsive web applications and reusable UI components using modern frontend technologies, focusing on user experience and performance.',
      responsibilities:
        'Built and maintained React-based applications, integrated REST APIs, collaborated with UI/UX designers, fixed bugs, improved application performance, and participated in code reviews.',
    },
  ];

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
      title: 'Delete Experience',
      description: 'Are you sure you want to delete this experience?',
      saveText: 'Delete',
      cancelText: 'Cancel',
      onSave: () => {
        setDialog(prev => ({ ...prev, visible: false }));
      },
    });
  };

  return (
    <SectionCard>
      <SectionTitle title="Experience" addbtn />
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
      {experiences.map((exp, i) => (
        <View key={i} style={styles.expItem}>
          {/* Left accent bar */}
          <View style={styles.leftBar} />

          <View style={styles.expContent}>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 6,
              }}
            >
              {/* Company Name */}
              <Text style={styles.companyName}>{exp.company}</Text>
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

            {/* Role Badge */}
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{exp.role}</Text>
            </View>

            {/* Period Row */}
            <View style={styles.periodRow}>
              <View style={styles.periodLeft}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.periodText}>
                  {exp.startDate} — {exp.endDate}
                </Text>
                {exp.website && (
                  <TouchableOpacity
                    style={styles.websiteRow}
                    onPress={() => Linking.openURL(exp.website!)}
                  >
                    <Icon name="web" size={14} color={TEAL} />
                    <Text style={styles.websiteText} numberOfLines={1}>
                      {exp.website}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Duration */}
            <Text style={styles.durationText}>{exp.duration}</Text>

            {/* Description */}
            {exp.description && (
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Description</Text>
                <Text style={styles.infoText}>{exp.description}</Text>
              </View>
            )}

            {/* Responsibilities */}
            {exp.responsibilities && (
              <View style={styles.infoBlock}>
                <Text style={styles.infoLabel}>Responsibilities</Text>
                <Text style={styles.infoText}>{exp.responsibilities}</Text>
              </View>
            )}
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

const styles = StyleSheet.create({
  expItem: {
    flexDirection: 'row',
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
    backgroundColor: LEFT_BAR,
    left: -1,
    alignSelf: 'center',
    height: '96%',
    position: 'absolute',
  },
  expContent: {
    flex: 1,
  },
  companyName: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: TEXT_PRIMARY,
    width: '80%',
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: TEAL_LIGHT,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: TEAL,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  roleText: {
    fontSize: 12,
    color: TEAL,
    fontFamily: FONT_FAMILY.IMedium,
  },
  periodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  periodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  bullet: {
    fontSize: 14,
    color: TEXT_SECONDARY,
    lineHeight: 18,
  },
  periodText: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    fontFamily: FONT_FAMILY.IMedium,
  },
  websiteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  websiteText: {
    fontSize: 12,
    color: TEAL,
    fontFamily: FONT_FAMILY.IMedium,
    textDecorationLine: 'underline',
  },
  durationText: {
    fontSize: 11,
    color: COLORS.gray500,
    fontFamily: FONT_FAMILY.IRegular,
    marginBottom: 10,
  },
  infoBlock: {
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: TEXT_PRIMARY,
    marginBottom: 3,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.gray600,
    lineHeight: 19,
    fontFamily: FONT_FAMILY.IRegular,
  },
});

export default ExperienceSection;
