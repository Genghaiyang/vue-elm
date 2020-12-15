<template>
	<nav class="nav">
		<router-link to="/goods" :class="{'tab':this.$route.name === 'Goods'}">商品</router-link>
		<router-link to="/ratings" :class="{'tab':this.$route.name === 'Ratings'}">评论</router-link>
		<router-link to="/seller" :class="{'tab':this.$route.name === 'Seller'}">商家</router-link>
	</nav>
</template>

<script>
export default {
	name: 'NavLine',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nav {
	width: 100%;
	height: 0.86rem;
	display: flex;
	line-height: 0.86rem;
	background: #fff;
	border-bottom: 1px solid #b8b6b6;
	justify-content: space-between;
	align-items: center;
	a {
		color: #4d555d;
		font-size: 0.28rem;
    }
    a.tab{
        color: #f01414;
    }
}
</style>
