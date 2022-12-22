import { createStore } from 'vuex'

const DEFAULT_IP = "192.168.1.14"
const DEFAULT_PORT = 5000

export default createStore({
    state: {
        IP: DEFAULT_IP,
        Port: DEFAULT_PORT 
    },
    mutations: {
        SET_IP(state, payload) {
            state.IP = payload
        },
        SET_PORT(state, payload) {
            state.Port = payload
        }
    },
    actions: {
        setIP(context, payload) {
            context.commit('SET_IP', payload)
        },
        setPort(context, payload) {
            context.commit('SET_PORT', payload)
        },
        setDefaultIP(context) {
            context.commit('SET_IP', DEFAULT_IP)
        },
        setDefaultPort(context) {
            context.commit('SET_PORT', DEFAULT_PORT)
        }
    },
    getters: {
        IP: function (state) {
            return state.IP
        },
        Port: function (state) {
            return state.Port
        }
    }
})
