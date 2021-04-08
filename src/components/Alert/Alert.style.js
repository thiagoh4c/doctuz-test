import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../assets/styles/_variables';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default StyleSheet.create({
    wrapper: {
        justifyContent: 'flex-start',
        zIndex: 100,
    },
    container: {
        maxWidth: wp('85%'),
        backgroundColor: colors.white,
        paddingVertical: 20,
        marginTop: 121,
        borderRadius: 15,
        flexDirection: 'column',
        zIndex: 100,
    },
    layer: {
        backgroundColor: colors.gray.dark,
        opacity: 0.85,
        zIndex: 100,
    },
    title: {
        color: colors.gray.dark,
        fontFamily: fonts.bold,
        fontSize: 20,
        textAlign: 'center',
    },

    message: {
        color: colors.gray.dark,
        fontFamily: fonts.medium,
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10,
    },

    buttonConfirm: {
        padding: 10,
        paddingHorizontal: 20,
        height: 51,
        borderRadius: 50,
        color: colors.white,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width:wp('30%'),
        backgroundColor: colors.orange.default,
    },

    buttonConfirmText: {
        color: colors.white,
        fontFamily: fonts.bold,
        fontSize: 12,
    },

    buttonCancel: {
        padding: 10,
        paddingHorizontal: 20,
        height: 51,
        borderRadius: 50,
        color: colors.white,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: wp('30%'),
        backgroundColor: colors.gray.dark,
    },

    buttonCancelText: {
        color: 'white',
        fontFamily: fonts.bold,
        fontSize: 15,
    },
});
