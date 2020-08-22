import api from '../utils/axios.js';

export const getList = async store => {
    return api.get('/heroes', {
        headers: {
            "x-auth-token": localStorage.getItem('token')
        }
    })
        .then(res => {
            return res;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not get list of heroes. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
            return er.response
        });
}

export const getOne = async (store, _id) => {
    return api.get(`/heroes/${_id}`, {
        headers: {
            "x-auth-token": localStorage.getItem('token')
        }
    })
        .then(async res => {
            return res;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not get a hero. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}

export const addOne = async (store, info) => {
    return api.post('/heroes', info, {
        headers: {
            "x-auth-token": localStorage.getItem('token')
        }
    })
        .then(async res => {
            return res;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not get a hero. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}

export const expose = (store, hero) => {
    store.setState({exposedHero: hero._id});
}