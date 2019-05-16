<template>
  <div class='playerWrapper'>
    <h2 class="musicTitle" v-html="`${title.toUpperCase()}`"> </h2>
    <mvmt-box v-if="mvmts"
      :mvmts="mvmts"
      :index="index"
      :slug="slug"
    />
    <img :src="`${publicPath}waveforms/${waveform}`" class="waveform" />
    <div class='songProgress'>
      <div class='songProgressBar' v-bind:style="{ width:`${playbackPercent}%` }"></div>
    </div>
    <div class='player'>
      <vue-plyr ref="plyr">
        <audio>
          <source :src="`${publicPath}audio/${audio}`" type="audio/mp3"/>
        </audio>
      </vue-plyr>
    </div> <!-- end player -->
    <p class="detail" v-html="details"> </p>
  </div> <!-- end playerWrapper -->
</template>

<script>
import { VuePlyr } from 'vue-plyr';
import MovementsBox from '@/components/movementsBox.vue';
import 'vue-plyr/dist/vue-plyr.css';
import 'rangetouch/dist/rangetouch.js';
import EventBus from '../eventBus.js';

export default {
  name: 'audio-player',
  components: {
    VuePlyr,
    'mvmt-box': MovementsBox
  },
  data: function() {
    return {
      playbackPercent: 0,
      publicPath: process.env.BASE_URL,
      playerIsPlaying: false,
      flatMusic: this.$store.state.musicData,
    }
  },
  props: ['slug', 'index', 'title', 'details', 'waveform', 'audio', 'mvmts', 'length'],

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

    //store the duration
    registerDurations: function() {
      //Have to use a time out because aparently durations are not ready when the player is?
      setTimeout(() => {
        this.$store.commit({
          type: 'addDuration',
          index: this.index,
          duration: this.player.duration
        });
      }, 1000);
    },
   },

  mounted () {
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
.waveform, .player, .songProgress {
  position: absolute;
  top: 0;
  left: 0;
}

.waveform {
  width: calc(100vw - 155px - 5px); /* viewWidth - pictureWidth - grid-column-gap */
  height: 100%;
  z-index: 1;
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

.movementBoxWrapper {
  z-index: 3;
}

/* Style the plyr a bit */
.plyr {
  font-family: "Nunito Sans", sans-serif;
  color: #000;
  width: calc(100vw - 155px - 5px); /* viewWidth - pictureWidth - grid-column-gap */
  position: relative;
  right: 10px;
  top: 74px;
  z-index: 4;
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
</style>
