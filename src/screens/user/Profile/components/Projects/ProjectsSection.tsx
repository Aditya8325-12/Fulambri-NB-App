import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { ChipTag, Divider, SectionCard, SectionTitle } from './../Common';
import COLORS from '../../../../../constants/colors';
import { FONT_FAMILY } from '../../../../../constants/fonts';
import CommonDialog from '../../../../../components/common/CommonDialog';
import { DrawerParamList } from '../../../../../types/Navigation';

// ─── Types ───────────────────────────────────────────────────────────────────
interface ProjectItem {
  id: number;
  title: string;
  tags: string[];
  startDate: string;
  endDate: string;
  projectUrl?: string;
}

// ─── Component ───────────────────────────────────────────────────────────────
const ProjectsSection = () => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();

  const projects: ProjectItem[] = [
    {
      id: 1,
      title: 'Job Portal Web Application',
      tags: [
        'React',
        'Next.js',
        'Node.js',
        'PostgreSQL',
        'Prisma',
        'React',
        'Next.js',
        'Node.js',
        'PostgreSQL',
        'Prisma',
      ],
      startDate: 'Jan 2024',
      endDate: 'Jun 2024',
      projectUrl: 'https://github.com/AdityaDhutraj/job-portal',
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

  const handleEdit = (id: number) => {
    navigation.navigate('EditProfile', {
      EDIT: true,
      ADD: false,
      title: 'Projects',
    });
  };

  const handleDelete = (id: number) => {
    setDialog({
      visible: true,
      title: 'Delete Project',
      description: 'Are you sure you want to delete this project?',
      saveText: 'Delete',
      cancelText: 'Cancel',
      onSave: () => {
        setDialog(prev => ({ ...prev, visible: false }));
      },
    });
  };

  return (
    <SectionCard>
      <SectionTitle title="Projects" addbtn />
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

      {projects.map(proj => (
        <View key={proj.id} style={styles.projectItem}>
          {/* Left accent bar */}
          <View style={styles.leftBar} />

          <View style={styles.projectContent}>
            {/* Title row + icons */}
            <View style={styles.titleRow}>
              <Text style={styles.projectTitle} numberOfLines={1}>
                {proj.title}
              </Text>
              <View style={styles.iconGroup}>
                <TouchableOpacity onPress={() => handleEdit(proj.id)}>
                  <Icon name="pencil" size={16} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(proj.id)}>
                  <Icon name="delete" size={16} color="#f14f4f" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Date range */}
            <View style={styles.dateRow}>
              <Icon name="calendar-month-outline" size={13} color="#888" />
              <Text style={styles.dateText}>
                {proj.startDate} — {proj.endDate}
              </Text>
            </View>

            {/* Skill chips */}
            <View style={styles.chipRow}>
              <Text numberOfLines={1} ellipsizeMode="tail" style={styles.skillsTextContainer}>
                {proj.tags.map((tag, j) => (
                  <Text key={j} style={styles.skillChip}>
                    {tag}
                    {j < proj.tags.length - 1 ? '  •  ' : ''}
                  </Text>
                ))}
              </Text>
            </View>

            {/* View Project link */}
            {proj.projectUrl ? (
              <TouchableOpacity style={styles.linkRow}>
                <Icon name="link-variant" size={14} color={COLORS.primary} />
                <Text style={styles.viewProjectLink}>View Project ↗</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

export default ProjectsSection;

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  projectItem: {
    marginBottom: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.gray300,
    position: 'relative',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  leftBar: {
    width: 3,
    borderRadius: 16,
    backgroundColor: '#914794ff',
    left: -1,
    top: 8,
    bottom: 8,
    position: 'absolute',
  },
  projectContent: {
    flex: 1,
    gap: 8,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skillChip: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.IRegular,
    color: '#ca4eceff',
  },
  projectTitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: '#1A1A1A',
    width: '78%',
  },
  iconGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  dateText: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.IRegular,
    color: '#888',
  },
  chipRow: {
    flexDirection: 'row',
    backgroundColor: COLORS.gray100,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  skillsTextContainer: {
    flex: 1,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  viewProjectLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontFamily: FONT_FAMILY.IMedium,
  },
});
