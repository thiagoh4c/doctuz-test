import { StyleSheet } from "react-native";
import { colors } from "@styles/_variables";

export default StyleSheet.create({
    button: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.orange.default
    }
});