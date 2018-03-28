import Vuex from 'vuex'
import Vue from 'vue'
import Axios from 'axios'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token: '',
    file: [{
      url: 'http://5.media.bustedtees.cvcdn.com/4/-/bustedtees.041d1a44-7c80-4115-a4c3-b41cdf28.gif',
      caption: 'Very Nice',
      title: 'When in Rome'
    }, {
      url: 'http://5.media.bustedtees.cvcdn.com/4/-/bustedtees.041d1a44-7c80-4115-a4c3-b41cdf28.gif',
      caption: 'Very Nice',
      title: 'When in Rome'
    }, {
      url: 'http://5.media.bustedtees.cvcdn.com/4/-/bustedtees.041d1a44-7c80-4115-a4c3-b41cdf28.gif',
      caption: 'Very Nice',
      title: 'When in Rome'
    }]
  },
  getters: {
    getData (state) {
      return state
    }
  },
  mutations: {
    // question (state, payload) {
    //   state.question = payload
    // }
    data (state, payload) {
      state.token = payload
    }
  },
  actions: {
    // getQuestion (context) {
    //   let url = 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean'
    //   Axios.get(url).then(({data}) => {
    //     context.commit('question', data)
    //   })
    // }
    signup (context) {
      let url = 'http://localhost:3000/login/signup'
      Axios.post(url).then(({data}) => {
        context.commit('data', data)
      })
    }
  }
})

export default store
