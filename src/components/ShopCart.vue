<template>
  <div class="shop-cart">
    <div class="left-cart" @click="handleLeftCartClick()">
      <div class="cart-box">
        <div :class="['cart', { cartActive: totalmoney }]"></div>
        <div class="cart-count" v-if="totalmoney > 0">
          {{ selectGoodsCount }}
        </div>
      </div>
      <div :class="['totalmoney', { totalmoneyActive: totalmoney }]">
        ¥{{ totalmoney }}
      </div>
      <div class="cart-desc" v-if="seller.deliveryPrice">
        另需配送费¥{{ seller.deliveryPrice }}元
      </div>
    </div>
    <div
      :class="[
        'right-cart',
        { rightcartActive: totalmoney - seller.minPrice >= 0 }
      ]"
    >
      {{ payDesc }}
    </div>
    <transition name="slide">
      <div class="shop-cart-list" v-show="BlurBgShowTootle">
        <div class="list-head">
          <span>购物车</span
          ><span class="clear-cart" @click="clearGoodsListEmpty()">清空</span>
        </div>
        <div class="list-content" ref="scroll">
          <ul>
            <li v-for="(item, index) in selectGoodsList" :key="index">
              <span class="name">{{ item.name }}</span>
              <div class="count">
                <div class="money">¥{{ item.count * item.price }}</div>
                <!-- <div class="m-count" @click="handleCountM(item)">-</div>
                <div class="countnum">{{ item.count }}</div>
                <div class="p-count" @click="handleCountP(item)">＋</div> -->
                <div class="shop-count-right">
                  <shop-count :itemfood="item"></shop-count>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <div class="drop-ball-box">
      <transition
        name="drop"
        v-on:before-enter="beforeEnter"
        v-on:enter="enter"
        v-on:after-enter="afterEnter"
        v-for="(ball, index) in balls"
        :key="index"
      >
        <div class="ball" v-show="ball.show">
          <div class="ball-inner"></div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { mapState, mapMutations } from "vuex";
