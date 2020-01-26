<template>
  <div class="coverImage" v-on:click="openPdfModal">
    <img
      ref="cover"
      v-bind:src="coverLink"
      v-images-loaded:on.progress="imageProgress"
    />
    <font-awesome icon="eye" class="fa-eye" v-bind:class="{portrait: isPortrait, landscape: !isPortrait}"/>
  </div>
</template>

<script>
import imagesLoaded from 'vue-images-loaded';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import CDN_Link from '@/inc/cdn.js';

import EventBus from '../eventBus.js';

library.add(faEye);

export default {
  name: 'cover-viewer',
  props: ['slug'],
  components: {
    'font-awesome': FontAwesomeIcon,
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
      coverHover: false,
      coverFile: this.$store.state.musicData[this.slug].cover,
      isPortrait: true,
    };
  },

  methods: {
    openPdfModal() {
      EventBus.$emit('OPEN_PDF_MODAL', this.slug);
    },
    imageProgress(instance, image) {
      if (image.isLoaded) {
        const width = image.img.naturalWidth;
        const height = image.img.naturalHeight;
        this.isPortrait = (width < height);
      }
    },
  },

  computed: {
    coverLink() {
      const coverLink = new CDN_Link('covers', this.coverFile);
      return coverLink.getAssetLink();
    }
  },

  directives: {
    imagesLoaded,
  },
};
</script>

<style>
.coverImage {
  grid-column: cover;
  position: relative;
  align-content: center;
  /* make sure this is on top or modal won't work */
  z-index: 25;
}

.coverImage img {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: auto;
  transform: translateY(-50%);
  -webkit-filter: brightness(100%);
  transition: all 0.3s ease;
}

.coverImage img:hover {
  -webkit-filter: brightness(85%);
  cursor: pointer;
}
.coverWrapper {
  width: auto;
  height: auto;
}
.fa-eye{
  position: relative;
  float: right;
  z-index: 1;
  transition: all 0.3s ease;
  padding: 2px;
  border-radius: 2px;
}
.portrait {
  right: 15px;
  top: 14px;
}
.landscape {
  right: 13px;
  top: 52px;
}
.coverImage:hover .fa-eye {
  background-color: #12211d;
  color: #fff;
  cursor: pointer;
}
.coverImage .fa-eye:hover {
  -webkit-filter: brightness(85%);
  cursor: pointer;
}
</style>
