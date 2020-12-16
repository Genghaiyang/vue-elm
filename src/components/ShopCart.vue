<template>
  <div class="shop-cart">
    <div class="left-cart">
      <div class="cart-box">
        <div class="cart"></div>
        <div class="cart-count"></div>
      </div>
      <div class="totalmoney">¥0</div>
      <div class="cart-desc">另需配送费¥4元</div>
    </div>
    <div class="right-cart">¥0元起送</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["seller"],
  computed: {
    ...mapState(["FoodsWrapperScrollTo"])
  },
  methods: {
    ...mapMutations(["SET_FOODS_WRAPPER_SCROLL_TO"]),

    emitFoodsWrapperScroll(num) {
      this.SET_FOODS_WRAPPER_SCROLL_TO(num);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.shop-cart {
  width: 100%;
  height: 0.8rem;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 89;
  background: #141d27;
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  .left-cart {
    flex: 1;
    .cart-box {
      display: block;
      float: left;
      margin-left: 0.25rem;
      height: 100%;
      .cart {
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background: url(../assets/cart_empty.png) no-repeat center center
          #2b343c;
        background-size: 70% 70%;
        margin-top: -0.2rem;
        border: 0.1rem solid #141d27;
      }
    }
    .totalmoney {
      line-height: 0.8rem;
      font-size: 0.32rem;
      font-weight: bold;
      float: left;
      margin-left: 0.3rem;
    }
    .cart-desc {
      float: left;
      line-height: 0.8rem;
      font-size: 0.24rem;
      font-weight: bold;
      margin-left: 0.3rem;
    }
  }
  .right-cart {
    flex: none;
    width: 1.8rem;
    height: 100%;
    background: #2b343c;
    text-align: center;
    line-height: 0.8rem;
    font-size: 0.22rem;
    font-weight: bold;
  }
}
</style>
