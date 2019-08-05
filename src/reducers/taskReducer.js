import {taskConstants} from "../constants/taskConstants";

const initialState = {
    assigned: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case taskConstants.ASSIGNED_TASKS:
            return {
                ...state,
                assigned: action.payload
            };
        default:
            return state;
    }
}