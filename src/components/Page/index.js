import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Header from '@components/Header';
import BaseView from '@components/BaseView';

import styles from './styles';
import { colors, app_spacing } from '@styles/_variables';

const gradientColors = {
    white: [colors.white, colors.white],
    orange: [colors.orange.darkest, colors.orange.light],
};

const statusBarColors = {
    white: {
        style: 'dark-content',
        color: colors.white,
    },
    orange: {
        style: 'light-content',
        color: colors.orange.darkest,
    },
};

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 50;
    return layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;
};

export default class Page extends Component {
    constructor(props) {
        super(props);

        this.theme = this.props.theme || 'white';

        if (Platform.OS == 'android') {
            StatusBar.setBarStyle(statusBarColors[this.theme].style);
            StatusBar.setBackgroundColor(statusBarColors[this.theme].color);
        }
    }

    _getWrapper(children) {
        let gradient = Array.from(gradientColors[this.theme]);
        let locations = null;

        if (this.theme == 'orange') {
         
                return (
                    <LinearGradient
                        colors={gradient}
                        locations={locations}
                        style={styles.mainView}>
                        {children}
                    </LinearGradient>
                );
            
        } else return <View style={styles.mainView}>{children}</View>;
    }

    render() {
        var {
            children,
            headerProps,
            style,
            scrollRef,
            loadMore,
            noExtraBottomPadding,
        } = this.props;

        let contentStyles = [styles.content];
        if (noExtraBottomPadding)
            contentStyles.push({ paddingBottom: app_spacing.small });
        if (style) contentStyles.push(style);

        return (
            // <BaseView scrollRef={scrollRef} loadMore={loadMore}>
            <BaseView
                ref={(ref) => this.props.scrollRef ? this.props.scrollRef(ref) : null}
                onScroll={({ nativeEvent }) => {
                    if (isCloseToBottom(nativeEvent) && loadMore) {
                        loadMore();
                    }
                }}
            >
                {this._getWrapper(
                    <>
                        <Header theme={this.theme} {...headerProps} />
                        <View style={contentStyles}>{children}</View>
                    </>,
                )}
            </BaseView>
        );
    }
}
