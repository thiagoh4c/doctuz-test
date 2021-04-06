import { StyleSheet } from "react-native";
import { fonts, colors, app_spacing } from "@styles/_variables";

export default StyleSheet.create({
    wrapper: {
        justifyContent: 'space-between',
        paddingBottom: app_spacing.default
    },
    title: {
        marginBottom: 26,
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.gray.dark,
        textAlign: 'center'
    },
    registerButton: {
        marginTop: 40,
    },
    segment: {
        width: '100%'
    }
});