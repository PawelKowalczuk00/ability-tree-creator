import api from '../utils/axios.js';

export const login = async (store, credentials) => {
    return api.post('/login', credentials)
        .then(res => {
            const token = res.headers['x-auth-token'];
            localStorage.setItem('token', token);
            localStorage.setItem('email', credentials.email);
            store.setState({ token });
            return res.status;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not login. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}

export const register = async (store, credentials) => {
    return api.post('/register', credentials)
        .then(async res => {
            await login(store, credentials);
            return res.status;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not register. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}