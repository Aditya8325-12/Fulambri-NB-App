import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from '../../constants/colors';
import { FONT_FAMILY } from '../../constants/fonts';
import { useNavigation, DrawerActions } from '@react-navigation/native';

const CommonHeader = ({ title, onSearch, onNotification }: any) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {/* Left Icon */}
            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
                <Icon name="menu" size={26} color={COLORS.Icon_Inactive} />
            </TouchableOpacity>

            {/* Search Bar */}
            <TouchableOpacity
                style={styles.searchContainer}
                onPress={onSearch}
            >
                <Icon name="magnify" size={20} color="#999" />
                <Text style={styles.searchText}>Search jobs...</Text>
            </TouchableOpacity>

            {/* Notification */}
            <TouchableOpacity onPress={onNotification}>
                <Icon name="bell-outline" size={26} color={COLORS.Icon_Inactive} />
            </TouchableOpacity>
        </View>
    );
};

export default CommonHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    searchContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 12,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 12,
        height: 42,
        borderRadius: 26,
        borderColor: '#918b8bff',
        borderWidth: 0.4,
    },
    searchText: {
        fontFamily: FONT_FAMILY.PRegular,
        marginLeft: 8,
        color: COLORS.gray600,
    },
});