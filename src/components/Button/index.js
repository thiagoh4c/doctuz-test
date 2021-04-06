import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Loading from '@components/Loading';

import { styles, themes } from './styles';

export default class Button extends Component {
    render() {

        var { text, theme, style, loading, onPress, icon } = this.props;

        theme = theme || 'default';

        let stylesButton = [themes.buttonStyle[theme]];

        if (style)
            stylesButton.push(style);

        return (
            <TouchableOpacity style={stylesButton} activeOpacity={0.9} disabled={loading} onPress={onPress}>
                {loading
                    ? <Loading color={themes.textStyle[theme].color} />
                    : text ? 
                        <Text style={themes.textStyle[theme]}>{text}</Text> : 
                        null
                }

                {icon}
            </TouchableOpacity>
        );
    }
}
