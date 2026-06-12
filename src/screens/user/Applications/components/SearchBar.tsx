import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef } from 'react';
import COLORS from '../../../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const focusAnim = useRef(new Animated.Value(0)).current;

  const onFocus = () =>
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

  const onBlur = () =>
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.primary],
  });

  return (
    <Animated.View style={[styles.searchContainer, { borderColor }]}>
      <Icon
        name="magnify"
        size={18}
        color={COLORS.gray400}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search job title or company…"
        placeholderTextColor={COLORS.gray400}
        value={value}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        returnKeyType="search"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChange('')} style={styles.clearBtn}>
          <Icon name="close-circle" size={16} color={COLORS.gray400} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 2,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONT_FAMILY.PRegular,
    fontSize: FONT_SIZE.md,
    color: COLORS.gray800,
    paddingVertical: 10,
  },
  clearBtn: {
    padding: 4,
  },
});
