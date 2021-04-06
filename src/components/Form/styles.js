import { StyleSheet } from 'react-native';
import { colors, fonts, app_spacing } from '@styles/_variables';
import {
    widthPercentageToDP,
    heightPercentageToDP,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    defaultWrapperStyle: {
        width: '100%',
    },
    defaultInputStyle: {
        width: '100%',
        height: 60,
        borderRadius: 100,
        paddingHorizontal: 34,
        borderWidth: 1,
        marginTop: 8,
        fontSize: 15,
        fontWeight: '700',
        fontFamily: fonts.bold,
        paddingTop: 10,
        paddingBottom: 0,
    },
    defaultTextareaStyle: {
        borderRadius: 15,
        height: 200,
        textAlignVertical: 'top',
        paddingTop: 30,
        justifyContent: 'flex-start',
    },
    defaultTitleStyle: {
        position: 'absolute',
        fontSize: 15,
        fontWeight: '700',
        fontFamily: fonts.bold,
        left: 34,
        width: 400,
        zIndex: 1,
    },
    defaultTitleActiveStyle: {
        fontSize: 12,
        fontWeight: '300',
        fontFamily: fonts.regular,
    },
    defaultCaretStyle: {
        position: 'absolute',
        right: 34,
        top: 20,
    },
    defaultSelectValueStyle: {
        fontSize: 15,
        fontWeight: '700',
        fontFamily: fonts.bold,
        paddingTop: 15,
    },
});

const themes = {
    wrapper: {
        default: {
            ...styles.defaultWrapperStyle,
        },
        transparent: {
            ...styles.defaultWrapperStyle,
        },
    },
    input: {
        default: {
            ...styles.defaultInputStyle,
            borderColor: colors.gray.light,
            color: colors.gray.dark,
            backgroundColor: colors.white,
        },
        transparent: {
            ...styles.defaultInputStyle,
            borderColor: colors.white,
            color: colors.white,
            backgroundColor: 'transparent',
        },
    },
    inputError: {
        borderColor: '#B60049',
        color: '#B60049',
    },
    title: {
        default: {
            ...styles.defaultTitleStyle,
            color: colors.gray.dark,
        },
        transparent: {
            ...styles.defaultTitleStyle,
            color: colors.white,
        },
    },
    titleError: {
        color: '#B60049',
    },
    titleActive: {
        default: {
            ...styles.defaultTitleActiveStyle,
        },
        transparent: {
            ...styles.defaultTitleActiveStyle,
        },
    },
    titleWrapper: {
        position: 'absolute',
        zIndex: 2,
        width: '100%',
    },
    textarea: {
        default: {
            ...styles.defaultTextareaStyle,
        },
        transparent: {
            ...styles.defaultTextareaStyle,
        },
    },
    selectValue: {
        default: {
            ...styles.defaultSelectValueStyle,
            color: colors.gray.dark,
        },
        transparent: {
            ...styles.defaultSelectValueStyle,
            color: colors.white,
        },
    },
    caret: {
        default: {
            ...styles.defaultCaretStyle,
        },
        transparent: {
            ...styles.defaultCaretStyle,
        },
    },
    caretColor: {
        default: colors.gray.dark,
        transparent: colors.white,
    },
    selectWrapper: {
        flex: 1,
        maxHeight: heightPercentageToDP('80%'),
        width: widthPercentageToDP('100%') - 60,
        backgroundColor: colors.white,
        alignSelf: 'center',
        padding: 30,
        borderRadius: 6,
    },
    selectItemsWrapper: {
        flex: 1,
        width: '100%',
        marginBottom: app_spacing.small,
    },
    selectItem: {
        width: '100%',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray.light,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    selectItemText: {
        fontFamily: fonts.medium,
        fontSize: 15,
        color: colors.gray.dark,
        // textTransform: 'uppercase',
    },
    selectItemTextActive: {
        fontFamily: fonts.bold,
    },
    selectItemCheck: {
        width: 13,
        height: 13,
        borderRadius: 40,
        backgroundColor: colors.orange.light,
    },
    searchWrapper: {
        width: '100%',
        paddingHorizontal: 30,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    searchInput: {
        width: '100%',
        marginLeft: 6,
    },
};

export default themes;
