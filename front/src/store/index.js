import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import images from './modules/images';

let store = new Vuex.Store({
    namespaced: true,
    modules: { images }
});

export default store;