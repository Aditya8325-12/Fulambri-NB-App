import { StyleSheet } from 'react-native';
import COLORS from '../../../../constants/colors';
import { FONT_FAMILY } from '../../../../constants/fonts';

const TEAL = '#00B5B5';
const TEAL_LIGHT = '#E6F7F7';
const TEXT_PRIMARY = '#1A1A1A';
const TEXT_SECONDARY = '#666';
const TEXT_MUTED = '#999';
const BG = '#F4F6F8';
const WHITE = '#FFFFFF';
const ORANGE = '#FF6B35';

export const Profilestyles = StyleSheet.create({
  // Profile Hero
  profileHero: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  avatarWrapper: {
    width: 110,
    height: 110,
    borderRadius: 62,
    borderWidth: 4,
    borderColor: TEAL,
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  profileName: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.gray800,
  },
  profileRole: {
    fontSize: 14,
    color: COLORS.gray600,
    fontFamily: FONT_FAMILY.IMedium,
  },

  // Card
  card: {
    backgroundColor: WHITE,
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },

  // Section Title
  sectionTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.PSemiBold,
    color: COLORS.gray800,
  },
  editIcon: {
    fontSize: 15,
  },
  Chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
  },
  ChipText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 12,
    color: COLORS.primary,
  },

  // Add Button
  addButton: {
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: TEAL,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: TEAL,
    fontWeight: '600',
    fontSize: 14,
  },

  // Chip
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
    borderColor: COLORS.info,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipCol: {
    flexDirection: 'column',
    gap: 8,
  },

  // Personal Info grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  infoCell: {
    width: '50%',
    marginBottom: 10,
  },
  infoFull: {
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.gray600,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 13,
    color: COLORS.gray700,
    fontFamily: FONT_FAMILY.PSemiBold,
  },

  // Resume
  resumeBox: {
    borderWidth: 1.5,
    borderColor: '#DDD',
    borderStyle: 'dashed',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 4,
  },
  resumeIcon: {
    fontSize: 32,
    marginBottom: 6,
    color: TEXT_MUTED,
  },
  resumeTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: TEXT_PRIMARY,
  },
  resumeSubtitle: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    textAlign: 'center',
    marginTop: 4,
    paddingHorizontal: 20,
  },

  // Summary
  summaryText: {
    fontSize: 13,
    color: TEXT_SECONDARY,
    lineHeight: 20,
  },

  // Experience
  expItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  expIconBox: {
    width: 40,
    height: 40,
    backgroundColor: TEAL_LIGHT,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  expIconText: {
    fontSize: 18,
  },
  expContent: {
    flex: 1,
  },
  expCompany: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  expRoleBadge: {
    backgroundColor: TEAL_LIGHT,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  expRoleText: {
    fontSize: 10,
    fontWeight: '700',
    color: TEAL,
    letterSpacing: 0.5,
  },
  expMeta: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginTop: 4,
  },

  // Education
  eduItem: {
    marginBottom: 10,
  },
  eduInstitution: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  eduRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 8,
  },
  eduDegree: {
    fontSize: 13,
    color: TEXT_SECONDARY,
  },
  eduYear: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 2,
  },

  // Badge orange
  badgeOrange: {
    backgroundColor: ORANGE,
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  badgeOrangeText: {
    fontSize: 10,
    fontWeight: '700',
    color: WHITE,
  },

  // Projects
  projectCard: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: COLORS.gray500,
  },
  projectTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
    marginBottom: 8,
  },
  viewProjectLink: {
    fontSize: 13,
    color: TEAL,
    fontWeight: '600',
    marginTop: 6,
  },

  // Achievements
  achieveItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  achieveIcon: {
    fontSize: 28,
    marginRight: 12,
  },
  achieveContent: {
    flex: 1,
  },
  achieveTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  achieveDesc: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginTop: 4,
    lineHeight: 18,
  },

  // Exams
  examItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  examLeft: {},
  examName: {
    fontSize: 14,
    fontWeight: '700',
    color: TEXT_PRIMARY,
  },
  examRank: {
    fontSize: 12,
    color: TEXT_SECONDARY,
    marginTop: 4,
  },
  examRight: {
    alignItems: 'flex-end',
    gap: 4,
  },
  examYear: {
    fontSize: 12,
    color: TEXT_MUTED,
    marginTop: 4,
  },
});
