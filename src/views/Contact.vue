<template>
  <div class="contactWrapper">
    <div class="imgContainer1">
      <parallax
        class='img'
        :speedFactor="0.15" direction="down"
        breakpoint="(min-width: 10px)"
      >
        <img :src="imageLinks.topImage" alt="noImg">
      </parallax>
    </div>
    <div class="contactInfo">
      <h1> CONTACT </h1>
      <p> okhick [at] gmail.com </p>
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
    imageLinks() {
      const topImage = new CDN_Link('images', 'in_street.jpg');
      return {
        topImage: topImage.getAssetLink(),
      };
    }
  }
};
</script>

<style>

.contactInfo {
  grid-row: stuff;
  height: 300px;
  text-align: center;
  background-color: #fff;
  padding-top: 10px;
  margin-top: -8px;
}
/* .contactInfo h1 {
  margin-top: 0;
} */
.contactInfo p {
  margin: auto;
  line-height: 150px;
}

</style>
