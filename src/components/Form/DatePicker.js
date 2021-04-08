import React, { Component } from 'react';

import { View, TextInput, Animated, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Moment from 'moment';

import DateTimePicker from '@react-native-community/datetimepicker';

import themes from './styles';
import Utils from '@services/Utils';


export default class CustomDateTimePicker extends Component {
    state = {
        date: '',
        isFieldActive: false,
        dateMode: 'date',
        showDatePicker: false
    };

    constructor(props) {
        super(props);

        const { date, form, name } = this.props;

        this.position = new Animated.Value(date ? 1 : 0);
        this.theme = this.props.theme || 'default';
        this.name = name;
        this.form = form;

        if (this.props.form.values[this.name]) {
            this.state.isFieldActive = true;
            Animated.timing(this.position, {
                toValue: 1,
                duration: 150,
                useNativeDriver: false,
            }).start();
        }

    }

    _returnAnimatedTitleStyles = () => {
        var { isFieldActive } = this.state;
        var { date } = this.state;

        isFieldActive = date ? true : isFieldActive;

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
        this.setState({showDatePicker:true});
    };

    _handleBlur = () => {
        if (this.state.isFieldActive && !this.state.date) {
            this.setState({ isFieldActive: false });
            Animated.timing(this.position, {
                toValue: 0,
                duration: 250,
                useNativeDriver: false,
            }).start();
        }
        this.setState({showDatePicker:false});
    };

    _onChangeDate = (event,updatedValue) => {
        Keyboard.dismiss();
        this.setState({ date: updatedValue, showDatePicker:false });

        if (this.form) this.form.setFieldValue(this.name, updatedValue);
        
        if(this.props._onChangeDate)
            this.props._onChangeDate(updatedValue);
        
    };

    render() {
        var { placeholder, isDatePicker } = this.props;

        let inputStyles = [themes.input[this.theme]];
        let invalid = false;

        if (this.form && this.props.form.errors[this.name]) {
            invalid = true;
            inputStyles.push(themes.inputError);
            placeholder += ` (${this.props.form.errors[this.name]})`;
        }

        let stringDate = Moment(this.props.form.values[this.name]).format('DD/MM/YYYY')

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
                    {this.state.showDatePicker &&
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode={this.state.dateMode}
                        is24Hour={true}
                        display="default"
                        dateFormat="dayofweek day month" 
                        onChange={(event, value) => this._onChangeDate(event, value)}
                        />
                    }
                    <TextInput
                        style={inputStyles}
                        showSoftInputOnFocus={false} 
                        value={stringDate}
                        underlineColorAndroid="transparent"
                        onFocus={() => this._handleFocus()}
                        onBlur={() => this._handleBlur()}
                        editable={this.props.editable}
                        {...this.type}
                    />
                    <FontAwesome name="calendar" size={15} color={themes.input[this.theme].color} style={themes.datePickerIcon}/>
            </View>
        );
    }
}
