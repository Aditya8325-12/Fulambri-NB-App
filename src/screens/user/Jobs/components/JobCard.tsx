import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { JOB_LISTINGS } from '../SampleData/Data';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
import COLORS from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DrawerParamList } from '../../../../types/Navigation';

const JobCard = ({ item }: { item: (typeof JOB_LISTINGS)[0] }) => {
  const navigation = useNavigation<any>();
  const handlePress = () => {
    navigation.navigate('JobsStack', {
      screen: 'JobDetailsScreen',
      params: { fromSaveJob: false },
    } as any);
  };
  const handleApplyNow = () => {
    navigation.navigate('JobsStack', {
      screen: 'ApplyJob',
      params: { job: item, fromJobDetails: false },
      initial: false,
    } as any);
  };
  return (
    <TouchableOpacity
      style={styles.jobCard}
      activeOpacity={0.82}
      onPress={handlePress}
    >
      <View style={styles.jobCardTop}>
        {/* Logo */}
        <View style={[styles.jobLogo, { backgroundColor: '#EFF6FF' }]}>
          <Icon name="office-building" size={22} color={COLORS.gray400} />
        </View>

        {/* Title + Bookmark */}
        <View style={styles.jobTitleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.jobTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[styles.jobCompany, { color: COLORS.gray400 }]}>
              {item.company}
            </Text>
          </View>
          <TouchableOpacity style={styles.bookmarkBtn} activeOpacity={0.7}>
            <Icon name="bookmark-outline" size={20} color={COLORS.gray400} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Location */}
      <View style={styles.locationRow}>
        <Icon name="map-marker-outline" size={14} color={COLORS.gray500} />
        <Text style={styles.locationText}>{item.location}</Text>
      </View>

      {/* Tags */}
      <View style={styles.tagRow}>
        {item.tags.map((tag, idx) => (
          <View
            key={idx}
            style={[styles.tag, { backgroundColor: item.tagColors[idx] }]}
          >
            <Text style={[styles.tagText, { color: item.tagTextColors[idx] }]}>
              {tag}
            </Text>
          </View>
        ))}
      </View>

      {/* Description */}
      <Text style={styles.jobDescription} numberOfLines={2}>
        {item.description}
      </Text>

      {/* Footer */}
      <View style={styles.jobFooter}>
        <View>
          <Text style={styles.jobSalary}>{item.salary}</Text>
          <Text style={styles.jobPosted}>{item.postedTime}</Text>
        </View>
        <TouchableOpacity
          onPress={handleApplyNow}
          style={styles.applyBtnContainer}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={COLORS.gradients.primary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.applyBtnGradient}
          >
            <Text style={styles.applyBtnText}>Apply Now</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default JobCard;

const styles = StyleSheet.create({
  applyBtnContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  applyBtnGradient: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jobCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  jobCardTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 10,
  },
  jobLogo: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  jobTitleRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  jobTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
    marginBottom: 2,
  },
  jobCompany: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
  },
  bookmarkBtn: {
    padding: 4,
    marginLeft: 4,
  },
  // Location
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 10,
  },
  locationText: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },

  // Tags
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10,
  },
  tag: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: 11,
  },

  // Description
  jobDescription: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    lineHeight: 20,
    marginBottom: 14,
  },

  // Footer
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  jobSalary: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
    marginBottom: 2,
  },
  jobPosted: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray400,
  },

  applyBtnText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: '#fff',
  },
});
