<template>
  <div id="app">
    <navBar />
    <div class="contentWrapper">
      <transition
        name="fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </div>
    <Footer />
  </div>
</template>

<script>
import navBar from '@/components/navBar.vue';
import Footer from '@/components/footer.vue';

export default {
  components: {
    navBar,
    Footer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,900");
@import url("https://fonts.googleapis.com/css?family=Arapey");

/* Some Global Styles */
body {
  margin: 0px;
}
h1 {
  color: #12211d;
  font-size: 24px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 400;
  letter-spacing: 0.3em;
}
p {
  font-family: 'Arapey', serif;
  font-size: 20px;
  line-height: 30px;
}
a {
  text-decoration : none;
  color: #12211d;
}
a:visited {
  text-decoration: none;
}
#app {
  display: grid;
  grid-template-columns: [col1] 1fr;
  grid-template-rows: [nav] auto [img1] 1fr [stuff] auto [img2] 1fr [footer] auto;
  background-color: #dbdbdb;
}
.menuText {
  font-size: 18px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  color: #fff;
  letter-spacing: 0.2em;
  text-decoration: none;
}
.img {
  width: 100vw;
  object-fit: cover;
  position: absolute;
}
/* The top image */
.imgContainer1 {
  grid-row: img1;
  display: inline-grid;
  position: relative;
}
/* Router View Transition */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* For the parallax */
.Masthead {
  z-index: 1 !important;
  min-height: auto !important;
}

</style>
