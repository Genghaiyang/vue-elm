<template>
  <div class="foods-wrapper" ref="scroll">
    <ul>
      <li v-for="(item, index) in foodsSeller" :key="index">
        <p class="line-titles" ref="lineTitles">{{ item.name }}</p>
        <section
          class="food-item"
          v-for="(itemfood, indexfood) in item.foods"
          :key="indexfood"
          @click="handleFoodListClick(itemfood)"
        >
          <div class="pic">
            <img :src="itemfood.image" alt="" width="100%" />
          </div>
          <div class="food-info">
            <p class="food-name">{{ itemfood.name }}</p>
            <p class="food-js" v-if="itemfood.description !== ''">
              {{ itemfood.description }}
            </p>
            <p class="text">
              月售{{ itemfood.sellCount }}份 好评率{{ itemfood.rating }}%
            </p>
            <p class="price">
              ¥{{ itemfood.price }}
              <span v-if="itemfood.oldPrice !== ''"
                >¥{{ itemfood.oldPrice }}</span
              >
            </p>
            <shop-count :itemfood="itemfood"></shop-count>
            <!-- <div class="food-count">
              <transition name="rotate-icon">
                <i
                  class="count-m"
                  v-show="getGoodsCount(itemfood.name) > 0"
                  @click.stop.prevent="
                    SET_GOODS_ITEM_COUNT_LI_PLUS({
                      name: itemfood.name
                    })
                  "
                  >-</i
                >
              </transition>
              <span v-show="getGoodsCount(itemfood.name) > 0">{{
                getGoodsCount(itemfood.name)
              }}</span>
              <i
                class="count-p"
                @click.stop.prevent="handlePlusButtonClick(itemfood, $event)"
                >+</i
              >
            </div> -->
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { mapState, mapMutations, mapGetters } from "vuex";
import ShopCount from "../components/ShopCount.vue";
export default {
  data() {
    return {
      WrapperslinetitleTopNum: [],
      WrapperscrollTopNum: 0,
      foodsSeller: this.seller
    };
  },
  computed: {
    ...mapState(["goodsItemCount", "FoodsWrapperScrollTo"]),
    ...mapGetters(["getGoodsCount"]),
    menuCurrentIndex() {
      for (let i = 0, l = this.WrapperslinetitleTopNum.length; i < l; i++) {
        let topHeight = this.WrapperslinetitleTopNum[i];
        let bottomHeight = this.WrapperslinetitleTopNum[i + 1];
        if (
          !bottomHeight ||
          (this.WrapperscrollTopNum >= topHeight &&
            this.WrapperscrollTopNum < bottomHeight)
        ) {
          return i;
        }
      }
      return 0;
    }
  },
  props: ["seller"],
  components: {
    ShopCount
  },
  methods: {
    ...mapMutations([
      "SET_GOODS_ITEM_COUNT_LI",
      "SET_GOODS_ITEM_COUNT_LI_PLUS",
      "SET_FOODS_WRAPPER_SCROLL_TO"
    ]),
    initScroll() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true
      });
      this.bs.on("scroll", pos => {
        this.WrapperscrollTopNum = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      this.$refs.lineTitles.map(item => {
        this.WrapperslinetitleTopNum.push(item.offsetTop);
      });
    },
    scrollToElementPos(val) {
      this.bs.scrollToElement(this.$refs.lineTitles[val], 400, false, false);
    },
    handlePlusButtonClick(item, event) {
      this.SET_GOODS_ITEM_COUNT_LI({
        name: item.name
      });
      this.$root.eventBus.$emit("dropBall", event);
    },
    handleFoodListClick(item) {
      this.$root.eventBus.$emit("showDetaiWrapper", item);
    },
    updatedImg() {
      //解决better-scroll因为图片没有下载完导致的滚动条高度不够，无法浏览全部内容的问题。
      //原因是better-scroll初始化是在dom加载后执行，此时图片没有下载完成，导致滚动条高度计算不准确。
      //利用图片的complete属性进行判断，当所有图片下载完成后再对scroll重新计算。
      let img = document
        .getElementsByClassName("foods-wrapper")[0]
        .getElementsByTagName("img");
      let count = 0;
      let length = img.length;
      if (length) {
        let timer = setInterval(() => {
          if (count == length) {
            // console.log('refresh')
            this.bs.refresh();
            clearInterval(timer);
          } else if (img[count].complete) {
            count++;
          }
        }, 100);
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this._calculateHeight(); // 初始化列表高度列表
    });
    this.$root.eventBus.$on("scrollfoodswrapper", val => {
      this.scrollToElementPos(val);
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll();
      console.log(this.bs);
      this.updatedImg();
    });
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  watch: {
    menuCurrentIndex: function(i) {
      this.SET_FOODS_WRAPPER_SCROLL_TO(i);
    },
    foodsSeller: function() {
      this.bs.refresh();
      console.log("refresh!");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.foods-wrapper {
  flex: 1;
  height: 90%;
  overflow: hidden;
  ul {
    width: 100%;
    margin: 0;
    overflow: hidden;
    li {
      overflow: hidden;
      .line-titles {
        padding-left: 0.2rem;
        height: 0.5rem;
        line-height: 0.5rem;
        background-color: #f3f5f7;
        border-left: 0.1rem solid #d9dde1;
        font-size: 0.26rem;
        color: #93999f;
      }
      .food-item {
        padding: 0.3rem 0;
        margin: 0 0.2rem;
        border-bottom: 1px solid #d9dde1;
        display: flex;
        &:last-child {
          border: 0;
        }
        .pic {
          flex: none;
          width: 1.6rem;
          margin-right: 0.1rem;
          img {
            display: block;
          }
        }
        .food-info {
          font-size: 0.24rem;
          flex: 1;
          position: relative;
          .food-count {
            position: absolute;
            right: 0;
            bottom: 0;
            z-index: 10;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .count-p,
            .count-m {
              display: inline-block;
              font-size: 0.24rem;
              font-style: normal;
              color: #fff;
              text-align: center;
              width: 0.32rem;
              height: 0.32rem;
              line-height: 0.32rem;
              border-radius: 50%;
              background-color: #00a0dc;
              transition: all 0.4s linear;
            }
            .rotate-icon-enter-active {
              transform: translate3d(0, 0, 0) rotate(0);
            }
            .rotate-icon-enter,
            .rotate-icon-leave-active {
              opacity: 0;
              transform: translate3d(20px, 0, 0) rotate(360deg);
            }

            span {
              margin: 0 0.1rem;
              line-height: 0.32rem;
            }
          }
          p {
            padding: 0.02rem 0;
          }
          p.food-name {
            font-size: 0.26rem;
            font-weight: bold;
            color: #000;
          }
          p.price {
            color: red;
            span {
              color: #93999f;
              text-decoration: line-through;
              margin-left: 0.1rem;
            }
          }
        }
      }
    }
  }
}
</style>
