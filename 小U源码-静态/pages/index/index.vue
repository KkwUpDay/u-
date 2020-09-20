<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="center" type="text" placeholder="寻找商品" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view style="margin-right: -20rpx;" class="uni-tab-item" data-current="0">
					<text class="uni-tab-item-title uni-tab-item-title-active">
						推荐
					</text>
				</view>
				<view style="margin-right: -20rpx;" class="uni-tab-item" data-current="0" v-for="(item,index) in getcateList" :key="item.id">
					<text class="uni-tab-item-title ">
						<!-- uni-tab-item-title-active -->
						{{item.catename}}
					</text>
				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" circular="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in bannerList" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>

			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<!-- v-for="item in seckillList" :key="item.id" -->
			<view class="HotLeft" v-for="item in seckillList" :key="item.id">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{time[0]}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time[1]}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{time[2]}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image :src="item.img" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list " :class="actveIndex==0?'active_tag_list':''" @click="toActive(0)">
					<label for="">热门推荐</label>
				</view>
				<view class="tag_list" :class="actveIndex==1?'active_tag_list':''" @click="toActive(1)">
					<label for="">最新商品</label>
				</view>
				<view class="tag_list" :class="actveIndex==2?'active_tag_list':''" @click="toActive(2)">
					<label for="">只看专场</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product" v-for="(item,index) in indexgoodsList[actveIndex].content" :key="item.id" @click="toDetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	//引入模块
	import {
		baseUrl,
		request
	} from "@/utils/tools.js"
	export default {
		data() {
			return {
				bannerList: [], //轮播图列表
				getcateList: [], //商品分类列表
				seckillList: [], //秒杀列表
				indexgoodsList: [], //首页商品列表
				actveIndex: 0, //active
				time:[]  //时间的数组
			}
		},
		//方法
		methods: {
			toActive(index) {
				this.actveIndex = index

			},
			toDetail(id) {
				// console.log(id)
				uni.navigateTo({
					url: "/pages/details/details?id="+id
				})
			},
			 
		},

		//加载生命周期
		async onLoad() {


			//请求getcate数据
			var getcateResult = await request("/api/getcate")
			this.getcateList = getcateResult[1].data.list

			//请求banner数据
			var result = await request("/api/getbanner")
			// console.log(result)
			this.bannerList = result[1].data.list.map(item => { //轮播图列表数组赋值
				item.img = baseUrl + item.img //给图片加上基础路径
				return item
			})

			// 请求getseckill数据
			var seckillResult = await request("/api/getseckill")
			var seckillList = seckillResult[1].data.list||[]
			seckillList.map(item => { //秒杀列表数组赋值
				item.img = baseUrl + item.img //给图片加上基础路径
				return item
			})
			this.seckillList= seckillList
			console.log(this.seckillList)


			//请求首页getindexgoods数据
			var indexgoodsResult = await request("/api/getindexgoods")
			// console.log(indexgoodsResult)
			var list = indexgoodsResult[1].data.list
			list.map(item => { //首页商品列表数组赋值
				item.content.map(item1 => {
					item1.img = baseUrl + item1.img //给图片加上基础路径
					return item1
				})
			})
			this.indexgoodsList = list
			// console.log(this.indexgoodsList)
			//倒计时
			var endtime = "1599962243295";
			var timer = setInterval(() => {
				//获取当前时间戳
				var nowtime = new Date().getTime();
				// console.log(nowtime)
				//计算当前时间和结束时间相差多少毫秒
				var distance = endtime - nowtime;
				//当前时间和结束时间相差多少秒
				distance = Math.floor(distance / 1000)
				//1小时=60*60=3600，获取小时数
				var hour = Math.floor(distance / 3600);
				//1分钟=60秒，获取分钟数
				var minute = Math.floor(distance % 3600 / 60)
				//获取剩下的秒数
				var second = distance % 3600 % 60
				hour = hour < 10 ? "0" + hour : hour;
				minute = minute < 10 ? "0" + minute : minute;
				second = second < 10 ? "0" + second : second;
				// console.log(hour + ":" + minute + ":" + second)
				// 渲染，然后每隔一秒执行一次倒计时函数
				var time = [hour,minute,second]
				
				if(distance==0){
					this.time=["00","00","00"]
				}
				this.time= time
			}, 1000)


		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
