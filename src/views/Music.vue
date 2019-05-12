<template>
  <div id="music">
    <parallax :speedFactor="0.2" direction="down" breakpoint="(min-width: 10px)">
      <img src="@/assets/img/Oliver+Kiersten-169.jpg" alt="noImg">
  </parallax>
    <div class="content">
      <h1> MUSIC </h1>
      <pdf-modal v-show="modalIsShowing" />

      <div v-for="(category) in $options.musicData">
        <h2 class="musicTitle categoryTitle"> {{ category.name }} </h2>
        <div v-for="(piece,index) in category.pieces"
          v-bind:class="{ pieceWrapper:validatePdf(piece.pdf), pieceWrapperBare:!(validatePdf(piece.pdf)) }"
        >
          <cover-viewer class="cover" v-if="validatePdf(piece.pdf)" :index="index"/>
          <audio-player class="audioPlayer" v-if="validateRecording(piece.audio)"
            :index="index"
            :title="piece.title"
            :details="piece.details"
            :waveform="piece.waveform"
            :audio="piece.audio"
            :mvmts="validateMovements(piece.movements)"
          />
          <div v-else="!(validateRecording(piece.audio))" class="bare">
            <h2 class="musicTitle" v-html="`${piece.title.toUpperCase()}`"> </h2>
            <p class="detail" v-html="piece.details"> </p>
          </div>
        </div> <!-- end pieceWrapper -->
      </div> <!-- end category -->
    </div> <!-- end content -->
  </div>
</template>

<script>
import Parallax from 'vue-parallaxy';
import AudioPlayer from '@/components/audioPlayer.vue';
import coverViewer from '@/components/coverViewer.vue';
import pdfModal from '@/components/pdf/pdf-modal.vue';
import musicData from '@/musicData.json';
import EventBus from '../eventBus.js';

export default {
  components: {
    Parallax,
    AudioPlayer,
    coverViewer,
    pdfModal
  },

  musicData: musicData,

  data: function() {
    return {
      pdfFile: [], //this is populated beforeMount
      modalIsShowing: false,
    }
  },

  methods: {
    validateMovements: function (piece) {
      //return the movements if exist or false
      return (typeof piece !== 'object' ? false : piece);
    },
    validatePdf: function(piece) {
      return (typeof piece !== 'string' ? false : true);
    },
    validateRecording: function(piece) {
      return (typeof piece !== 'string' ? false : true);
    },
    togglePdfModal: function() {
      this.modalIsShowing = !this.modalIsShowing;
    },
  },

  mounted() {
    // console.log(this.pdfFile);
    //open the modal first, then emit the load pdf event with requested file
    EventBus.$on('OPEN_PDF_MODAL', (clickIndex) => {
      this.togglePdfModal();
      EventBus.$emit('LOAD_PDF', this.pdfFile[clickIndex])
      });

    //close the modal
    EventBus.$on('CLOSE_PDF_MODAL', () => {
      this.togglePdfModal();
    });

    //Watch for all the durations to come in.
    this.$store.subscribe((mutation, state) => {
      switch(mutation.type) {
        case 'addDuration':
          if(state.durations.length == musicData.length) {
            EventBus.$emit('DURATIONS_REGISTERED')
          }
          break;
      }
    });
  },

  beforeMount() {
    //make an array of data that the PDF modal will use
    let that = this;
    for (let category in musicData) {
      musicData[category].pieces.forEach( (music, index) => {
        if (that.validatePdf(music.pdf)) {
          that.pdfFile[index] = music.pdf;
        }
      });
    }
  }
}
</script>

<style>

.content {
  grid-row: stuff;
  text-align: center;
  padding-bottom: 50px;
  padding-top: 10px;
  background-color: #fff;
  margin-top: -8px;
}

.musicContent {
  display: inline-grid;
  width: 95%;
}

.pieceWrapper {
  display: inline-grid;
  width:100vw;
  grid-template-rows: 200px;
  grid-template-columns: [cover] 155px [player] auto;
  grid-column-gap: 5px;
  padding-bottom: 30px;
}

.categoryTitle {
  background: rgba(2, 85, 43, 0.4);
}

.bare {
  width: 100%;
  padding-bottom: 30px;
}
.pieceWrapper.bare {
  width: 100vw;
}
.bare h2.musicTitle {
  text-align: left;
  margin-left: 10px;
}
.bare p.detail {
  position: relative;
  margin-left: 10px;
}

.cover {
  grid-column: cover;
}
</style>
