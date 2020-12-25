<template>
  <transition name="move">
    <section class="food-detail-page" ref="detailscroll" v-show="Dshow">
      <div class="food-content">
        <div class="return-btn" @click="handleClickReturnbtn()"></div>
        <section class="food-banner">
          <img :src="foodItem.image" alt="" width="100%" />
        </section>

        <div class="food-all">
          <p class="name">{{ foodItem.name }}</p>
          <p class="tips">
            月售{{ foodItem.sellCount }} 好评率{{ foodItem.rating }}%
          </p>
          <div class="count">
            <div class="money">¥{{ foodItem.price }}</div>

            <div class="rightbox" v-if="foodItem.name">
              <div
                class="addcart"
                v-show="getGoodsCount(foodItem.name) == 0"
                @click="handleAddCartClick(foodItem, $event)"
              >
                加入购物车
              </div>
              <shop-count
                :itemfood="foodItem"
                ref="shopCount"
                v-show="getGoodsCount(foodItem.name) > 0"
              ></shop-count>
            </div>
          </div>
        </div>

        <div class="food-info">
          <p class="title">商品介绍</p>
          <p class="content">{{ foodItem.info }}</p>
        </div>

        <div class="food-msg-box">
          <div class="title">商品评价</div>
          <div class="good-tab-box">
            <ul>
              <li
                :class="{ tab: ratingsShowType === 1 }"
                @click="toogleRatingsShowType(1)"
              >
                全部{{ foodRatingsItemCount[0] }}
              </li>
              <li
                :class="{ tab: ratingsShowType === 2 }"
                @click="toogleRatingsShowType(2)"
              >
                推荐{{ foodRatingsItemCount[1] }}
              </li>
              <li
                :class="{ tab: ratingsShowType === 3 }"
                @click="toogleRatingsShowType(3)"
              >
                吐槽{{ foodRatingsItemCount[2] }}
              </li>
            </ul>
          </div>
          <div class="tootleline" @click="toogleShowHasTextrating()">
            <span :class="{ active: showHasTextrating }"></span>只看有内容的评价
          </div>
          <div class="msg-box">
            <ul>
              <li v-for="(item, index) in foodRatingsItem" :key="index">
                <p class="line1">
                  <span class="time">{{ item.rateTime | time }}</span
                  ><span class="avatar"><img :src="item.avatar"/></span
                  ><span class="autor">{{ item.username }}</span>
                </p>
                <p class="line2">
                  <i :class="['icon', { iconbad: item.rateType == 1 }]"></i
                  >{{ item.text }}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
