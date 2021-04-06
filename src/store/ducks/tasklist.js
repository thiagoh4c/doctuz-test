// Action Types
import qs from 'qs';

export const REGISTER = 'todo/user/REGISTER';
export const REGISTER_FAIL = 'todo/user/REGISTER_FAIL';
export const REGISTER_SUCCESS = 'todo/user/REGISTER_SUCCESS';

export const UPDATE = 'todo/user/UPDATE';
export const UPDATE_FAIL = 'todo/user/UPDATE_FAIL';
export const UPDATE_SUCCESS = 'todo/user/UPDATE_SUCCESS';

export const GET_TASKLIST = 'todo/auth/GET_TASKLIST';
export const GET_TASKLIST_SUCCESS = 'todo/auth/GET_TASKLIST_SUCCESS';
export const GET_TASKLIST_FAIL = 'todo/auth/GET_TASKLIST_FAIL';

export const GET_DETAILS = 'todo/auth/GET_DETAILS';
export const GET_DETAILS_SUCCESS = 'todo/auth/GET_DETAILS_SUCCESS';
export const GET_DETAILS_FAIL = 'todo/auth/GET_DETAILS_FAIL';

// Reducer

const initialState = {
    data: null,
    list: null,
    loading: {
        list: false,
        details: false,
    },
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REGISTER:
            return { ...state, loading: { ...state.loading} };
        case UPDATE:
                return { ...state, loading: { ...state.loading} };
        case GET_TASKLIST:
            return {
                ...state,
                loading: { ...state.loading, list: true },
            };

        case GET_DETAILS:
            return {
                ...state,
                loading: { ...state.loading, details: true },
            };

        case GET_TASKLIST_SUCCESS:
            let data = action.payload.data;
            return {
                ...state,
                data: data.data,
                loading: { ...state.loading, list: false },
            };

        case GET_DETAILS_SUCCESS:
            let dataDetails = action.payload.data;
            return {
                ...state,
                data: dataDetails.data,
                loading: { ...state.loading, details: false },
            };

        case GET_TASKLIST_FAIL:
        case GET_DETAILS_FAIL:
            return {
                ...state,
                loading: { ...initialState.loading },
            };

        default:
            return state;
    }
}

export function getTaskList(page = 1) {
    return {
        type: GET_TASKLIST,
        payload: {
            request: {
                url: `/tasklist?page=${page}`,
            },
        },
    };
}

export function getTaskListDetails(id) {
    return {
        type: GET_DETAILS,
        payload: {
            request: {
                url: `/tasklist/${id}`,
            },
        },
    };
}

export function register(data) {
    console.log('register');
    return {
        type: REGISTER,
        payload: {
            request: {
                url: '/tasklist/register',
                method: 'POST',
                data: qs.stringify(data),
            },
        },
    };
}
export function update(data) {
    console.log('update');
    return {
        type: UPDATE,
        payload: {
            request: {
                url: '/tasklist/register',
                method: 'POST',
                data: qs.stringify(data),
            },
        },
    };
}
