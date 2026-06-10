import { View, Text } from 'react-native';
import React from 'react';
import { Divider, SectionCard, SectionTitle } from './Common';
import { Profilestyles } from '../Styles/ProfileStyle';

const ProfileSummary = () => {
  return (
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
};

export default ProfileSummary;
