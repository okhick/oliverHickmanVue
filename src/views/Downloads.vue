<template>
  <div class="downloadsWrapper">
    <div class="imgContainer1">
      <parallax
        class='img'
        v-bind:class="{ shifted: smallHeaderImg }"
        :speedFactor="0.15" direction="down"
        breakpoint="(min-width: 10px)"
      >
        <!-- <img src="@/assets/img/image1-okhick-bw-crop.jpg" alt="noImg"> -->
      </parallax>
    </div>
    <div class="downloadContent">
      <h1> DOWNLOADS </h1>
      <p> Check back for press kits, Max patches, research, and more fun things! </p>
    </div>
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';

export default {
  components: {
    Parallax,
  },
  computed: {
    smallHeaderImg() {
      return (this.$mq == 'sm');
    },
  },
};
</script>

<style>

.downloadContent {
  grid-row: stuff;
  height: 300px;
  text-align: center;
  background-color: #fff;
  padding-top: 10px;
  margin-top: -8px;
}

</style>
