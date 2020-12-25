<template>
  <div class="food-count">
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
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getGoodsCount"])
  },
  props: ["itemfood"],
  methods: {
    ...mapMutations([
      "SET_GOODS_ITEM_COUNT_LI",
      "SET_GOODS_ITEM_COUNT_LI_PLUS"
    ]),

    handlePlusButtonClick(item, event) {
      this.SET_GOODS_ITEM_COUNT_LI({
        name: item.name
      });
      this.$root.eventBus.$emit("dropBall", event);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
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
    font-size: 0.24rem;
    color: #000;
  }
}
</style>
