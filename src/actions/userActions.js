import axios from "axios";
import jwt_decode from "jwt-decode";
import loadToken from "../helpers/loadToken";
import {alertConstants} from '../constants/alertConstants';
import {userConstants} from "../constants/userConstants";
axios.interceptors.request.use(request => {return request});
axios.interceptors.response.use(response => {return response});

export const login = user => {
    return dispatch => {
        axios.post(`https://kazi.azurewebsites.net/personnel/login`, user)
            .then(res => {
                const {accessToken} = res.data;
                localStorage.setItem("jwtToken", accessToken);
                loadToken(accessToken);
                const decoded = jwt_decode(accessToken);
                dispatch(loggedInAs(decoded));
            })
            .catch(err => {
                if (err.response) {
                    dispatch({
                        type: alertConstants.ERROR,
                        payload: err.response.data.error
                    });
                } else {
                    dispatch({
                        type: alertConstants.ERROR,
                        payload: "Oops! We encountered an error. Please try again."
                    });
                }
            });
    }
};

export const logout = () => dispatch => {
    localStorage.removeItem("jwtToken");
    loadToken(false);
    dispatch(loggedInAs({}));
};

export const loggedInAs = decoded => {
    return {
        type: userConstants.LOGGED_USER,
        payload: decoded
    };
};
