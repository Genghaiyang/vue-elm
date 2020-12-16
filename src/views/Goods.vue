<template>
  <div class="goods">
    <MenuWrapper :seller="seller.goods" v-if="seller.goods"></MenuWrapper>
    <FoodsWrapper :seller="seller.goods" v-if="seller.goods"></FoodsWrapper>
    <!-- <DetailWrapper v-if="Dshow"></DetailWrapper> -->
    <ShopCart></ShopCart>
  </div>
</template>

<script>
import MenuWrapper from "../components/MenuWrapper.vue";
import FoodsWrapper from "../components/FoodsWrapper.vue";
/* import DetailWrapper from "../components/DetailWrapper.vue" */
import ShopCart from "../components/ShopCart.vue";

export default {
  name: "Goods",
  props: ["seller"],
  data() {
    return {
      Dshow: false
    };
  },
  components: {
    MenuWrapper,
    FoodsWrapper,
    /* DetailWrapper,*/
    ShopCart
  },
  methods: {
    setDshow() {
      this.Dshow = !this.Dshow;
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
}
</style>
