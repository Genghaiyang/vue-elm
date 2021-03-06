import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const SET_GOODS_ITEM_COUNT = "SET_GOODS_ITEM_COUNT";
const SET_GOODS_ITEM_COUNT_LI = "SET_GOODS_ITEM_COUNT_LI";
const SET_GOODS_ITEM_COUNT_LI_PLUS = "SET_GOODS_ITEM_COUNT_LI_PLUS";
const SET_FOODS_WRAPPER_SCROLL_TO = "SET_FOODS_WRAPPER_SCROLL_TO";
const SET_BLUR_BG_SHOW = "SET_BLUR_BG_SHOW";
const CLEAR_GOODS_LIST_EMPTY = "CLEAR_GOODS_LIST_EMPTY";

const state = {
  goodsItemCount: [],
  FoodsWrapperScrollTo: 0,
  BlurBgShowTootle: false
};
const getters = {
  getGoodsCount: state => value => {
    return state.goodsItemCount.find(item => item.name === value).count;
  }
};
const mutations = {
  [SET_GOODS_ITEM_COUNT](state, payload) {
    state.goodsItemCount.push(payload);
  },
  [SET_GOODS_ITEM_COUNT_LI](state, payload) {
    state.goodsItemCount.map(item => {
      if (item.name === payload.name) {
        item.count += 1;
      }
    });
  },
  [SET_GOODS_ITEM_COUNT_LI_PLUS](state, payload) {
    state.goodsItemCount.map(item => {
      if (item.name === payload.name) {
        item.count -= 1;
      }
    });
  },
  [SET_FOODS_WRAPPER_SCROLL_TO](state, payload) {
    state.FoodsWrapperScrollTo = payload;
  },
  [SET_BLUR_BG_SHOW](state) {
    state.BlurBgShowTootle = !state.BlurBgShowTootle;
  },
  [CLEAR_GOODS_LIST_EMPTY](state, payload) {
    state.goodsItemCount.map(item => {
      if (item.name === payload.name) {
        item.count = 0;
      }
    });
  }
};
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions: {},
  modules: {}
});
