import "bootstrap/dist/css/bootstrap.min.css"
import "font-awesome/css/font-awesome.min.css"

import Vue from 'vue'
import App from './App.vue'
import store from './store';
import router from './router';
import Vue2Editor from "vue2-editor";
import Vuelidate from "vuelidate";

Vue.use(Vue2Editor);
Vue.use(Vuelidate);

Vue.filter("currency", (value) => new Intl.NumberFormat("en-US", { style: "currency", currency: "MXN" }).format(value));

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
