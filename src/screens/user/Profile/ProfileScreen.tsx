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
import CommonHeader from '../../../components/common/CommonHeader';
import COLORS from '../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { DrawerParamList } from '../../../types/Navigation';
import { Profilestyles } from './../Profile/Styles/ProfileStyle';

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
}) => <View style={[Profilestyles.card, style]}>{children}</View>;

const SectionTitle: React.FC<{
  title: string;
  editable?: boolean;
  addbtn?: boolean;
}> = ({ title, editable, addbtn }) => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const onEditClick = () => {
    navigation.navigate('EditProfile', {
      EDIT: true,
      ADD: false,
      title: title,
    });
  };

  const onAddClick = () => {
    navigation.navigate('EditProfile', {
      EDIT: false,
      ADD: true,
      title: title,
    });
  };

  return (
    <View style={Profilestyles.sectionTitleRow}>
      <Text style={Profilestyles.sectionTitle}>{title}</Text>
      {editable && (
        <TouchableOpacity style={Profilestyles.Chip} onPress={onEditClick}>
          <Icon name="pencil" size={16} color={COLORS.primary} />
          <Text style={Profilestyles.ChipText}>Edit</Text>
        </TouchableOpacity>
      )}
      {addbtn && (
        <TouchableOpacity style={Profilestyles.Chip} onPress={onAddClick}>
          <Icon name="plus" size={16} color={COLORS.primary} />
          <Text style={Profilestyles.ChipText}>Add {title}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const AddButton: React.FC<{ label: string }> = ({ label }) => (
  <TouchableOpacity style={Profilestyles.addButton} activeOpacity={0.8}>
    <Text style={Profilestyles.addButtonText}>+ {label}</Text>
  </TouchableOpacity>
);

const ChipTag: React.FC<{
  label: string;
  color?: string;
  textColor?: string;
}> = ({ label }) => (
  <View style={[Profilestyles.chip]}>
    <Text style={[Profilestyles.chipText, { color: COLORS.info }]}>
      {label}
    </Text>
  </View>
);

// ---------- Sections ----------

const ProfileHero = () => (
  <View style={Profilestyles.profileHero}>
    <View style={Profilestyles.avatarWrapper}>
      <Image
        source={{ uri: 'https://i.pravatar.cc/100?img=68' }}
        style={Profilestyles.avatar}
      />
    </View>
    <Text style={Profilestyles.profileName}>Abhishek Kulkarni</Text>
    <Text style={Profilestyles.profileRole}>Senior Software Engineer</Text>
  </View>
);

const PersonalInfo = () => (
  <SectionCard>
    <SectionTitle title="Personal Info" editable />
    <Divider />

    <View style={Profilestyles.infoGrid}>
      <View style={Profilestyles.infoCell}>
        <Text style={Profilestyles.infoLabel}>Name</Text>
        <Text style={Profilestyles.infoValue}>Abhishek Fulambri</Text>
      </View>
      <View style={Profilestyles.infoCell}>
        <Text style={Profilestyles.infoLabel}>Title</Text>
        <Text style={Profilestyles.infoValue}>Senior SE</Text>
      </View>
      <View style={Profilestyles.infoCell}>
        <Text style={Profilestyles.infoLabel}>Location</Text>
        <Text style={Profilestyles.infoValue}>Mumbai, India</Text>
      </View>
      <View style={Profilestyles.infoCell}>
        <Text style={Profilestyles.infoLabel}>DOB</Text>
        <Text style={Profilestyles.infoValue}>12 May 1995</Text>
      </View>
    </View>
    <View style={Profilestyles.infoFull}>
      <Text style={Profilestyles.infoLabel}>Email</Text>
      <Text style={Profilestyles.infoValue}>abhishek.f@example.com</Text>
    </View>
    <View style={Profilestyles.infoGrid}>
      <View style={Profilestyles.infoCell}>
        <Text style={Profilestyles.infoLabel}>Gender</Text>
        <Text style={Profilestyles.infoValue}>Male</Text>
      </View>
      <View style={Profilestyles.infoCell}>
        <Text style={Profilestyles.infoLabel}>Phone</Text>
        <Text style={Profilestyles.infoValue}>+91 98765 43210</Text>
      </View>
    </View>
  </SectionCard>
);

const ResumeSection = () => (
  <SectionCard>
    <SectionTitle title="Resume" />
    <Divider />
    <View style={Profilestyles.resumeBox}>
      <Text style={Profilestyles.resumeIcon}>📄</Text>
      <Text style={Profilestyles.resumeTitle}>No resume uploaded yet</Text>
      <Text style={Profilestyles.resumeSubtitle}>
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
    <Text style={Profilestyles.summaryText}>
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
        <View key={i} style={Profilestyles.expItem}>
          <View style={Profilestyles.expIconBox}>
            <Text style={Profilestyles.expIconText}>🏢</Text>
          </View>
          <View style={Profilestyles.expContent}>
            <Text style={Profilestyles.expCompany}>{exp.company}</Text>
            <View style={Profilestyles.expRoleBadge}>
              <Text style={Profilestyles.expRoleText}>{exp.role}</Text>
            </View>
            <Text style={Profilestyles.expMeta}>📅 {exp.period}</Text>
            <Text style={Profilestyles.expMeta}>📍 {exp.workType}</Text>
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
      <View style={Profilestyles.chipRow}>
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
      <View style={Profilestyles.chipRow}>
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
        <View key={i} style={Profilestyles.eduItem}>
          <Text style={Profilestyles.eduInstitution}>{edu.institution}</Text>
          <View style={Profilestyles.eduRow}>
            <Text style={Profilestyles.eduDegree}>{edu.degree}</Text>
            {edu.badge && (
              <View style={Profilestyles.badgeOrange}>
                <Text style={Profilestyles.badgeOrangeText}>{edu.badge}</Text>
              </View>
            )}
          </View>
          <Text style={Profilestyles.eduYear}>{edu.year}</Text>
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
        <View key={i} style={Profilestyles.projectCard}>
          <Text style={Profilestyles.projectTitle}>{proj.title}</Text>
          <View style={Profilestyles.chipRow}>
            {proj.tags.map((t, j) => (
              <ChipTag key={j} label={t} color="#F0F0F0" textColor="#555" />
            ))}
          </View>
          <TouchableOpacity>
            <Text style={Profilestyles.viewProjectLink}>View Project ↗</Text>
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
        <View key={i} style={Profilestyles.achieveItem}>
          <Text style={Profilestyles.achieveIcon}>{a.icon}</Text>
          <View style={Profilestyles.achieveContent}>
            <Text style={Profilestyles.achieveTitle}>{a.title}</Text>
            <Text style={Profilestyles.achieveDesc}>{a.description}</Text>
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
        <View key={i} style={Profilestyles.examItem}>
          <View style={Profilestyles.examLeft}>
            <Text style={Profilestyles.examName}>{exam.name}</Text>
            <Text style={Profilestyles.examRank}>{exam.rank}</Text>
          </View>
          <View style={Profilestyles.examRight}>
            <View style={Profilestyles.badgeOrange}>
              <Text style={Profilestyles.badgeOrangeText}>{exam.badge}</Text>
            </View>
            <Text style={Profilestyles.examYear}>{exam.year}</Text>
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
      <CommonHeader title="Profile" DrawerIcon BellIcon />
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});
