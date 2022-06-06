import { createApp, VueElement } from "vue";
import vueConfig from "vue.config";
import App from "./App.vue";

vueConfig.productionTip = false

new Vue({
    render: h=>(App)
}).mount("#app");
