import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./common/rem";

import { Rate } from "element-ui";
Vue.use(Rate);
Vue.config.productionTip = false;

new Vue({
  data: { eventBus: new Vue() }, //eventBus实现兄弟组件之间通信
  router,
  store,
  render: h => h(App)
}).$mount("#app");
