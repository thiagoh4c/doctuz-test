import React, { Component } from 'react';

import { View, TextInput, Animated, Text } from 'react-native';

import themes from './styles';
import Utils from '@services/Utils';

const InputTypes = {
    email: {
        autoCompleteType: 'email',
        keyboardType: 'email-address',
    },
    phone: {
        autoCompleteType: 'tel',
        dataDetectorTypes: 'phoneNumber',
        keyboardType: 'phone-pad',
        mask: 'phone',
    },
    doc: {
        autoCompleteType: 'tel',
        dataDetectorTypes: 'phoneDoc',
        keyboardType: 'phone-pad',
        mask: 'doc',
    },
    password: {
        secureTextEntry: true,
    },
    textarea: {
        textarea: true,
        multiline: true,
        numberOfLines: 4,
    },
};
export default class Input extends Component {
    state = {
        value: '',
        isFieldActive: false,
        mask: false,
    };

    constructor(props) {
        super(props);

        const { value, type, mask, form, name } = this.props;

        this.position = new Animated.Value(value ? 1 : 0);
        this.theme = this.props.theme || 'default';
        this.name = name;
        this.form = form;

        if(type == 'doc'){
            this.props.form.values['doc'] = Utils.maskDoc(this.props.form.values['doc']);
        }

        if (type) {
            this.type = InputTypes[type];

            if (this.type.mask) this.state.mask = this.type.mask;
        }

        if (this.props.form.values[this.name]) {
            this.state.isFieldActive = true;
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }

        if (mask) this.state.mask = mask;

    }

    _returnAnimatedTitleStyles = () => {
        var { isFieldActive } = this.state;
        var { value } = this.state;

        isFieldActive = value ? true : isFieldActive;

        let style = isFieldActive
            ? themes.titleActive[this.theme]
            : themes.title[this.theme];

        return {
            ...style,
            top: this.position.interpolate({
                inputRange: [0, 1],
                outputRange: [29, 22],
            }),
        };
    };

    _handleFocus = () => {
        if (!this.state.isFieldActive) {
            this.setState({ isFieldActive: true });
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }
    };

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.state.value) {
            this.setState({ isFieldActive: false });
            Animated.timing(this.position, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
    };

    _onChangeText = updatedValue => {
        if (this.state.mask == 'phone')
            updatedValue = Utils.maskPhone(updatedValue);
        else if (this.state.mask == 'doc')
            updatedValue = Utils.maskDoc(updatedValue);
        else if (this.state.mask)
            updatedValue = Utils.mask(updatedValue, this.state.mask);

        this.setState({ value: updatedValue });

        if (this.form) this.form.setFieldValue(this.name, updatedValue);
        
        if(this.props.onChangeText)
            this.props.onChangeText(updatedValue);
    };

    render() {
        var { placeholder, textarea } = this.props;

        let inputStyles = [themes.input[this.theme]];
        let invalid = false;

        if (this.form && this.props.form.errors[this.name]) {
            invalid = true;
            inputStyles.push(themes.inputError);
            placeholder += ` (${this.props.form.errors[this.name]})`;
        }

        if (this.type && this.type.textarea) {
            inputStyles.push(themes.textarea[this.theme]);
        }

        return (
            <View style={themes.wrapper[this.theme]}>
                <View pointerEvents="none" style={themes.titleWrapper}>
                    <Animated.Text
                        style={[
                            themes.title[this.theme],
                            this._returnAnimatedTitleStyles(),
                            invalid ? themes.titleError : {},
                        ]}>
                        {placeholder}
                    </Animated.Text>
                </View>
                <TextInput
                    style={inputStyles}
                    value={this.props.form.values[this.name]}
                    underlineColorAndroid="transparent"
                    onFocus={() => this._handleFocus()}
                    onBlur={() => this._handleBlur()}
                    onChangeText={value => this._onChangeText(value)}
                    editable={this.props.editable}
                    {...this.type}
                />
            </View>
        );
    }
}
