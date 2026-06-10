import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChipTag, Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';
interface ProjectItem {
  title: string;
  tags: string[];
}

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

export default ProjectsSection;

const styles = StyleSheet.create({});
