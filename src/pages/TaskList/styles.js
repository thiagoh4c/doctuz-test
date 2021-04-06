import { StyleSheet } from 'react-native';
import { colors, fonts } from '@styles/_variables';
import main from '@styles/main';

export default StyleSheet.create({
    wrapper: {
        width: '100%',
        marginTop: 10,
    },
    tasks: {
        backgroundColor: colors.white,
        borderRadius: 6,
        marginBottom: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        display:'flex',
        flexDirection: 'row',
        ...main.shadow,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tasksTitle: {
        textAlign: 'left',
        fontFamily: fonts.bold,
        fontSize: 18,
        color: colors.orange.default,
        marginTop: 5,
        marginBottom: 5,
    },
    tasksText: {
        textAlign: 'left',
        fontFamily: fonts.bold,
        fontSize: 13,
        marginTop: 5,
    },
    containerTask: {
        display:'flex',
        flexDirection: 'column',
        flex:3
    },
    btnAdd: {
        position: 'absolute',
        bottom:20,
        width:'90%'
    }
});
