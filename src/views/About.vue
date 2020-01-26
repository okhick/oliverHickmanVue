<template>

  <div class=aboutWrapper>
    <div class="imgContainer1">
      <parallax
        class= 'img'
        :speedFactor="0.15" direction="down"
        breakpoint="(min-width: 10px)"
      >
        <img :src="imageLinks.topImage" alt="noImg">
      </parallax>
    </div>

    <div class = "bioDiv" v-bind:style="{padding: padding}">
      <h1> OLIVER HICKMAN </h1>
      <p class="bioText">
        Oliver Hickman is a composer, music technologist, guitarist, and sound designer currently residing in Brooklyn, New York.
        He holds a Bachelor of Music degree in composition from Columbia College Chicago and a Master of Music
        degree in Music Theory and Composition from NYU Steinhardt where he studied under Robert Honstein,
        Julia Wolfe, and Tae Hong Park. Oliver has written works for soloists to large ensembles including
        Dal Niente, the JACK Quartet, Chicago Composers Orchestra, Mocrep, the NYU Contemporary Music Ensemble,
        and the NYU Percussion Ensemble and his compositions have been performed throughout the United States and Europe.
        As a composer, his current interests include timbre, economy of means as it pertains to music,
        and utilizing web technology in live new music performance.
        <br><br>
        As a guitarist, Oliver has played with a variety of ensembles ranging from musical theatre to comtemporary music
        to free improvisation. He is a co-founder of the improv ensemble <em><a class='linkOut' href='https://www.facebook.com/ensembleconsensus/'>Consensus</a></em>. He also has worked within the theatre and dance worlds as a composer and sound designer on various productions
        in Chicago and New York City since 2014.
        <br><br>
        When he's not composing, he works in web development at Carl Fischer Music.
       <br><br> </p>
      <h1 v-bind:style="{ fontSize: ($mq == 'sm') ? '20px' : '24px' }">
        <router-link to="/contact"> GET IN TOUCH >> </router-link>
        <br>
        <br>
        <router-link to="/music"> LISTEN TO WORKS >> </router-link>
      </h1>
    </div>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';
import CDN_Link from '@/inc/cdn.js';

export default {
  components: {
    Parallax,
  },
  computed: {
    padding() {
      switch (this.$mq) {
        case 'sm':
          return '10px 20px 10px 25px';
          break;
        case 'md':
          return '10px 50px 10px 50px';
          break;
        default:
          return '10px 100px 10px 100px';
      }
    },
    imageLinks() {
      const topImage = new CDN_Link('images', 'smile_at_park_crop.jpg');
      return {
        topImage: topImage.getAssetLink(),
      };
    }
  },
};
</script>


<style>
.bioDiv {
  grid-row: stuff;
  text-align: center;
  padding: 10px 100px 10px 100px;
  background-color: #fff;
  margin-top: -6px;
}
p.bioText {
  text-align: justify;
}
</style>
