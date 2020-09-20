<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage"><image :src="detail.img" /></view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{ detail.goodsname }}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{ detail.price }}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>
					促销：
					<label class="manjian">满减</label>
					<label class="dazhe">满2件9折；3件8折</label>
				</view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="reduce">-</label>
					<label class="zhi">{{ num }}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat"><label for="">商品属性</label></view>
				<view class="productGuige">
					<label>{{ detail.specsname }}</label>
					<view class="threed3i1" v-for="(item, index) in detail.specsattr" :key="index">{{ item }}</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<image src="/static/detail/2.jpg" mode="aspectFill" />
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />
				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addCart">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
//引入模块
import { baseUrl } from '@/utils/tools.js';
import { getgoodsinfo, cartadd} from '@/utils/api.js';
export default {
	data() {
		return {
			detail: {}, //一个商品的内容
			num: 1
		};
	},
	methods: {
		reduce() {
			if (this.num > 1) {
				this.num -= 1;
			}
		},
		add() {
			this.num += 1;
		},
		//添加购物车
		async addCart() {
			//1.从缓存中拿到uid和token
			let { uid, token } = uni.getStorageSync('userInfo');
			//2.拿到商品id和商品num
			var goodsid = this.$mp.query.id;
			var num = this.num;
			//3.添加购物车
			var result = await cartadd(uid, goodsid, num, token);
			// 4.提示用户添加成功
			wx.showToast({
				title: '成功添加购物车'
			});
		},
		
	},
	async mounted() {
		let id = this.$mp.query.id; //接收id
		// console.log(id);
		// 请求一条数据
		var res = await getgoodsinfo(id);
		// console.log(res);
		var detail = res[1].data.list[0];
		detail.img = baseUrl + detail.img; //给图片加上基础路径
		detail.specsattr = detail.specsattr.split(','); //字符串转数组
		this.detail = detail;
		// console.log(this.detail);
	}
};
</script>
<style>
@import url('../../common/css/details.css');
</style>
