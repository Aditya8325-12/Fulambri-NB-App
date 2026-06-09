import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FONT_FAMILY, FONT_SIZE } from '../../../../constants/fonts';
import COLORS from '../../../../constants/colors';
import Button from '../../../../components/common/Button';

const GovtJobsBanner = () => {
  return (
    <View style={styles.govtBanner}>
      <View style={styles.govtBadge}>
        <Text style={styles.govtBadgeIcon}>🏛</Text>
        <Text style={styles.govtBadgeText}>Official Opportunities</Text>
      </View>
      <Text style={styles.govtTitle}>Government Jobs 2024</Text>
      <Text style={styles.govtDescription}>
        Access verified public sector careers with exclusive benefits and
        long-term security. Apply today through CareerSync.
      </Text>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Button
          variant="gradient"
          label="Browse Portal"
          width={'50%'}
          size="md"
        />
      </View>
      {/* Shield icon */}
      <View style={styles.shieldContainer}>
        <View style={styles.shieldIcon}>
          <Text style={styles.shieldText}>🛡</Text>
        </View>
      </View>
    </View>
  );
};

export default GovtJobsBanner;

const styles = StyleSheet.create({
  govtBanner: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 22,
    marginBottom: 24,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  govtBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(45,212,191,0.15)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 14,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.3)',
  },
  govtBadgeIcon: {
    fontSize: 14,
  },
  govtBadgeText: {
    fontFamily: FONT_FAMILY.IMedium,
    fontSize: FONT_SIZE.sm,
    color: COLORS.primary,
  },
  govtTitle: {
    fontFamily: FONT_FAMILY.PBold,
    fontSize: FONT_SIZE.xxl,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  govtDescription: {
    fontFamily: FONT_FAMILY.IRegular,
    fontSize: FONT_SIZE.md,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 18,
  },
  browsBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 13,
    paddingHorizontal: 32,
    alignSelf: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  browsBtnText: {
    fontFamily: FONT_FAMILY.PSemiBold,
    fontSize: FONT_SIZE.md,
    color: '#fff',
  },
  shieldContainer: {
    alignItems: 'center',
    marginTop: 18,
  },
  shieldIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(45,212,191,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(45,212,191,0.25)',
  },
  shieldText: {
    fontSize: 26,
  },
});
