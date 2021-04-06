import { StyleSheet } from 'react-native';
import { fonts, colors, app_spacing } from './_variables';

export default StyleSheet.create({
    bold: {
        fontFamily: fonts.bold,
    },
    pageTitle: {
        fontFamily: fonts.light,
        fontSize: 28,
        textAlign: 'center',
        color: 'white',
        marginBottom: 15,
    },
    colorWhite: {
        color: colors.white,
    },
    colorOrangeLight: {
        color: colors.orange.light,
    },
    colorRed: {
        color: colors.red,
    },
    fullWidth: {
        width: '100%',
    },
    alignCenter: {
        textAlign: 'center',
    },
    commonText: {
        fontFamily: fonts.regular,
        fontSize: 13,
        color: colors.gray.dark,
        marginVertical: 25,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -10,
        },
        shadowOpacity: 0.1,
        shadowRadius: 36,
        elevation: 6,
    },
});
