<template>
  <div class="contactWrapper">
    <div class="imgContainer1">
      <parallax
        class='img'
        :speedFactor="0.15" direction="down"
        breakpoint="(min-width: 10px)"
      >
        <img src="@/assets/img/Oliver+Kiersten-184.jpg" alt="noImg">
      </parallax>
    </div>
    <div class="contactInfo">
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
  padding-top: 150px;
  padding-bottom: 150px;
  text-align: center;
}

</style>
