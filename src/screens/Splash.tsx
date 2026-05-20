import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import COLORS from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

const Splash = () => {
  return (
    <LinearGradient
      colors={COLORS.gradients.bg}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Image
        source={require('../assets/logo/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    height: 350,
    width: 380,
  },
});
