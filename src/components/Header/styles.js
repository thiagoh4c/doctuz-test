import { StyleSheet } from "react-native";
import { colors, app_spacing } from "@styles/_variables";

export default StyleSheet.create({
    wrapper: {
        height: 80,
        backgroundColor: 'transparent',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: app_spacing.small,
        flexDirection: 'row',
    },
    item: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})