import axios from "axios";
import {alertConstants} from "../constants/alertConstants";
import {taskConstants} from "../constants/taskConstants";

export const findAssignedTasks = (page, limit,) => {
  return dispatch => {
    let url = `https://kazi.azurewebsites.net/tasks/assigned?page=${page}&limit=${limit}`;
    axios
        .get(url)
        .then(tasks => {
          dispatch({
            type: taskConstants.ASSIGNED_TASKS,
            payload: tasks.data
          });
        })
        .catch(err => {
          if (err.response) {
            if (err.response.data) {
              if (err.response.data.error) {
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
            } else {
              dispatch({
                type: alertConstants.ERROR,
                payload: "Oops! We encountered an error. Please try again."
              });
            }
          } else {
            dispatch({
              type: alertConstants.ERROR,
              payload: "Oops! We encountered an error. Please try again."
            });
          }
        });
  }
};
