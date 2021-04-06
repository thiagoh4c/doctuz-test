// Action Types

export const TOGGLE_ALERT = 'todo/alert/TOGGLE';

// Reducer

const initialState = {
    show: false,
    settings: {}
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ALERT:
            return {
                ...state,
                settings: action.payload.settings,
                show: action.payload.show
            };
        default:
            return state;
    }
}

// Action Creators
export function toggleAlert(show, settings) {
    return {
        type: TOGGLE_ALERT,
        payload: {
            settings,
            show
        }
    };
}