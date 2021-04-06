import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import NavigationService from '@services/NavigationService';

export default class BackButton extends Component {

    goBack() {
        NavigationService.back();
    }

    render() {

        const { color } = this.props;

        return (
            <TouchableOpacity activeOpacity={0.8} style={[styles.button, { borderColor: color }]} onPress={() => this.goBack()}>
                <FontAwesome name="chevron-left" size={15} color={color} />
            </TouchableOpacity>
        );
    }
}
