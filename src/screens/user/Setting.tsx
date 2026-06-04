import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../../constants/colors';

// ─── Types ─────────────────────────────────────────────────────────────────────

type SettingRowProps = {
  icon: string;
  label: string;
  sublabel?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
};

// ─── Setting Row Component ──────────────────────────────────────────────────────

const SettingRow: React.FC<SettingRowProps> = ({
  icon,
  label,
  sublabel,
  onPress,
  rightElement,
  danger = false,
}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={styles.settingRow}
  >
    <View style={[styles.iconBadge, danger && styles.iconBadgeDanger]}>
      <Text style={styles.iconText}>{icon}</Text>
    </View>
    <View style={styles.rowTextWrap}>
      <Text style={[styles.rowLabel, danger && styles.rowLabelDanger]}>
        {label}
      </Text>
      {sublabel ? <Text style={styles.rowSublabel}>{sublabel}</Text> : null}
    </View>
    {rightElement ?? (
      <Text style={[styles.chevron, danger && { color: COLORS.danger }]}>›</Text>
    )}
  </TouchableOpacity>
);

// ─── Section Header ─────────────────────────────────────────────────────────────

const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Text style={styles.sectionHeader}>{title}</Text>
);

// ─── Divider ────────────────────────────────────────────────────────────────────

const Divider = () => <View style={styles.divider} />;

// ─── Main Component ─────────────────────────────────────────────────────────────

const Setting = () => {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [jobAlertsEnabled, setJobAlertsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // TODO: dispatch logout action
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Profile Card ── */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrap}>
            <View style={styles.avatarGradient}>
              <Text style={styles.avatarInitials}>AK</Text>
            </View>
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Aditya Kumar</Text>
            <Text style={styles.profileEmail}>aditya@example.com</Text>
            <View style={styles.profileBadge}>
              <Text style={styles.profileBadgeText}>Job Seeker</Text>
            </View>
          </View>
        </View>

        {/* ── Account ── */}
        <SectionHeader title="ACCOUNT" />
        <View style={styles.card}>
          <SettingRow
            icon="👤"
            label="Edit Profile"
            sublabel="Update your personal details"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="📄"
            label="Resume"
            sublabel="Manage & upload your resume"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="🔒"
            label="Change Password"
            sublabel="Keep your account secure"
            onPress={() => {}}
          />
        </View>

        {/* ── Notifications ── */}
        <SectionHeader title="NOTIFICATIONS" />
        <View style={styles.card}>
          <SettingRow
            icon="🔔"
            label="Push Notifications"
            sublabel="Receive alerts on your device"
            rightElement={
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
          <Divider />
          <SettingRow
            icon="📧"
            label="Email Notifications"
            sublabel="Get updates in your inbox"
            rightElement={
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
          <Divider />
          <SettingRow
            icon="💼"
            label="Job Alerts"
            sublabel="Be notified of new job postings"
            rightElement={
              <Switch
                value={jobAlertsEnabled}
                onValueChange={setJobAlertsEnabled}
                trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
        </View>

        {/* ── Preferences ── */}
        <SectionHeader title="PREFERENCES" />
        <View style={styles.card}>
          <SettingRow
            icon="🌍"
            label="Language"
            sublabel="English (US)"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="📍"
            label="Location"
            sublabel="Bengaluru, India"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="🎯"
            label="Job Preferences"
            sublabel="Role, industry & salary range"
            onPress={() => {}}
          />
        </View>

        {/* ── App Settings ── */}
        <SectionHeader title="APP SETTINGS" />
        <View style={styles.card}>
          <SettingRow
            icon="🌙"
            label="Dark Mode"
            sublabel="Switch to dark theme"
            rightElement={
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: COLORS.gray200, true: COLORS.primary }}
                thumbColor={COLORS.white}
              />
            }
          />
          <Divider />
          <SettingRow
            icon="🔒"
            label="Privacy Policy"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="📋"
            label="Terms & Conditions"
            onPress={() => {}}
          />
          <Divider />
          <SettingRow
            icon="ℹ️"
            label="About App"
            sublabel="Version 1.0.0"
            onPress={() => {}}
          />
        </View>

        {/* ── Logout ── */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleLogout}
          style={styles.logoutBtn}
        >
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.gray800,
    letterSpacing: 0.3,
  },

  // Scroll
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  // Profile Card
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 14,
  },
  avatarGradient: {
    width: 62,
    height: 62,
    borderRadius: 31,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.white,
    letterSpacing: 1,
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.gray800,
    marginBottom: 2,
  },
  profileEmail: {
    fontSize: 13,
    color: COLORS.gray500,
    marginBottom: 6,
  },
  profileBadge: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.miniPrimary,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  profileBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.primary,
  },

  // Section Header
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.gray400,
    letterSpacing: 1.2,
    marginBottom: 8,
    marginLeft: 4,
  },

  // Card
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },

  // Setting Row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.backgroundSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconBadgeDanger: {
    backgroundColor: '#FEF2F2',
  },
  iconText: {
    fontSize: 18,
  },
  rowTextWrap: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray700,
  },
  rowLabelDanger: {
    color: COLORS.danger,
  },
  rowSublabel: {
    fontSize: 12,
    color: COLORS.gray400,
    marginTop: 2,
  },
  chevron: {
    fontSize: 20,
    color: COLORS.gray300,
    fontWeight: '300',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginLeft: 66,
  },

  // Logout Button
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 14,
    paddingVertical: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.danger,
    letterSpacing: 0.3,
  },
});