import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Animated,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import Button from '../common/Button';
import Input from '../common/Input';

interface SearchModalProps {
  visible: boolean;
  hideModal: () => void;
  initialKeyword?: string;
  initialLocation?: string;
  onModifySearch?: (keyword: string, location: string) => void;
}

const KEYWORD_SUGGESTIONS = [
  'Designer',
  'Engineer',
  'Manager',
  'Remote',
  'Internship',
];
const LOCATION_SUGGESTIONS = [
  'New York',
  'San Francisco',
  'Remote',
  'London',
  'Austin',
];

const SearchJobModal: React.FC<SearchModalProps> = ({
  visible,
  hideModal,
  initialKeyword = '',
  initialLocation = '',
  onModifySearch,
}) => {
  const insets = useSafeAreaInsets();
  const [keyword, setKeyword] = useState(initialKeyword);
  const [location, setLocation] = useState(initialLocation);
  const [isKeywordFocused, setIsKeywordFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);

  // Animated border colors
  const keywordAnim = useRef(new Animated.Value(0)).current;
  const locationAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(80)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setKeyword(initialKeyword);
      setLocation(initialLocation);
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 60,
          friction: 10,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      slideAnim.setValue(80);
      opacityAnim.setValue(0);
    }
  }, [visible, initialKeyword, initialLocation]);

  useEffect(() => {
    Animated.timing(keywordAnim, {
      toValue: isKeywordFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isKeywordFocused]);

  useEffect(() => {
    Animated.timing(locationAnim, {
      toValue: isLocationFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isLocationFocused]);

  const keywordBorderColor = keywordAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.primary],
  });

  const locationBorderColor = locationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [COLORS.border, COLORS.primary],
  });

  const handleModifySearch = () => {
    if (onModifySearch) {
      onModifySearch(keyword, location);
    }
    hideModal();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={hideModal}
    >
      <Pressable style={styles.backdrop} onPress={hideModal}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoiding}
        >
          <Animated.View
            style={[
              styles.modalContainer,
              {
                paddingBottom: Math.max(insets.bottom, 24),
                transform: [{ translateY: slideAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <Pressable onPress={e => e.stopPropagation()}>
              {/* Drag Handle */}
              <View style={styles.dragHandleRow}>
                <View style={styles.dragHandle} />
              </View>

              {/* Header */}
              <View style={styles.header}>
                <View>
                  <Text style={styles.headerTitle}>Find Your Next Role</Text>
                  <Text style={styles.headerSubtitle}>
                    Search thousands of opportunities
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.closeBtn}
                  onPress={hideModal}
                  activeOpacity={0.7}
                >
                  <Icon name="close" size={20} color={COLORS.gray600} />
                </TouchableOpacity>
              </View>

              {/* Keyword Field */}
              <Text style={styles.fieldLabel}>Job Title or Keyword</Text>
              <Animated.View
                style={[
                  styles.animatedBorder,
                  { borderColor: keywordBorderColor },
                ]}
              >
                <Input
                  placeholder="e.g. Product Designer"
                  value={keyword}
                  onChange={setKeyword}
                  variant="filled"
                  width="100%"
                  icon={
                    <Icon
                      name="briefcase-search-outline"
                      size={20}
                      color={isKeywordFocused ? COLORS.primary : COLORS.gray400}
                    />
                  }
                  onFocus={() => setIsKeywordFocused(true)}
                  onBlur={() => setIsKeywordFocused(false)}
                  returnKeyType="next"
                />
              </Animated.View>

              {/* Keyword Suggestions */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.suggestionsScroll}
                contentContainerStyle={styles.suggestionsContainer}
              >
                {KEYWORD_SUGGESTIONS.map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.chip, keyword === s && styles.chipActive]}
                    onPress={() => setKeyword(s)}
                    activeOpacity={0.75}
                  >
                    <Text
                      style={[
                        styles.chipText,
                        keyword === s && styles.chipTextActive,
                      ]}
                    >
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Location Field */}
              <Text style={[styles.fieldLabel, { marginTop: 16 }]}>
                Location
              </Text>
              <Animated.View
                style={[
                  styles.animatedBorder,
                  { borderColor: locationBorderColor },
                ]}
              >
                <Input
                  placeholder="City, state or Remote"
                  value={location}
                  onChange={setLocation}
                  variant="filled"
                  width="100%"
                  icon={
                    <Icon
                      name="map-marker-outline"
                      size={20}
                      color={
                        isLocationFocused ? COLORS.primary : COLORS.gray400
                      }
                    />
                  }
                  onFocus={() => setIsLocationFocused(true)}
                  onBlur={() => setIsLocationFocused(false)}
                  returnKeyType="search"
                  onSubmitEditing={handleModifySearch}
                />
              </Animated.View>

              {/* Location Suggestions */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.suggestionsScroll}
                contentContainerStyle={styles.suggestionsContainer}
              >
                {LOCATION_SUGGESTIONS.map(s => (
                  <TouchableOpacity
                    key={s}
                    style={[styles.chip, location === s && styles.chipActive]}
                    onPress={() => setLocation(s)}
                    activeOpacity={0.75}
                  >
                    <Icon
                      name={s === 'Remote' ? 'laptop' : 'map-marker-outline'}
                      size={12}
                      color={location === s ? COLORS.primary : COLORS.gray500}
                      style={{ marginRight: 4 }}
                    />
                    <Text
                      style={[
                        styles.chipText,
                        location === s && styles.chipTextActive,
                      ]}
                    >
                      {s}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Divider */}
              <View style={styles.divider} />

              {/* Action Buttons */}
              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.clearAllBtn}
                  onPress={() => {
                    setKeyword('');
                    setLocation('');
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Button
                    variant="gradient"
                    label="Search Jobs"
                    size="lg"
                    icon={
                      <Icon name="magnify" size={18} color={COLORS.white} />
                    }
                    iconPosition="start"
                    onPress={handleModifySearch}
                  />
                </View>
              </View>
            </Pressable>
          </Animated.View>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

export default SearchJobModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    justifyContent: 'flex-end',
  },
  keyboardAvoiding: {
    width: '100%',
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    paddingHorizontal: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 24,
  },
  dragHandleRow: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  dragHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.gray200,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xl,
    color: COLORS.gray800,
    letterSpacing: -0.3,
  },
  headerSubtitle: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray500,
    marginTop: 2,
  },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: COLORS.gray100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldLabel: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray700,
    marginBottom: 8,
    letterSpacing: 0.2,
  },
  animatedBorder: {
    borderRadius: 14,
    borderWidth: 1.5,
    overflow: 'hidden',
  },
  suggestionsScroll: {
    marginTop: 10,
  },
  suggestionsContainer: {
    gap: 8,
    paddingRight: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  chipActive: {
    backgroundColor: COLORS.miniPrimary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.xs,
    color: COLORS.gray600,
  },
  chipTextActive: {
    color: COLORS.primary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.borderLight,
    marginVertical: 20,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  clearAllBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.border,
  },
  clearAllText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.sm,
    color: COLORS.gray600,
  },
});
