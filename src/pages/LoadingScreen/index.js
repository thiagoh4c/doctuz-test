import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import posed from 'react-native-pose';

import { colors } from '@styles/_variables';
import styles from './styles';
import Utils from '@services/Utils';
import NavigationService from '@services/NavigationService';

import { refresh } from '@store/auth';
import { setUser } from '@store/user';
import {  store } from '../../store';
import Firebase from '@services/firebase';

const SolidColorView = posed.View({
    visible: {
        opacity: 1,
        transition: {
            duration: 600,
        },
    },
    hidden: {
        opacity: 0,
        transition: {
            duration: 600,
        },
    },
});

class LoadingScreen extends Component {
    state = {
        loaded: false,
    };

    constructor(props) {
        super(props);

        Utils.setStatusBarColor(colors.orange.default);

    }
    componentDidMount = () => {
        Firebase.auth().onAuthStateChanged(user => {
            if (user) {
                NavigationService.navigate('TaskList');
            } else {
                NavigationService.navigate('Login');
            }
        })
    }

    render() {
        return (
            <View>
               
            </View>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    user: user.data,
});

const mapDispatchToProps = {
    refresh,
    setUser,
};

export default connect(mapStateToProps,mapDispatchToProps)(LoadingScreen);
