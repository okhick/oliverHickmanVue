import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    durations: {},
    titles: [],
    whatIsPlaying: -1,
    musicData: {}
  },

  getters: {
    getRequestedDuration: (state) => (slug) => {
      try {
        return state.durations[slug];
      } catch(e) {
        //do nothing
      }
    },

    getAllTitlesWithRec(state) {
      let allTitlesWithRec = []
      for (let piece in state.musicData) {
        let music = state.musicData[piece];
        if (music.audio) {
          allTitlesWithRec.push({ title: music.title,  slug: piece})
        }
      }
      return allTitlesWithRec;
    },

    getPdfState: (state) => (slug) => {
      let pdf = state.musicData[slug].pdf;
      return pdf;
    }
  },

  mutations: {
    addDuration(state, payload) {
      let slug = payload.slug;
      let duration = payload.duration;
      state.durations[slug] = duration;
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
