import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    durations: [],
    titles: [],
    whatIsPlaying: -1,
    musicData: {}
  },

  getters: {
    getRequestedDuration: (state) => (index) => {
      return state.durations[index];
    },
    getRequestedTitle: (state) => (index) => {
      return state.titles[index];
    },
    getAllTitles(state) {
      return state.titles;
    },
    howManyDurations(state) {
      return state.durations;
    }
  },

  mutations: {
    addDuration(state, payload) {
      let index = payload.index;
      let duration = payload.duration;
      state.durations[index] = duration;
    },
    addTitle(state, payload) {
      let index = payload.index;
      let title = payload.title;
      state.titles[index] = title;
    },
    updateWhatIsPlaying(state, index) {
      state.whatIsPlaying = index;
    },
    addMusicData(state, payload) {
      state.musicData[payload.slug] = payload.musicData;
    }
  },

  actions: {
    // actions
  }
});
