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
    <div class="shop-cart-list" v-show="BlurBgShowTootle">
      <div class="list-head">
        <span>购物车</span><span class="clear-cart">清空</span>
      </div>
      <div class="list-content">
        <ul>
          <li v-for="(item, index) in selectGoodsList" :key="index">
            <span class="name">{{ item.name }}</span>
            <div class="count"></div>
          </li>
        </ul>
      </div>
    </div>
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
    ...mapState(["goodsItemCount", "BlurBgShowTootle"]),
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
    ...mapMutations(["SET_FOODS_WRAPPER_SCROLL_TO", "SET_BLUR_BG_SHOW"]),

    handleLeftCartClick() {
      if (this.totalmoney > 0) {
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
            width: 2rem;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>
