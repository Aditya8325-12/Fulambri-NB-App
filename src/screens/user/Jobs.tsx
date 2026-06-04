import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import CommonHeader from '../../components/common/CommonHeader';
import JobCard from '../../components/Jobs/JobCard';
import Button from '../../components/common/Button';
import {
  JOB_LISTINGS,
  SORT_OPTIONS,
} from '../../components/Jobs/SampleData/Data';
import SearchJobModal from '../../components/modals/SearchJobModal';
import FilterJobModal, {
  FilterState,
} from '../../components/modals/FilterJobModal';
import SearchJobTab from '../../components/Jobs/SearchJobTab';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../types/Navigation';
import Toast from 'react-native-toast-message';
const ResultsHeader = ({
  TotalJobs,
  cycleSort,
  sortLabel,
  onFilter,
  appliedFilterCount,
}: {
  TotalJobs: number;
  cycleSort: () => void;
  sortLabel: string;
  onFilter: () => void;
  appliedFilterCount: number;
}) => (
  <View style={styles.resultsRow}>
    <Text style={styles.resultsCount}>
      {TotalJobs} {TotalJobs === 1 ? 'Job' : 'Jobs'} Found
    </Text>
    <View style={styles.resultsActions}>
      <TouchableOpacity
        onPress={cycleSort}
        style={styles.sortBtn}
        activeOpacity={0.8}
      >
        <Text style={styles.sortLabel}>
          Sort by: <Text style={styles.sortValue}>{sortLabel}</Text>
        </Text>
        <Icon name="chevron-down" size={16} color={COLORS.secondary} />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onFilter}
        style={styles.filterIconBtn}
        activeOpacity={0.8}
      >
        <Icon name="tune-variant" size={18} color={COLORS.primary} />
        {appliedFilterCount > 0 && (
          <View style={styles.filterBadge}>
            <Text style={styles.filterBadgeText}>{appliedFilterCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  </View>
);

const CustomHeader = () => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Find Your Dream Job</Text>
        <Text style={styles.headerSubtitle}>
          Discover opportunities that match your skills
        </Text>
      </View>
      <View style={styles.headerRight}>
        <TouchableOpacity style={styles.headerIcon}>
          <Icon name="bell-outline" size={22} color={COLORS.gray700} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const NoJobs = ({ handleSearch }: { handleSearch: () => void }) => (
  <View style={styles.noJobsContainer}>
    <Icon
      name="briefcase-search-outline"
      size={64}
      color={COLORS.gray300}
      style={{ marginBottom: 12 }}
    />
    <Text style={styles.noJobsTitle}>No Jobs Found</Text>
    <Text style={styles.noJobsSubtitle}>
      We couldn't find any jobs matching your search criteria. Try modifying
      your search keywords.
    </Text>
    <Button
      variant="outline"
      label="Clear Filters"
      size="md"
      width={160}
      onPress={() => handleSearch()}
    />
  </View>
);

const Jobs = ({ route }: { route: RouteProp<RootStackParamList, 'Jobs'> }) => {
  const [jobTitle, setJobTitle] = useState(route.params?.keyword || '');
  const [location, setLocation] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [sortLabel, setSortLabel] = useState('Relevance');
  const [sortIndex, setSortIndex] = useState(0);
  const [showCustomHeader, setShowCustomHeader] = useState(true);
  const [showSearchModel, setShowSearchModel] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    experience: [],
    salary: [],
    location: [],
    companyType: [],
    workMode: [],
  });

  useEffect(() => {
    if (route.params?.keyword !== undefined) {
      setJobTitle(route.params.keyword);
      setSearchKeyword(route.params.keyword);
      Toast.show({
        type: 'success',
        text1: route.params.keyword || 'No keyword',
      });
    }
  }, [route.params?.keyword]);

  const filteredJobs = JOB_LISTINGS.filter(job => {
    const matchesKeyword = jobTitle
      ? job.title.toLowerCase().includes(jobTitle.toLowerCase()) ||
        job.description.toLowerCase().includes(jobTitle.toLowerCase()) ||
        job.company.toLowerCase().includes(jobTitle.toLowerCase())
      : true;
    const matchesLocation = location
      ? job.location.toLowerCase().includes(location.toLowerCase())
      : true;
    return matchesKeyword && matchesLocation;
  });

  const handleSearchSubmit = (keyword: string, loc: string) => {
    setJobTitle(keyword);
    setLocation(loc);
    setSearchKeyword(keyword);
    setSearchLocation(loc);
  };

  const cycleSort = () => {
    const next = (sortIndex + 1) % SORT_OPTIONS.length;
    setSortIndex(next);
    setSortLabel(SORT_OPTIONS[next]);
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    if (yOffset > 10) {
      if (showCustomHeader) {
        setShowCustomHeader(false);
      }
    } else {
      if (!showCustomHeader) {
        setShowCustomHeader(true);
      }
    }
  };

  const handleSearch = () => {
    setShowSearchModel(true);
  };

  const hideSearchModel = () => {
    setShowSearchModel(false);
  };

  const handleOpenFilter = () => {
    setShowFilterModal(true);
  };

  const handleApplyFilter = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  const appliedFilterCount = Object.values(activeFilters).reduce(
    (acc, arr) => acc + arr.length,
    0,
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.safeArea}>
        {/* ── Header ── */}
        {showCustomHeader && jobTitle === '' && location === '' ? (
          <CustomHeader />
        ) : (
          <CommonHeader
            leftIcon
            SearchBar
            BellIcon
            onSearch={handleSearch}
            Location={location}
            Keyword={jobTitle}
          />
        )}

        {/* ── Results Header ── */}
        {(jobTitle !== '' || location !== '') && (
          <View style={{ paddingHorizontal: 16, paddingVertical: 4 }}>
            <ResultsHeader
              TotalJobs={filteredJobs.length}
              cycleSort={cycleSort}
              sortLabel={sortLabel}
              onFilter={handleOpenFilter}
              appliedFilterCount={appliedFilterCount}
            />
          </View>
        )}

        {/* Search Job Modal  */}
        <SearchJobModal
          visible={showSearchModel}
          hideModal={hideSearchModel}
          initialKeyword={jobTitle}
          initialLocation={location}
          onModifySearch={handleSearchSubmit}
        />

        {/* Filter Job Modal  */}
        <FilterJobModal
          visible={showFilterModal}
          onClose={() => setShowFilterModal(false)}
          onApply={handleApplyFilter}
          initialFilters={activeFilters}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          {showCustomHeader && jobTitle === '' && location === '' && (
            <View>
              <SearchJobTab
                keyword={searchKeyword}
                location={searchLocation}
                onSearch={handleSearchSubmit}
              />

              <ResultsHeader
                TotalJobs={filteredJobs.length}
                cycleSort={cycleSort}
                sortLabel={sortLabel}
                onFilter={handleOpenFilter}
                appliedFilterCount={appliedFilterCount}
              />
            </View>
          )}

          {/* ── Job Listings ── */}
          {filteredJobs.length === 0 ? (
            <NoJobs handleSearch={() => handleSearchSubmit('', '')} />
          ) : (
            filteredJobs.map(item => <JobCard key={item.id} item={item} />)
          )}

          <View style={{ height: 120 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Jobs;

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.background,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 18,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.lg,
    color: '#1E293B',
  },
  headerSubtitle: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerIcon: {
    position: 'relative',
    padding: 4,
  },
  notifDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    position: 'absolute',
    top: 2,
    right: 2,
    borderWidth: 1.5,
    borderColor: COLORS.background,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.md,
    color: '#fff',
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 12,
    paddingTop: 4,
  },

  // Results Row
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    marginTop: 4,
    paddingHorizontal: 4,
  },
  resultsCount: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
  },
  resultsActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  sortBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  sortLabel: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  sortValue: {
    fontFamily: FONT_FAMILY.ISemiBold,
    color: COLORS.secondary,
  },
  filterIconBtn: {
    position: 'relative',
    padding: 6,
    borderRadius: 8,
    backgroundColor: COLORS.backgroundSecondary,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  filterBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  filterBadgeText: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: 9,
    color: COLORS.white,
  },

  // no Jobs
  noJobsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
    marginBottom: 20,
  },
  noJobsTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.lg,
    color: COLORS.gray800,
    marginBottom: 6,
  },
  noJobsSubtitle: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
});
