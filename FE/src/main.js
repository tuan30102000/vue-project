import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";
import './assets/main.css'
import store from './store'

const app = createApp(App)

const options = {
    transition: "Vue-Toastification__bounce",
    maxToasts: 20,
    newestOnTop: true
}

app.use(Toast, options);
app.use(router)
app.use(store)
app.mount('#app')
