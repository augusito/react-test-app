 import {userConstants} from "../constants/userConstants";

 const initialState = {
     loggedIn: false,
     personnel: {}
 };

 export default function (state = initialState, action) {
     switch (action.type) {
         case userConstants.LOGGED_USER:
             return {
                 ...state,
                 loggedIn: true,
                 personnel: action.payload
             };
         default:
             return state;
     }
 }