<template>
	<view>
		<view class="header">
			<image :src="headerBg" class="header-bg"></image>
			<view class="header-content">
				<view class="title">xxxx积分平台</view>
				<view class="user-content">
					<image :src="userDefault" class="user-img"></image>
					<view>-  -</view>
				</view>
			</view>
		</view>
		<view class="auth-content">
			<image :src="authImg" class="auth-img"></image>
		</view>
		<view class="sub-enter">
			<view>
				<image></image>
			</view>
		</view>
	</view>
</template>
<script>
	import headerBg from "../../static/home/home-bg.png"
	import userDefault from "../../static/home/user_default.png"
	import authImg from "../../static/home/rz.png"
	import applyImg from "../../static/home/apply.png"
	import payImg from "../../static/home/pay.png"
	import ruleImg from "../../static/home/rule.png"
	import shopImg from "../../static/home/shop.png"
	export default {
		data() {
			return {
				headerBg,
				userDefault,
				authImg,
				applyImg,
				payImg,
				ruleImg,
				shopImg
			};
		}
	}
</script>

<style lang="scss">
	.header{
		position: relative;
		.header-bg {
			height: 171px;
			width: 100%;
		}
		.header-content {
			position: absolute;
			display: flex;
			width: 100%;
			flex-direction: column;
			justify-content: center;
			top: 0px;
			padding: 40px 20px;
			color: #ffffff;
			.title {
				display: flex;
				justify-content: center;
				margin-bottom: 20px;
			}
			.user-img {
				width: 50px;
				height: 50px;
				margin-right: 20px;
			}
			.user-content {
				display: flex;
				align-items: center;
				
			}
		}
	}
	.auth-content {
		display: flex;
		justify-content: center;
		margin-top: 10px;
		.auth-img {
			height: 60px;
			width: 343px;
		}
	}
	
</style>
