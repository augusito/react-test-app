import {createStore,combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/userReducer';
import errorReducer from './reducers/errorReducer';
import taskReducer from './reducers/taskReducer';

const middleware = [thunk];

const store = createStore(
    combineReducers({
            auth: authReducer,
            errors: errorReducer,
            tasks: taskReducer,
        }),
    {},
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ?
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() :
                f => f
    )
);

export default store;