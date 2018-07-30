import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import images from './modules/images';

let store = new Vuex.Store({
    modules: { images }
});

export default store;