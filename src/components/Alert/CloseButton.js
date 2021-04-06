import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { colors } from './../../assets/styles/_variables';

import Icon from 'react-native-vector-icons/Ionicons';

const style = StyleSheet.create({
    close: {
        backgroundColor: colors.white,
        borderRadius: 50,
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: -86
    }
});

export default class Alert extends Component {
    render() {
        return (
            <View style={style.close} pointerEvents="none">
                <Icon size={30} name="ios-close" color={colors.gray.dark} />
            </View>
        );
    }
};
