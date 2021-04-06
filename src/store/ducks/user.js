// Action Types
import qs from 'qs';

export const REGISTER = 'todo/user/REGISTER';
export const REGISTER_FAIL = 'todo/user/REGISTER_FAIL';
export const REGISTER_SUCCESS = 'todo/user/REGISTER_SUCCESS';

export const SET_USER = 'todo/user/SET_USER';

// Reducer

const initialState = {
    data: null,
    loading: {
        register: false,
    },
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return { ...state, loading: { ...state.loading, register: true } };
        case REGISTER_SUCCESS:
            let registerData = action.payload.data;
            if (registerData.status)
                return {
                    ...state,
                    data: registerData.data,
                    loading: { ...state.loading, register: false },
                };
            else
                return {
                    ...state,
                    loading: { ...state.loading, register: false },
                };
        case SET_USER:
            return {
                ...state,
                data: action.payload.user,
            };
        case REGISTER_FAIL:
        default:
            return { ...state, loading: { ...initialState.loading } };
    }
}

// Action Creators
export function register(data) {
    return {
        type: REGISTER,
        payload: {
            request: {
                url: '/user/register',
                method: 'POST',
                data: qs.stringify(data),
            },
        },
    };
}

export function setUser(data) {
    return {
        type: SET_USER,
        payload: {
            user:data,
        },
    };
}