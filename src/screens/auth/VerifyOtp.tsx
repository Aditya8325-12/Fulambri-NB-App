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
import React, { useState, useRef, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OtpInput, OtpInputRef } from 'react-native-otp-entry';
import TYPOGRAPHY from '../../theme/typography';
import COLORS from '../../constants/colors';
import Button from '../../components/common/Button';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 30; // seconds

const VerifyOtp = ({ route, navigation }: any) => {
    const { data } = route.params;

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(RESEND_COOLDOWN);
    const [canResend, setCanResend] = useState(false);

    const otpRef = useRef<OtpInputRef>(null);
    const { width } = useWindowDimensions();
    const isWide = width > 768;

    // Countdown timer for resend
    useEffect(() => {
        if (timer <= 0) {
            setCanResend(true);
            return;
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const handleVerify = (code: string) => {
        const finalOtp = code || otp;
        if (finalOtp.length < OTP_LENGTH) {
            Alert.alert('Invalid OTP', 'Please enter the complete 6-digit code.');
            return;
        }
        setLoading(true);
        console.log('Verifying OTP:', finalOtp, 'for user:', data.user_name);

        setTimeout(() => {
            setLoading(false);
            Alert.alert('Success', 'Your account has been verified!', [
                {
                    text: 'Continue',
                    onPress: () => navigation?.navigate('Login'),
                },
            ]);
        }, 1500);
    };

    const handleResend = () => {
        if (!canResend) return;
        otpRef.current?.clear();
        setOtp('');
        setTimer(RESEND_COOLDOWN);
        setCanResend(false);
        console.log('Resending OTP to:', data.email);
        // TODO: Replace with your resend OTP API call
        Alert.alert('OTP Sent', `A new code has been sent to ${data.email}`);
    };

    const renderInfoSection = () => (
        <View style={styles.welcomeSection}>
            {/* Back to Register */}
            <TouchableOpacity
                onPress={() => navigation?.goBack()}
                activeOpacity={0.7}
                style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: 6 }}
            >
                <FontAwesome6 name="arrow-left" size={20} color={COLORS.textMuted} />
                <Text style={styles.backLink}>Back</Text>
            </TouchableOpacity>
            <Image
                source={require('../../assets/logo/logoL.png')}
                style={{ width: 200, height: 80 }}
                resizeMode="contain"
            />
            <View style={styles.headingRow}>
                <Text style={styles.welcomeText}>Verify </Text>
                <Text style={styles.backText}>Email</Text>
            </View>
            <Text style={styles.subTitle}>
                We've sent a 6-digit verification code to your email. Enter it below to
                confirm your identity.
            </Text>

            {/* Email chip */}
            <View style={styles.emailChip}>
                <Text style={styles.emailChipText} numberOfLines={1}>
                    📧 {data.email}
                </Text>
            </View>
        </View>
    );

    const renderOtpCard = () => (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                {/* Greeting */}
                <Text style={styles.greetingText}>
                    Hello, {data.user_name} 👋
                </Text>

                {/* OTP Entry */}
                <OtpInput
                    ref={otpRef}
                    numberOfDigits={OTP_LENGTH}
                    onTextChange={setOtp}
                    onFilled={code => handleVerify(code)}
                    focusColor={COLORS.primary}
                    theme={{
                        containerStyle: styles.otpContainer,
                        pinCodeContainerStyle: styles.otpBox,
                        pinCodeTextStyle: styles.otpText,
                        focusedPinCodeContainerStyle: styles.otpBoxFocused,
                    }}
                />

                {/* Verify Button */}
                <Button
                    variant="gradient"
                    label="Verify OTP"
                    onPress={() => handleVerify(otp)}
                    loading={loading}
                />

                {/* Resend Row */}
                <View style={styles.resendRow}>
                    <Text style={styles.resendText}>Didn't receive the code? </Text>
                    {canResend ? (
                        <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                            <Text style={styles.resendLink}>Resend</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.timerText}>Resend in {timer}s</Text>
                    )}
                </View>


            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <ImageBackground
                style={StyleSheet.absoluteFill}
                source={require('../../assets/background/employer_bg.jpg')}
            />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View
                    style={[
                        styles.mainContainer,
                        isWide ? styles.rowContainer : styles.columnContainer,
                    ]}
                >
                    {renderInfoSection()}
                    {renderOtpCard()}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default VerifyOtp;

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

    // --- Welcome / Info Section ---
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
    emailChip: {
        backgroundColor: COLORS.backgroundSecondary,
        borderRadius: 18,
        paddingHorizontal: 16,
        paddingVertical: 8,
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderColor: COLORS.border,
        maxWidth: '100%',
    },
    emailChipText: {
        ...TYPOGRAPHY.bodyMedium,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },

    // --- Card Section ---
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
    greetingText: {
        ...TYPOGRAPHY.subHeading,
        color: COLORS.textNormal,
        textAlign: 'center',
    },

    // --- OTP Input Styles ---
    otpContainer: {
        gap: 10,
        justifyContent: 'center',
    },
    otpBox: {
        width: 48,
        height: 56,
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: COLORS.border,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    otpBoxFocused: {
        borderColor: COLORS.primary,
        borderWidth: 2,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 4,
    },
    otpText: {
        ...TYPOGRAPHY.sectionHeading,
        color: COLORS.textNormal,
        textAlign: 'center',
    },

    // --- Resend Row ---
    resendRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    resendText: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.gray600,
    },
    resendLink: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textSecondary,
        fontWeight: 'semibold',
    },
    timerText: {
        ...TYPOGRAPHY.bodySmall,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },

    // --- Back Link ---
    backLink: {
        ...TYPOGRAPHY.body,
        color: COLORS.textMuted,
        fontWeight: '600',
    },
});