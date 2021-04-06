import { StyleSheet } from 'react-native';
import { colors } from '@styles/_variables';

export default StyleSheet.create({
    text: {
        marginVertical: 25,
    },
    containerButtons:{
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex:1,
    },
    buttonEdit:{
        backgroundColor:'orange',
        color: colors.black,
        width:70,
        height:70,
    },
    buttonSave:{
        backgroundColor:'green',
        color: colors.black,
        flex:1,
        alignSelf: 'flex-end',
    },
    buttonRemove:{
        backgroundColor:'red',
        color: colors.black,
        width:70,
        height:70,
    },
    textArea:{
        height: 150,
        justifyContent: "flex-start"
    }
});
