import Vue from 'vue';
import VueRouter from 'vue-router';

// import the views
import Home from './views/Home.vue';
import About from './views/About.vue';
import Music from './views/Music.vue';
import Contact from './views/Contact.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/music',
      name: 'music',
      component: Music
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
  ],
});
