import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import Button from '../../components/common/Button';
import { QUICK_CATEGORIES } from './SampleData/Data';
const SearchJobTab = ({
  keyword,
  location,
  onSearch,
}: {
  keyword: string;
  location: string;
  onSearch: (keyword: string, location: string) => void;
}) => {
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [searchLocation, setSearchLocation] = useState(location);

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    setSearchLocation(location);
  }, [location]);

  const handleSearch = () => {
    onSearch(searchKeyword, searchLocation);
  };

  return (
    <View>
      {/* search tab  */}
      <View style={styles.searchCard}>
        <View style={styles.searchInput}>
          <Icon name="magnify" size={18} color={COLORS.gray400} />
          <TextInput
            style={styles.searchTextInput}
            placeholder="Job title, keyword..."
            placeholderTextColor={COLORS.textMuted}
            value={searchKeyword}
            onChangeText={setSearchKeyword}
          />
        </View>
        <View style={styles.searchDivider} />
        <View style={styles.searchInput}>
          <Icon name="map-marker-outline" size={18} color={COLORS.gray400} />
          <TextInput
            style={styles.searchTextInput}
            placeholder="City, state or remote"
            placeholderTextColor={COLORS.textMuted}
            value={searchLocation}
            onChangeText={setSearchLocation}
          />
        </View>
        <View style={{ marginTop: 6 }}>
          <Button
            variant="gradient"
            label="Search Jobs"
            size="md"
            onPress={() => {
              handleSearch();
            }}
          />
        </View>
      </View>

      {/* ── Quick Categories ── */}
      <Text style={styles.quickCatLabel}>QUICK CATEGORIES</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.quickCatRow}
      >
        {QUICK_CATEGORIES.map(cat => {
          return (
            <TouchableOpacity
              key={cat.id}
              onPress={() => {
                setSearchKeyword(cat.label);
                onSearch(cat.label, searchLocation);
              }}
              activeOpacity={0.8}
              style={[styles.quickCatChip]}
            >
              <Text style={[styles.quickCatText]}>{cat.label}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default SearchJobTab;

const styles = StyleSheet.create({
  searchCard: {
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    gap: 4,
  },
  searchInput: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  searchTextInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.md,
    color: '#1E293B',
    padding: 0,
  },
  searchDivider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 2,
  },
  searchBtn: {
    marginTop: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 30,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 5,
  },
  searchBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#fff',
    letterSpacing: 0.3,
  },

  // Quick Categories
  quickCatLabel: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray500,
    letterSpacing: 1.2,
    marginVertical: 6,
  },
  quickCatRow: {
    gap: 8,
    paddingBottom: 16,
    paddingTop: 6,
  },
  quickCatChip: {
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  quickCatText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: '#334155',
  },
});
