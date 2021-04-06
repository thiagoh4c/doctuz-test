import { StyleSheet } from "react-native";
import { colors, app_spacing } from "@styles/_variables";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    mainView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        width: wp('100%')
    },
    content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
        paddingHorizontal: app_spacing.default,
        paddingBottom: app_spacing.default
    }
});