import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 全局引用
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import config from './config/config.js'
import axios from 'axios'
const baseURL=config.baseurl;
const app = createApp(App);
app.provide('$axios', axios)
app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true;
app.use(ElementPlus).provide('$axios',axios).use(router).mount('#app')
const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
    constructor(callback) {
        callback = debounce(callback, 16);
        super(callback);
    }
}
