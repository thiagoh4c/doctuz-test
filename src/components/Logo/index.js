import React, { Component } from 'react';

const sizes = {
    big: {
        width: 258,
        height: 83,
    },
    medium: {
        width: 140,
        height: 48,
    },
    small: {
        width: 54,
        height: 24,
    },
};

export default class Logo extends Component {
    render() {
        let size = this.props.size ? this.props.size : 'big';
        let Svg = require('@svg/logo').default;

        return <Svg {...sizes[size]} {...this.props} />;
    }
}
