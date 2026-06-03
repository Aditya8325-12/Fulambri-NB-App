import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { FONT_FAMILY, FONT_SIZE } from '../../constants/fonts';
import COLORS from '../../constants/colors';

export const SectionHeader = ({
  title,
  actionLabel,
  onPress,
}: {
  title: string;
  actionLabel?: string;
  onPress?: () => void;
}) => (
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {actionLabel && (
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.sectionAction}>{actionLabel}</Text>
      </TouchableOpacity>
    )}
  </View>
);

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.lg,
    color: '#1E293B',
  },
  sectionAction: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.secondary,
  },
});
