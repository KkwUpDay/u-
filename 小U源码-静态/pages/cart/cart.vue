<template>
	<view class="container">
		<view class="top">
			<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0" v-for="(item, index) in list" :key="item.id">
				<!-- 购物车商品信息 -->
				<view class="cartInfo" id="demo1">
					<!-- 购物车商品信息 -->
					<view class="cartInfochild">
						<!-- 选择框 -->
						<view class="cartInfo_switch common">
							<!-- 点击当前商品 -->
							<switch type="checkbox" :checked="item.checked" @change="doSingleCheck($event, index)" />
						</view>
						<!-- 图片 -->
						<view class="cartInfo_image common"><image :src="item.img" mode=""></image></view>

						<!-- 信息 -->
						<view class="cartInfo_info">
							<label for="" style="font-size: 26rpx;overflow: hidden;">{{ item.goodsname }}</label>
							<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
							<label for="" style="color: red;">￥{{ item.price }}</label>
						</view>
						<!-- 加减数量 -->
						<view class="cartInfo_num">
							<view class="cartInfo_num_child">
								<label for="" @click="reduce(index)">-</label>
								<label for="">{{ item.num }}</label>
								<label for="" @click="add(index)">+</label>
							</view>
						</view>
					</view>
				</view>

				<view class="cartDel" id="demo2" @click="docartdelete(index)"><label for="">删除</label></view>
			</scroll-view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="isAllCheck" @change="doAllCheck" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{ total }}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="toOrder">
				<!-- 被选中的商品的个数 -->
				<label >去结算({{ allNum }})</label>
			</view>
		</view>
	</view>
</template>

<script>
import { cartlist, cartedit, cartdelete } from '@/utils/api.js';
import { baseUrl } from '@/utils/tools.js';
export default {
	data() {
		return {
			list: [] //购物车列表
		};
	},
	methods: {
		//数量减少
		async reduce(index) {
			//num减少
			if (this.list[index].num > 1) {
				this.list[index].num -= 1;
			} else {
				this.list[index].num = 1;
			}

			//调用接口，更新数据库中的记录
			this.doEdit(index);
		},

		//数量增加
		async add(index) {
			//num增加
			this.list[index].num += 1;
			//调用接口，更新数据库中的记录
			this.doEdit(index);
		},

		//购物车删除
		async docartdelete(index) {
			let { token } = uni.getStorageSync('userInfo');
			//拿到购物车商品id
			let { id } = this.list[index];
			// console.log(id,"4444")
			//购物车商品删除
			var result = await cartdelete(id, token);
			//更新购物车列表
			this.list.splice(index, 1);
			//页面提示
			wx.showToast({
				title: '商品删除成功' //提示用户删除成功
			});
		},

		//单选,改变checked状态
		doSingleCheck(e, index) {
			//@change事件
			console.log(e, index);
			//页面checked改变
			var value = e.detail.value;
			this.list[index].checked = value;
			//更新数据库
			this.doEdit(index);
		},

		//全选
		doAllCheck(e) {
			this.isAllCheck = !this.isAllCheck; //全选取反
			// console.log(e);
			// var value = e.detail.value;
			// if (value == true) {
			// 	return this.list.every(item => {
			// 		return item.checked == true;
			// 	});
			// } else {
			// 	return this.list.every(item => {
			// 		return item.checked == false;
			// 	});
			// }
		},
		//同步数据到数据库
		async doEdit(index) {
			let { id, num, checked } = this.list[index];
			checked = checked ? 1 : 0; //数据类型和数据库保持一致
			let { token } = uni.getStorageSync('userInfo');
			var result = await cartedit(id, num, checked, token);
		},

		//去订单结算页面
		toOrder() {
			var res = this.list.filter(item => {
				return item.checked == true;
			});
			uni.setStorageSync('order', res);
			uni.navigateTo({
				url: '/pages/confirm/confirm'
			});
		}
	},

	//计算属性
	computed: {
		total() {
			var sum = 0;
			this.list.forEach(item => {
				if (item.checked) {
					sum += item.price * item.num;
				}
			});
			return sum;
		},
		allNum() {
			var sum = 0;
			this.list.forEach(item => {
				if (item.checked) {
					sum += item.num;
				}
			});
			return sum;
		},
		isAllCheck: {
			get: function() {
				return this.list.every(item => {
					return item.checked == true;
				});
			},
			set: function(val) {
				//把每个商品的checked状态和全选保持一致
				this.list.forEach(item => {
					item.checked = val;
				});
			}
		}
	},

	async onShow() {
		//获取购物车列表
		let { uid, token } = uni.getStorageSync('userInfo');
		var result = await cartlist(uid, token);
		// console.log(result,333);return;
		var list = result[1].data.list || [];
		list.forEach(item => {
			item.checked = item.checked == 1 ? true : false;
			item.img = baseUrl + item.img;
		});
		this.list = list;
		// console.log(this.list);
	}
};
</script>

<style>
@import url('../../common/css/cart.css');
.cartInfo_image_img {
	width: 120rpx;
	height: 120rpx;
}
</style>
