const mutationTypes = {
    LOG_IN: 'LOG_IN',
    LOG_OUT:'LOG_OUT'
};

const mutations = {
    [ mutationTypes.LOG_IN ](state, data) {
        const expires = Number(data.expires) * 1000;
        localStorage.setItem('expires', String(expires));
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        state.isLogged = true;
        state.user = data.user;
        state.token = data.token;
        state.expires = expires;
    },

    [ mutationTypes.LOG_OUT ](state) {
        localStorage.removeItem('expires');
        localStorage.removeItem('token');
        localStorage.removeItem('user');

        state.isLogged = false;
        state.user = {};
        state.token = '';
        state.expires = 0;
    }
};


export { mutationTypes, mutations};
