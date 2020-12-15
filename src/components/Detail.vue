<template>
	<section class="detail">
		<div class="detail-main">
			<div class="shop-name">{{ seller.name }}</div>
			<div class="shop-star">
				<el-rate
					v-model="seller.score"
					disabled
					show-score
					text-color="#ff9900"
					score-template="{value}"
				>
				</el-rate>
			</div>
			<div class="shop-info">
				<div class="line"></div>
				<span>优惠信息</span>
				<div class="line"></div>
			</div>
			<ul class="supports">
				<li v-for="(item, index) in seller.supports" :key="item.type">
					<i :class="iconType[index]"></i
					><span class="text">{{ item.description }}</span>
				</li>
			</ul>
			<div class="shop-info">
				<div class="line"></div>
				<span>商家公告</span>
				<div class="line"></div>
			</div>
			<div class="shop-bulletin">{{ seller.bulletin }}</div>
		</div>
		<div class="shop-close-btn" @click="setDetail()">&times;</div>
	</section>
</template>

<script>
export default {
	name: 'Detail',
	props: ['seller', 'setDetail'],
	data() {
		return {
			iconType: [
				'decrease',
				'discount',
				'special',
				'invoice',
				'guarantee',
			],
/* 			ratevalue: 4.2, */
		}
	},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.detail {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: 999;
	background: rgba(7, 17, 27, 0.8);
	-webkit-backdrop-filter: blur(10px);
	backdrop-filter: blur(10px);
	.detail-main {
		width: 85%;
		margin: 1rem auto 0;
		font-size: 0.26rem;
		color: #fff;
		.shop-name {
			font-size: 0.32rem;
			font-weight: bold;
			text-align: center;
			padding: 0.2rem 0;
        }
        .shop-star{
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.4rem 0;
        }
		.shop-info {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.line {
				flex: 1;
				height: 1px;
				background: rgba(255, 255, 255, 0.2);
			}
			span {
				margin: 0 0.2rem;
			}
		}
		.supports {
			li {
				padding: 0.1rem 0;
				line-height: 0.4rem;
				display: flex;
				align-items: center;
				i {
					flex: none;
					margin: 0 0.2rem;
					display: inline-block;
					width: 0.42rem;
					height: 0.42rem;
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
		.shop-bulletin {
			line-height: 0.48rem;
			margin-top: 0.3rem;
		}
	}
	.shop-close-btn {
		text-align: center;
		color: #fff;
		font-size: 1rem;
		margin-top: 2rem;
	}
}
</style>