import BScroll from "@better-scroll/core";
import moment from "moment";
import ShopCount from "../components/ShopCount.vue";
import { mapGetters } from "vuex";
export default {
  props: ["seller"],
  components: {
    ShopCount
  },
  data() {
    return {
      Dshow: false,
      foodItem: {},
      ratingsShowType: 1,
      showHasTextrating: false
    };
  },
  computed: {
    ...mapGetters(["getGoodsCount"]),
    foodRatingsItem() {
      if (this.foodItem.ratings) {
        let outItem = [];

        switch (this.ratingsShowType) {
          case 1:
            outItem = this.foodItem.ratings;
            break;
          case 2:
            outItem = this.foodItem.ratings.filter(item => item.rateType == 0);
            break;
          case 3:
            outItem = this.foodItem.ratings.filter(item => item.rateType == 1);
            break;
          default:
            outItem = null;
        }
        if (this.showHasTextrating) {
          return outItem.filter(item => item.text != "");
        } else {
          return outItem;
        }
      } else {
        return [];
      }
    },
    foodRatingsItemCount() {
      if (this.foodItem.ratings) {
        return [
          this.foodItem.ratings.length,
          this.foodItem.ratings.filter(item => item.rateType == 0).length,
          this.foodItem.ratings.filter(item => item.rateType == 1).length
        ];
      } else {
        return [0, 0, 0];
      }
    }
  },
  filters: {
    time: function(value, formatString) {
      formatString = formatString || "YYYY-MM-DD HH:mm";
      return moment(value).format(formatString);
    }
  },
  methods: {
    initScroll() {
      this.bs = new BScroll(this.$refs.detailscroll, {
        probeType: 3,
        click: true
      });
    },
    toogleRatingsShowType(num) {
      this.ratingsShowType = num;
    },
    toogleShowHasTextrating() {
      this.showHasTextrating = !this.showHasTextrating;
    },
    handleClickReturnbtn() {
      this.Dshow = false;
    },
    handleAddCartClick(item, event) {
      this.$refs.shopCount.handlePlusButtonClick(item, event);
    }
  },
  created() {
    this.$root.eventBus.$on("showDetaiWrapper", item => {
      this.Dshow = true;
      this.foodItem = item;
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
    });
  },
  updated() {
    this.bs.refresh();
  },
  beforeDestroy() {
    this.bs.destroy();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.move-enter-avtive,
.move-leave-active {
  transform: translate3d(0, 0, 0);
}
.move-enter,
.move-leave-active {
  transform: translate3d(100%, 0, 0);
}
.food-detail-page {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0.8rem;
  left: 0;
  right: 0;
  z-index: 87;
  overflow: hidden;
  background: #f3f5f7;
  transition: all 0.4s ease;

  .food-content {
    width: 100%;
    .return-btn {
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      top: 0.2rem;
      left: 0.2rem;
      z-index: 100;
      background: url(../assets/arrow-left-bold.png) no-repeat center
        center/100% 100%;
    }
  }
  .food-banner {
    width: 100%;
    img {
      display: block;
    }
  }
  .food-all {
    padding: 0 0.2rem 0.26rem;
    overflow: hidden;
    background: #fff;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .name {
      color: #07111b;
      font-size: 0.28rem;
      font-weight: bold;
      margin: 0.32rem 0 0.1rem;
    }
    .tips {
      color: #93999f;
      font-size: 0.24rem;
    }
    .count {
      width: 100%;
      display: flex;
      margin-top: 0.2rem;
      justify-content: space-between;
      .money {
        font-size: 0.28rem;
        font-weight: bold;
        color: red;
        line-height: 0.5rem;
      }
      .rightbox {
        display: flex;
        width: 1.8rem;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .addcart {
          width: 100%;
          height: 0.5rem;
          background: #00a0dc;
          border-radius: 0.3rem;
          text-align: center;
          line-height: 0.5rem;
          color: #fff;
          font-size: 0.24rem;
        }
      }
    }
  }
  .food-info {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.2rem 0.26rem;
    background: #fff;
    .title {
      width: 100%;
      color: #07111b;
      font-size: 0.28rem;
      font-weight: bold;
      margin: 0.3rem 0;
      padding: 0.2rem 0 0;
    }
    .content {
      color: #4d555d;
      font-size: 0.28rem;
      line-height: 0.55rem;
    }
  }
  .food-msg-box {
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.2rem 0.26rem;
    background: #fff;
    margin-top: 0.3rem;
    overflow: hidden;
    .title {
      width: 100%;
      color: #07111b;
      font-size: 0.28rem;
      font-weight: bold;
      padding: 0.2rem 0 0;
    }
    .good-tab-box {
      width: 100%;
      height: 0.6rem;
      margin: 0.2rem 0;
      ul {
        height: 100%;
        display: flex;
        align-items: center;
        margin: 0;
        li {
          display: inline-block;
          width: 1.2rem;
          height: 100%;
          font-size: 0.22rem;
          text-align: center;
          line-height: 0.6rem;
          margin-right: 0.2rem;
          background: rgba(0, 160, 220, 0.2);
          &:last-child {
            background: rgba(77, 85, 93, 0.2);
          }
          &.tab {
            background: #00a9dc;
            color: #fff;
          }
          &:last-child.tab {
            background: #4d555d;
            color: #fff;
          }
        }
      }
    }
    .tootleline {
      padding: 0.2rem 0;
      border-top: 1px solid rgba(7, 17, 27, 0.1);
      font-size: 0.22rem;
      color: #93999f;
      line-height: 0.4rem;
      span {
        display: block;
        float: left;
        width: 0.4rem;
        height: 0.4rem;
        background: url(../assets/success-filling.png) no-repeat center
          center/100% 100%;
        margin-right: 0.1rem;
        &.active {
          background: url(../assets/success-filling1.png) no-repeat center
            center/100% 100%;
        }
      }
    }
    .msg-box {
      width: 100%;
      ul {
        margin: 0;
        overflow: hidden;
        border-top: 1px solid rgba(7, 17, 27, 0.1);
        margin-bottom: 1rem;
        li {
          padding: 0.2rem 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
          font-size: 0.22rem;
          .line1 {
            height: 0.2rem;
            width: 100%;
            line-height: 0.2rem;
            margin: 0.1rem 0;
            .time {
              color: #93999f;
            }
            .autor {
              float: right;
              color: #93999f;
            }
            .avatar {
              float: right;
              width: 0.2rem;
              height: 0.2rem;
              margin-left: 0.1rem;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
          .line2 {
            height: 0.4rem;
            width: 100%;
            line-height: 0.4rem;
            .icon {
              display: block;
              float: left;
              width: 0.4rem;
              height: 0.4rem;
              background: url(../assets/good.png) no-repeat center center/100%
                100%;
              margin-right: 0.1rem;
            }
            .iconbad {
              background: url(../assets/bad.png) no-repeat center center/100%
                100%;
            }
          }
        }
      }
    }
  }
}
</style>
