<template>
  <section class="food-detail-page">
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
        <div class="m-count">-</div>
        <div class="countnum">10</div>
        <div class="p-count">＋</div>
      </div>
    </div>
    <div class="food-info">
      <p class="title">商品介绍</p>
      <p class="content">
        一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: ["seller"],
  data() {
    return {};
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
  background: #f3f5f7;
  .food-banner {
    width: 100%;
    img {
      display: block;
    }
  }
}
</style>
