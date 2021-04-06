import * as React from 'react';
import {
    CommonActions,
    DrawerActions,
} from '@react-navigation/native';
import { Routes } from '@src/routes';
//Services
import Utils from '@services/Utils';
import { colors } from '@styles/_variables';

const NavigationService = {};

NavigationService._navigator = React.createRef();

NavigationService.navigate = (page, params) => {
    if (Routes[page])
        NavigationService._navigator.current.dispatch(Routes[page](params));
    else
        NavigationService._navigator.current.dispatch(
            CommonActions.navigate(page, params),
        );
    Utils.setStatusBarColor(colors.orange.darkest);
};

NavigationService.back = () => {
    NavigationService._navigator.current.dispatch(CommonActions.goBack());
};
export default NavigationService;
