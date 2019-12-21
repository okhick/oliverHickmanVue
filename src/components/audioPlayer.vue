<template>
  <div :class="[playerWrapperSize, {audioOnly:audioOnly}]">

    <mq-layout :mq="['sm', 'md']">
      <mvmt-box v-if="validateMovements(musicData.movements)"
        :mvmts="musicData.movements"
        :slug="slug"
      />
      <h2 class="musicTitle" v-html="`${musicData.title.toUpperCase()}`"> </h2>
    </mq-layout>

    <mq-layout :mq="['lg']">
      <h2 class="musicTitle" v-html="`${musicData.title.toUpperCase()}`"> </h2>
      <mvmt-box v-if="musicData.movements"
        :mvmts="musicData.movements"
        :slug="slug"
      />
    </mq-layout>

    <img :src="`${publicPath}waveforms/${musicData.waveform}`" :class="waveformSize" />

    <div class='songProgress'>
      <div class='songProgressBar' v-bind:style="{ width:`${playbackPercent}%` }"></div>
    </div>
    <div class='player'>
      <vue-plyr ref="plyr">
        <audio>
          <source :src="`${publicPath}audio/${musicData.audio}`" type="audio/mp3"/>
        </audio>
      </vue-plyr>
    </div> <!-- end player -->

    <mq-layout :mq="['sm','md']">
      <font-awesome icon="eye" class="fa-eye" v-on:click="openPdfModal" v-if="!audioOnly"/>
    </mq-layout>

    <p :class="detailSize" v-html='musicData.details'> </p>
  </div> <!-- end playerWrapper -->
</template>

<script>
import { VuePlyr } from 'vue-plyr';
import MovementsBox from '@/components/movementsBox.vue';
import 'vue-plyr/dist/vue-plyr.css';
import 'rangetouch/dist/rangetouch.js';
import EventBus from '../eventBus.js';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faEye);

export default {
  name: 'audio-player',
  components: {
    VuePlyr,
    'mvmt-box': MovementsBox,
    'font-awesome': FontAwesomeIcon
  },
  data: function() {
    return {
      playbackPercent: 0,
      publicPath: process.env.BASE_URL,
      playerIsPlaying: false,
      musicData: this.$store.state.musicData[this.slug],
      audioOnly: false
    }
  },
  props: ['slug'],

  methods: {
    //this updates the bar as it progresses
    updatePlaybackBar: function() {
      let percent = (this.player.currentTime / this.duration) * 100;
      this.playbackPercent = percent;
      //send progress to modal
      EventBus.$emit('NEW_PROGRESS_PERCENT', percent);
      this.$store.commit('updateWhatIsPlaying', this.slug);
    },

    //when the player stops, send it to the store
    playerStatusChange: function() {
      this.playerIsPlaying = !this.playerIsPlaying;
      this.updateWhatIsPlaying();
    },
    updateWhatIsPlaying() {
      //remember what we are playing for the remote-player. If nothing then -1
      if(this.playerIsPlaying) {
        this.$store.commit('updateWhatIsPlaying', this.slug);
      } else {
        this.$store.commit('updateWhatIsPlaying', -1);
      }
      // console.log(this.$store.state.whatIsPlaying);
    },

    openPdfModal: function() {
      EventBus.$emit('OPEN_PDF_MODAL', this.slug);
    },

    //store the duration
    registerDurations: function() {
      //Have to use a time out because aparently durations are not ready when the player is?
      setTimeout(() => {
        this.$store.commit({
          type: 'addDuration',
          slug: this.slug,
          duration: this.player.duration
        });
      }, 1000);
    },

    validateMovements: function (piece) {
      //return the movements if exist or false
      return (typeof piece !== 'object' ? false : piece);
    },
  },

  mounted () {
    //set some things up if this is an audio only situation
    this.audioOnly = (this.musicData.workType == 'AUDIO_ONLY') ? true : false;

    if (this.$mq === 'lg' && this.audioOnly === false) {
      this.$refs.plyr.$el.style.width = 'calc(100vw - 155px - 5px)';
    } else if (this.$mq === 'lg' && this.audioOnly === true) {
      this.$refs.plyr.$el.style.width = '100vw';
    } else if (this.mq !== 'lg' && this.audioOnly === true){
      this.$refs.plyr.$el.style.width = '100vw';
    } else {
      this.$refs.plyr.$el.style.width = '98vw';
    }

    //send some data to the store
    this.player.on('ready', this.registerDurations)

    //do some things when the player changes
    this.player.on('timeupdate', this.updatePlaybackBar);
    this.player.on('playing', this.playerStatusChange);
    this.player.on('pause', this.playerStatusChange);

    //update the player times. TIMECODE comes from movement box. PROGRESS comes from remote player
    EventBus.$on(`NEW_TIMECODE_${this.slug}`, timecode => {
      this.player.currentTime = timecode;
    });
    EventBus.$on(`PLAYER_PROGRESS_UPDATE_${this.slug}`, (update) => {
      let updateMul = update / 100;
      let currentTime = this.duration * updateMul;
      this.player.currentTime = currentTime;
    });

    //start and stop the plater when remote player says to
    EventBus.$on(`START_PLAYER_${this.slug}`, () => {
      this.player.play();
    });
    EventBus.$on(`PAUSE_PLAYER_${this.slug}`, () => {
      this.player.pause();
    });

  },
  computed: {
    //define the player object. Can now be accessed through this.player
    player () { return this.$refs.plyr.player },

    //returns the duration of the track
    duration () { return this.$refs.plyr.player.duration },

    playerWrapperSize () { return (this.$mq === 'lg') ? 'playerWrapper' : 'playerWrapper small' },
    waveformSize () { return (this.$mq === 'lg') ? 'waveform' : 'waveform small' },
    detailSize () { return (this.$mq === 'sm') ? 'detail small' : 'detail' }
  },
}
</script>