import ShopCount from "../components/ShopCount.vue";
export default {
  data() {
    return {
      balls: [
        { show: false },
        { show: false },
        { show: false },
        { show: false },
        { show: false }
      ]
    };
  },
  props: ["seller"],
  components: {
    ShopCount
  },
  computed: {
    ...mapState(["goodsItemCount", "BlurBgShowTootle", "BlurBgShowTootle"]),
    goodsItemfilter() {
      //商品去重
      return this.goodsItemCount.filter((x, index, self) => {
        var arrnames = [];
        self.forEach(item => {
          arrnames.push(item.name);
        });

        return arrnames.indexOf(x.name) === index;
      });
    },
    selectGoodsCount() {
      //购物车角标数目
      let count = 0;
      this.goodsItemfilter.map(item => {
        if (item.count > 0) {
          count += item.count;
        }
      });
      return count;
    },
    selectGoodsList() {
      //购物车商品列表数组
      return this.goodsItemfilter.filter(item => item.count > 0);
    },
    totalmoney() {
      let money = 0;
      this.goodsItemfilter.map(item => {
        money = money + item.count * item.price;
      });
      return money;
    },
    payDesc() {
      let diffmoney = this.seller.minPrice - this.totalmoney;
      if (this.totalmoney === 0) {
        return `￥${this.seller.minPrice}元起送`;
      } else if (diffmoney > 0) {
        return `还差￥${diffmoney}元配送`;
      } else {
        return `去结算`;
      }
    }
  },
  methods: {
    ...mapMutations([
      "SET_FOODS_WRAPPER_SCROLL_TO",
      "SET_BLUR_BG_SHOW",
      "SET_GOODS_ITEM_COUNT_LI",
      "SET_GOODS_ITEM_COUNT_LI_PLUS",
      "CLEAR_GOODS_LIST_EMPTY"
    ]),

    initScroll() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true
      });
    },

    handleLeftCartClick() {
      if (this.totalmoney > 0) {
        this.SET_BLUR_BG_SHOW();
      }
    },

    handleCountP(item) {
      this.SET_GOODS_ITEM_COUNT_LI({
        name: item.name
      });
    },
    handleCountM(item) {
      this.SET_GOODS_ITEM_COUNT_LI_PLUS({
        name: item.name
      });
    },
    clearGoodsListEmpty() {
      //清空商品列表
      if (this.selectGoodsList.length > 0) {
        this.selectGoodsList.map(item => {
          this.CLEAR_GOODS_LIST_EMPTY({
            name: item.name
          });
        });
      }
    },
    beforeEnter(el) {
      let count = this.balls.length;
      while (count--) {
        let ball = this.balls[count];
        if (ball.show) {
          /* let rect = ball.el.getBoundingClientRect(); */
          let x = ball.event.clientX - 80;
          let y = -(document.documentElement.clientHeight - ball.event.clientY);
          /* el.style.display = ""; */
          el.style.webkitTransform = `translate3d(0,${y}px,0)`;
          el.style.transform = `translate3d(0,${y}px,0)`;
          let inner = el.querySelector(".ball-inner");
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
          inner.style.transform = `translate3d(${x}px,0,0)`;
        }
      }
    },
    enter(el) {
      el.offsetHeight; // 触发浏览器重绘，offsetWidth、offsetTop等方法都可以触发
      this.$nextTick(() => {
        el.style.webkitTransform = "translate3d(0,0,0)";
        el.style.transform = "translate3d(0,0,0)";
        let inner = el.querySelector(".ball-inner");
        inner.style.webkitTransform = `translate3d(0,0,0)`;
        inner.style.transform = `translate3d(0,0,0)`;
      });
    },
    afterEnter() {
      for (let i = 0, l = this.balls.length; i < l; i++) {
        if (this.balls[i].show) {
          this.balls[i].show = false;
          /* return; */
        }
      }
    }
  },
  created() {
    this.$root.eventBus.$on("dropBall", event => {
      for (let i = 0, l = this.balls.length; i < l; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true;
          this.balls[i].event = event;
          return;
        }
      }
    });
  },
  mounted() {
    this.initScroll();
  },
  updated() {
    this.bs.refresh();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  watch: {
    selectGoodsList: function() {
      if (this.selectGoodsList.length === 0 && this.BlurBgShowTootle) {
        this.SET_BLUR_BG_SHOW();
      }
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
  color: rgba(255, 255, 255, 0.4);
  display: flex;
  .left-cart {
    flex: 1;
    background: #141d27;
    .cart-box {
      display: block;
      float: left;
      margin-left: 0.25rem;
      height: 100%;
      position: relative;
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
      .cartActive {
        background: url(../assets/cart.png) no-repeat center center #00a0dc;
        background-size: 70% 70%;
      }
      .cart-count {
        width: 0.5rem;
        height: 0.3rem;
        border-radius: 0.2rem;
        position: absolute;
        right: 0;
        top: -0.2rem;
        background: #f01414;
        color: #fff;
        font-size: 0.2rem;
        text-align: center;
        line-height: 0.3rem;
      }
    }
    .totalmoney {
      line-height: 0.8rem;
      font-size: 0.32rem;
      font-weight: bold;
      float: left;
      margin-left: 0.3rem;
    }
    .totalmoneyActive {
      color: #fff;
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
  .rightcartActive {
    background: #00b43c;
    color: #fff;
  }
  .shop-cart-list {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: -1;
    transform: translate(0, -100%);
    background: #fff;
    .list-head {
      width: 100%;
      height: 0.8rem;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      span {
        font-size: 0.26rem;
        color: #07111b;
        line-height: 0.8rem;
        float: left;
        margin-left: 0.2rem;
        &.clear-cart {
          color: #00a0dc;
          float: right;
          margin-right: 0.2rem;
        }
      }
    }
    .list-content {
      width: 100%;
      max-height: 4rem;
      overflow: hidden;
      ul {
        margin: 0 auto;
        width: 90%;
        li {
          width: 100%;
          height: 1rem;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .name {
            font-size: 0.26rem;
            font-weight: bold;
            color: #000;
          }
          .count {
            flex: none;
            width: 2.5rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .money {
              color: red;
              font-size: 0.3rem;
              margin-right: 0.3rem;
              width: 0.5rem;
            }
            .shop-count-right {
              width: 1rem;
              height: 0.32rem;
              position: relative;
              float: right;
            }
            .m-count,
            .p-count {
              width: 0.4rem;
              height: 0.4rem;
              margin: 0 0.2rem;
              border-radius: 50%;
            }
            .m-count {
              background: url(../assets/minus-bold.png) no-repeat center center
                #026b92;
              background-size: 100% 100%;
            }
            .p-count {
              background: url(../assets/add-bold.png) no-repeat center center
                #026b92;
              background-size: 100% 100%;
            }
            .countnum {
              font-size: 0.26rem;
              color: #93999f;
            }
          }
        }
      }
    }
  }
  .slide-enter-active {
    transition: all 0.4s ease;
  }
  .slide-leave-active {
    transition: all 0.4s ease;
  }
  .slide-enter,
  .slide-leave-to {
    transform: translateY(0);
  }
  .slide-enter-to,
  .slide-leave {
    transform: translateY(-100%);
  }
  .drop-ball-box {
    width: 0.8rem;
    height: 0.8rem;
    position: absolute;
    left: 0.4rem;
    bottom: 0.2rem;
    z-index: -1;
    .ball {
      width: 0.4rem;
      height: 0.4rem;
      position: absolute;
      left: 0.2rem;
      bottom: 0.2rem;
      .ball-inner {
        width: 0.4rem;
        height: 0.4rem;
        border-radius: 50%;
        background: #f01414;
        transition: all 0.4s linear;
      }
    }
    .drop-enter,
    .drop-enter-active {
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    }
  }
}
</style>
