import Vue from 'vue'
import vuex from 'vuex'
import VueCookies from 'vue-cookies'
import UserServices from '../../services/UserServices'
import axios from 'axios'

Vue.use(VueCookies)
Vue.use(vuex)


const store = new vuex.Store({
    state : {
        auth : false,
        user : {}
    },
    mutations : {
        requestToken(state, payload){
            state.user = payload || null
            state.auth = state.user!== null ? true : false
        }
    },
    actions : {
         async setAuth({commit}){
          let token = window.$cookies.get('TOKEN') || null
            if(token){
                commit('requestToken', token.data)
            }
            else{
                commit('requestToken', null)
            }
            
        },
    },
    getters : {
        getAuth (state){
            return state.auth
        },
        getUser (state){
            return state.user
        },
    }
})

store.dispatch('setAuth')

export default store