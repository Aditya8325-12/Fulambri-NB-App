import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TYPOGRAPHY from '../../theme/typography';
import COLORS from '../../constants/colors';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';


const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();
  const isWide = width > 768;

  const handleLogin = () => {
    setLoading(true);
    console.log('Login Pressed with:', email, password, rememberMe);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };


  const handleRegister = () => {
    if (navigation) {
      navigation.navigate('Register');
    }
  };

  const renderWelcomeText = () => (
    <View style={styles.welcomeSection}>

      <Image source={require('../../assets/logo/logoL.png')} style={{ width: 200, height: 80 }} resizeMode='contain' />
      {/* Heading */}
      <View style={styles.headingRow}>
        <Text style={styles.welcomeText}>Welcome </Text>
        <Text style={styles.backText}>Back</Text>
      </View>

      {/* Sub Heading */}
      <Text style={styles.subTitle}>
        Sign in to your account to continue where you left off.
      </Text>
    </View>
  );

  const renderFormCard = () => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Input
          label="Email Address"
          placeholder="example@email.com"
          value={email}
          onChange={setEmail}
          required
          type="email-address"
        />

        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          required
          secureTextEntry
        />

        {/* Options Row */}
        <View style={styles.optionsRow}>

          <Checkbox
            label="Remember Me"
            value={rememberMe}
            onChange={setRememberMe}
          />

          <TouchableOpacity activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>

        {/* Submit button */}
        <Button
          variant="gradient"
          label="Sign In"
          onPress={handleLogin}
          loading={loading}
        />

        {/* Register footer */}
        <View style={styles.registerRow}>
          <Text style={styles.registerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister} activeOpacity={0.7}>
            <Text style={styles.registerLink}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground style={StyleSheet.absoluteFill} source={require('../../assets/background/employer_bg.jpg')} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.mainContainer, isWide ? styles.rowContainer : styles.columnContainer]}>
          {renderWelcomeText()}
          {renderFormCard()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  mainContainer: {
    width: '100%',
    maxWidth: 1100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    gap: 32,
    paddingVertical: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 48,
    paddingHorizontal: 32,
  },

  // Welcome section
  welcomeSection: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    justifyContent: 'center',
    gap: 16,
  },


  headingRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  welcomeText: {
    ...TYPOGRAPHY.heroTitle,
  },
  backText: {
    ...TYPOGRAPHY.heroTitle,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  subTitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    lineHeight: 22,
  },

  // Card styles
  cardContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    gap: 24,

  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordText: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textSecondary,
    cursor: 'pointer',
    fontWeight: "semibold"
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  registerText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
  },
  registerLink: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: 'semibold'
  },

});