import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import {
    createStackNavigator,
    CardStyleInterpolators,
} from '@react-navigation/stack';


import LoadingScreen from './pages/LoadingScreen';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import TaskListDetails from './pages/TaskListDetails';

const _Routes = {};

_Routes['TaskList'] = params =>
    CommonActions.navigate('AuthedStack', {
        screen: 'TaskListStack',
        params: {
            screen: 'TaskList',
            params,
        },
    });

_Routes['TaskListDetails'] = params =>
    CommonActions.navigate('AuthedStack', {
        screen: 'TaskListDetails',
        params,
    });

_Routes['Login'] = params =>
    CommonActions.navigate('NotAuthedStack', {
        screen: 'Login',
        params,
    });

_Routes['ForgotPassword'] = params =>
        CommonActions.navigate('NotAuthedStack', {
            screen: 'ForgotPassword',
            params,
        });

_Routes['Register'] = params =>
    CommonActions.navigate('NotAuthedStack', {
        screen: 'Register',
        params,
    });


const NavigatorDefaultConfig = {
    headerShown: false,
};

const ScreenDefaultConfig = {
    headerShown: false,
    cardStyleInterpolator: CardStyleInterpolators.forScaleFromCenterAndroid,
};

const Stack = createStackNavigator();

const NotAuthedStack = () => (
    <Stack.Navigator screenOptions={{ NavigatorDefaultConfig }}>
        <Stack.Screen
            name="LoadingScreen"
            component={LoadingScreen}
            options={ScreenDefaultConfig}
        />
        <Stack.Screen
            name="Login"
            component={Login}
            options={ScreenDefaultConfig}
        />
        <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={ScreenDefaultConfig}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={ScreenDefaultConfig}
        />
    </Stack.Navigator>
);


const AuthedUserStack = () => (
    <Stack.Navigator screenOptions={{ ...NavigatorDefaultConfig }}>
        <Stack.Screen name="TaskList" component={TaskList} />
        <Stack.Screen name="TaskListDetails" component={TaskListDetails} />
    </Stack.Navigator>
);

const Navigator = React.forwardRef((props, ref) => {
    return (
        <NavigationContainer
            ref={ref}
            onStateChange={props.onStateChange}
            initialRouteName="LoadingScreen">
            <Stack.Navigator screenOptions={NavigatorDefaultConfig}>
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                <Stack.Screen
                    name="NotAuthedStack"
                    component={NotAuthedStack}
                />
                <Stack.Screen name="AuthedStack" component={AuthedUserStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
});

export const Routes = { ..._Routes };
export default Navigator;
