import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Profilestyles } from '../../Styles/ProfileStyle';
import { Divider, SectionCard, SectionTitle } from './../Common';

const PersonalInfo = () => {
  return (
    <View>
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
    </View>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({});
