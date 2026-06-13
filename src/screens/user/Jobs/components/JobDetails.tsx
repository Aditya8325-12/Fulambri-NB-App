import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
import { JobDetail } from '../types/JobDetailsType';
// ─── Info Grid Component ──────────────────────────────────────────────────────
export const InfoGrid = ({ job }: { job: JobDetail }) => {
  return (
    <View style={styles.infoGrid}>
      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: 'rgba(16, 185, 129, 0.06)',
            borderColor: 'rgba(16, 185, 129, 0.15)',
          },
        ]}
      >
        <View
          style={[
            styles.infoIconWrap,
            { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
          ]}
        >
          <Icon name="currency-inr" size={16} color={COLORS.success} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoLabel}>CTC / Salary</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {job.ctc}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: 'rgba(59, 130, 246, 0.06)',
            borderColor: 'rgba(59, 130, 246, 0.15)',
          },
        ]}
      >
        <View
          style={[
            styles.infoIconWrap,
            { backgroundColor: 'rgba(59, 130, 246, 0.1)' },
          ]}
        >
          <Icon name="briefcase-outline" size={16} color={COLORS.info} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoLabel}>Job Type</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {job.employmentType}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: 'rgba(245, 158, 11, 0.06)',
            borderColor: 'rgba(245, 158, 11, 0.15)',
          },
        ]}
      >
        <View
          style={[
            styles.infoIconWrap,
            { backgroundColor: 'rgba(245, 158, 11, 0.1)' },
          ]}
        >
          <Icon name="clock-outline" size={16} color={COLORS.warning} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoLabel}>Experience</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {job.experience}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.infoCard,
          {
            backgroundColor: 'rgba(239, 68, 68, 0.06)',
            borderColor: 'rgba(239, 68, 68, 0.15)',
          },
        ]}
      >
        <View
          style={[
            styles.infoIconWrap,
            { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
          ]}
        >
          <Icon name="calendar-outline" size={16} color={COLORS.danger} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.infoLabel}>Apply By</Text>
          <Text style={styles.infoValue} numberOfLines={1}>
            {job.applyBy}
          </Text>
        </View>
      </View>
    </View>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────
export const SectionHeader = ({
  icon,
  title,
}: {
  icon: string;
  title: string;
}) => (
  <View style={styles.sectionHeaderRow}>
    <View style={styles.sectionIconWrap}>
      <Icon name={icon} size={18} color={COLORS.primary} />
    </View>
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// ─── Bullet Item ──────────────────────────────────────────────────────────────
export const BulletItem = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletCheckWrap}>
      <Icon name="check" size={12} color={COLORS.success} />
    </View>
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

// ─── Skill Chip ───────────────────────────────────────────────────────────────
export const SkillChip = ({ skill }: { skill: string }) => (
  <View style={styles.skillChip}>
    <Text style={styles.skillChipText}>{skill}</Text>
  </View>
);

const styles = StyleSheet.create({
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
    gap: 10,
  },
  infoCard: {
    width: '48%',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoLabel: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
  },
  infoValue: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray800,
    marginTop: 1,
  },

  // ── Section ─────────────────────────────────────────────────────────────────

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  sectionIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: 'rgba(8, 145, 178, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray800,
  },

  // ── Bullet ──────────────────────────────────────────────────────────────────
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
  },
  bulletCheckWrap: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  bulletText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
    lineHeight: 20,
    flex: 1,
  },

  // ── Skill Chip ───────────────────────────────────────────────────────────────
  skillChip: {
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 6,
    // backgroundColor: 'rgba(8, 145, 178, 0.06)',
    borderWidth: 1,
    borderColor: COLORS.cyan400,
  },
  skillChipText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
});
