import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import user from '@store/user';
import auth from '@store/auth';
import alert from './ducks/alert';
import tasklist from './ducks/tasklist';

import { API_PATH, API_TOKEN, API_VERSION } from '@src/constants';

import { toggleAlert } from './ducks/alert';


export const reducer = combineReducers({
    alert,
    user,
    auth,
    tasklist,
});

const client = axios.create({
    baseURL: API_PATH,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'api-token': API_TOKEN,
        'api-version': API_VERSION,
    },
    responseEncoding: 'utf8',
    responseType: 'json',
});

export const getSessionId = () => {
    const state = store.getState();
    if (state && state.auth && state.auth.data && state.auth.data.session_id)
        return state.auth.data.session_id;

    if (state && state.user && state.user.session_id)
        return state.user.session_id;

    return false;
};

client.interceptors.request.use(async config => {
    const state = store.getState();
    if (state && state.auth && state.auth.data && state.auth.data.session_id)
        config.headers.common['session-id'] = state.auth.data.session_id;

    if (state && state.user && state.user.data && state.user.data.session_id)
        config.headers.common['session-id'] = state.user.data.session_id;

    return config;
});

const middlewareAxios = axiosMiddleware(client, {
    interceptors: {
        response: [
            {
                error: ({ dispatch }, error) => {
                    if(!error.response.data){
                        store.dispatch(
                            toggleAlert(true, {
                                title: 'Ops!',
                                message: 'Não foi possível completar a sua requisição.',
                            }),
                        );
                        return Promise.reject(error);   
                    }
                    if (error.response && error.response.data.logout) {
                        store.dispatch(
                            toggleAlert(true, {
                                title: 'Ops!',
                                message: 'Você precisa realizar login novamente.',
                            }),
                        );
                    } else {
                        store.dispatch(
                            toggleAlert(true, {
                                title: 'Ops!',
                                message: 'Não foi possível completar a sua requisição.',
                            }),
                        );
                    }
                    return Promise.reject(error);
                },
            },
        ],
    },
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['alert'],
};

const persistedReducer = persistReducer(persistConfig, reducer);
const middleware = applyMiddleware(middlewareAxios);

export const store = createStore(persistedReducer, middleware);
export const persistor = persistStore(store);
