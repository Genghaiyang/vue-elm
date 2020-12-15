<template>
  <div class="menu-wrapper" ref="scroll">
    <ul>
      <li
        v-for="(item, index) in seller"
        :key="index"
        @click="SET_FOODS_WRAPPER_SCROLL_TO(index)"
        :class="{ active: FoodsWrapperScrollTo == index }"
      >
        <i v-if="item.type >= 0" :class="iconType[item.type]"></i
        ><span>{{ item.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      iconType: ["decrease", "discount", "special", "invoice", "guarantee"]
    };
  },
  props: ["seller"],
  computed: {
    ...mapState(["FoodsWrapperScrollTo"])
  },
  methods: {
    ...mapMutations(["SET_FOODS_WRAPPER_SCROLL_TO"]),
    initScroll() {
      this.bs = new BScroll(this.$refs.scroll, {
        probeType: 3,
        click: true
      });
      this.bs.on("scroll", () => {
        /* console.log("scrolling-"); */
      });
      this.bs.on("scrollEnd", () => {
        /* console.log("scrollingEnd"); */
      });
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.menu-wrapper {
  flex: none;
  width: 1.5rem;
  height: 100%;
  background-color: #f3f5f7;
  overflow: hidden;
  ul {
    margin: 0;
    padding: 0;
    li {
      padding: 0.25rem 0.2rem;
      line-height: 0;
      border-bottom: 1px solid rgb(206, 204, 204);
      &.active {
        background-color: #fff;
      }
      span {
        font-size: 0.26rem;
        color: #333;
        line-height: 0.36rem;
        display: inline;
      }
      i {
        display: block;
        width: 0.38rem;
        height: 0.38rem;
        margin-right: 0.1rem;
        float: left;
        margin-top: 0.1rem;
      }
      i.decrease {
        background: url(../assets/decrease_2@3x.png) no-repeat;
        background-size: 100% 100%;
      }
      i.discount {
        background: url(../assets/discount_2@3x.png) no-repeat;
        background-size: 100% 100%;
      }
      i.special {
        background: url(../assets/special_2@3x.png) no-repeat;
        background-size: 100% 100%;
      }
      i.invoice {
        background: url(../assets/invoice_2@3x.png) no-repeat;
        background-size: 100% 100%;
      }
      i.guarantee {
        background: url(../assets/guarantee_2@3x.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
