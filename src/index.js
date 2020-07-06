import Vue from 'vue';
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'

import { store } from './store';
import { router } from './helpers';
import './styles/styles.scss'
import App from './components/App/App.vue';

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

import { configureFakeBackend } from './helpers';
configureFakeBackend();

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
