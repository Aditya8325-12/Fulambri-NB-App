import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { keepLocalCopy, pick } from '@react-native-documents/picker';

import { Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../../constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../../../types/Navigation';
import CommonDialog from '../../../../components/common/CommonDialog';

interface ResumeFile {
  name: string;
  uri: string;
  size?: number;
}

const ResumeSection = () => {
  const [resume, setResume] = useState<ResumeFile | null>(null);
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
  // Pick a PDF file

  const handleUpload = async () => {
    try {
      const [file] = await pick();
      const [localCopy] = await keepLocalCopy({
        files: [
          {
            uri: file.uri,
            fileName: file.name ?? 'resume.pdf',
          },
        ],
        destination: 'documentDirectory',
      });

      console.log(localCopy);

      if (localCopy.status === 'success') {
        console.log(localCopy.localUri);

        setResume({
          name: file.name ?? 'resume.pdf',
          uri: localCopy.localUri,
          size: file.size ?? undefined,
        });
      } else {
        console.log('Copy Error:', localCopy.copyError);

        Alert.alert('Error', localCopy.copyError ?? 'Failed to copy file');
      }
    } catch (error) {
      console.log(error);
    }
  };

  // View PDF
  const handleView = async () => {
    if (!resume) return;
    navigation.navigate('PdfView', {
      uri: resume.uri,
      name: resume.name as string,
    });
  };

  // Replace / update the PDF
  const handleUpdate = () => {
    handleUpload();
  };

  // Delete the uploaded PDF
  const handleDelete = () => {
    setDialog({
      visible: true,
      title: 'Remove Resume',
      description: 'Are you sure you want to remove the uploaded resume?',
      saveText: 'Remove',
      cancelText: 'Cancel',
      onSave: () => {
        setResume(null);
        setDialog(prev => ({ ...prev, visible: false }));
      },
    });
  };

  // Format file size
  const formatSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <SectionCard>
      <SectionTitle title="Resume" />
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
      {resume ? (
        /* ── Uploaded file card ── */
        <View style={styles.fileCard}>
          {/* PDF icon + file info */}
          <View style={styles.fileLeft}>
            <View style={styles.pdfIconBox}>
              <Icon name="file-pdf-box" size={30} color="#E53935" />
            </View>
            <View style={styles.fileInfo}>
              <Text style={styles.fileName} numberOfLines={1}>
                {resume.name}
              </Text>
              {resume.size ? (
                <Text style={styles.fileSize}>{formatSize(resume.size)}</Text>
              ) : null}
            </View>
          </View>

          {/* Action icons */}
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.iconBtn, styles.viewBtn]}
              onPress={handleView}
              activeOpacity={0.75}
            >
              <Icon name="eye-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconBtn, styles.updateBtn]}
              onPress={handleUpdate}
              activeOpacity={0.75}
            >
              <Icon name="pencil-outline" size={18} color={COLORS.primary} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.iconBtn, styles.deleteBtn]}
              onPress={handleDelete}
              activeOpacity={0.75}
            >
              <Icon name="trash-can-outline" size={18} color="#E53935" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        /* ── Empty state ── */
        <View style={Profilestyles.resumeBox}>
          <Text style={Profilestyles.resumeIcon}>📄</Text>
          <Text style={Profilestyles.resumeTitle}>No resume uploaded yet</Text>
          <Text style={Profilestyles.resumeSubtitle}>
            Increase your profile visibility by 40% with a CV.
          </Text>
        </View>
      )}

      {/* Upload / re-upload button */}
      {!resume && (
        <TouchableOpacity
          style={Profilestyles.addButton}
          activeOpacity={0.8}
          onPress={handleUpload}
        >
          <Text style={Profilestyles.addButtonText}>+ Upload Document</Text>
        </TouchableOpacity>
      )}
    </SectionCard>
  );
};

export default ResumeSection;

const styles = StyleSheet.create({
  /* Uploaded file card */
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 12,
    backgroundColor: '#FAFAFA',
    marginBottom: 4,
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  pdfIconBox: {
    width: 44,
    height: 44,
    backgroundColor: '#FFEBEE',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  fileSize: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },

  /* Action icon row */
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewBtn: {
    backgroundColor: '#E6F7F7',
  },
  updateBtn: {
    backgroundColor: '#EAF0FF',
  },
  deleteBtn: {
    backgroundColor: '#FFEBEE',
  },
});
