import api from '../utils/axios.js';

export const addOne = (store, body, position, heroId, treeId) => {
    return api.post(`/abilities/${position}`, body, {
        headers: {
            "x-auth-token": localStorage.getItem('token')
        },
        params: { heroId, treeId }
    })
        .then(res => {
            return res;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not post an ability. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}

export const deleteOne = (store, position, heroId, treeId) => {
    return api.delete(`/abilities/${position}`, {
        headers: {
            "x-auth-token": localStorage.getItem('token')
        },
        params: { heroId, treeId }
    })
        .then(res => {
            return res;
        })
        .catch(er => {
            console.error(er);
            if (er.response) {
                store.actions.error.show(`Could not delete an ability. ${er.response.data}`);
            } else {
                store.actions.error.show(`Unexpexted error with request to the server.`);
            }
        });
}