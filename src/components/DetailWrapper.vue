<template>
  <section class="food-detail-page" ref="detailscroll">
    <div class="food-content">
      <section class="food-banner">
        <img
          src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750"
          alt=""
          width="100%"
        />
      </section>

      <div class="food-all">
        <p class="name">皮蛋瘦肉粥</p>
        <p class="tips">月售229 好评率100%</p>
        <div class="count">
          <div class="money">¥10</div>

          <div class="rightbox">
            <div class="addcart">加入购物车</div>
            <div class="countbox" style="display:none;">
              <div class="m-count">-</div>
              <div class="countnum">10</div>
              <div class="p-count">＋</div>
            </div>
          </div>
        </div>
      </div>

      <div class="food-info">
        <p class="title">商品介绍</p>
        <p class="content">
          一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足
        </p>
      </div>

      <div class="food-msg-box">
        <div class="title">商品评价</div>
        <div class="good-tab-box">
          <ul>
            <li>全部2</li>
            <li>推荐2</li>
            <li>吐槽0</li>
          </ul>
        </div>
        <div class="tootleline"><span></span>只看有内容的评价</div>
        <div class="msg-box">
          <ul>
            <li>
              <p class="line1">
                <span class="time"></span><span class="autor"></span
                ><span class="avatar"></span>
              </p>
              <p class="line2"><i class="icon"></i><span>难吃不推荐</span></p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BScroll from "@better-scroll/core";
export default {
  props: ["seller"],
  data() {
    return {};
  },
  methods: {
    initScroll() {
      this.bs = new BScroll(this.$refs.detailscroll, {
        probeType: 3,
        click: true
      });
    }
  },
  mounted() {
    this.initScroll();
    console.log(this.bs);
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
.food-detail-page {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0.8rem;
  left: 0;
  z-index: 87;
  overflow: hidden;
  background: #f3f5f7;
  .food-content {
    width: 100%;
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
      }
      .rightbox {
        display: flex;
        width: 1.8rem;
        justify-content: space-between;
        align-items: center;
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
      height: 222px;
    }
    .tootleline {
      height: 200px;
    }
    .msg-box {
      height: 200px;
    }
  }
}
</style>
