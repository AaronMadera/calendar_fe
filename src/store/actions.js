import { mutationTypes } from './mutations';

export default {
    setUser({ commit }, data) {
        commit(mutationTypes.LOG_IN, data)
    },

    logout({commit}) {
        commit(mutationTypes.LOG_OUT);
    }
};