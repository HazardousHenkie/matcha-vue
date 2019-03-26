
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        articleData: ""
    },
    mutations: {
        changeArticlesData(state, articleData) {
            state.articleData = articleData
        }
    },
    getters: {
    
    }
})