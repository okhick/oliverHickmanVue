<template>
  <div class="contactWrapper">
    <div class="imgContainer1">
      <parallax
        class='img'
        :speedFactor="0.15" direction="down"
        breakpoint="(min-width: 10px)"
      >
        <img src="@/assets/img/image2-okhick-bw-crop.jpg" alt="noImg">
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

export default {
  components: {
    Parallax,
  },
}
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
.contactInfo h1 {
  /* margin-top: 0; */
}
.contactInfo p {
  margin: auto;
  line-height: 150px;
}

</style>
