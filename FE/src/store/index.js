import { createStore } from 'vuex'
import loginApi from '../Api/loginApi'
const store = createStore({
    state() {
        return {
            auth: {},
            accessToken: '',
            refreshToken: '',
            isAuth: false
        }
    },
    actions: {
        login: async (context, payload) => {

            try {
                const auth = await loginApi.login(payload.formData)
                payload.toastFcSuccess('Dang nhap thanh cong')
                context.commit('loginSuccess', auth)
            } catch (error) {
                payload.toastFcError(error.message)
            }
        },
        register: async (context, payload) => {
            try {
                const auth = await loginApi.register(payload.formData)
                payload.toastFcSuccess('Dang ki thanh cong')
                context.commit('loginSuccess', auth)
            } catch (error) {
                payload.toastFcError(error.message)
            }
        }
    }
    ,
    mutations: {
        loginSuccess: (state, payload) => {
            state.auth = payload.data
            state.accessToken = payload.accessToken
            state.refreshToken = payload.refreshToken
            state.isAuth = true
            localStorage.setItem('accessToken', payload.accessToken)
            localStorage.setItem('refreshToken', payload.refreshToken)
        },
        logOut(state) {
            state.auth = {}
            state.accessToken = ''
            state.refreshToken = ''
            state.isAuth = false
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
            return state
        }
    }
})
export default store