import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  DimensionValue,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import COLORS from '../../constants/colors';
import TYPOGRAPHY from '../../theme/typography';
import { FONT_SIZE } from '../../constants/fonts';

interface CommonButtonProps {
  label?: string;

  onPress?: () => void;

  disabled?: boolean;
  loading?: boolean;

  variant?:
    | 'default'
    | 'outline'
    | 'filled'
    | 'borderless'
    | 'destructive'
    | 'success'
    | 'primary'
    | 'gradient';

  width?: DimensionValue;
  height?: DimensionValue;

  icon?: React.ReactNode;
  iconPosition?: 'start' | 'end';

  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const BUTTON_HEIGHTS = {
  sm: 36,
  md: 42,
  lg: 48,
  xl: 52,
};

const Button: React.FC<CommonButtonProps> = ({
  label = 'Button',

  onPress,

  disabled = false,
  loading = false,

  variant = 'default',

  width = '100%',
  height,

  icon,
  iconPosition = 'start',

  style,
  textStyle,
  size = 'xl',
}) => {
  const isGradient = variant === 'gradient';
  const resolvedHeight = height ?? BUTTON_HEIGHTS[size];

  const buttonContent = (
    <>
      {/* Left Icon */}
      {icon && iconPosition === 'start' && icon}

      {/* Loading */}
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text
          style={[
            TYPOGRAPHY.button,
            styles[`${variant}Text` as keyof typeof styles] as TextStyle,
            styles[`${size}Text` as keyof typeof styles] as TextStyle,
            textStyle,
          ]}
        >
          {label}
        </Text>
      )}

      {/* Right Icon */}
      {icon && iconPosition === 'end' && icon}
    </>
  );

  if (isGradient) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled || loading}
        onPress={onPress}
        style={[
          styles.buttonContainer,
          {
            width,
            height: resolvedHeight,
          },
          disabled && styles.disabled,
          style,
        ]}
      >
        <LinearGradient
          colors={COLORS.gradients.primary}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradientFill,
            styles[size as keyof typeof styles] as ViewStyle,
            { width: '100%', height: resolvedHeight },
          ]}
        >
          {buttonContent}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        styles[variant as keyof typeof styles] as ViewStyle,
        styles[size as keyof typeof styles] as ViewStyle,
        {
          width,
          height: resolvedHeight,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 6,
    overflow: 'hidden',
  },

  gradientFill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  button: {
    borderRadius: 6,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    gap: 8,
  },

  disabled: {
    opacity: 0.5,
  },

  // Sizes
  sm: {
    paddingHorizontal: 12,
    gap: 6,
  },

  md: {
    paddingHorizontal: 16,
    gap: 8,
  },

  lg: {
    paddingHorizontal: 20,
    gap: 8,
  },

  xl: {
    paddingHorizontal: 24,
    gap: 8,
  },

  // Size Text
  smText: {
    fontSize: FONT_SIZE.sm,
  },

  mdText: {
    fontSize: FONT_SIZE.md,
  },

  lgText: {
    fontSize: FONT_SIZE.md,
  },

  xlText: {
    fontSize: FONT_SIZE.md,
  },

  // Variants

  default: {
    backgroundColor: COLORS.primary,
  },

  primary: {
    backgroundColor: COLORS.cyan500,
  },

  outline: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },

  filled: {
    backgroundColor: COLORS.gray100,
  },

  borderless: {
    backgroundColor: 'transparent',
  },

  destructive: {
    backgroundColor: COLORS.danger,
  },

  success: {
    backgroundColor: COLORS.success,
  },

  // Text Variants

  defaultText: {
    color: COLORS.white,
  },

  primaryText: {
    color: COLORS.white,
  },

  outlineText: {
    color: COLORS.primary,
  },

  filledText: {
    color: COLORS.textPrimary,
  },

  borderlessText: {
    color: COLORS.primary,
  },

  destructiveText: {
    color: COLORS.white,
  },

  successText: {
    color: COLORS.white,
  },

  gradientText: {
    color: COLORS.white,
  },
});
