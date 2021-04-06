import { StyleSheet } from 'react-native';
import { colors, app_spacing } from '@styles/_variables';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    halfLinear: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: wp('100%'),
        height: 350,
    },
    mainView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: colors.white,
        width: wp('100%'),
    },
    content: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexGrow: 1,
        paddingHorizontal: app_spacing.small,
        paddingBottom: app_spacing.small + 80,
    },
});
