import Vue from 'vue';
import VueMq from 'vue-mq';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    md: 650,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm', // customize this for SSR
});

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
