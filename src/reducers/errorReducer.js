import {alertConstants} from "../constants/alertConstants";

export default function (state = {}, action) {
    switch (action.type) {
        case alertConstants.ERROR:
            return action.payload;
        default:
            return state;
    }
}