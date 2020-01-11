<template>
  <div class="home">
    <div class="imgContainer1">
      <parallax
        class= 'img'
        v-bind:class="{ shifted: smallHeaderImg }"
        :speedFactor="0.15" direction="down"
        breakpoint="(min-width: 10px)"
      >
        <img src="@/assets/img/at_train_station.jpg" alt="noImg">
      </parallax>

      <div :class="whichNameBox.wrapper">
        <p :class="whichNameBox.firstName">OLIVER</p>
        <p :class="whichNameBox.lastName">HICKMAN</p>
      </div>
    </div>

    <mq-layout mq="lg">
      <div class="homeContent">
        <div class="logo">
            <img class="logoImg" src="@/assets/img/headphones-icon.png" alt="noLogo">
        </div>
        <div class="text">
          <h1> COMPOSER, MUSIC TECHNOLOGIST, <br> GUITARIST, SOUND DESIGNER </h1>
          <p> Oliver Hickman is a composer, music technologist, guitarist, and sound designer
              currently residing in Brooklyn, New York. <br> </p>
          <h1> <router-link to="/about"> MORE ABOUT OLIVER >> </router-link> </h1>
        </div>
      </div>
    </mq-layout>

    <mq-layout :mq="['sm', 'md']">
      <div class="homeContent small">
        <div class="text">
          <h1> COMPOSER, <br> MUSIC TECHNOLOGIST, <br> GUITARIST, <br> SOUND DESIGNER </h1>
          <p> Oliver Hickman is a composer, music technologist, guitarist, and sound designer
              currently residing in Brooklyn, New York. <br> </p>
          <h1 class="toAbout"> <router-link to="/about"> MORE ABOUT <br> OLIVER >> </router-link> </h1>
        </div>
      </div>
    </mq-layout>

    <div class="linkBoxGrid">
      <parallax
        class="gridPicture"
        :speedFactor="0.15"
        direction="down"
        breakpoint="(min-width: 10px)"
        v-bind:style="{ marginTop: img2Margin + 'px' }"
      >
        <img src="@/assets/img/waiting_for_train.jpg" ref="img2">
      </parallax>
      <div class="img2Top"></div>
      <div v-bind:class="whichMusicLink.wrapper">
        <router-link to="/music" v-bind:class="whichMusicLink.linkBox"> LISTEN TO MUSIC </router-link>
      </div>
      <div class="img2Bottom"></div>
    </div>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';

export default {
  components: {
    Parallax,
  },

  data() {
    return {
      img2Margin: 0,
      nameBoxClasses: {
        wrapper: undefined,
        firstName: undefined,
        lastName: undefined,
      },
    };
  },

  mounted() {
    // Becase the second picture also scrolls down, we need to offset it.
    // the 0.15 comes from the parallax speed. Add ten for good measure.
    const img2Height = this.$refs.img2.clientHeight;
    this.img2Margin = (img2Height * 0.15 + 10) * -1;
  },

  computed: {
    whichMusicLink() {
      switch (this.$mq) {
        case 'sm':
          return {
            wrapper: 'musicLinkBox small',
            linkBox: 'musicLink small',
          };
        default:
          return {
            wrapper: 'musicLinkBox',
            linkBox: 'musicLink',
          };
      }
    },

    whichNameBox() {
      switch (this.$mq) {
        case 'sm':
          return {
            wrapper: 'titleNameBox small',
            firstName: 'firstName small',
            lastName: 'lastName small',
          };
        default:
          return {
            wrapper: 'titleNameBox',
            firstName: 'firstName',
            lastName: 'lastName',
          };
      }
    },

    smallHeaderImg() {
      return (this.$mq == 'sm');
    },
  },
};
</script>

<style>
/* The top image */
.imgContainer1 {
  grid-row: img1;
  display: inline-grid;
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.img.shifted .Masthead__image.is-parallax > img {
  width: 150% !important;
}
/* Bottom Image */
.linkBoxGrid {
  grid-row: img2;
  display: inline-grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-rows: 1fr auto 1fr;
}
.gridPicture {
  grid-row: 1 / 4;
  grid-column: 1 / 4;
  width: 100vw;
  object-fit: cover;
}
.img2Top {
  grid-row: 1;
}
.musicLinkBox {
  grid-row: 2;
  grid-column: 2;
  background-color: #12211d;
  outline-style: solid;
  outline-color: #ffffff;
  outline-width: 10px;
  padding: 30px;
  position: relative;
  z-index: 2;
}
.musicLink {
  font-size: 32px;
  font-family: 'Nunito Sans', sans-serif;
  color: #fff;
  letter-spacing: 0.2em;
  text-decoration: none;
}
.musicLinkBox.small {
  padding: 16px;
}
.musicLink.small {
  font-size: 19px;
}

.img2Bottom{
  grid-row: 3;
}

/* Top picture */
.titleNameBox {
  position: absolute;
  right: 0%;
  bottom: 0%;
  padding: 0 40px 20px;
  z-index: 1;
}
p.firstName {
  font-size: 75px;
  font-weight: 900;
  font-family: 'Nunito Sans', sans-serif;
  color: #fff;
  letter-spacing: 0.3em;
  transform: scaleY(1.5);
  text-shadow: -12px 0 10px #191c21;
}
p.lastName{
  font-size: 65.5px;
  font-family: 'Nunito Sans', sans-serif;
  font-weight: 900;
  color: #fff;
  letter-spacing: 0.2em;
  transform: scaleY(1.5);
  text-shadow: -12px 0 10px #191c21;
}

.titleNameBox.small {
  padding: 0px 0px 0px;
  right: -7px;
}
p.firstName.small {
  font-size: 68px;
}
p.lastName.small {
  font-size: 60px;
}


.logo {
  grid-column: logo;
  display: inline-grid;
}
.logoImg {
  width: 80%;
  align-self: center;
  justify-self: center;
}

.text {
  padding-right: 20px;
}

.homeContent {
  grid-row: stuff;
  display: inline-grid;
  grid-template-rows: auto;
  grid-template-columns: [logo] 1fr [text] 2fr;
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: #fff;
  margin-top: -6px;
  position: relative;
  z-index: 29;
}
.homeContent.small {
  display: block;
}

.homeContent.small .text {
  padding-right: 20px;
  padding-left: 20px;
  text-align: justify;
}

.toAbout {
  text-align: left;
}
</style>
