import { StyleSheet } from 'react-native';
import { fonts, colors } from '@styles/_variables';

export const styles = StyleSheet.create({
    defaultWrapperStyle: {
        width: '100%',
        height: 72,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 500,
        marginTop: 8,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    defaultTextStyle: {
        fontFamily: fonts.medium,
        fontSize: 13,
    },
});

export const themes = {
    textStyle: {
        default: {
            ...styles.defaultTextStyle,
            color: colors.white,
        },
        orange: {
            ...styles.defaultTextStyle,
            color: colors.white,
        },
        olive: {
            ...styles.defaultTextStyle,
            color: colors.white,
        },
        white: {
            ...styles.defaultTextStyle,
            color: colors.orange.default,
        },
        transparent: {
            ...styles.defaultTextStyle,
            color: colors.white,
        },
    },
    buttonStyle: {
        default: {
            ...styles.defaultWrapperStyle,
            backgroundColor: colors.orange.default,
        },
        orange: {
            ...styles.defaultWrapperStyle,
            backgroundColor: colors.orange.light,
            borderColor: colors.orange.light,
        },
        olive: {
            ...styles.defaultWrapperStyle,
            backgroundColor: colors.orange.dark,
            borderColor: colors.orange.dark,
        },
        white: {
            ...styles.defaultWrapperStyle,
            backgroundColor: colors.white,
        },
        transparent: {
            ...styles.defaultWrapperStyle,
            borderColor: colors.white,
            backgroundColor: 'transparent',
        },
    },
};
