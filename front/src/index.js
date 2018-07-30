import Vue from 'vue';
import router from './router';
import store from './store';

import '@/styles/app';

new Vue({
    el: '#app',
    template: '<router-view></router-view>',
    router,
    store
});