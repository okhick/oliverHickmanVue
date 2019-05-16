<template>
<div class="playerMovementBoxWrapper">
  <div class="showMoreMvmts">
    <popper trigger="click" :options="popperOpts" :visible-arrow="true">
      <div class="moreMvmts popper"v-bind:style="columnsCalc">
        <div v-for="(mvmt, mvmtIndex) in mvmts"
          class="mvmt"
          v-on:click="selectMvmt(mvmtIndex)"

        >
          {{ mvmt.title }}
          <font-awesome icon="play-circle" class="fa" v-bind:class="{ isPlaying: movementPlaying[mvmtIndex] }"/>
          <!-- <font-awesome icon="play-circle" class="fa" v-show="movementPlaying[mvmtIndex]"/> -->
        </div>
      </div>

      <div slot="reference" class="movementButtonWrapper">
        <font-awesome icon="bars" class="movementButtonFa"/>
        <p>MOVEMENTS</p>
      </div>
    </popper>
  </div>
</div>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
// import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import Popper from 'vue-popperjs';
import 'vue-popperjs/dist/vue-popper.css';

import 'animate.css/animate.min.css';
import EventBus from '../eventBus.js';

library.add(faBars, faPlayCircle)
// library.add(faAngleUp);

export default {
  components: {
    'font-awesome': FontAwesomeIcon,
    'popper': Popper
  },
  data: function() {
    return {
      durationPercent: [],
      movementPlaying: {},
      progressPercent: 0,
      popperOpts: {
        hover: false,
        placement: 'bottom',
        modifiers: {
          preventOverflow: {
            enabled: false
          },
          hide: {
            enabled: false
          }
        }
      }
    }
  },
  methods: {
    //take the clicked element, find the time code, and emit the event to the EventBus
    selectMvmt: function(mvmtIndex) {
      let newTimecodeEmit = `NEW_TIMECODE_${this.index}`;
      let newTimecodeString = this.mvmts[mvmtIndex].timecode;
      let newTimecode = newTimecodeString.toSeconds();
      EventBus.$emit(newTimecodeEmit, newTimecode);
    },

    calculateDurationPercent() {
      let duration = this.$store.getters.getRequestedDuration(this.slug);
      this.mvmts.forEach((mvmt, index) => {
        let percent = mvmt.timecode.toSeconds() / duration;
        this.durationPercent[index] = percent;
      });
    },

    determineWhatMvmtIsPlaying(percent) {
      let realPercent = percent / 100;
      let durationPercentLength = this.durationPercent.length;
      let lastMvmtPlaying = realPercent.between(this.durationPercent[durationPercentLength - 1], 1);
      //if we're playing this piece
      if (this.$store.state.whatIsPlaying == this.slug) {
        //if the last movement is playing set it to true, otherwise loop through and set what is playing
        if (lastMvmtPlaying) {
          this.movementPlaying[durationPercentLength - 1] = true;
        } else {
          this.durationPercent.forEach((mvmtPercent, index) => {
            //compare the percent with two movements to see if it's inbetween
            let isMvmtPlaying = realPercent.between(mvmtPercent, this.durationPercent[index+1]);
            this.movementPlaying[index] = isMvmtPlaying;
          });
        }
      }
    },

    //set up and reactive object with all the movements.
    instantiateMovementPlaying() {
      this.mvmts.forEach( (mvmt, index) => {
        this.$set(this.movementPlaying, index, false)
      });
    },
  },

  props: ['index', 'mvmts', 'slug'],

  computed: {
    columnsCalc () { return `gridTemplateColumns: repeat(${this.mvmts.length}, auto)` }
  },

  created() {
    this.instantiateMovementPlaying();
  },

  mounted() {
    EventBus.$on('DURATIONS_REGISTERED', () => {
      this.calculateDurationPercent();
    });

    EventBus.$on('NEW_PROGRESS_PERCENT', (percent) => {
      this.progressPercent = percent;
      this.determineWhatMvmtIsPlaying(percent);
    });
  }
}

//convert [M]M:SS to seconds. Ripped from https://stackoverflow.com/questions/9640266/convert-hhmmss-string-to-seconds-only-in-javascript
String.prototype.toSeconds = function() {
  if (!this) return null;
  let ms = this.split(':');
  return (+ms[0]) * 60 + (+ms[1] || 0);
}
//check between number. ripped from https://stackoverflow.com/questions/14718561/how-to-check-if-a-number-is-between-two-values
Number.prototype.between = function(a, b) {
  var min = Math.min.apply(Math, [a, b]),
    max = Math.max.apply(Math, [a, b]);
  return this > min && this < max;
};
</script>

<style>

/* wraps the button and the grid */
.playerMovementBoxWrapper {
  position: relative;
  z-index: 5;
}

.movementBoxWrapper p {
  margin-top: 0px;
  line-height: 20px;
}

.moreMvmts.popper[x-placement^="bottom"] {
  margin-top: 0px;
}

/* The MOVEMENTS button */
.movementButtonWrapper {
  /* Centers the text with fa next to it */
  margin-left: -14px;
  /* Shift it up just a little bit */
  margin-top: -7px;
  position: relative;
}

.movementButtonFa{
  cursor: pointer;
}
.movementButtonFa:hover {
  transform: scale(1.1,1.1);
}
.movementButtonWrapper:hover .movementButtonFa{
  transform: scale(1.1,1.1);
}

.showMoreMvmts {
  height: auto;
  position: relative;
}

.showMoreMvmts p {
  font-family: 'Nunito Sans', sans-serif;
  font-size: 14px;
  margin: 0px;
  padding-left: 5px;
  display: inline;
  cursor: pointer;
}

/* the grid wrapper */
.moreMvmts {
  display: inline-grid;
  grid-template-rows: auto;
  column-gap: 6px;
  position: relative;
}

/* the grid cells */
.mvmt {
  font-size: 13px;
  font-family: 'Nunito Sans', sans-serif;
  grid-row: auto;
  padding: 0px 5px;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
}
.mvmt:hover {
  background-color: #02552b;
  color: #fff;
}

.mvmt .fa {
  margin-top: -10;
  color: #000;
  top: 0;
  padding-left: 3px;
  cursor: pointer;
  visibility: hidden;
}
.mvmt:hover .fa {
  color: #fff;
  visibility: visible;
}

.isPlaying {
  visibility: visible !important;
}
</style>
