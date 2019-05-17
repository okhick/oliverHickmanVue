<template>
  <div class="coverImage"
    v-on:click="openPdfModal"
    >
    <img v-bind:src="`${publicPath}covers/${coverFile}`"/>
    <font-awesome
      icon="eye"
      class="fa-eye"
    />
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import EventBus from '../eventBus.js';

library.add(faEye);

export default {
  name: 'cover-viewer',
  props: ['slug'],
  components: {
    'font-awesome': FontAwesomeIcon
  },
  data: function() {
    return {
      publicPath: process.env.BASE_URL,
      coverHover: false,
      coverFile: this.$store.state.musicData[this.slug].cover
    }
  },
  methods: {
    openPdfModal: function() {
      EventBus.$emit('OPEN_PDF_MODAL', this.slug);
    },
  },
}
</script>

<style>
.coverImage{
  grid-column: cover;
  position: relative;
  /* make sure this is on top or modal won't work */
  z-index: 25;
}
.coverImage img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  overflow: hidden;
  -webkit-filter: brightness(100%);
  transition: all 0.3s ease;
}
.coverImage img:hover {
  -webkit-filter: brightness(85%);
  cursor: pointer;
}
.fa-eye{
  position: absolute;
  right: 15px;
  top: 14px;
  z-index: 1;
  transition: all 0.3s ease;
  padding: 2px;
  border-radius: 2px;
}
.coverImage:hover .fa-eye {
  background-color: #02552b;
  color: #fff;
  cursor: pointer;
}
.coverImage .fa-eye:hover {
  -webkit-filter: brightness(85%);
  cursor: pointer;
}
</style>
