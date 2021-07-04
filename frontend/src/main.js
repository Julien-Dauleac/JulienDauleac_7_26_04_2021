// Modules //
import Vue from 'vue';
import App from './App.vue';
import router from './router';

// Import Axios et configuration //
// Sert à utiliser et afficher les données provenant d’une API basé sur les promesses //
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3000/api/';
const token = localStorage.getItem('token');
if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}
Vue.prototype.$axios = axios;
// Fin Axios //

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
