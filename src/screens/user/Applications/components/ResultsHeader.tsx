import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import COLORS from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
import { AppStatus, FilterTab } from '../types/Applications';
import { STATUS_CONFIG } from '../data/SampleData';

const ResultsHeader = ({
  count,
  filter,
}: {
  count: number;
  filter: FilterTab;
}) => (
  <View style={styles.resultsHeader}>
    <Text style={styles.resultsCount}>
      <Text style={styles.resultsCountBold}>{count}</Text> application
      {count !== 1 ? 's' : ''}
    </Text>
    {filter !== 'All' && (
      <View
        style={[
          styles.activeFilterTag,
          {
            backgroundColor:
              STATUS_CONFIG[filter as AppStatus]?.bg ?? '#E0F2FE',
          },
        ]}
      >
        <Icon
          name={STATUS_CONFIG[filter as AppStatus]?.icon ?? 'filter'}
          size={10}
          color={STATUS_CONFIG[filter as AppStatus]?.color ?? COLORS.primary}
        />
        <Text
          style={[
            styles.activeFilterTagText,
            {
              color:
                STATUS_CONFIG[filter as AppStatus]?.color ?? COLORS.primary,
            },
          ]}
        >
          {filter}
        </Text>
      </View>
    )}
  </View>
);

export default ResultsHeader;

const styles = StyleSheet.create({
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  resultsCount: {
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
  },
  resultsCountBold: {
    fontFamily: FONT_FAMILY.PBold,
    color: COLORS.gray800,
  },
  activeFilterTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  activeFilterTagText: {
    fontFamily: FONT_FAMILY.PMedium,
    fontSize: FONT_SIZE.xs,
  },
});
