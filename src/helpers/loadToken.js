import axios from 'axios';

const loadToken = (token, type = 'Bearer') => {
    const value = token ? `${type} ${token}` : null;
    if (!value){
        delete axios.defaults.headers.common['Authorization'];
        return
    }
    axios.defaults.headers.common['Authorization'] = value;
};

export default loadToken;