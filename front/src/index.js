import Vue from 'vue';
import router from './router';
import store from './store';

new Vue({
    el: '#app',
    template: '<router-view>',
    router,
    store
});