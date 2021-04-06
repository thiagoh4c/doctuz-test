import React from 'react';
import Alert from './components/Alert/Alert';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Navigator from './routes';
import { persistor, store } from './store';

import { refresh } from './store/ducks/auth';

import NavigationService from '@services/NavigationService';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Navigator
                        onStateChange={this.onNavigatorStateChange}
                        ref={NavigationService._navigator}
                    />
                    <Alert />
                </PersistGate>
            </Provider>
        );
    }
}
