import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { JobsStackParamList } from '../../../navigation/user_navigation/JobsStackNavigator';
import { pick, keepLocalCopy } from '@react-native-documents/picker';

import Toast from 'react-native-toast-message';
import COLORS from '../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../constants/fonts';
import CommonHeader from '../../../components/common/CommonHeader';
import { JOB_DETAIL } from './SampleData/Data';
import Button from '../../../components/common/Button';
import { DrawerParamList } from '../../../types/Navigation';

interface ResumeFile {
  name: string;
  uri: string;
  size?: number;
}

const ApplyJobScreen = () => {
  const navigation = useNavigation<NavigationProp<JobsStackParamList>>();
  const route = useRoute<RouteProp<JobsStackParamList, 'ApplyJob'>>();

  // Use passed job parameter or fallback to the sample job detail
  const job = route.params?.job || JOB_DETAIL;

  // Form states
  const [testInput, setTestInput] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<ResumeFile | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pick document handler
  const handlePickResume = async () => {
    try {
      const [file] = await pick({
        type: [
          'application/pdf',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/msword',
        ],
      });

      const [localCopy] = await keepLocalCopy({
        files: [
          {
            uri: file.uri,
            fileName: file.name ?? 'resume.pdf',
          },
        ],
        destination: 'documentDirectory',
      });

      if (localCopy.status === 'success') {
        setResume({
          name: file.name ?? 'resume.pdf',
          uri: localCopy.localUri,
          size: file.size ?? undefined,
        });
        Toast.show({
          type: 'info',
          text1: 'Resume Uploaded',
          text2: file.name ?? 'Resume successfully attached.',
        });
      } else {
        Alert.alert(
          'Error',
          localCopy.copyError ?? 'Failed to process selected file',
        );
      }
    } catch (error: any) {
      // If user cancels, it throws an error which can be ignored
      if (error?.message && !error.message.includes('User canceled')) {
        console.error('File pick error:', error);
      }
    }
  };

  // Remove resume handler
  const handleRemoveResume = () => {
    setResume(null);
  };

  // Form submission validation & execution
  const handleSubmit = () => {
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!email) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Required Field',
    //     text2: 'Please enter your email address.',
    //   });
    //   return;
    // }
    // if (!emailRegex.test(email.trim())) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Invalid Email',
    //     text2: 'Please enter a valid email address.',
    //   });
    //   return;
    // }

    // // Validate resume
    // if (!resume) {
    //   Toast.show({
    //     type: 'error',
    //     text1: 'Required Field',
    //     text2: 'Please upload your resume to apply.',
    //   });
    //   return;
    // }

    // Simulate submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      Toast.show({
        type: 'success',
        text1: 'Application Confirmed',
        text2: 'Your application was successfully submitted!',
      });
      navigation.navigate('ApplicationSubmit');
    }, 1500);
  };

  // Format file size helper
  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <CommonHeader
        BackIcon
        onBackPress={() => navigation.goBack()}
        title="Apply Job"
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Job Details Hero Card ── */}
          <View style={styles.jobCard}>
            <View style={styles.logoContainer}>
              {/* Premium geometric mock logo */}
              <View style={styles.jobLogo}>
                <Icon name="office-building" size={32} color={COLORS.primary} />
              </View>
            </View>
            <View style={styles.jobDetailsContent}>
              <Text style={styles.jobTitleText} numberOfLines={2}>
                {job.title}
              </Text>
              <View style={styles.companyLocRow}>
                <Text style={styles.companyText}>{job.company}</Text>
                <Text style={styles.dotSeparator}>•</Text>
                <Text style={styles.locationText} numberOfLines={1}>
                  {job.location}
                </Text>
                <View style={styles.workModeBadge}>
                  <View style={styles.badgeDot} />
                  <Text style={styles.workModeText}>
                    {job.workMode || 'Hybrid'}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── Submit Application Card ── */}
          <View style={styles.formCard}>
            {/* Form Title Row */}
            <View style={styles.formHeaderRow}>
              <View style={styles.circleCheckIcon}>
                <Icon name="check-circle" size={18} color={COLORS.primary} />
              </View>
              <Text style={styles.formHeaderTitle}>
                Submit your application
              </Text>
            </View>

            <View style={styles.divider} />

            {/* Alert Banner */}
            <View style={styles.alertBanner}>
              <Icon
                name="information-outline"
                size={20}
                color={COLORS.primary}
                style={styles.alertIcon}
              />
              <Text style={styles.alertText}>
                All fields marked with an asterisk (
                <Text style={styles.redStarText}>*</Text>) are required. Ensure
                your information is accurate before submitting.
              </Text>
            </View>

            {/* Section Heading */}
            <Text style={styles.sectionHeadingText}>APPLICATION DETAILS</Text>

            {/* Form Fields: Test Input & Email Input (Row Layout) */}
            <View style={styles.inputsRow}>
              {/* Test Input */}
              <View style={styles.inputWrapper}>
                <Text style={styles.fieldLabelText}>test</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter test"
                  placeholderTextColor={COLORS.textMuted}
                  value={testInput}
                  onChangeText={setTestInput}
                  autoCapitalize="none"
                />
              </View>

              {/* Email Input */}
              <View style={styles.inputWrapper}>
                <View style={styles.labelRow}>
                  <Text style={styles.fieldLabelText}>email</Text>
                  <Text style={styles.redStarText}> *</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder="Enter email"
                  placeholderTextColor={COLORS.textMuted}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Resume Upload Box */}
            <View style={styles.resumeContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabelText}>resume</Text>
                <Text style={styles.redStarText}> *</Text>
              </View>

              {!resume ? (
                /* Empty / Upload Trigger State */
                <TouchableOpacity
                  style={styles.uploadBoxDashed}
                  activeOpacity={0.7}
                  onPress={handlePickResume}
                >
                  <View style={styles.cloudIconBadge}>
                    <Icon
                      name="cloud-upload-outline"
                      size={22}
                      color={COLORS.primary}
                    />
                  </View>
                  <Text style={styles.uploadBoldText}>
                    Click to upload or drag and drop
                  </Text>
                  <Text style={styles.uploadSubText}>
                    PDF or DOCX · Max 10 MB
                  </Text>
                </TouchableOpacity>
              ) : (
                /* Uploaded State Card */
                <View style={styles.fileCard}>
                  <View style={styles.fileLeft}>
                    <View style={styles.pdfIconBox}>
                      <Icon
                        name={
                          resume.name.toLowerCase().endsWith('.docx') ||
                          resume.name.toLowerCase().endsWith('.doc')
                            ? 'file-word-box'
                            : 'file-pdf-box'
                        }
                        size={28}
                        color={
                          resume.name.toLowerCase().endsWith('.docx') ||
                          resume.name.toLowerCase().endsWith('.doc')
                            ? '#2B579A'
                            : '#E53935'
                        }
                      />
                    </View>
                    <View style={styles.fileInfo}>
                      <Text style={styles.fileName} numberOfLines={1}>
                        {resume.name}
                      </Text>
                      <View style={styles.fileSizeRow}>
                        {resume.size ? (
                          <Text style={styles.fileSize}>
                            {formatFileSize(resume.size)}
                          </Text>
                        ) : null}
                        <Text style={styles.uploadedBadgeText}>
                          <Icon
                            name="check-circle"
                            size={11}
                            color={COLORS.success}
                          />{' '}
                          Attached
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      style={[styles.iconBtn, styles.updateBtn]}
                      onPress={handlePickResume}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name="pencil-outline"
                        size={18}
                        color={COLORS.primary}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[styles.iconBtn, styles.deleteBtn]}
                      onPress={handleRemoveResume}
                      activeOpacity={0.7}
                    >
                      <Icon
                        name="trash-can-outline"
                        size={18}
                        color={COLORS.danger}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ── Sticky Bottom Bar ─────────────────────────────────── */}
      <View style={styles.stickyBar}>
        <Button
          variant="outline"
          label="cancel"
          size="md"
          width={'30%'}
          onPress={() => navigation.goBack()}
        />
        <Button
          variant="gradient"
          label="Submit application"
          size="md"
          icon={<Icon name="arrow-right" size={18} color={COLORS.white} />}
          iconPosition="end"
          width={'65%'}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default ApplyJobScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  // ── Job Summary Card ──
  jobCard: {
    backgroundColor: COLORS.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  logoContainer: {
    marginRight: 16,
  },
  jobLogo: {
    width: 56,
    height: 56,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(8, 145, 178, 0.15)',
    flexShrink: 0,
  },
  blackLogoBox: {
    width: 52,
    height: 52,
    borderRadius: 10,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobDetailsContent: {
    flex: 1,
  },
  jobTitleText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.base,
    color: COLORS.gray800,
    // marginBottom: 4,
  },
  companyLocRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  companyText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
  dotSeparator: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray400,
    marginHorizontal: 6,
  },
  locationText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    maxWidth: 100,
  },
  workModeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    borderColor: 'rgba(16, 185, 129, 0.2)',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginTop: 4,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: COLORS.success,
    marginRight: 4,
  },
  workModeText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 10,
    color: COLORS.success,
  },
  // ── Form Card ──
  formCard: {
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  formHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  circleCheckIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formHeaderTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.base,
    color: COLORS.gray800,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: 14,
  },
  // Alert Banner
  alertBanner: {
    backgroundColor: 'rgba(8, 145, 178, 0.04)',
    borderColor: 'rgba(8, 145, 178, 0.12)',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 20,
  },
  alertIcon: {
    marginTop: 1,
  },
  alertText: {
    flex: 1,
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm - 0.5,
    color: COLORS.cyan800,
    lineHeight: 18,
  },
  sectionHeadingText: {
    fontFamily: FONT_FAMILY.IBold,
    fontSize: 10,
    color: COLORS.gray400,
    letterSpacing: 0.8,
    marginBottom: 14,
  },
  // Input fields (side-by-side row layout)
  inputsRow: {
    flexDirection: 'column',
    gap: 12,
    marginBottom: 16,
  },
  inputWrapper: {
    flex: 1,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabelText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 13,
    color: COLORS.gray700,
    marginBottom: 6,
  },
  redStarText: {
    color: COLORS.danger,
    fontFamily: FONT_FAMILY.PSemiBold,
  },
  textInput: {
    height: 44,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.white,
    color: COLORS.gray800,
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: 13,
  },
  // Resume File Selection Area
  resumeContainer: {
    marginBottom: 20,
  },
  uploadBoxDashed: {
    height: 140,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.gray300,
    borderRadius: 8,
    backgroundColor: '#FAFDFD',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    marginTop: 6,
  },
  cloudIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(8, 145, 178, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  uploadBoldText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 13,
    color: COLORS.gray700,
    marginBottom: 3,
  },
  uploadSubText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: 11,
    color: COLORS.gray400,
  },
  // File detail card when attached
  fileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    backgroundColor: COLORS.gray100,
    marginTop: 6,
  },
  fileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  pdfIconBox: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  fileInfo: {
    flex: 1,
  },
  fileName: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 13,
    color: COLORS.gray800,
  },
  fileSizeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
    gap: 8,
  },
  fileSize: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: 11,
    color: COLORS.gray500,
  },
  uploadedBadgeText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 11,
    color: COLORS.success,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateBtn: {
    backgroundColor: '#EAF0FF',
  },
  deleteBtn: {
    backgroundColor: '#FFEBEE',
  },
  // ── Sticky Bottom Bar ──
  stickyBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: Platform.OS === 'ios' ? 34 : 28,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 10,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  cancelBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 13,
    color: COLORS.gray600,
  },
  gradientBtnWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  confirmBtnGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
    gap: 4,
  },
  confirmBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: 13,
    color: COLORS.white,
  },
});
