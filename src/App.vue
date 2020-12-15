<template>
  <div id="app">
    <HeaderTop
      :seller="seller.seller"
      :setDetail="setDetail"
      v-if="seller.seller"
    ></HeaderTop>
    <NavLine />
    <!-- <NavLine></NavLine> -->
    <keep-alive><router-view :seller="seller"/></keep-alive>
    <transition name="fade">
      <Detail
        v-show="detail"
        :seller="seller.seller"
        :setDetail="setDetail"
        v-if="seller.seller"
      ></Detail>
    </transition>
  </div>
</template>
<script>
import HeaderTop from "./components/HeaderTop";
import NavLine from "./components/NavLine";
import Detail from "./components/Detail";
import axios from "axios";
import { mapMutations } from "vuex";
export default {
  name: "App",
  data() {
    return {
      seller: {},
      detail: false
    };
  },
  components: {
    HeaderTop,
    NavLine,
    Detail
  },
  methods: {
    ...mapMutations(["SET_GOODS_ITEM_COUNT"]),
    initNav() {
      axios
        .get(
          "https://simonzhangiter.github.io/VueDemo_Sell_Eleme/static/data.json"
        )
        .then(res => {
          /* this.seller = res.data.seller */
          this.seller = res.data;
          res.data.goods.map(item => {
            item.foods.map(foodItem => {
              this.SET_GOODS_ITEM_COUNT({
                name: foodItem.name,
                count: 0,
                price: foodItem.price
              });
            });
          });
        });
    },
    setDetail() {
      this.detail = !this.detail;
    },
    setFoodsItemCount() {
      //设置vuex菜品数量数组
    }
  },
  created() {
    this.initNav();
  }
};
</script>
<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
p {
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  padding: 0;
}
a {
  text-decoration: none;
  display: inline-block;
  flex: 1;
  text-align: center;
}
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
