import React, { Component } from 'react';

import { View, SafeAreaView, ScrollView } from 'react-native';

import styles from './styles';

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 50;
    return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
    );
};

const BaseView = React.forwardRef((props, ref) => (
    <SafeAreaView style={styles.safeArea}>
        <ScrollView
            ref={props.scrollRef}
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            alwaysBounceVertical={false}
            bounces={false}
            removeClippedSubviews={false}
            keyboardDismissMode="on-drag"
            renderToHardwareTextureAndroid={true}
            overScrollMode="never"
            shouldRasterizeIOS={true}
            onScroll={({ nativeEvent }) => {
                if (isCloseToBottom(nativeEvent) && props.loadMore) {
                    props.loadMore();
                }
            }}>
            {props.children}
        </ScrollView>
    </SafeAreaView>
));

export default BaseView;
