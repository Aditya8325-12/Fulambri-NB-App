import React, { useState, useMemo, useRef, useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CommonHeader from '../../../components/common/CommonHeader';
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
} from '@react-navigation/native';
import { DrawerParamList } from '../../../types/Navigation';
import SearchBar from './components/SearchBar';
import FilterChip from './components/FilterChip';
import ResultsHeader from './components/ResultsHeader';
import ApplicationCard from './components/ApplicationCard';
import EmptyState from './components/EmptyState';
import { Application, FilterTab } from './types/Applications';
import { FILTER_TABS, SAMPLE_APPLICATIONS } from './data/SampleData';
import COLORS from '../../../constants/colors';

// ─── Main Screen ─────────────────────────────────────────────────────────────
const Applications = () => {
  const navigation = useNavigation<NavigationProp<DrawerParamList>>();
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  // Count per filter tab
  const filterCounts = useMemo(() => {
    const counts: Record<FilterTab, number> = {
      All: SAMPLE_APPLICATIONS.length,
      Applied: 0,
      'Under Review': 0,
      'Interview Scheduled': 0,
      Rejected: 0,
      'Offer Received': 0,
    };
    SAMPLE_APPLICATIONS.forEach(a => {
      counts[a.status]++;
    });
    return counts;
  }, []);

  // Filtered + searched list
  const filteredApps = useMemo(() => {
    let list = SAMPLE_APPLICATIONS;
    if (activeFilter !== 'All') {
      list = list.filter(a => a.status === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        a =>
          a.jobTitle.toLowerCase().includes(q) ||
          a.company.toLowerCase().includes(q),
      );
    }
    return list;
  }, [activeFilter, searchQuery]);

  const handleViewDetails = (_app: Application) => {
    // Navigate to job detail — extend as needed
  };

  const handleCta = () => {
    if (searchQuery.length > 0) {
      setSearchQuery('');
    } else {
      navigation.navigate('MainTabs');
    }
  };

  useFocusEffect(
    useCallback(() => {
      scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      setActiveFilter('All');
      setSearchQuery('');
    }, []),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <CommonHeader title="My Applications" BackIcon BellIcon MessageIcon />

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* <StatsStrip apps={SAMPLE_APPLICATIONS} /> */}

        {/* ── Search Bar ── */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* ── Filter Tabs ── */}
        <View style={styles.filtersWrapper}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filtersContent}
          >
            {FILTER_TABS.map(tab => (
              <FilterChip
                key={tab.id}
                tab={tab}
                isActive={activeFilter === tab.id}
                count={filterCounts[tab.id]}
                onPress={() => setActiveFilter(tab.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* ── Results Header ── */}
        {filteredApps.length > 0 && (
          <ResultsHeader count={filteredApps.length} filter={activeFilter} />
        )}

        {/* ── Application Cards / Empty State ── */}
        {filteredApps.length > 0 ? (
          filteredApps.map((app, index) => (
            <ApplicationCard
              key={app.id}
              app={app}
              index={index}
              onViewDetails={handleViewDetails}
            />
          ))
        ) : (
          <EmptyState
            query={searchQuery}
            activeFilter={activeFilter}
            onCta={handleCta}
          />
        )}

        <View style={{ height: 80 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Applications;

const styles = StyleSheet.create({
  safe: {
    // backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    gap: 14,
  },

  // ── Filter Chips ──
  filtersWrapper: {
    marginHorizontal: -16,
    paddingVertical: 4,
  },
  filtersContent: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
});
