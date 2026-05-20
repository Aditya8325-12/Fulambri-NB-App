import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import TYPOGRAPHY from '../../theme/typography';
import COLORS from '../../constants/colors';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import Checkbox from '../../components/common/Checkbox';

const RegisterScreen = ({ navigation }: any) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [subscribeToUpdates, setSubscribeToUpdates] = useState(false);
  const [loading, setLoading] = useState(false);

  const { width } = useWindowDimensions();
  const isWide = width > 768;

  const handleRegister = () => {
    if (!userName.trim() || !email.trim() || !password.trim() || !contactNumber.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    if (!agreeToTerms) {
      Alert.alert('Error', 'You must agree to the Terms & Privacy Policy to register.');
      return;
    }

    setLoading(true);

    const data = {
      user_name: userName,
      email: email,
      password: password,
      phone: contactNumber,
      agreeToTerms: agreeToTerms,
      subscribeToUpdates: subscribeToUpdates
    }
    navigation.navigate('VerifyOTP', { data: data });
  };

  const handleLogin = () => {
    if (navigation) {
      navigation.navigate('Login');
    }
  };



  const handleTermsPress = () => {
    Alert.alert('Terms & Privacy', 'Redirecting to Terms & Privacy Policy...');
  };

  const renderWelcomeText = () => (
    <View style={styles.welcomeSection}>
      <Image source={require('../../assets/logo/logoL.png')} style={{ width: 200, height: 80 }} resizeMode='contain' />
      {/* Heading */}
      <View style={styles.headingRow}>
        <Text style={styles.welcomeText}>Create </Text>
        <Text style={styles.backText}>Account</Text>
      </View>

      {/* Sub Heading */}
      <Text style={styles.subTitle}>
        Sign up to find your dream job or hire the best talents.
      </Text>
    </View>
  );

  const renderFormCard = () => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Input
          label="User Name"
          placeholder="Enter your name"
          value={userName}
          onChange={setUserName}
          required
        />

        {/* Custom Email Label with Verify Link */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>
              Email Address<Text style={styles.required}> *</Text>
            </Text>

          </View>
          <Input
            placeholder="example@email.com"
            value={email}
            onChange={setEmail}
            type="email-address"
          />
        </View>

        <Input
          label="Password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
          required
          secureTextEntry
        />

        <Input
          label="Contact Number"
          placeholder="1234567890"
          value={contactNumber}
          onChange={setContactNumber}
          required
          type="phone-pad"
        />

        {/* Checkbox Group */}
        <View style={styles.checkboxGroup}>
          <View style={styles.checkboxContainer}>
            <Checkbox
              label=""
              value={agreeToTerms}
              onChange={setAgreeToTerms}
            />
            <Text style={styles.checkboxLabel}>
              I agree to the{' '}
              <Text style={styles.linkText} onPress={handleTermsPress}>
                Terms & Privacy Policy
              </Text>
            </Text>
          </View>

          <Checkbox
            label="Subscribe to product updates & hiring tips"
            value={subscribeToUpdates}
            onChange={setSubscribeToUpdates}
          />
        </View>

        {/* Submit button */}
        <Button
          variant="gradient"
          label="Register"
          onPress={handleRegister}
          loading={loading}
        />

        {/* Login footer */}
        <View style={styles.loginRow}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
            <Text style={styles.loginLink}>Log in</Text>
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

export default RegisterScreen;

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
    gap: 16,
  },

  // Email Custom label row styling
  inputGroup: {
    gap: 8,
    width: '100%',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textNormal,
    fontSize: 14,
  },
  required: {
    color: COLORS.danger,
    fontWeight: 'bold',
  },
  verifyLink: {
    ...TYPOGRAPHY.bodyMedium,
    color: '#3B82F6',
    fontWeight: '600',
  },

  // Checkbox group
  checkboxGroup: {
    gap: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  checkboxLabel: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textNormal,
    flexShrink: 1,
  },
  linkText: {
    color: '#3B82F6',
    fontWeight: '600',
  },

  // Login row
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  loginText: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.gray600,
  },
  loginLink: {
    ...TYPOGRAPHY.bodySmall,
    color: COLORS.textSecondary,
    fontWeight: 'semibold',
  },
});
