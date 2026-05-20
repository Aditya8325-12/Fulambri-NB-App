import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../../constants/colors';
import { FONT_SIZE } from '../../constants/fonts';

const Checkbox = ({ label, value, onChange }: { label: string, value: boolean, onChange: (value: boolean) => void }) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onChange(!value)}
            activeOpacity={0.7}
        >
            <Icon
                name={value ? 'check-box' : 'check-box-outline-blank'}
                size={24}
                color={value ? COLORS.textSecondary : COLORS.gray700}
            />
            {label && <Text style={styles.label}>{label}</Text>}
        </TouchableOpacity>
    );
};

export default Checkbox;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingVertical: 4,
    },
    label: {
        fontSize: FONT_SIZE.md,
        color: COLORS.textNormal,

    },
});