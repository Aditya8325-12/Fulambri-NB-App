import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../components/common/CommonHeader';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import COLORS from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../components/common/Button';
// ---------- Types ----------
interface Chip {
  label: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  workType: string;
}

interface EducationItem {
  institution: string;
  degree: string;
  badge?: string;
  year: string;
}

interface ProjectItem {
  title: string;
  tags: string[];
}

interface AchievementItem {
  icon: string;
  title: string;
  description: string;
}

interface ExamItem {
  name: string;
  rank: string;
  badge: string;
  year: string;
}

// ---------- Sub-components ----------

const SectionCard: React.FC<{ children: React.ReactNode; style?: object }> = ({
  children,
  style,
}) => <View style={[styles.card, style]}>{children}</View>;

const SectionTitle: React.FC<{
  title: string;
  editable?: boolean;
  addbtn?: boolean;
}> = ({ title, editable, addbtn }) => (
  <View style={styles.sectionTitleRow}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {editable && (
      <TouchableOpacity style={styles.Chip}>
        <Icon name="pencil" size={16} color={COLORS.primary} />
        <Text style={styles.ChipText}>Edit</Text>
      </TouchableOpacity>
    )}
    {addbtn && (
      <TouchableOpacity style={styles.Chip}>
        <Icon name="plus" size={16} color={COLORS.primary} />
        <Text style={styles.ChipText}>Add {title}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const AddButton: React.FC<{ label: string }> = ({ label }) => (
  <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
    <Text style={styles.addButtonText}>+ {label}</Text>
  </TouchableOpacity>
);

const ChipTag: React.FC<{
  label: string;
  color?: string;
  textColor?: string;
}> = ({ label }) => (
  <View style={[styles.chip]}>
    <Text style={[styles.chipText, { color: COLORS.info }]}>{label}</Text>
  </View>
);

// ---------- Sections ----------

const ProfileHero = () => (
  <View style={styles.profileHero}>
    <View style={styles.avatarWrapper}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100?img=68' }}
        style={styles.avatar}
      />
    </View>
    <Text style={styles.profileName}>Abhishek Kulkarni</Text>
    <Text style={styles.profileRole}>Senior Software Engineer</Text>
  </View>
);

const PersonalInfo = () => (
  <SectionCard>
    <SectionTitle title="Personal Info" editable />
    <Divider />

    <View style={styles.infoGrid}>
      <View style={styles.infoCell}>
        <Text style={styles.infoLabel}>Name</Text>
        <Text style={styles.infoValue}>Abhishek Fulambri</Text>
      </View>
      <View style={styles.infoCell}>
        <Text style={styles.infoLabel}>Title</Text>
        <Text style={styles.infoValue}>Senior SE</Text>
      </View>
      <View style={styles.infoCell}>
        <Text style={styles.infoLabel}>Location</Text>
        <Text style={styles.infoValue}>Mumbai, India</Text>
      </View>
      <View style={styles.infoCell}>
        <Text style={styles.infoLabel}>DOB</Text>
        <Text style={styles.infoValue}>12 May 1995</Text>
      </View>
    </View>
    <View style={styles.infoFull}>
      <Text style={styles.infoLabel}>Email</Text>
      <Text style={styles.infoValue}>abhishek.f@example.com</Text>
    </View>
    <View style={styles.infoGrid}>
      <View style={styles.infoCell}>
        <Text style={styles.infoLabel}>Gender</Text>
        <Text style={styles.infoValue}>Male</Text>
      </View>
      <View style={styles.infoCell}>
        <Text style={styles.infoLabel}>Phone</Text>
        <Text style={styles.infoValue}>+91 98765 43210</Text>
      </View>
    </View>
  </SectionCard>
);

const ResumeSection = () => (
  <SectionCard>
    <SectionTitle title="Resume" />
    <Divider />
    <View style={styles.resumeBox}>
      <Text style={styles.resumeIcon}>📄</Text>
      <Text style={styles.resumeTitle}>No resume uploaded yet</Text>
      <Text style={styles.resumeSubtitle}>
        Increase your profile visibility by 40% with a CV.
      </Text>
    </View>
    <AddButton label="Upload Document" />
  </SectionCard>
);

const ProfileSummary = () => (
  <SectionCard>
    <SectionTitle title="Profile Summary" editable />
    <Divider />
    <Text style={styles.summaryText}>
      Passionate Senior Software Engineer with 6+ years of experience in
      full-stack development. Specialist in building scalable web applications
      using React, Node.js, and modern cloud architectures. Committed to
      high-quality code and user-centric design.
    </Text>
  </SectionCard>
);

const ExperienceSection = () => {
  const experiences: ExperienceItem[] = [
    {
      company: 'Tech Innovators Corp',
      role: 'SENIOR ENGINEER',
      period: 'Jan 2021 - Present',
      workType: 'Remote',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Experience" addbtn />
      <Divider />
      {experiences.map((exp, i) => (
        <View key={i} style={styles.expItem}>
          <View style={styles.expIconBox}>
            <Text style={styles.expIconText}>🏢</Text>
          </View>
          <View style={styles.expContent}>
            <Text style={styles.expCompany}>{exp.company}</Text>
            <View style={styles.expRoleBadge}>
              <Text style={styles.expRoleText}>{exp.role}</Text>
            </View>
            <Text style={styles.expMeta}>📅 {exp.period}</Text>
            <Text style={styles.expMeta}>📍 {exp.workType}</Text>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

const SkillsSection = () => {
  const skills: Chip[] = [
    { label: 'Mongo DB' },
    { label: 'React' },
    { label: 'Node.js' },
    { label: 'AWS Cloud' },
    { label: 'Tailwind CSS' },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Skills" addbtn />
      <Divider />
      <View style={styles.chipRow}>
        {skills.map((s, i) => (
          <ChipTag key={i} label={s.label} />
        ))}
      </View>
    </SectionCard>
  );
};

const LanguagesSection = () => {
  const languages: Chip[] = [
    { label: 'English - Fluent' },
    { label: 'Hindi - Read, Write, Speak' },
    { label: 'Marathi - Native' },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Languages" addbtn />
      <Divider />
      <View style={styles.chipRow}>
        {languages.map((l, i) => (
          <ChipTag key={i} label={l.label} />
        ))}
      </View>
    </SectionCard>
  );
};

const EducationSection = () => {
  const education: EducationItem[] = [
    {
      institution: 'University of Mumbai',
      degree: 'B.E. Comp Sci',
      badge: '97.8%',
      year: 'Class of 2017',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Education" addbtn />
      <Divider />
      {education.map((edu, i) => (
        <View key={i} style={styles.eduItem}>
          <Text style={styles.eduInstitution}>{edu.institution}</Text>
          <View style={styles.eduRow}>
            <Text style={styles.eduDegree}>{edu.degree}</Text>
            {edu.badge && (
              <View style={styles.badgeOrange}>
                <Text style={styles.badgeOrangeText}>{edu.badge}</Text>
              </View>
            )}
          </View>
          <Text style={styles.eduYear}>{edu.year}</Text>
        </View>
      ))}
    </SectionCard>
  );
};

const ProjectsSection = () => {
  const projects: ProjectItem[] = [
    { title: 'FinTech Dashboard', tags: ['React', 'D3.js', 'Firebase'] },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Projects" addbtn />
      <Divider />
      {projects.map((proj, i) => (
        <View key={i} style={styles.projectCard}>
          <Text style={styles.projectTitle}>{proj.title}</Text>
          <View style={styles.chipRow}>
            {proj.tags.map((t, j) => (
              <ChipTag key={j} label={t} color="#F0F0F0" textColor="#555" />
            ))}
          </View>
          <TouchableOpacity>
            <Text style={styles.viewProjectLink}>View Project ↗</Text>
          </TouchableOpacity>
        </View>
      ))}
    </SectionCard>
  );
};

const AchievementsSection = () => {
  const achievements: AchievementItem[] = [
    {
      icon: '🏆',
      title: 'Hackathon Winner 2023',
      description:
        'Awarded 1st place among 50 teams for AI-driven hiring solution.',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Achievements" addbtn />
      <Divider />
      {achievements.map((a, i) => (
        <View key={i} style={styles.achieveItem}>
          <Text style={styles.achieveIcon}>{a.icon}</Text>
          <View style={styles.achieveContent}>
            <Text style={styles.achieveTitle}>{a.title}</Text>
            <Text style={styles.achieveDesc}>{a.description}</Text>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

const CompetitiveExamsSection = () => {
  const exams: ExamItem[] = [
    {
      name: 'GATE (CSE)',
      rank: 'Rank: 452',
      badge: '99.1 Percentile',
      year: '2017',
    },
  ];
  return (
    <SectionCard>
      <SectionTitle title="Competitive Exams" addbtn />
      <Divider />
      {exams.map((exam, i) => (
        <View key={i} style={styles.examItem}>
          <View style={styles.examLeft}>
            <Text style={styles.examName}>{exam.name}</Text>
            <Text style={styles.examRank}>{exam.rank}</Text>
          </View>
          <View style={styles.examRight}>
            <View style={styles.badgeOrange}>
              <Text style={styles.badgeOrangeText}>{exam.badge}</Text>
            </View>
            <Text style={styles.examYear}>{exam.year}</Text>
          </View>
        </View>
      ))}
    </SectionCard>
  );
};

const Divider = () => (
  <View
    style={{
      height: 0.6,
      backgroundColor: COLORS.gray400,
      marginTop: 8,
      marginBottom: 16,
    }}
  ></View>
);

// ---------- Main Screen ----------

const ProfileScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <CommonHeader title="Profile" leftIcon BellIcon />
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ProfileHero />
        <PersonalInfo />
        <ResumeSection />
        <ProfileSummary />
        <ExperienceSection />
        <SkillsSection />
        <LanguagesSection />
        <EducationSection />
        <ProjectsSection />
        <AchievementsSection />
        <CompetitiveExamsSection />
        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

// ---------- Styles ----------

const TEAL = '#00B5B5';
const TEAL_LIGHT = '#E6F7F7';
const TEXT_PRIMARY = '#1A1A1A';
const TEXT_SECONDARY = '#666';
const TEXT_MUTED = '#999';
const BG = '#F4F6F8';
const WHITE = '#FFFFFF';
const ORANGE = '#FF6B35';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BG,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

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
