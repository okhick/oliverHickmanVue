<template>
  <div id="music">

    <parallax :speedFactor="0.2" direction="down" breakpoint="(min-width: 10px)">
      <img src="@/assets/img/Oliver+Kiersten-169.jpg" alt="noImg">
    </parallax>

    <div class="content">
      <!-- The pdf viewing modal -->
      <pdf-modal v-show="modalIsShowing" />

      <h1> MUSIC </h1>

      <div v-for="(category) in $options.musicData">
        <h2 class="musicTitle categoryTitle"> {{ category.label }} </h2>
        <div v-for="(piece,catIndex) in category.pieces"
          v-bind:class="{
            pieceWrapper:validatePdf(piece.pdf),
            pieceWrapperBare:!(validatePdf(piece.pdf)),
            marginTop: (catIndex==0)
          }"
        >
        <!-- If theres a score and recording, render them -->
          <cover-viewer class="cover" v-if="validatePdf(piece.pdf)" :slug="piece.slug"/>
          <audio-player class="audioPlayer" v-if="validateRecording(piece.audio)"
            :slug="piece.slug"
            :title="piece.title"
            :details="piece.details"
            :waveform="piece.waveform"
            :audio="piece.audio"
            :mvmts="validateMovements(piece.movements)"
          />

          <!-- If there's no score and recording, just render the title and description -->
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
      flatMusic: this.$store.state.musicData,
      totalRec: undefined
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
    //store the title
    registerMusicData: function(slug, data) {
      this.$store.commit({
        type: 'addMusicData',
        slug: slug,
        musicData: data
      });
    }
  },

  mounted() {
    //open the modal first, then emit the load pdf event with requested file
    EventBus.$on('OPEN_PDF_MODAL', (slug) => {
      this.togglePdfModal();
      EventBus.$emit('LOAD_PDF', this.flatMusic[slug].pdf)
      });

    //close the modal
    EventBus.$on('CLOSE_PDF_MODAL', () => {
      this.togglePdfModal();
    });

    //Watch for all the durations to come in.
    this.$store.subscribe((mutation, state) => {
      switch(mutation.type) {
        case 'addDuration':
          if(state.durations.length == this.totalRec) {
            EventBus.$emit('DURATIONS_REGISTERED')
          }
          break;
      }
    });
  },

  beforeMount() {
    //make an array of data that children compenents will share
    let pieceIndex = 0; //used to count the total works
    let simplePieceCount = 0; //used to count the pieces that don't have recordings
    for (let category in musicData) {
      musicData[category].pieces.forEach( (music) => {
        let musicData = {
          title: music.title,
        };
        if (this.validatePdf(music.pdf)) { musicData.pdf = music.pdf; }
        if (this.validateRecording(music.audio)) {
          musicData.audio = music.audio;
        } else {
          simplePieceCount++;
        }

        this.registerMusicData(music.slug, musicData);
        pieceIndex++;
      });
    }
    //the total recording count
    this.totalRec = (pieceIndex - simplePieceCount) + 1;
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
  background: rgba(205, 219, 212, 0.9);
  position: sticky !important;
  top: 47px;
  height: 32px;
  z-index: 29 !important;
}

.marginTop {
  margin-top: 30px !important;
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
