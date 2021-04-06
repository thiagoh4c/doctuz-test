
import React, { Component } from 'react';
import { MaterialIndicator } from 'react-native-indicators';


const CommonSpinner = props => (
    <MaterialIndicator
        size={props.size || 15}
        style={props.customStyle}
        color={props.color || '#CCCCCC'}
    />
);

export default CommonSpinner;