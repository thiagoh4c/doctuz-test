import React, { Component } from 'react';
import { View } from 'react-native';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

// import { Container } from './styles';

export default class Loading extends Component {
    render() {
        var { size, color } = this.props;

        size = size || 25;
        color = color || 'rgba(255, 255, 255, 0.5)';

        return <MaterialIndicator size={size} color={color} />;
    }
}
