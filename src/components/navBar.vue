<template>
  <div class = "bar menuText">

    <mq-layout mq="lg" v-for="page in pages" :key="page" class="navBar"
      v-bind:class="[page.classStyle, { navBarCurrent: page.classStyle == currentPage }]">
      <router-link class='menuText' v-bind:to="page.to">{{ page.label }}</router-link>
    </mq-layout>

    <mq-layout :mq="['sm','md']" class="small-nav">
      <popper trigger="click" ref="popper" :visible-arrow="false" :options="popperOpts"
        transition="fade" enter-active-class="fade-enter-active-nav" leave-active-class="fade-leave-active-nav">
        <div class="popper">
          <router-link v-for="page in pages" :key="page" class='menuText' v-bind:to="page.to"
            v-bind:class="{ navBarCurrentPopper: page.classStyle == currentPage }"
          ><span v-on:click="toggleMenu()">{{ page.label }}</span></router-link>
        </div>

        <span slot="reference">
          <font-awesome icon="bars"/>
          <p class="menuText">MENU</p>
        </span>
      </popper>
    </mq-layout>

  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

library.add(faBars);

export default {
  data() {
    return {
      pages: [
        { classStyle: 'home-nav', to: '/', label: 'HOME' },
        { classStyle: 'about', to: '/about', label: 'ABOUT' },
        { classStyle: 'music', to: '/music', label: 'MUSIC' },
        // { classStyle: 'downloads', to: '/downloads', label: 'DOWNLOADS' }, TODO: get some downloads
        { classStyle: 'contact', to: '/contact', label: 'CONTACT' },
      ],
      currentPage: 'home-nav',
      popperOpts: {
        menuShowing: false,
        placement: 'bottom-start',
        modifiers: {
          offset: {
            enabled: true,
            offset: '0, 7',
          },
          preventOverflow: {
            enabled: false,
          },
        },
      },
    };
  },

  components: {
    'font-awesome': FontAwesomeIcon,
    popper: Popper,
  },

  mounted() {
    this.currentPage = this.$route.name;
  },

  methods: {
    toggleMenu() {
      this.$refs.popper.doClose();
    },
  },

  watch: {
    $route(newRoute) {
      this.currentPage = (newRoute.name == 'home') ? 'home-nav' : newRoute.name;
    },
  },
};

</script>

<style>
.navBar {
  padding: 10px 8px 8px 8px;
  /* border-bottom: 3px solid #12211d; */
  border-bottom: 3px solid #12211d;
}
.navBar:hover {
  border-bottom: 3px solid #fff;
}
.navBarCurrent {
  border-bottom: 3px solid #fff;
}
.navBar.menuText {
  padding-top: 2px;
}
a.menuText {
  padding-left: 4px;
}
.bar {
  background-color: #12211d;
  grid-row: nav;
  display: inline-grid;
  grid-template-columns: 0.5fr auto auto auto auto auto 0.5fr;
  grid-template-rows: auto;
  grid-column-gap: 2.25vw;
  justify-content: center;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 30;
}

.home-nav {
  grid-row: 1;
  grid-column: 2;
}
.about {
  grid-row: 1;
  grid-column: 3;
}
.music {
  grid-row: 1;
  grid-column: 4;
}
/* .downloads {
  grid-row: 1;
  grid-column: 5;
} */
.contact {
  grid-row: 1;
  grid-column: 5;
}
/* Padding for the sticky header */
.bar + .contentWrapper {
  padding-top: 42px;
}
.small-nav + .contentWrapper {
  padding-top: 42px;
}

/* Things for the small nav */
.small-nav {
  background-color: #12211d;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 30;
  align-content: center;
  height: 47px;
}

.small-nav .menuText {
  vertical-align: middle;
  margin: 0;
  line-height: 47px;
  display: inline-block;
  padding-left: 5px;
  cursor: pointer;
}

.small-nav .fa-bars {
  padding-left: 15px;
  position: relative;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
}

.small-nav .popper {
  background-color: rgba(179, 180, 180, 0.9);
  color: #000;
  border: none;
  border-radius: 0;
  width: 100%;
  padding: 0;
}
.small-nav .popper .menuText {
  color: #000;
  display: block;
  width: 100vw;
  text-align: left;
  padding-left: 15px;
}
.small-nav .popper .menuText:hover {
  background-color: rgba(151, 154, 154, 0.5);
}
.popper .navBarCurrentPopper {
  background-color: rgba(151, 154, 154, 0.5);
}

.fade-enter-active-nav,
.fade-leave-active-nav {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter-nav,
.fade-leave-active-nav {
  opacity: 0;
}
/* .fade-enter-active-nav, .fade-leave-active-nav {
  transition: opacity 0.3s;
} */

</style>