<style>

p.detail {
  color: #000;
  position: absolute;
  text-align: left;
  line-height: 20px;
  bottom: 0px;
  margin: 0 0 2px 5px;
  z-index: 4;
  font-size: 17px;
}
p.detail.small {
  margin: 0 0 0 5px;
}
.linkOut {
  color: #4a4a4a;
}
h2.musicTitle {
  color: #000;
  font-size: 24px;
  font-family: "Nunito Sans", sans-serif;
  font-weight: 400;
  letter-spacing: 0.3em;
  position: relative;
  z-index: 4;
  margin-bottom: 0px;
  margin-top: 0px;
}
.movementBar p {
  margin-top: -10px;
  position: relative;
  z-index: 4;
}

/* Overlap the three divs */
.playerWrapper {
  grid-column: player;
  position: relative;
  width: calc(100vw - 155px - 5px); /* viewWidth - pictureWidth - grid-column-gap */
  height: 200px;
}
.playerWrapper.small {
  width: 100vw;
  height: 160px;
}

.audioOnly {
  width: 100vw
}

.playerWrapper.small h2.musicTitle {
  font-size: 20px;
  letter-spacing: 0.1em;
  display: inline;
}

.waveform, .waveformSmall, .player, .songProgress {
  position: absolute;
  top: 0;
  left: 0;
}

.waveform {
  width: 100%; /* viewWidth - pictureWidth - grid-column-gap */
  height: 100%;
  z-index: 1;
}
.waveform.small {
  width: 100vw;
}

/* Make the progress bar */
.songProgress {
  width: 100%;
  height: 100%;
  z-index: 2;
}
.songProgressBar {
  width: 20%; /* This will be overwritten immediately */
  height: 100%;
  background-color: #034121;
  opacity: 0.18;
  z-index: 2;
}

/* Style the plyr a bit */
.plyr {
  font-family: "Nunito Sans", sans-serif;
  color: #000;
  position: relative;
  right: 10px;
  top: 74px;
  z-index: 4;
}
.playerWrapper.small .plyr {
  top: 54px;
}
/* Moves the tooltip in front the Movements box since they overlap a bit */
.plyr:hover {
  z-index: 6;
}
/* Hide the speed settings. Ain't nobody got time for that */
.plyr__menu {
  display: none;
}
/* Change the background color of the volume and progress */
.plyr--full-ui input[type="range"] {
  color: #02552b;
}
.plyr--audio .plyr__control, .plyr--audio .plyr__controls {
  color: #000;
}
.plyr--audio .plyr__control:hover {
  background: #02552b;
  color: #fff;
}
/* Change the slider background color on all browsers */
.plyr--full-ui.plyr--audio input[type="range"]::-webkit-slider-runnable-track {
  background: #747777;
  box-shadow: 0 0 0 0px;
}
.plyr--full-ui.plyr--audio input[type="range"]::-moz-range-track {
  background: #747777;
  box-shadow: 0 0 0 0px;
}
.plyr--audio .plyr__controls{
  background-color: transparent;
}
.plyr__tooltip {
  z-index: 100;
}
.plyr__controls > .plyr__control:first-child {
  margin-right: 0px;
}
.plyr__controls__item.plyr__progress__container {
  width: 100%;
}

.playerWrapper.small .fa-eye {
  position: absolute;
  top: 66px;
  right: 0;
  padding: 7px 7px 7px 7px;
  margin-right: 3px;
  z-index: 5;
}
.fullWidth {
  margin-right: 0;
}

.playerWrapper.small .fa-eye:hover {
  color: #fff;
  background: #02552b;
  cursor: pointer;
}
</style>
