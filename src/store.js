import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    durations: {},
    titles: [],
    whatIsPlaying: -1,
    musicData: {},
  },

  getters: {
    getRequestedDuration: state => (slug) => {
      try {
        return state.durations[slug];
      } catch (e) {
        // do nothing
      }
    },

    getAllTitlesWithRec(state) {
      const allTitlesWithRec = [];
      for (const piece in state.musicData) {
        const music = state.musicData[piece];
        if (music.audio) {
          allTitlesWithRec.push({ title: music.title, slug: piece });
        }
      }
      return allTitlesWithRec;
    },

    getPdfState: state => (slug) => {
      const { pdf } = state.musicData[slug];
      return pdf;
    },
  },

  mutations: {
    addDuration(state, payload) {
      const { slug } = payload;
      const { duration } = payload;
      state.durations[slug] = duration;
    },
    updateWhatIsPlaying(state, index) {
      state.whatIsPlaying = index;
    },
    addMusicData(state, payload) {
      state.musicData[payload.slug] = payload.musicData;
    },
  },

  actions: {
    // actions
  },
});
