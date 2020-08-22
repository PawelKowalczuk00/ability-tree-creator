export const show = (store, message) => {
    store.setState({
        error: {
            display: 'block',
            message
        }
    });
};

export const hide = store => {
    store.setState({
        error: {
            display: 'none',
            message: undefined
        }
    });
};