import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import COLORS from '../../../constants/colors';
import CommonHeader from '../../../components/common/CommonHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import Categories from './components/Categories';
import FeaturedJobs from './components/FeaturedJobs';
import GovtJobsBanner from './components/GovtJobsBanner';
import RecommendedJobs from './components/RecommendedJobs';
import RecentJobs from './components/RecentJobs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types/Navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

const Home = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const handleOnSearch = () => {
    navigation.navigate('Jobs', {
      keyword: '',
    });
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.safeArea}>
        <CommonHeader DrawerIcon SearchBar BellIcon onSearch={handleOnSearch} />
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Categories */}
          <Categories />

          {/* Featured Jobs */}
          <FeaturedJobs />

          {/* Government Jobs Banner */}
          <GovtJobsBanner />

          {/* Recommended for You */}
          <RecommendedJobs />

          {/* Recent Postings */}
          <RecentJobs />

          <View style={{ height: 50 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
  },
  scroll: {
    paddingBottom: 30,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
});
