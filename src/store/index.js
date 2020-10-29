import Vue from 'vue';
import Vuex from 'vuex';
import LoginModule from "@/store/Modules/LoginModule/state.js";
import OverviewModule from "@/store/Modules/OverviewModule/state.js";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    LoginModule,
    OverviewModule
  }
})
export default store;
