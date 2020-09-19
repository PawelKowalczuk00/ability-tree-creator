import api from '../utils/axios.js';

export const getOne = (store, _id) => {
    return api.get(`/trees/${_id}`, {
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
                store.actions.error.show(`Could not get a tree. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}

export const getAll = async (store, ids) => {
    return Promise.all(ids.map(id => getOne(store, id)));
}

export const addOne = (store, body, heroId) => {
    return api.post('/trees', body, {
        headers: {
            "x-auth-token": localStorage.getItem('token')
        },
        params: { heroId }
    })
        .then(res => {
            return res;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not post a tree. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}

export const deleteOne = (store, _id) => {
    return api.delete(`/trees/${_id}`, {
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
                store.actions.error.show(`Could not delete a tree. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}