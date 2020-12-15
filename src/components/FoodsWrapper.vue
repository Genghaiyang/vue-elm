<template>
  <div class="foods-wrapper" ref="scroll">
    <ul>
      <li v-for="(item, index) in seller" :key="index">
        <p class="line-titles" ref="lineTitles">{{ item.name }}</p>
        <section
          class="food-item"
          v-for="(itemfood, indexfood) in item.foods"
          :key="indexfood"
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
            <div class="food-count">
              <transition name="rotate-icon">
                <i
                  class="count-m"
                  v-show="getGoodsCount(itemfood.name) > 0"
                  @click="
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
                @click="
                  SET_GOODS_ITEM_COUNT_LI({
                    name: itemfood.name
                  })
                "
                >+</i
              >
            </div>
          </div>
        </section>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      lineTitles: [
        "linetitle0",
        "linetitle0",
        "linetitle0",
        "linetitle0",
        "linetitle0",
        "linetitle0",
        "linetitle0",
        "linetitle0",
        "linetitle0"
      ]
    };
  },
  computed: {
    ...mapState(["goodsItemCount", "FoodsWrapperScrollTo"]),
    ...mapGetters(["getGoodsCount"])
  },
  props: ["seller"],
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
        if (-pos.y >= 0 && -pos.y < this.$refs.lineTitles[1].offsetTop) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(0);
          console.log(-pos.y, 333, this.$refs.lineTitles[1].offsetTop);
        } else if (
          -pos.y >= this.$refs.lineTitles[1].offsetTop &&
          -pos.y < this.$refs.lineTitles[2].offsetTop
        ) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(1);
          console.log(121);
        } else if (
          -pos.y >= this.$refs.lineTitles[2].offsetTop &&
          -pos.y < this.$refs.lineTitles[3].offsetTop
        ) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(2);
        } else if (
          -pos.y >= this.$refs.lineTitles[3].offsetTop &&
          -pos.y < this.$refs.lineTitles[4].offsetTop
        ) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(3);
        } else if (
          -pos.y >= this.$refs.lineTitles[4].offsetTop &&
          -pos.y < this.$refs.lineTitles[5].offsetTop
        ) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(4);
        } else if (
          -pos.y >= this.$refs.lineTitles[5].offsetTop &&
          -pos.y < this.$refs.lineTitles[6].offsetTop
        ) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(5);
        } else if (
          -pos.y >= this.$refs.lineTitles[6].offsetTop &&
          -pos.y < this.$refs.lineTitles[7].offsetTop
        ) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(6);
        } else if (
          -pos.y >= this.$refs.lineTitles[7].offsetTop &&
          -pos.y < this.$refs.lineTitles[8].offsetTop
        ) {
          this.SET_FOODS_WRAPPER_SCROLL_TO(7);
        } else {
          this.SET_FOODS_WRAPPER_SCROLL_TO(8);
        }
      });
      /* this.bs.on("scrollEnd", () => {
        
      }); */
    },
    ScrollClickHandler(item) {
      window.alert(item);
    }
  },
  mounted() {
    this.initScroll();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  watch: {
    FoodsWrapperScrollTo: function(val) {
      this.bs.scrollToElement(this.$refs.lineTitles[val], 400, false, false);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.foods-wrapper {
  flex: 1;
  height: 100%;
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
