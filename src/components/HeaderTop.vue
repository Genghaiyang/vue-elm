<template>
	<header class="navbox">
		<div class="shopContent">
			<p class="shopPic">
				<img :src="seller.avatar" alt="" width="100%" />
			</p>
			<div class="shopInfo">
				<p class="name"><i class="brand"></i>{{ seller.name }}</p>
				<p class="time">
					{{ seller.description }}/{{ seller.deliveryTime }}分钟送达
				</p>
				<p class="support">
					<i class="decrease"></i>{{ seller.supports[0].description }}
				</p>
			</div>
			<div class="shopTips" @click="setDetail()">
				<span class="count">{{ seller.supports.length }}个</span>
				<span class="arrow">></span>
			</div>
		</div>
		<div class="shopBulletin" @click="setDetail()">
			<i class="icon"></i>
			<span class="text">{{ seller.bulletin }}</span>
			<span class="arrow">></span>
		</div>
		<div class="navbanner">
			<img :src="seller.avatar" alt="" width="100%" />
		</div>
	</header>
</template>

<script>
export default {
	props: ['seller','setDetail'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.navbox {
	width: 100%;
	/* height: 2.5rem; */
	background: rgba(7, 17, 27, 0.5);
	color: #fff;
	overflow: hidden;
	position: relative;
	.shopContent {
		padding: 0.4rem 0.4rem 0.3rem;
		display: flex;
		position: relative;
		.shopPic {
			width: 1.4rem;
			flex: none;
			margin: 0 0.2rem 0 0;
			img {
				display: block;
			}
		}
		.shopInfo {
			display: flex;
			flex-direction: column;
			font-size: 0.26rem;
			justify-content: space-between;
			.name,
			.support {
				display: flex;
				align-items: center;
				.brand {
					display: inline-block;
					width: 0.6rem;
					height: 0.36rem;
					background: url(../assets/brand@2x.png) no-repeat;
					background-size: 100% 100%;
					margin-right: 0.2rem;
				}
				.decrease {
					display: inline-block;
					width: 0.4rem;
					height: 0.4rem;
					background: url(../assets/decrease_2@3x.png) no-repeat;
					background-size: 100% 100%;
					margin-right: 0.2rem;
				}
			}
		}
		.shopTips {
			width: 1rem;
			height: 0.4rem;
			background-color: rgba(0, 0, 0, 0.2);
			border-radius: 0.2rem;
			font-size: 0.26rem;
			position: absolute;
			right: 0.5rem;
			bottom: 0.5rem;
			display: flex;
			justify-content: center;
			align-items: center;
			.arrow {
				margin-left: 0.15rem;
			}
		}
	}
	.navbanner {
		width: 100%;
		height: 100%;
		filter: blur(10px);
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
	.shopBulletin {
		height: 0.32rem;
		background: rgba(7, 17, 27, 0.2);
		padding: 0 0.12rem;
		line-height: 0.32rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.icon {
			width: 0.55rem;
			height: 0.3rem;
			background: url(../assets/bulletin@3x.png) no-repeat;
			background-size: 100% 100%;
			flex: none;
		}
		.arrow {
			font-size: 0.26rem;
			flex: none;
		}
		.text {
			flex: auto;
			height: 100%;
			padding: 0 0.15rem;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			font-size: 0.26rem;
			line-height: 0.32rem;
		}
	}
}
</style>
