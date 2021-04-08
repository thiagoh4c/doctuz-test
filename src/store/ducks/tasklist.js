// Action Types
import qs from 'qs';

export const REGISTER_TASK = 'todo/user/REGISTER_TASK';
export const REGISTER_TASK_FAIL = 'todo/user/REGISTER_TASK_FAIL';
export const REGISTER_TASK_SUCCESS = 'todo/user/REGISTER_TASK_SUCCESS';

export const UPDATE_TASK = 'todo/user/UPDATE_TASK';
export const UPDATE_TASK_FAIL = 'todo/user/UPDATE_TASK_FAIL';
export const UPDATE_TASK_SUCCESS = 'todo/user/UPDATE_TASK_SUCCESS';

export const COMPLETE_TASK = 'todo/user/COMPLETE_TASK';
export const COMPLETE_TASK_FAIL = 'todo/user/COMPLETE_TASK_FAIL';
export const COMPLETE_TASK_SUCCESS = 'todo/user/COMPLETE_TASK_SUCCESS';

export const REMOVE_TASK = 'todo/user/REMOVE_TASK';
export const REMOVE_TASK_FAIL = 'todo/user/REMOVE_TASK_FAIL';
export const REMOVE_TASK_SUCCESS = 'todo/user/REMOVE_TASK_SUCCESS';

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
    console.log(action);
    switch (action.type) {
        case REGISTER_TASK:
        case UPDATE_TASK:
        case REMOVE_TASK:
            return { ...state, loading: { ...state.loading} };
        case COMPLETE_TASK:
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
        case COMPLETE_TASK_SUCCESS:
             data = action.payload.data;
            return {
                ...state,
                data: data.data,
                loading: { ...state.loading, list: false },
            };

        case REMOVE_TASK_SUCCESS:
            data = action.payload.data;
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

export function registerTask(data) {
    return {
        type: REGISTER_TASK,
        payload: {
            request: {
                url: '/tasklist/register',
                method: 'POST',
                data: qs.stringify(data),
            },
        },
    };
}
export function updateTask(data) {
    return {
        type: UPDATE_TASK,
        payload: {
            request: {
                url: '/tasklist/update',
                method: 'POST',
                data: qs.stringify(data),
            },
        },
    };
}

export function setCompletedTask(idTask) {
    return {
        type: COMPLETE_TASK,
        payload: {
            request: {
                url: `/tasklist/complete/${idTask}`,
                method: 'POST',
            },
        },
    };
}
export function removeTask(idTask) {
    return {
        type: COMPLETE_TASK,
        payload: {
            request: {
                url: `/tasklist/remove/${idTask}`,
                method: 'POST',
            },
        },
    };
}