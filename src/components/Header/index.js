import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import Logo from '@components/Logo';

import styles from './styles';
import { colors } from '@styles/_variables';
import BackButton from '@components/BackButton';
import ExitButton from '@components/ExitButton';

import { connect } from 'react-redux';

const ThemeColors = {
    white: colors.orange.default,
    orange: colors.white,
};

class Header extends Component {


    constructor(props) {
        super(props);
    }

    _renderFirstBlock() {
        let content = <View style={styles.item} />;
        if (this.props.showBackButton)
            content = (
                <View style={[styles.item, { alignItems: 'flex-start' }]}>
                    <BackButton
                        style={styles.item}
                        color={ThemeColors[this.props.theme]}
                    />
                </View>
            );

        return content;
    }

    _renderMiddleBlock() {
        return (
            <Logo
                size="medium"
                style={styles.item}
                fill={ThemeColors[this.props.theme]}
            />
        );
    }

    _renderLastBlock() {
        let content = <View style={styles.item} />;
        if (this.props.showLogoutButton)
        content = (
            <View style={[styles.item, { alignItems: 'flex-end' }]}>          
                <ExitButton
                    style={styles.item}
                    color={ThemeColors[this.props.theme]}
                />
            </View>
        );
        return content;
    }


    render() {
        var { theme, showBackButton, showNotificationsButton } = this.props;

        theme = theme || 'white';
        
        return (
            <View style={styles.wrapper}>
                {this._renderFirstBlock()}
                {this._renderMiddleBlock()}
                {this._renderLastBlock()}
            </View>
        );
    }
}

const mapStateToProps = ({ user }) => ({
    user: user.data,
});


const mapDispatchToProps = {
    
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Header);
