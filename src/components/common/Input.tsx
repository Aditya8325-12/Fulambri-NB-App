import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  KeyboardTypeOptions,
  DimensionValue,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TYPOGRAPHY from '../../theme/typography';
import COLORS from '../../constants/colors';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: KeyboardTypeOptions;
  width?: DimensionValue;

  variant?: 'default' | 'borderless' | 'outline' | 'filled';

  disabled?: boolean;
  required?: boolean;

  multiline?: boolean;
  numberOfLines?: number;
  secureTextEntry?: boolean;
}



const Input: React.FC<InputProps> = ({
  label,
  placeholder = '',
  value,
  onChange,
  type = 'default',
  width = '100%',
  variant = 'default',
  disabled = false,
  required = false,
  multiline = false,
  numberOfLines = 1,
  secureTextEntry = false,
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);

  useEffect(() => {
    setIsSecure(secureTextEntry);
  }, [secureTextEntry]);

  const inputContainerStyles = [
    styles.inputWrapper,
    styles[variant],
    multiline && styles.multilineWrapper,
    disabled && styles.disabled,
  ];

  return (
    <View style={[styles.container, { width }]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <View style={inputContainerStyles}>
        <TextInput
          style={[
            styles.input,
            multiline && styles.multilineInput,
          ]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textMuted}
          value={value}
          onChangeText={onChange}
          keyboardType={type}
          editable={!disabled}
          multiline={multiline}
          numberOfLines={numberOfLines}
          secureTextEntry={isSecure}
          autoCapitalize="none"
        />

        {secureTextEntry && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsSecure(!isSecure)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={isSecure ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={COLORS.gray500}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },

  label: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.textNormal,
    fontSize: 14,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 52,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
  },

  multilineWrapper: {
    height: 120,
    alignItems: 'flex-start',
    paddingVertical: 12,
  },

  input: {
    ...TYPOGRAPHY.input,
    flex: 1,
    height: '100%',
    padding: 0,
  },

  multilineInput: {
    textAlignVertical: 'top',
    height: '100%',
  },

  required: {
    color: COLORS.danger,
    fontWeight: 'bold',
  },

  disabled: {
    opacity: 0.5,
    backgroundColor: COLORS.gray100,
  },

  iconContainer: {
    paddingLeft: 12,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Variants
  default: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.gray200,
  },

  borderless: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },

  outline: {
    backgroundColor: COLORS.white,
    borderColor: COLORS.primary,
  },

  filled: {
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray100,
  },


});