<template>
  <div class="goods">
    <MenuWrapper :seller="seller.goods" v-if="seller.goods"></MenuWrapper>
    <FoodsWrapper :seller="seller.goods" v-if="seller.goods"></FoodsWrapper>
    <DetailWrapper :seller="seller.goods"></DetailWrapper>
    <ShopCart :seller="seller.seller" v-if="seller.seller"></ShopCart>
    <transition name="fade">
      <div
        class="blur-bg"
        v-show="BlurBgShowTootle"
        @click="handleLeftCartClick()"
      ></div>
    </transition>
  </div>
</template>

<script>
import MenuWrapper from "../components/MenuWrapper.vue";
import FoodsWrapper from "../components/FoodsWrapper.vue";
import DetailWrapper from "../components/DetailWrapper.vue";
import ShopCart from "../components/ShopCart.vue";
import { mapState, mapMutations } from "vuex";
export default {
  name: "Goods",
  props: ["seller"],
  data() {
    return {};
  },
  computed: {
    ...mapState(["BlurBgShowTootle"])
  },
  components: {
    MenuWrapper,
    FoodsWrapper,
    DetailWrapper,
    ShopCart
  },
  methods: {
    ...mapMutations(["SET_BLUR_BG_SHOW"]),
    setDshow() {
      this.Dshow = !this.Dshow;
    },
    handleLeftCartClick() {
      this.SET_BLUR_BG_SHOW();
    }
  }
};
</script>

<style scoped lang="less">
.goods {
  width: 100%;
  position: absolute;
  top: 3.3rem;
  bottom: 0;
  display: flex;
  z-index: 990;
  .blur-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(7, 17, 27, 0.6);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    z-index: 88;
  }
}
</style>
