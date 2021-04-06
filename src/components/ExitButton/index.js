import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

import styles from './styles';
import NavigationService from '@services/NavigationService';

import { logout } from '@store/auth';
import { connect } from 'react-redux';

class ExitButton extends Component {

    constructor(props) {
        super(props);
    }

    _logout() {
        NavigationService.navigate('Login');
        setTimeout(() => { this.props.logout();console.log('logout') } , 1000);;
    }

    render() {

        const { color } = this.props;

        return (
            <TouchableOpacity activeOpacity={0.8} style={[styles.button, { borderColor: color }]} onPress={() => this._logout()}>
                <FontAwesome name="sign-out-alt" size={15} color={color} />
            </TouchableOpacity>
        );
    }
}

const mapStateToProps = () => ({});


const mapDispatchToProps = {
    logout
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExitButton);
