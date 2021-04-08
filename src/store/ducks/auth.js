// Action Types
import qs from 'qs';
import Firebase from '@services/firebase';

export const LOGIN = 'todo/auth/LOGIN';
export const LOGIN_SUCCESS = 'todo/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'todo/auth/LOGIN_FAIL';

export const REFRESH_DATA = 'todo/auth/REFRESH_DATA';
export const REFRESH_DATA_SUCCESS = 'todo/auth/REFRESH_DATA_SUCCESS';
export const REFRESH_DATA_FAIL = 'todo/auth/REFRESH_DATA_FAIL';

export const LOGOUT = 'todo/user/LOGOUT';

// Reducer

const initialState = {
    data: null,
    loading: {
        login: false,
        forgetPassword: false,
    },
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: { ...state.loading, login: true },
            };
    
        case REFRESH_DATA_SUCCESS:
            let updateData = action.payload.data;
            if (updateData.status)
                return {
                    ...state,
                    data: updateData.data
                };
        case LOGIN_SUCCESS:
            let data = action.payload.data;

            if (data.status)
                return {
                    ...state,
                    data: data.data,
                    loading: { ...state.loading, login: false },
                };
            else
                return {
                    ...state,
                    data: null,
                    loading: { ...state.loading, login: false },
                };
        case LOGOUT:
            return {
                ...state,
                ...initialState,
            };

        case REFRESH_DATA_FAIL:
        case LOGIN_FAIL:
            return {
                ...state,
                loading: { ...initialState.loading },
            };

        default:
            return state;
    }
}

// Action Creators
export async function login(data) {

    try{
        const response = await Firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        return {
            type: LOGIN,
            payload: response.user,
        };
    }catch(e){
        return {
            type: LOGIN,
            payload: {},
        };
    }
}

export function refresh() {
    return {
        type: REFRESH_DATA,
        payload: {
            request: {
                url: '/user/me/',
                method: 'GET',
            }
        }
    };
}

export function logout() {
    Firebase.auth().signOut()
    return {
        type: LOGOUT,
    };
}
